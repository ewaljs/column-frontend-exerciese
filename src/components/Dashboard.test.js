import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import useDebounce from "../hooks/useDebounce";

jest.mock("./SearchInput", () => ({ searchQuery, setSearchQuery }) => (
  <div>
    <div>MockSearchInput</div>
    <input
      data-testid="searchInput"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
));

jest.mock("./NoticeList", () => ({ searchQuery, filterDate }) => (
  <div>
    MockNoticeList - Query: {searchQuery}, Date: {filterDate}
  </div>
));

jest.mock("../hooks/useDebounce", () => jest.fn());

describe("Dashboard", () => {
  beforeEach(() => {
    useDebounce.mockImplementation((value) => value);
  });

  it("renders correctly", () => {
    render(<Dashboard />);
    expect(screen.getByText("Public Notices Dashboard")).toBeInTheDocument();
    expect(screen.getByText("MockSearchInput")).toBeInTheDocument();
    expect(screen.getByText("Filter by publication date:")).toBeInTheDocument();
  });

  it("updates search query and reflects in NoticeList", () => {
    render(<Dashboard />);
    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, { target: { value: "Test Query" } });
    expect(
      screen.getByText(/MockNoticeList - Query: Test Query, Date:/)
    ).toBeInTheDocument();
  });

  it("updates filter date and reflects in NoticeList", () => {
    render(<Dashboard />);
    const dateInput = screen.getByLabelText("Filter by publication date:");
    fireEvent.change(dateInput, { target: { value: "2024-03-20" } });
    expect(
      screen.getByText(/MockNoticeList - Query: , Date: 2024-03-20/)
    ).toBeInTheDocument();
  });
});
