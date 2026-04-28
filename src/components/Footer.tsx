import campusLogo from "@/assets/campus-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--header-bg))] py-4 sm:py-6 px-4 sm:px-6 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src={campusLogo} alt="Campus Logo" className="h-8 sm:h-10 w-auto" />
          <span className="text-base sm:text-lg font-semibold text-foreground">
            SkillShare<span className="text-xs sm:text-sm align-top">Campus</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm text-foreground/80">
          © 2025 SkillShareCampus. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
