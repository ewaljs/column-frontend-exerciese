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
  const [lastVisible, setLastVisible] = useState(null);
  const [isMore, setIsMore] = useState(true);

  // Function to fetch notices
  const fetchNotices = async (next = false) => {
    setIsLoading(true);
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
    setIsLoading(false);
    setIsMore(querySnapshot.docs.length === 10);
  };

  useEffect(() => {
    fetchNotices();
  }, [searchQuery]);

  const handleNext = () => {
    fetchNotices(true);
  };

  if (isLoading) return <div>Loading...</div>;

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
