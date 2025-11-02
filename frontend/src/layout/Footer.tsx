import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-gray-800 dark:bg-gray-900/90">
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-2 text-[11px] text-gray-700 md:text-xs md:px-6 dark:text-white">
        <div className="flex items-center justify-center gap-2">
          <span>MCA 25-26 @LabAdmin 2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


