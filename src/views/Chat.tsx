import React, { useState } from "react";
import { FaSearch, FaSmile } from "react-icons/fa";
import { MdNotifications, MdExpandMore } from "react-icons/md";
import {
  AiOutlinePlus,
  AiOutlinePhone,
  AiOutlineVideoCamera,
  AiOutlineClose,
  AiOutlineSend,
  AiOutlinePicture,
  AiOutlinePaperClip,
  AiOutlineAudio,
  AiOutlineFilePdf,
} from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";

interface User {
  id: number;
  name: string;
  status: string;
  delivered?: boolean;
}

const users: User[] = [
  { id: 1, name: "Ankush Waghmare", status: "Online" },
  { id: 2, name: "Arjun Yadav", status: "Offline" },
  { id: 3, name: "Priya Sharma", status: "Online" },
  { id: 4, name: "Rohit Mehra", status: "Offline" },
  { id: 5, name: "Ananya Singh", status: "Online" },
  { id: 6, name: "Sneha Iyer", status: "Offline" },
  { id: 7, name: "Amit Khurana", status: "Online" },
  { id: 8, name: "Pooja Verma", status: "Offline" },
  { id: 9, name: "Vikas Soni", status: "Online" },
  { id: 10, name: "Kavya Joshi", status: "Offline" },
  { id: 11, name: "Rahul Chaturvedi", status: "Online" },
  { id: 12, name: "Ritika Bhardwaj", status: "Offline" },
  { id: 13, name: "Ritika Bhardwaj", status: "Offline" },
];

const dummyChat = [
  { sender: "Ankush", message: "Hey, how are you?", delivered: true },
  { sender: "You", message: "I am good, thanks!", delivered: true },
  { sender: "Ankush", message: "Great to hear that!", delivered: true },
  { sender: "Ankush", message: "Hey, how are you?", delivered: true },
  { sender: "You", message: "I am good, thanks!", delivered: false },
  { sender: "Ankush", message: "Great to hear that!", delivered: true },
  { sender: "Ankush", message: "Hey, how are you?", delivered: true },
  { sender: "You", message: "I am good, thanks!", delivered: false },
  { sender: "Ankush", message: "Great to hear that!", delivered: true },
];

