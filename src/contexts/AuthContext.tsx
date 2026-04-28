import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRole, getUserRoles } from "@/lib/roles";
import { apiGet, apiPost } from "@/lib/api";

type AppUser = { id: string; email: string; name?: string };

interface AuthContextType {
  user: AppUser | null;
  session: string | null; // JWT token
  userRoles: AppRole[];
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) as AppUser : null;
    } catch {
      return null;
    }
  });
  const [session, setSession] = useState<string | null>(() => localStorage.getItem("token"));
  const [userRoles, setUserRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth:logout events emitted by api wrapper
    const onLogoutEvent = () => {
      setSession(null);
      setUser(null);
      setUserRoles([]);
      navigate('/');
    };
    window.addEventListener('auth:logout', onLogoutEvent);

    // When a token (session) exists, fetch fresh user data from backend
    const fetchMe = async () => {
      if (!session) {
        setUserRoles([]);
        setLoading(false);
        return;
      }

      try {
        const resp = await apiGet('/api/auth/me');
        if (!resp.ok) {
          // token invalid or expired -> clear local state
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setSession(null);
          setUser(null);
          setUserRoles([]);
          setLoading(false);
          return;
        }
        setUser(resp.data.user);
        if (resp.data.user?.id) getUserRoles(resp.data.user.id).then(setUserRoles);
      } catch (err) {
        console.error('Failed to fetch /api/auth/me', err);
        setUserRoles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
    return () => window.removeEventListener('auth:logout', onLogoutEvent);
  }, [session]);

  const signIn = async (email: string, password: string) => {
    try {
      const resp = await apiPost('/api/auth/login', { email, password }, { authenticate: false });
      if (!resp.ok) return { error: resp.data?.error || 'Login failed' };
      const { token, user: u } = resp.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(u));
      setSession(token);
      setUser(u);
      getUserRoles(u.id).then(setUserRoles);
      navigate('/campus');
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const resp = await apiPost('/api/auth/register', { email, password, name: fullName }, { authenticate: false });
      if (!resp.ok) return { error: resp.data?.error || 'Registration failed' };
      const { token, user: u } = resp.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(u));
      setSession(token);
      setUser(u);
      getUserRoles(u.id).then(setUserRoles);
      navigate('/campus');
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  const signInWithGoogle = async () => {
    // OAuth flow not implemented in the example backend.
    return { error: 'Not implemented' };
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setSession(null);
    setUser(null);
    setUserRoles([]);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, session, userRoles, signIn, signUp, signInWithGoogle, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
