import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/Dashboard", () => () => <div>MockDashboard</div>);
jest.mock("./components/NoticeDetail", () => () => <div>MockNoticeDetail</div>);

describe("App component", () => {
  it('renders Dashboard component for "/" route', () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(screen.getByText("MockDashboard")).toBeInTheDocument();
  });

  it('renders NoticeDetail component for "/notice/:id" route', () => {
    const testId = "123";
    window.history.pushState({}, "", `/notice/${testId}`);
    render(<App />);
    expect(screen.getByText("MockNoticeDetail")).toBeInTheDocument();
  });
});
