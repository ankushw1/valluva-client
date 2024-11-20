import React from "react";

interface SidebarLinkProps {
  href: string;
  iconSrc: string;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, iconSrc, label }) => (
  <a
    href={href}
    className="relative mb-10 text-gray-600 hover:text-blue-600 flex flex-col items-center justify-center"
  >
    <img src={iconSrc} alt={label} className="w-6 h-6" />
    <span className="absolute bottom-full mb-1 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 transition-opacity duration-300 hover:opacity-100">
      {label}
    </span>
  </a>
);

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:block fixed top-0 h-full w-16 bg-gray-200">
     
    </div>
  );
};

export default Sidebar;
