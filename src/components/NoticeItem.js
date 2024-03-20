import React from "react";

function NoticeItem({ notice }) {
  return (
    <div>
      <h2>{notice.title}</h2>
      <p>{notice.publicationDate}</p>
      <p>{notice.content}</p>
    </div>
  );
}

export default NoticeItem;
