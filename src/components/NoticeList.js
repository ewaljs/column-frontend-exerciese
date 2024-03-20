import React, { useEffect, useState } from "react";
import NoticeItem from "./NoticeItem";
import { db } from "../db";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
  Timestamp,
} from "firebase/firestore";

function NoticeList({ searchQuery, filterDate }) {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [isMore, setIsMore] = useState(true);

  const fetchNotices = async (next = false) => {
    setIsLoading(true);
    setError("");
    try {
      let q = query(
        collection(db, "notices"),
        orderBy("publicationDate", "desc"),
        limit(10)
      );
      if (searchQuery) {
        q = query(
          collection(db, "notices"),
          where("title", "==", searchQuery),
          orderBy("publicationDate", "desc"),
          limit(10),
          ...(next && lastVisible ? [startAfter(lastVisible)] : [])
        );
      }

      if (filterDate) {
        const startDate = new Date(filterDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(filterDate);
        endDate.setHours(23, 59, 59, 999);

        q = query(
          q,
          where("publicationDate", ">=", Timestamp.fromDate(startDate)),
          where("publicationDate", "<=", Timestamp.fromDate(endDate))
        );
      }

      if (next && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(q);
      const fetchedNotices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (next) {
        setNotices((notices) => [...notices, ...fetchedNotices]);
      } else {
        setNotices(fetchedNotices);
      }
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setIsMore(querySnapshot.docs.length === 10);
    } catch (err) {
      setError(
        "An error occurred while fetching the notices. Please try again."
      );
      console.error("Error fetching notices:", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, [searchQuery, filterDate]);

  const handleNext = () => {
    fetchNotices(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (notices.length === 0) return <div>No notices found.</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </div>
      {isMore && (
        <div className="text-center mt-4">
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default NoticeList;
