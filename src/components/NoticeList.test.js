import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import NoticeList from "./NoticeList";
import { getDocs, Timestamp } from "firebase/firestore";

jest.mock("./NoticeItem", () => ({ notice }) => (
  <div data-testid="notice-item">{notice.title}</div>
));

jest.mock("firebase/firestore", () => {
  const originalModule = jest.requireActual("firebase/firestore");

  return {
    __esModule: true,
    ...originalModule,
    db: {},
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
    orderBy: jest.fn(),
    limit: jest.fn(),
    startAfter: jest.fn(),
  };
});

describe("NoticeList", () => {
  beforeEach(() => {
    getDocs.mockImplementation(() =>
      Promise.resolve({
        docs: [
          {
            id: "1",
            data: () => ({
              title: "Notice 1",
              content: "Content 1",
              publicationDate: Timestamp.fromDate(new Date("2024-03-20")),
            }),
          },
          {
            id: "2",
            data: () => ({
              title: "Notice 2",
              content: "Content 2",
              publicationDate: Timestamp.fromDate(new Date("2024-03-21")),
            }),
          },
        ],
      })
    );
  });

  it("loads and displays notices", async () => {
    render(<NoticeList searchQuery="" filterDate="" />);

    await waitFor(() => {
      expect(screen.getAllByTestId("notice-item").length).toBe(2);
    });
    expect(screen.getByText("Notice 1")).toBeInTheDocument();
    expect(screen.getByText("Notice 2")).toBeInTheDocument();
  });

  it("displays error on fetch failure", async () => {
    getDocs.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error"))
    );

    render(<NoticeList searchQuery="" filterDate="" />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});

describe('NoticeList "Load More" functionality with adjusted batch sizes', () => {
  const generateNotices = (batch, count) => {
    return Array.from({ length: count }, (_, index) => ({
      id: `${batch}-${index + 1}`,
      data: () => ({
        title: `${batch} Batch - Notice ${index + 1}`,
        content: `Content ${index + 1}`,
        publicationDate: Timestamp.fromDate(new Date(`2024-03-${20 + index}`)),
      }),
    }));
  };

  const firstBatch = generateNotices("First", 10); // A full batch indicating more items might be available
  const secondBatch = generateNotices("Second", 5); // A smaller batch, simulating the end of available items

  beforeEach(() => {
    getDocs
      .mockImplementationOnce(() =>
        Promise.resolve({
          docs: firstBatch,
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          docs: secondBatch,
        })
      );
  });

  it('loads more notices on "Load More" button click, with adjusted batch sizes', async () => {
    render(<NoticeList searchQuery="" filterDate="" />);

    await waitFor(() => {
      expect(screen.getAllByTestId("notice-item").length).toBe(10);
    });
    expect(screen.getByText("First Batch - Notice 1")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Load More"));

    await waitFor(() => {
      expect(screen.getAllByTestId("notice-item").length).toBe(15);
    });
    expect(screen.getByText("Second Batch - Notice 1")).toBeInTheDocument();
    expect(screen.queryByText("Load More")).not.toBeInTheDocument();
  });
});
