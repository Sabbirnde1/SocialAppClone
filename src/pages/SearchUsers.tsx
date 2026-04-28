import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search, UserPlus, Hash, FileText, X, Clock, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useFriends } from "@/hooks/useFriends";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OnlineStatus from "@/components/OnlineStatus";
import { useEnhancedSearch, getRecentSearches, clearRecentSearches, SearchType } from "@/hooks/useEnhancedSearch";
import NotificationBadge from "@/components/NotificationBadge";
import { highlightText } from "@/lib/searchUtils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const SearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, userResults, postResults, hashtagResults, isLoading, isSearching, debouncedQuery } = useEnhancedSearch(searchQuery, searchType);
  const { sendFriendRequest } = useFriends();
  const navigate = useNavigate();

  // Popular search suggestions
  const popularSearches = ["React", "TypeScript", "Web Development", "Design", "Marketing"];

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleResultClick = (result: any) => {
    if (result.type === "user") {
      navigate(`/user/${result.id}`);
    } else if (result.type === "post") {
      navigate(`/activity#post-${result.id}`);
    } else if (result.type === "hashtag") {
      const tag = result.metadata.tag.replace(/^#/, '');
      navigate(`/hashtag/${tag}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-white border-b px-3 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-primary">
              SkillShare<span className="text-xs sm:text-sm align-top">Campus</span>
            </h1>
          </Link>
          
          <div className="flex-1 max-w-md mx-2 md:mx-8">
            <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input 
                    ref={inputRef}
                    placeholder="Search..." 
                    className="h-11 pl-10 pr-10 text-base bg-gray-50 rounded-full md:rounded-md md:text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              {searchQuery.length < 2 && (recentSearches.length > 0 || popularSearches.length > 0) && (
                <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[400px] p-4 z-50 bg-background" align="start">
                  {recentSearches.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Recent
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            handleClearRecent();
                            setShowSuggestions(false);
                          }}
                          className="h-6 text-xs"
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((query, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-2 hover:bg-accent rounded-md cursor-pointer flex items-center gap-2"
                            onClick={() => {
                              handleRecentSearchClick(query);
                              setShowSuggestions(false);
                              inputRef.current?.focus();
                            }}
                          >
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{query}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {popularSearches.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Trending
                      </h4>
                      <div className="space-y-1">
                        {popularSearches.map((query, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-2 hover:bg-accent rounded-md cursor-pointer flex items-center gap-2"
                            onClick={() => {
                              setSearchQuery(query);
                              setShowSuggestions(false);
                              inputRef.current?.focus();
                            }}
                          >
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{query}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </PopoverContent>
              )}
            </Popover>
          </div>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link to="/campus" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link to="/friends" className="flex flex-col items-center gap-1 text-primary">
              <Users className="h-5 w-5" />
              <span className="text-xs font-medium">Requests</span>
            </Link>
            <Link to="/campus" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Courses</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Messages</span>
            </Link>
            <NotificationBadge />
            <Link to="/profile" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5" />
              <span className="text-xs">Me</span>
            </Link>
          </nav>

          {/* Mobile Back Button */}
          <Link to="/campus" className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors">
            <Home className="h-5 w-5 text-foreground/70" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-3 sm:px-6 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">Search</h2>

          {/* Recent Searches */}
          {searchQuery.length < 2 && recentSearches.length > 0 && (
            <Card className="p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent Searches
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClearRecent}
                  className="text-xs"
                >
                  Clear all
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((query, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleRecentSearchClick(query)}
                  >
                    {query}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Search Filters */}
          {searchQuery.length >= 2 && (
            <Tabs value={searchType} onValueChange={(v) => setSearchType(v as SearchType)} className="mb-4 sm:mb-6">
              <TabsList className="w-full grid grid-cols-4 h-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm py-2">
                  <span className="hidden sm:inline">All </span>({results.length})
                </TabsTrigger>
                <TabsTrigger value="people" className="text-xs sm:text-sm py-2">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">People </span>({userResults.length})
                </TabsTrigger>
                <TabsTrigger value="posts" className="text-xs sm:text-sm py-2">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Posts </span>({postResults.length})
                </TabsTrigger>
                <TabsTrigger value="hashtags" className="text-xs sm:text-sm py-2">
                  <Hash className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Tags </span>({hashtagResults.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={searchType} className="mt-6">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Searching...</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No results found for "{debouncedQuery}"</p>
                    <p className="text-sm text-muted-foreground mt-2">Try different keywords or check your spelling</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                     {results.map((result) => (
                      <Card 
                        key={`${result.type}-${result.id}`} 
                        className="p-3 sm:p-4 hover:bg-accent cursor-pointer transition-colors"
                        onClick={() => handleResultClick(result)}
                      >
                        <div className="flex items-start gap-2 sm:gap-4">
                          <div className="flex-shrink-0">
                            {result.type === "user" ? (
                              <div className="relative">
                                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                                  <AvatarImage src={result.avatar_url || ""} />
                                  <AvatarFallback>
                                    <User className="h-5 w-5 sm:h-6 sm:w-6" />
                                  </AvatarFallback>
                                </Avatar>
                                <OnlineStatus 
                                  userId={result.id}
                                  lastSeenAt={result.metadata?.last_seen_at}
                                  showText={false}
                                  className="absolute bottom-0 right-0"
                                />
                              </div>
                            ) : result.type === "post" ? (
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center">
                                <Hash className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-foreground" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 
                                className="font-semibold text-sm sm:text-base text-foreground truncate"
                                dangerouslySetInnerHTML={{ 
                                  __html: highlightText(result.title, debouncedQuery) 
                                }}
                              />
                              <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                                {result.type === "user" && (
                                  <>
                                    <Users className="h-3 w-3 mr-1" />
                                    Person
                                  </>
                                )}
                                {result.type === "post" && (
                                  <>
                                    <FileText className="h-3 w-3 mr-1" />
                                    Post
                                  </>
                                )}
                                {result.type === "hashtag" && (
                                  <>
                                    <Hash className="h-3 w-3 mr-1" />
                                    Tag
                                  </>
                                )}
                              </Badge>
                            </div>
                            {result.subtitle && (
                              <p 
                                className="text-xs sm:text-sm text-muted-foreground truncate"
                                dangerouslySetInnerHTML={{ 
                                  __html: highlightText(result.subtitle, debouncedQuery) 
                                }}
                              />
                            )}
                          </div>

                          {result.type === "user" && (
                            <Button 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                sendFriendRequest.mutate(result.id);
                              }}
                              disabled={sendFriendRequest.isPending}
                              className="text-xs"
                            >
                              {sendFriendRequest.isPending ? (
                                <div className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                              )}
                              <span className="hidden sm:inline">{sendFriendRequest.isPending ? "Adding..." : "Add"}</span>
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}

          {/* Empty State */}
          {searchQuery.length < 2 && recentSearches.length === 0 && (
            <div className="text-center py-8 sm:py-12 px-4">
              <Search className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Search SkillShare Campus</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Find people, posts, and topics
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                <Badge variant="outline" className="text-xs sm:text-sm">
                  <Users className="h-3 w-3 mr-1" />
                  People
                </Badge>
                <Badge variant="outline" className="text-xs sm:text-sm">
                  <FileText className="h-3 w-3 mr-1" />
                  Posts
                </Badge>
                <Badge variant="outline" className="text-xs sm:text-sm">
                  <Hash className="h-3 w-3 mr-1" />
                  Hashtags
                </Badge>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-100 py-4 sm:py-6 px-3 sm:px-6 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-base sm:text-lg font-semibold text-primary">
              SkillShare<span className="text-xs sm:text-sm align-top">Campus</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-foreground/80">
            © 2025 SkillShareCampus. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SearchUsers;
