import React, { useState } from "react";

const Report = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    const dummyData = [
      {
        task: "Task 1",
        people: "Rahul Sharma",
        projects: "Project A",
        status: "Completed",
      },
      {
        task: "Task 2",
        people: "Priya Verma",
        projects: "Project B",
        status: "In Progress",
      },
      {
        task: "Task 3",
        people: "Ankit Patel",
        projects: "Project C",
        status: "Pending",
      },
      {
        task: "Task 4",
        people: "Meena Singh",
        projects: "Project D",
        status: "Completed",
      },
      {
        task: "Task 5",
        people: "Amit Kumar",
        projects: "Project E",
        status: "In Progress",
      },
    ];

    const csvHeader = "Task,People,Projects,Status\n";
    const csvRows = dummyData
      .map((row) => `${row.task},${row.people},${row.projects},${row.status}`)
      .join("\n");
    const csvContent = csvHeader + csvRows;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const data = [
    {
      task: "Task 1",
      people: "Rahul Sharma",
      projects: "Project A",
      status: "Completed",
    },
    {
      task: "Task 2",
      people: "Priya Verma",
      projects: "Project B",
      status: "In Progress",
    },
    {
      task: "Task 3",
      people: "Ankit Patel",
      projects: "Project C",
      status: "Pending",
    },
    {
      task: "Task 4",
      people: "Meena Singh",
      projects: "Project D",
      status: "Completed",
    },
    {
      task: "Task 5",
      people: "Amit Kumar",
      projects: "Project E",
      status: "In Progress",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4 mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-900 text-white py-2 px-6 rounded-lg flex items-center gap-2 shadow-lg hover:bg-blue-800"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1-8.32-8.32h207.36a8.35 8.35 0 0 1-8.32 8.32zm26-215.76a24 24 0 1 1 22-22 24 24 0 0 1-22 22zM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48z"></path>
          </svg>
          Generate Report
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-9 right-8 bg-gray-300 text-[#1e3a8a] hover:text-[#1e3a8a] p-2 rounded-full"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 352 512"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
              </svg>
            </button>

            <div className="p-6">
              {/* Tab Buttons */}
              <div className="flex space-x-4 bg-[#1e3a8a] p-4 w-full">
                <button className="px-4 py-1 font-semibold rounded-full bg-blue-800 text-white shadow-md transition duration-200">
                  Individual
                </button>
                <button className="px-4 py-1 font-semibold rounded-full bg-white text-blue-600 shadow-md transition duration-200">
                  Bulk
                </button>
              </div>

              <form className="space-y-4 p-6">
                <div className="flex flex-col space-x-4">
                  <h1 className="text-xl text-gray-500">Date</h1>
                  <div className="flex space-x-4">
                    {/* Start Date */}
                    <div>
                      <label className="text-sm text-gray-500">
                        Start Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder=" Start Date"
                          className="w-full border border-gray-300 rounded p-2 pl-10"
                        />
                        {/* Calendar Icon */}
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 448 512"
                          className="absolute left-3 top-3 text-gray-400"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                        </svg>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">End Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder=" End Date"
                          className="w-full border border-gray-300 rounded p-2 pl-10"
                        />
                        {/* Calendar Icon */}
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 448 512"
                          className="absolute left-3 top-3 text-gray-400"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    className="bg-blue-800 text-white font-semibold py-2 px-6 rounded shadow-lg"
                  >
                    Generate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Recents</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3 text-center">Task</th>
              <th className="p-3 text-center">People</th>
              <th className="p-3 text-center">Projects</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Download</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr className="border-t border-gray-200 text-center" key={index}>
                <td className="p-3 text-xl text-gray-700 font-semibold">
                  {row.task}
                </td>
                <td className="p-3 text-xl text-gray-700 font-semibold">
                  {row.people}
                </td>
                <td className="p-3 text-xl text-gray-700 font-semibold">
                  {row.projects}
                </td>
                <td className="p-3 text-xl text-gray-700 font-semibold">
                  {row.status}
                </td>
                <td className="p-3 text-center text-xl text-gray-700 font-semibold">
                  <button
                    onClick={handleDownload}
                    className="bg-blue-900 hover:text-blue-800 text-white rounded-lg p-2"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ height: "20px", width: "20px" }}
                    >
                      <path d="M12 17V3"></path>
                      <path d="m6 11 6 6 6-6"></path>
                      <path d="M19 21H5"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
