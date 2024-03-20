import React from "react";
import SearchInput from "./SearchInput";
import NoticeList from "./NoticeList";

function Dashboard() {
  return (
    <div>
      <h1>Public Notices Dashboard</h1>
      <SearchInput />
      <NoticeList />
    </div>
  );
}

export default Dashboard;
