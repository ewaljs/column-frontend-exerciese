import React from "react";

function SearchInput({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default SearchInput;
