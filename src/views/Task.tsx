import React, { useEffect, useRef, useState } from "react";
import {
  FaPen,
  FaTrashAlt,
  FaPlus,
  FaFlag,
  FaTasks,
  FaCheckCircle,
} from "react-icons/fa";
import CreateTaskModal from "../components/TaskModal";

interface TaskData {
  id: number;
  name: string;
  description: string;
  priority: string;
  dueDate: string;
  projects: string[];
  people: string[];
  status: string;
}

const Task = () => {
  const iconList = [FaPen, FaFlag, FaTasks, FaCheckCircle];

  const getIconBackgroundColor = (index: number) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-teal-500",
    ];

    return colors[index % colors.length];
  };

  const statuses = ["Completed", "In Progress", "Pending"]; // Status options

  const initialTasks: TaskData[] = Array.from({ length: 15 }, (_, index) => {
    const peopleCount = Math.floor(Math.random() * 5) + 1; // Random number of people (1 to 5)
    const people = Array.from(
      { length: peopleCount },
      (_, personIndex) => `Person${index + personIndex + 1} Name`
    );

    return {
      id: index + 1,
      name: `Task ${index + 1}`,
      description: `Description of Task ${index + 1}`,
      priority: ["High", "Medium", "Low"][index % 3],
      dueDate: `2024-11-${(index % 30) + 1}`,
      projects: [`Project ${String.fromCharCode(65 + (index % 5))}`],
      people, // Assign the dynamically generated people array
      status: statuses[index % statuses.length],
    };
  });

  const [tasks] = useState<TaskData[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility
  const [showPeopleList, setShowPeopleList] = useState<number | null>(null); // State for toggling people list visibility

  const peopleListRef = useRef<HTMLDivElement | null>(null); // Ref for the people list dropdown

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#FF4D4F"; // Red for High priority
      case "Medium":
        return "#FFC53D"; // Yellow for Medium priority
      case "Low":
        return "#52C41A"; // Green for Low priority
      default:
        return "#52C41A";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-500"; // Text color for "Completed"
      case "In Progress":
        return "text-yellow-500"; // Text color for "In Progress"
      case "Pending":
        return "text-red-500"; // Text color for "Pending"
      default:
        return "text-gray-500";
    }
  };

  const getPersonColor = (personIndex: number, taskIndex: number) => {
    const colors = [
      "bg-green-500",
      "bg-blue-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-gray-500",
      "bg-lime-500",
      "bg-amber-500",
      "bg-cyan-500",
      "bg-fuchsia-500",
      "bg-violet-500",
      "bg-rose-500",
    ];

    const globalIndex = taskIndex * 10 + personIndex;
    return colors[globalIndex % colors.length];
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTogglePeopleList = (taskId: number) => {
    setShowPeopleList(showPeopleList === taskId ? null : taskId);
  };

  // Close the people list if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        peopleListRef.current &&
        !peopleListRef.current.contains(e.target as Node)
      ) {
        setShowPeopleList(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span className="text-gray-500">
            Showing{" "}
            {paginatedTasks.length > 0
              ? (currentPage - 1) * tasksPerPage + 1
              : 0}
            -{Math.min(currentPage * tasksPerPage, filteredTasks.length)} of{" "}
            {filteredTasks.length} entries
          </span>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search tasks..."
          className="border border-gray-300 p-2 rounded w-64"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Task</th>
              <th className="border border-gray-300 p-2">Projects</th>
              <th className="border border-gray-300 p-2">People</th>
              <th className="border border-gray-300 p-2">Due Date</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task, index) => (
                <tr
                  key={task.id}
                  className={`hover:bg-gray-100 ${
                    index % 2 !== 0 ? "bg-gray-200" : ""
                  }`}
                >
                  <td className="border border-gray-300 pb-2 pt-2 pr-4 pl-4 text-center w-4 h-4">
                    <div
                      className={`flex items-center justify-center p-2 rounded-[10px] ${getIconBackgroundColor(
                        index
                      )}`}
                    >
                      {React.createElement(iconList[index % iconList.length], {
                        className: "text-white",
                      })}
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex items-center justify-evenly">
                      {task.name}
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
                        style={{
                          backgroundColor: getPriorityColor(task.priority),
                        }}
                      >
                        {task.priority === "High"
                          ? "H"
                          : task.priority === "Medium"
                          ? "M"
                          : "L"}
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {task.projects.join(", ")}
                  </td>

                  <td className="border border-gray-200 p-2 flex justify-center items-center gap-2 relative">
                    {task.people.length === 1 && (
                      <div
                        className={`${getPersonColor(0, task.id)} 
                                    rounded-full text-white w-8 h-8 flex items-center 
                                    justify-center text-xs font-bold cursor-pointer`}
                        onClick={() => handleTogglePeopleList(task.id)}
                      >
                        {getInitials(task.people[0])}
                      </div>
                    )}

                    {task.people.length > 1 && (
                      <>
                        <div
                          className={`${getPersonColor(0, task.id)} 
                                      rounded-full text-white w-8 h-8 flex items-center 
                                      justify-center text-xs font-bold cursor-pointer`}
                          onClick={() => handleTogglePeopleList(task.id)}
                        >
                          {getInitials(task.people[0])}
                        </div>
                        <div
                          className="bg-gray-400 rounded-full text-white w-8 h-8 flex items-center 
                                     justify-center text-xs font-bold cursor-pointer"
                          style={{ marginLeft: "-15px", zIndex: 5 }}
                          onClick={() => handleTogglePeopleList(task.id)}
                        >
                          +{task.people.length - 1}
                        </div>
                      </>
                    )}

                    {showPeopleList === task.id && (
                      <div
                        ref={peopleListRef} // Attach the ref here
                        className="absolute top-12 left-0 bg-white border border-gray-300 shadow-lg rounded-md p-4 w-48 z-20"
                        style={{ animation: "fadeIn 0.3s" }}
                      >
                        <div className="mb-2 flex flex-col gap-1">
                          {task.people.map((person, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              {/* Profile Image (can be a placeholder or real image URL) */}
                              <div
                                className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white"
                                style={{
                                  backgroundColor: getPersonColor(
                                    index,
                                    task.id
                                  ),
                                }} // Use same color logic
                              >
                                {getInitials(person)}
                              </div>

                              {/* Person Name */}
                              <span className="text-sm text-gray-700">
                                {person}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="border border-gray-300 p-2">{task.dueDate}</td>

                  <td className="border border-gray-300 p-2">
                    <span className={getStatusStyle(task.status)}>
                      {task.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="p-2 flex justify-center items-center gap-4">
                      <FaPen className="text-blue-500 cursor-pointer" />{" "}
                      <FaTrashAlt className="text-red-500 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="border border-gray-300 p-4 text-center text-gray-500"
                >
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`ml-2 px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <div
        onClick={openModal}
        className="fixed bottom-9 right-[6rem] bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer shadow-lg"
      >
        <FaPlus size={24} />
      </div>

      <CreateTaskModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Task;
