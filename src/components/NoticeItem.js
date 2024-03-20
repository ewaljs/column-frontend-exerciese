import React from "react";
import { Link } from "react-router-dom";

function NoticeItem({ notice }) {
  const { title, publicationDate, content } = notice;
  const pubDate = new Date(publicationDate.seconds * 1000);

  return (
    <div>
      <h2>
        <Link to={`/notice/${notice.id}`}>{title}</Link>
      </h2>
      <p>{pubDate.toLocaleDateString()}</p>
      <p>{content}</p>
    </div>
  );
}

export default NoticeItem;
