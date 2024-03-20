import React from "react";
import NoticeItem from "./NoticeItem";

function NoticeList() {
  // For now, we'll just render a static list. Later, we'll fetch this from Firestore.
  const notices = [
    {
      title: "Notice 1",
      publicationDate: "2024-03-20",
      content: "Content preview for Notice 1",
    },
  ];

  return (
    <div>
      {notices.map((notice) => (
        <NoticeItem key={notice.title} notice={notice} />
      ))}
    </div>
  );
}

export default NoticeList;