const Chat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDocumentOptions, setShowDocumentOptions] = useState(false);

  const handleEmojiClick = (emojiObject: any) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleOutsideClick = () => {
    setShowEmojiPicker(false);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleClearUser = () => {
    setSelectedUser(null);
  };

  return (
    <div className="h-[100vh] flex flex-col overflow-hidden">
      <div className="flex justify-end m-4 gap-4">
        <img
          src="/images/chat.png" 
          alt="Chat"
          className="w-10 h-10" 
        />
        <p className="font-bold text-2xl pr-8">Chat</p>
      </div>
      <hr />

      <div className="flex flex-grow p-4">
        <div className="w-1/4 pr-4 overflow-y-auto max-h-[85vh]">
          <div className="sticky top-0 bg-blue-600 text-white h-10 p-2 rounded-md w-full max-w-xs mb-4 z-10 flex items-center">
            <FaSearch />
            <input
              type="text"
              placeholder="Search User"
              className="ml-2 bg-transparent outline-none h-full w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={handleClearSearch} className="ml-2 text-white">
                <AiOutlineClose size={20} />
              </button>
            )}
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <h2 className="font-semibold mb-2">Recents</h2>
              <button className="flex items-center bg-blue-600 text-white h-8 px-2 rounded-full hover:bg-blue-700 transition duration-200">
                <AiOutlinePlus className="mr-2 text-lg" />
                <span className="text-sm font-semibold">Create Group</span>
              </button>
            </div>
          </div>

          <div>
            {filteredUsers.map((user, index) => {
              const hasUnread = index % 2 === 0;
              const unreadCount = hasUnread
                ? Math.floor(Math.random() * 5) + 1
                : null;
              const isOnline = index % 2 === 0; 
              const lastMessageTime = "10:30 AM"; 

              return (
                <div
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md border-b border-gray-200"
                >
                  <div className="relative">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="/images/joker.webp"
                      alt="Profile"
                    />
                    <div
                      className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 ${
                        isOnline
                          ? "bg-green-500 border-white"
                          : "bg-gray-300 border-gray-300"
                      }`}
                    />
                  </div>

                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-center">
                      {/* Name and Time */}
                      <span className="font-semibold text-base">
                        {user.name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {dummyChat[0]?.message || "Hey there!"}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {lastMessageTime}
                    </span>

                    <div>
                      {hasUnread && (
                        <div className="bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-2">
                          {unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-3/4 pl-4 flex flex-col">
          {selectedUser ? (
            <div className="flex flex-col flex-grow">
              <div className="flex items-center p-4 bg-gray-50 border-b">
                <img
                  className="w-12 h-12 rounded-full"
                  src="/images/joker.webp" // Default image for the chat profile
                  alt={selectedUser.name}
                />

                <div className="ml-4 flex-grow">
                  <div className="font-semibold">{selectedUser.name}</div>
                  <div className="text-sm text-green-500">
                    {selectedUser.status}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="text-blue-600">
                    <FaSearch size={20} />
                  </button>
                  {/* Clear Button */}
                  <button onClick={handleClearUser} className="text-red-600">
                    <AiOutlineClose size={20} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-md flex-grow overflow-y-auto max-h-[70vh]">
                {dummyChat.map((chat, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      chat.sender === "You" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`relative max-w-xs px-4 py-2 rounded-lg text-sm ${
                        chat.sender === "You"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      <div>
                        <span>{chat.message}</span>
                      </div>
                      {/* Timestamp and double tick */}
                      <div className="flex items-center justify-end text-xs mt-1">
                        <span
                          className={`${
                            chat.sender === "You"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {/* Add double tick if it's sent */}
                        {chat.sender === "You" && (
                          <div className="flex flex-col items-end ml-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="20"
                              viewBox="0 0 14 20"
                            >
                              <path
                                d="M2,8 L5,11 L12,4"
                                stroke="white"
                                stroke-width="1.5"
                                fill="none"
                              />
                              <path
                                d="M2,12 L5,15 L12,8"
                                stroke="white"
                                stroke-width="1.5"
                                fill="none"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center bg-gray-100 rounded-full p-2 shadow-md">
                {/* Emoji Picker */}

                <div className="relative">
                  <button
                    className="text-gray-500 hover:text-blue-500 p-2"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <FaSmile className="h-5 w-5" />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute bottom-10 left-0 bg-white shadow-lg rounded-lg p-2 z-10">
                      <div
                        className="absolute bottom-12 left-0 z-50"
                        onClick={(e) => e.stopPropagation()} // Prevent click inside emoji picker from closing it
                      >
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    className="text-gray-500 hover:text-blue-500 p-2"
                    onClick={() => setShowDocumentOptions(!showDocumentOptions)}
                  >
                    <AiOutlinePaperClip className="h-5 w-5" />
                  </button>
                  {showDocumentOptions && (
                    <div className="absolute bottom-10 left-0 bg-white shadow-lg rounded-lg p-2 z-10">
                      <button className="flex items-center p-2 text-gray-600 hover:text-blue-500">
                        <AiOutlinePicture className="h-5 w-5 mr-2" /> Image
                      </button>
                      <button className="flex items-center p-2 text-gray-600 hover:text-blue-500">
                        <AiOutlineVideoCamera className="h-5 w-5 mr-2" /> Video
                      </button>
                      <button className="flex items-center p-2 text-gray-600 hover:text-blue-500">
                        <AiOutlineFilePdf className="h-5 w-5 mr-2" /> PDF
                      </button>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  className="flex-grow bg-transparent outline-none text-sm px-2"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                {message ? (
                  <button className="bg-blue-500 text-white rounded-full p-2 flex items-center justify-center hover:bg-blue-600">
                    <AiOutlineSend className="h-5 w-5" />
                  </button>
                ) : (
                  <button className="text-gray-500 hover:text-blue-500 p-2">
                    <AiOutlineAudio className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-md h-full flex items-center justify-center">
              <span>Click on a user to start chatting</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
