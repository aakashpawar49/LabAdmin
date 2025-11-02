import React from "react";
// removed unused imports
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative flex items-center justify-center w-full h-full">
        {children}
      </div>
      <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}
