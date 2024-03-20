import React, { useState } from "react";
import SearchInput from "./SearchInput";
import NoticeList from "./NoticeList";
import useDebounce from "../hooks/useDebounce";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  return (
    <div>
      <h1>Public Notices Dashboard</h1>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NoticeList searchQuery={debouncedSearchQuery} />
    </div>
  );
}

export default Dashboard;
