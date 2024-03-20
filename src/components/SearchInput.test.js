import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  it("renders correctly with given searchQuery", () => {
    render(<SearchInput searchQuery="Test" setSearchQuery={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Search by title...");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("Test");
  });

  it("calls setSearchQuery with the new value when changed", () => {
    const setSearchQueryMock = jest.fn();
    render(<SearchInput searchQuery="" setSearchQuery={setSearchQueryMock} />);
    const inputElement = screen.getByPlaceholderText("Search by title...");

    fireEvent.change(inputElement, { target: { value: "New Query" } });

    expect(setSearchQueryMock).toHaveBeenCalledTimes(1);
    expect(setSearchQueryMock).toHaveBeenCalledWith("New Query");
  });
});
