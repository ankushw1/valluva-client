import React, { useState } from "react";
import { FaPen, FaTrashAlt, FaPlus } from "react-icons/fa";
import CreateTaskModal from "../components/TaskModal"; // Import your CreateTaskModal component

interface TaskData {
  id: number;
  name: string;
  description: string;
  priority: string;
  dueDate: string;
  projects: string[];
  people: string[];
  status: string; // New field for status
}

const Task = () => {
  const statuses = ["Completed", "In Progress", "Pending"]; // Status options

  const initialTasks: TaskData[] = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `Task ${index + 1}`,
    description: `Description of Task ${index + 1}`,
    priority: ["High", "Medium", "Low"][index % 3],
    dueDate: `2024-11-${(index % 30) + 1}`,
    projects: [`Project ${String.fromCharCode(65 + (index % 5))}`],
    people: [`Person${index + 1} Name`, `Person${index + 2} Name`],
    status: statuses[index % statuses.length], // Assign a status
  }));

  const [tasks] = useState<TaskData[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility

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

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500"; // Red for High priority
      case "Medium":
        return "text-yellow-500"; // Yellow for Medium priority
      case "Low":
        return "text-green-500"; // Green for Low priority
      default:
        return "text-gray-500"; // Default color for unrecognized priority
    }
  };

  // Open modal function
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
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
        return "text-gray-500"; // Default text color for unrecognized statuses
    }
  };

  const getPersonColor = (personIndex: number, taskIndex: number) => {
    // Define a list of 10+ colors to ensure we have enough options
    const colors = [
      "bg-green-500", "bg-blue-500", "bg-red-500", "bg-yellow-500", 
      "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500", 
      "bg-orange-500", "bg-gray-500", "bg-lime-500", "bg-amber-500",
      "bg-cyan-500", "bg-fuchsia-500", "bg-violet-500", "bg-rose-500",
    ];
  
    // Use both task index and person index to ensure unique color across tasks
    const globalIndex = taskIndex * 10 + personIndex; // Unique global index
    return colors[globalIndex % colors.length]; // Use global index for color
  };
  
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
              <th className="border border-gray-300 p-2">Priority</th>
              <th className="border border-gray-300 p-2">People</th>
              <th className="border border-gray-300 p-2">Due Date</th>
              <th className="border border-gray-300 p-2">Projects</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
  {paginatedTasks.length > 0 ? (
    paginatedTasks.map((task, index) => (
      <tr
        key={task.id}
        className={`hover:bg-gray-100 ${index % 2 !== 0 ? 'bg-lightcyan' : ''}`}
      >
        <td className="border border-gray-300 p-2">{task.id}</td>
        <td className="border border-gray-300 p-2">{task.name}</td>
        <td className="border border-gray-300 p-2">
          <span className={getPriorityStyle(task.priority)}>
            {task.priority}
          </span>
        </td>
        <td className="border border-gray-200 p-2 flex justify-center items-center gap-2">
          {task.people.map((person, personIndex) => (
            <div
              key={personIndex}
              className={`${getPersonColor(personIndex, task.id)} rounded-full text-white w-8 h-8 flex items-center justify-center text-xs font-bold`}
            >
              {getInitials(person)}
            </div>
          ))}
        </td>
        <td className="border border-gray-300 p-2">{task.dueDate}</td>
        <td className="border border-gray-300 p-2">
          {task.projects.join(", ")}
        </td>
        <td className="border border-gray-300 p-2 rounded-lg">
          <span className={getStatusStyle(task.status)}>{task.status}</span>
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
              currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Floating + Button */}
      <div
        onClick={openModal}
        className="fixed bottom-9 right-[6rem] bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer shadow-lg"
      >
        <FaPlus size={24} />
      </div>

      {/* Show CreateTaskModal when isModalOpen is true */}
      <CreateTaskModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Task;
