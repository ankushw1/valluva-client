import React from "react";
import { Link } from "react-router-dom";

const RightSidebar: React.FC = () => {
  return (
    <div className="hidden md:block fixed top-0 right-0 h-full w-16 bg-gray-200 pt-40">
      <Link
        to="/chat"
        className="flex flex-col items-center justify-center"
      >
        <img
          src="/images/chat.png"
          alt="Chat"
          className="w-8 h-8" 
        />
      </Link>
    </div>
  );
};

export default RightSidebar;
