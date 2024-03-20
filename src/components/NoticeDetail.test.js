import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import NoticeDetail from "./NoticeDetail";
import { useParams } from "react-router-dom";
import { getDoc, Timestamp } from "firebase/firestore";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

jest.mock("firebase/firestore", () => {
  const originalModule = jest.requireActual("firebase/firestore");
  return {
    __esModule: true,
    ...originalModule,
    doc: jest.fn(),
    getDoc: jest.fn(),
  };
});

jest.mock("../db", () => ({}));

describe("NoticeDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading initially", () => {
    useParams.mockReturnValue({ id: "test-id" });
    render(<NoticeDetail />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays the notice after successful fetch", async () => {
    useParams.mockReturnValue({ id: "test-id" });
    const mockNoticeData = {
      title: "Test Notice",
      publicationDate: Timestamp.fromDate(new Date("2024-01-01T19:00:00")),
      content: "This is a test notice content.",
    };
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockNoticeData,
      id: "test-id",
    });

    render(<NoticeDetail />);
    await waitFor(() => {
      expect(screen.getByText("Test Notice")).toBeInTheDocument();
    });
    expect(
      screen.getByText("This is a test notice content.")
    ).toBeInTheDocument();
    expect(screen.getByText("1/1/2024")).toBeInTheDocument();
  });

  it("displays a message if no notice is found", async () => {
    useParams.mockReturnValue({ id: "non-existent-id" });
    getDoc.mockResolvedValue({
      exists: () => false,
    });

    render(<NoticeDetail />);
    await waitFor(() => {
      expect(screen.getByText("No notice found.")).toBeInTheDocument();
    });
  });

  it("handles and logs an error if fetching fails", async () => {
    console.error = jest.fn();
    useParams.mockReturnValue({ id: "test-id" });
    getDoc.mockRejectedValue(new Error("Error fetching notice"));

    render(<NoticeDetail />);
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching notice:",
        expect.any(Error)
      );
    });
  });
});
