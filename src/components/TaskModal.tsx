import React, { useState, useEffect, useRef } from "react";
import {
  FaEnvelope,
  FaChartBar,
  FaTimes,
  FaCalendarAlt,
  FaTags,
  FaCheck,
  FaPaperclip,
  FaPen,
  FaUpload,
  FaTasks,
  FaFileUpload,
  FaImage,
} from "react-icons/fa";
const { SketchPicker } = require("react-color");

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [taskName, setTaskName] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("FaTasks");
  const [selectedColor, setSelectedColor] = useState<string>("#008000");
  const [isIconPickerOpen, setIsIconPickerOpen] = useState<boolean>(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [priority, setPriority] = useState<string>("Medium");
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] =
    useState<boolean>(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [isPeopleDropdownOpen, setIsPeopleDropdownOpen] =
    useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const iconPickerRef = useRef<HTMLDivElement>(null);
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const peopleDropdownRef = useRef<HTMLDivElement>(null);

  const projects = ["Project 1", "Project 2", "Project 3", "Project 4"];
  const people = ["Ajay", "Sooraj", "Radha", "Ankush"];

  const icons = [
    { name: "FaTasks", component: <FaTasks /> },
    { name: "FaEnvelope", component: <FaEnvelope /> },
    { name: "FaChartBar", component: <FaChartBar /> },
    { name: "FaCalendarAlt", component: <FaCalendarAlt /> },
    { name: "FaCheck", component: <FaCheck /> },
    { name: "FaPaperclip", component: <FaPaperclip /> },
    { name: "FaPen", component: <FaPen /> },
    { name: "FaUpload", component: <FaUpload /> },
  ];

  const toggleProjectDropdown = () => {
    setIsProjectDropdownOpen(!isProjectDropdownOpen);
  };

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName);
    setIsIconPickerOpen(false);
  };

  const togglePeopleDropdown = () => {
    setIsPeopleDropdownOpen(!isPeopleDropdownOpen);
  };

  const addPeople = (person: string) => {
    if (!selectedPeople.includes(person)) {
      setSelectedPeople((prev) => [...prev, person]);
    }
    setIsPeopleDropdownOpen(false);
  };

  const removePeople = (person: string) => {
    setSelectedPeople((prev) => prev.filter((p) => p !== person));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      !colorPickerRef.current?.contains(event.target as Node) &&
      !iconPickerRef.current?.contains(event.target as Node)
    ) {
      setIsIconPickerOpen(false);
      setIsColorPickerOpen(false);
    }
  };

  const handleColorSelect = (color: any) => {
    setSelectedColor(color.hex);
    setIsColorPickerOpen(false);
  };

  const addProject = (project: string) => {
    if (!selectedProjects.includes(project)) {
      setSelectedProjects((prev) => [...prev, project]);
    }
    setIsProjectDropdownOpen(false);
  };

  const removeProject = (project: string) => {
    setSelectedProjects((prev) => prev.filter((p) => p !== project));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-[30rem] relative"
      >
        <button onClick={onClose} className="absolute top-4 right-3">
          <FaTimes size={15} />
        </button>

        <div className="flex justify-between items-center mb-4 mt-4">
          <h2 className="text-2xl font-bold">
            {taskName ? taskName : "New Task"}
          </h2>
          <div className="flex items-center space-x-4">
            <button
              className={`w-8 h-8 flex items-center justify-center text-white font-bold text-xl rounded-full transition-transform ${
                priority === "High" ? "ring-4 ring-red-500 scale-60" : ""
              }`}
              style={{ backgroundColor: "#FF4D4F" }}
              onClick={() => setPriority("High")}
            >
              H
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center text-white font-bold text-xl rounded-full transition-transform ${
                priority === "Medium" ? "ring-4 ring-yellow-500 scale-60" : ""
              }`}
              style={{ backgroundColor: "#FFC53D" }}
              onClick={() => setPriority("Medium")}
            >
              M
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center text-white font-bold text-xl rounded-full transition-transform ${
                priority === "Low" ? "ring-4 ring-green-500 scale-60" : ""
              }`}
              style={{ backgroundColor: "#52C41A" }}
              onClick={() => setPriority("Low")}
            >
              L
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 rounded">
            <div
              style={{ backgroundColor: selectedColor }}
              className="relative border border-gray-300 rounded-lg p-2 mt-4 mb-4"
            >
              <div
                className="absolute w-[10px] h-[10px] rounded-full"
                style={{
                  right: "-3px",
                  top: "-3px",
                  backgroundColor:
                    priority === "High"
                      ? "#FF4D4F"
                      : priority === "Medium"
                      ? "#FFC53D"
                      : priority === "Low"
                      ? "#52C41A"
                      : "transparent", // Fallback if no priority selected
                }}
              ></div>

              <div
                className="text-2xl cursor-pointer"
                onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
              >
                {React.cloneElement(
                  icons.find((icon) => icon.name === selectedIcon)
                    ?.component || <FaTasks />,
                  { style: { color: "white", fontSize: "22px" } } // Icon color set to white
                )}
              </div>
            </div>

            <div className="flex items-center border border-gray-600 rounded w-[100%] h-[2.5rem]">
              <input
                type="text"
                placeholder="Task Title"
                className="flex-1 pl-2 outline-none"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />

              <div className="relative pr-2">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-lightblue cursor-pointer border-none focus:outline-none"
                  style={{ backgroundColor: "#5AC8FA" }} // Light blue background color
                  onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                >
                  <FaPen className="text-white text-md" />
                </button>
                {isColorPickerOpen && (
                  <div
                    ref={colorPickerRef}
                    className="absolute right-0 mx-auto z-50"
                  >
                    <SketchPicker
                      color={selectedColor}
                      onChangeComplete={handleColorSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {isIconPickerOpen && (
            <div
              ref={iconPickerRef}
              className="absolute bg-white border border-gray-300 rounded shadow-lg w-[16rem] flex flex-wrap gap-2 z-50 top-[6rem]"
              style={{ backgroundColor: selectedColor }}
            >
              {icons.map((icon) => (
                <button
                  key={icon.name}
                  className="text-2xl p-2 hover:bg-gray-200 rounded"
                  onClick={() => handleIconSelect(icon.name)}
                >
                  {React.cloneElement(icon.component, {
                    style: {
                      color: "white", // Icon color is always white
                      fontSize: "24px",
                    },
                  })}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between gap-2">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded p-2 w-[13rem]">
                <FaTags
                  className="text-gray-500 mr-2 cursor-pointer"
                  onClick={togglePeopleDropdown}
                />
                <div className="flex flex-wrap gap-2 flex-1">
                  {selectedProjects.length > 0 ? (
                    selectedProjects.map((project) => (
                      <div
                        key={project}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center space-x-2"
                      >
                        <span>{project}</span>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeProject(project)}
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">Tag project</span>
                  )}
                </div>
              </div>
              {isProjectDropdownOpen && (
                <div
                  ref={projectDropdownRef}
                  className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-full z-10"
                >
                  {projects.map((project) => (
                    <button
                      key={project}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => addProject(project)}
                    >
                      {project}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded p-2 w-[13rem]">
                <FaTags
                  className="text-gray-500 mr-2 cursor-pointer"
                  onClick={togglePeopleDropdown}
                />
                <div className="flex flex-wrap gap-2 flex-1">
                  {selectedPeople.length > 0 ? (
                    selectedPeople.map((person) => (
                      <div
                        key={person}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center space-x-2"
                      >
                        <span>{person}</span>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removePeople(person)}
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">Select people</span>
                  )}
                </div>
              </div>
              {isPeopleDropdownOpen && (
                <div
                  ref={peopleDropdownRef}
                  className="absolute top-full left-0 bg-white border border-gray-300 w-full mt-2 max-h-40 overflow-auto z-50"
                >
                  {people.map((person) => (
                    <div
                      key={person}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => addPeople(person)}
                    >
                      {person}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center mt-4 mb-4 w-[18rem]">
          <span className="mr-2">Due Date:</span>
          <input type="date" className="border border-gray-300 rounded p-2" />
        </div>

        <div className="relative">
          <textarea
            placeholder="Description (if any)"
            className="border border-gray-300 rounded p-2 h-[8rem] w-full mb-4"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
