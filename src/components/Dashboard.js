import React, { useState } from "react";
import SearchInput from "./SearchInput";
import NoticeList from "./NoticeList";
import useDebounce from "../hooks/useDebounce";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  return (
    <div className="max-w-4xl mx-auto p-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-4">
        Public Notices Dashboard
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4 justify-evenly">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="flex flex-1 items-center space-x-2">
          <label
            htmlFor="filterDate"
            className="text-sm font-medium text-gray-700 mr-4"
          >
            Filter by publication date:
          </label>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="mt-0 block w-full border-gray-300 shadow-sm sm:text-sm rounded-md flex-1" /* Adjusted mt-0 and added flex-1 for input to take up available space */
          />
        </div>
      </div>
      <NoticeList searchQuery={debouncedSearchQuery} filterDate={filterDate} />
    </div>
  );
}

export default Dashboard;
