import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import NoticeItem from "./NoticeItem";

describe("NoticeItem", () => {
  const mockNotice = {
    id: "1",
    title: "Test Notice",
    publicationDate: {
      toDate: () => new Date("2024-03-20T12:00:00"),
    },
    content: "This is a test notice content.",
  };

  it("renders notice information correctly", () => {
    render(
      <BrowserRouter>
        <NoticeItem notice={mockNotice} />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Notice")).toBeInTheDocument();
    expect(screen.getByText("3/20/2024")).toBeInTheDocument(); // Format may vary depending on locale
    expect(
      screen.getByText("This is a test notice content.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/notice/1");
  });

  it("link navigates to the correct notice detail page", () => {
    render(
      <BrowserRouter>
        <NoticeItem notice={mockNotice} />
      </BrowserRouter>
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/notice/1");
  });
});
