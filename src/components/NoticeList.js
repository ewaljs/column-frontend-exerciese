import React, { useEffect, useState } from "react";
import NoticeItem from "./NoticeItem";
import { db } from "../db";
import { collection, query, where, getDocs } from "firebase/firestore";

function NoticeList({ searchQuery }) {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      const q = query(
        collection(db, "notices"),
        where("title", "==", searchQuery)
      );

      const querySnapshot = await getDocs(q);
      const fetchedNotices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotices(fetchedNotices);
      setIsLoading(false);
    };

    if (searchQuery) {
      fetchNotices();
    }
  }, [searchQuery]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {notices.map((notice) => (
        <NoticeItem key={notice.id} notice={notice} />
      ))}
    </div>
  );
}

export default NoticeList;
