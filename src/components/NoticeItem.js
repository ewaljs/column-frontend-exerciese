import React from "react";

function NoticeItem({ notice }) {
  const { title, publicationDate, content } = notice;
  const pubDate = new Date(publicationDate.seconds * 1000);

  return (
    <div>
      <h2>{title}</h2>
      <p>{pubDate.toLocaleDateString()}</p>
      <p>{content}</p>
    </div>
  );
}

export default NoticeItem;
