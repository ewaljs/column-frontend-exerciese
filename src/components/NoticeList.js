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
} from "firebase/firestore";

function NoticeList({ searchQuery }) {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [isMore, setIsMore] = useState(true);

  const fetchNotices = async (next = false) => {
    setIsLoading(true);
    setError("");
    try {
      let q;
      if (searchQuery) {
        q = query(
          collection(db, "notices"),
          where("title", "==", searchQuery),
          orderBy("publicationDate", "desc"),
          limit(10),
          ...(next && lastVisible ? [startAfter(lastVisible)] : [])
        );
      } else {
        q = query(
          collection(db, "notices"),
          orderBy("publicationDate", "desc"),
          limit(10),
          ...(next && lastVisible ? [startAfter(lastVisible)] : [])
        );
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
  }, [searchQuery]);

  const handleNext = () => {
    fetchNotices(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (notices.length === 0) return <div>No notices found.</div>;

  return (
    <div>
      {notices.map((notice) => (
        <NoticeItem key={notice.id} notice={notice} />
      ))}
      {isMore && <button onClick={handleNext}>Load More</button>}
    </div>
  );
}

export default NoticeList;
