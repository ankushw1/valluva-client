import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiFlag1 } from "react-icons/ci";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Chart from "react-google-charts";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import { Dropdown, Menu } from "antd";
Highcharts3D(Highcharts);

const Dashboard = () => {
  const timeLockChart = {
    series: [
      {
        name: "Network",
        data: [
          { x: "Dec 23", y: 28 },
          { x: "Dec 24", y: 64 },
          { x: "Dec 25", y: 31 },
          { x: "Dec 26", y: 34 },
          { x: "Dec 27", y: 68 },
          { x: "Dec 28", y: 32 },
        ],
      },
    ],
    options: {
      chart: {
        type: "area", // Explicitly set to the string literal type
        height: 350,
        animations: {
          enabled: false,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Hides the entire toolbar
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        colors: ["#D3D3D3"], // Light red or dark gray color
        opacity: 0.8,
        type: "solid",
      },
      markers: {
        size: 5,
        hover: {
          size: 9,
        },
      },
      tooltip: {
        intersect: true,
        shared: false,
      },
      xaxis: {
        type: "category", // X-axis uses categories (date strings)
        title: {
          text: "Date", // X-axis title
          style: {
            fontSize: "14px",
            color: "#333",
          },
        },
      },
      yaxis: {
        title: {
          text: "Hours", // Y-axis title
          style: {
            fontSize: "14px",
            color: "#333",
          },
        },
        labels: {
          formatter: (value) => `${value}`, // Add "hrs" to Y-axis labels
        },
      },
    } as ApexOptions, // Cast the object to the ApexOptions type
  };

  const apexChartData = {
    series: [
      {
        name: "Completed",
        data: [5, 8, 6, 9, 4, 7, 6], // Update with actual data for "Completed" tasks
      },
      {
        name: "In Progress",
        data: [4, 3, 5, 4, 6, 5, 4], // Update with actual data for "In Progress" tasks
      },
      {
        name: "Not Started",
        data: [5, 6, 4, 3, 2, 4, 5], // Update with actual data for "Not Started" tasks
      },
    ],
    options: {
      chart: {
        type: "bar" as "bar",
        height: 350,
        stacked: true,
        toolbar: {
          tools: {
            download: false, // Disables the "Download CSV" option
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        categories: ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"], // Change this to match your task labels
      },
      tooltip: {
        y: {
          formatter: (val: any) => `${val} tasks`,
        },
      },
      fill: {
        opacity: 1,
      },
    },
  };

  // Chart Data
  const pieData = [
    { name: "Friend", value: 400 },
    { name: "Email", value: 300 },
    { name: "Google", value: 300 },
    { name: "TV", value: 200 },
    { name: "Ads", value: 100 },
  ];

  const COLORS = ["#4CAF50", "#FF9800", "#F44336", "#2196F3", "#9C27B0"];

  const timesheetData = [
    { date: "Day 1", tasks: 5 },
    { date: "Day 2", tasks: 8 },
    { date: "Day 3", tasks: 6 },
    { date: "Day 4", tasks: 9 },
    { date: "Day 5", tasks: 4 },
  ];

  const workloadData = [
    { name: "Employee A", Completed: 5, InProgress: 4, NotStarted: 5 },
    { name: "Employee B", Completed: 4, InProgress: 3, NotStarted: 6 },
    { name: "Employee C", Completed: 6, InProgress: 5, NotStarted: 4 },
    { name: "Employee D", Completed: 7, InProgress: 4, NotStarted: 3 },
    { name: "Employee E", Completed: 8, InProgress: 6, NotStarted: 2 },
  ];

  // Project Data
  const projects = [
    {
      name: "Sample 1",
      expectedCompletion: "12/08/198",
      completionDate: "12/08/198",
      totalProjects: 12,
    },
    {
      name: "Sample 2",
      expectedCompletion: "12/08/198",
      completionDate: "12/08/198",
      totalProjects: 8,
    },
    {
      name: "Sample 3",
      expectedCompletion: "12/08/1981",
      completionDate: "12/08/198",
      totalProjects: 15,
    },
  ];

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Handle Next and Previous Project
  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePreviousProject = () => {
    setCurrentProjectIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "download") {
      const csvData = options.series[0].data
        .map((item) => `${item.name},${item.y}`)
        .join("\n");
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chart_data.csv";
      a.click();
      URL.revokeObjectURL(url);
    } else if (key === "share") {
      alert("Share functionality not implemented yet.");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="download">Download CSV</Menu.Item>
      <Menu.Item key="share">Share</Menu.Item>
    </Menu>
  );

  const options = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      height: 320,
      width: 380,
    },
    title: {
      text: null,
    },
    plotOptions: {
      pie: {
        innerSize: 80,
        depth: 45,
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            fontSize: "14px",
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Share",
        data: [
          { name: "Google", y: 30, color: "#4CAF50" },
          { name: "Email", y: 20, color: "#2196F3" },
          { name: "TV", y: 25, color: "#FFC107" },
          { name: "Friend", y: 25, color: "#9C27B0" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#F3F8F9] min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 felx sm:grid-cols-2 gap-6">
          <div className="py-3 px-4 rounded-lg bg-white shadow-md">
            <h4 className="text-purple-800 text-xl font-medium mb-2">
              Total Projects
            </h4>
            <div className="flex justify-around items-center">
              <p className="text-4xl font-bold">
                {projects[currentProjectIndex].totalProjects}
              </p>
              <img
                src="/images/iamge.png"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg pt-6 flex flex-col items-center relative">
          <h3 className="text-lg font-semibold text-gray-800 absolute top-7 z-10">
            Hours vs Projects
          </h3>

          <div className="absolute top-6 right-8 z-20">
            <Dropdown overlay={menu} trigger={["click"]}>
              <div
                className="cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6h.01M12 12h.01M12 18h.01"
                  />
                </svg>
              </div>
            </Dropdown>
          </div>

          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>

        <div className="bg-white shadow-md rounded-lg pt-6 flex flex-col items-center relative">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Time-log</h3>

          <div className="absolute top-6 right-8 z-20">
            <Dropdown overlay={menu} trigger={["click"]}>
              <div
                className="cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6h.01M12 12h.01M12 18h.01"
                  />
                </svg>
              </div>
            </Dropdown>
          </div>

          <ReactApexChart
            options={timeLockChart.options}
            series={timeLockChart.series}
            type="area"
            height={250}
            width={350}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
            Overdue Tasks
          </h3>

          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-600 text-left font-medium">
                  Overdue
                </th>
                <th className="px-4 py-2 text-gray-600 text-left font-medium">
                  Task
                </th>
                <th className="px-4 py-2 text-gray-600 text-left font-medium">
                  Deadline
                </th>
                <th className="px-4 py-2 text-gray-600 text-left font-medium">
                  Employee
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 text-yellow-500">1 Day</td>
                <td className="px-4 py-2">Update Facebook Profile</td>
                <td className="px-4 py-2">2017-08-15</td>
                <td className="px-4 py-2">Paula</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-orange-500">4 Days</td>
                <td className="px-4 py-2">Update Testing Plan</td>
                <td className="px-4 py-2">2017-08-06</td>
                <td className="px-4 py-2">Kate</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-red-500">10 Days</td>
                <td className="px-4 py-2">Configure Desktop</td>
                <td className="px-4 py-2">2017-08-01</td>
                <td className="px-4 py-2">Nancy</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-red-600">24 Days</td>
                <td className="px-4 py-2">Set Up New Database</td>
                <td className="px-4 py-2">2017-07-18</td>
                <td className="px-4 py-2">Georg</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-red-600">24 Days</td>
                <td className="px-4 py-2">Set Up New Database</td>
                <td className="px-4 py-2">2017-07-18</td>
                <td className="px-4 py-2">Georg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-green-600">24 Days</td>
                <td className="px-4 py-2">Set Up New Database</td>
                <td className="px-4 py-2">2017-07-18</td>
                <td className="px-4 py-2">Georg</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-blue-600">24 Days</td>
                <td className="px-4 py-2">Set Up New Database</td>
                <td className="px-4 py-2">2017-07-18</td>
                <td className="px-4 py-2">Georg</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Workload
          </h3>
          <ReactApexChart
            options={apexChartData.options}
            series={apexChartData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
