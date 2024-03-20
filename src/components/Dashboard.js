import React, { useState } from "react";
import SearchInput from "./SearchInput";
import NoticeList from "./NoticeList";
import useDebounce from "../hooks/useDebounce";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  return (
    <div>
      <h1>Public Notices Dashboard</h1>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div>
        <label htmlFor="filterDate">Filter by publication date:</label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
      <NoticeList searchQuery={debouncedSearchQuery} filterDate={filterDate} />
    </div>
  );
}

export default Dashboard;
