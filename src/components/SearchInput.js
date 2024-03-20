import React from "react";

function SearchInput({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md flex-1"
    />
  );
}

export default SearchInput;
