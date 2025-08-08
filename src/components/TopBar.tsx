import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bell, Search, User } from "lucide-react";

export const TopBar: React.FC = () => {
  const [filterType, setFilterType] = useState("this_week");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const userLoggedIn = localStorage.getItem("signup_email");
  useEffect(() => {
    const today = new Date();
    let start: Date;
    let end: Date;

    switch (filterType) {
      case "this_week":
        start = new Date(today);
        start.setDate(today.getDate() - today.getDay());
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        setStartDate(start);
        setEndDate(end);
        break;

      case "this_month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setStartDate(start);
        setEndDate(end);
        break;

      case "custom":
        setStartDate(null);
        setEndDate(null);
        break;

      default:
        break;
    }
  }, [filterType]);

  useEffect(() => {
    if (startDate && endDate) {
      console.log("Start Date:", startDate.toDateString());
      console.log("End Date:", endDate.toDateString());
    }
  }, [startDate, endDate]);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          Call Analytics Dashboard
        </h1>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Filter Dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>

          {/* Custom Date Range */}
          {filterType === "custom" && (
            <>
              <DatePicker
  startDate={startDate}
  endDate={endDate}
  onChange={(dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start) setStartDate(start);
    if (end) setEndDate(end);
    console.log("Custom Range Selected:", { start, end });
  }}
  selectsRange
  placeholderText="Select custom range"
  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

            </>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search calls, agents..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Notification */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {userLoggedIn ? userLoggedIn : "Guest"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
