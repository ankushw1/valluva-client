import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CreateTaskModal from './TaskModal';

const Topbar: React.FC = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-gray-200 border-b-2 border-gray-300 text-black">
        <div className="ml-12 mr-8 flex flex-col sm:flex-row justify-between items-center p-4 h-full">
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-2">
            <Link to="/home">
              <button
                className={`px-4 py-2 rounded ${
                  location.pathname === '/home' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
                }`}
              >
                Home
              </button>
            </Link>
            <Link to="/task">
              <button
                className={`px-4 py-2 rounded ${
                  location.pathname === '/task' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
                }`}
              >
                Task
              </button>
            </Link>
            <Link to="/report">
              <button
                className={`px-4 py-2 rounded ${
                  location.pathname === '/report' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
                }`}
              >
                Report
              </button>
            </Link>
            <Link to="/settings">
              <button
                className={`px-4 py-2 rounded ${
                  location.pathname === '/settings' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
                }`}
              >
                Settings
              </button>
            </Link>
          </div>

          <div className="mr-10 mt-4 sm:mt-0 flex flex-col items-center">
            <h1 className="text-xl mb-1 ml-2">Projects & Tasks</h1>
            <button
              onClick={openModal}
              className="px-4 py-2 flex items-center text-white bg-blue-800 rounded-lg text-[14px] hover:bg-blue-200"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
              </svg>
              <span className="ml-2">Create Project</span>
            </button>
          </div>
        </div>
      </div>

      <CreateTaskModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Topbar;
