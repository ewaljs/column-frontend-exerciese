import React from "react";
import { Link } from "react-router-dom";

function NoticeItem({ notice }) {
  const { title, id, publicationDate, content } = notice;

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">
        <Link
          to={`/notice/${id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          {title}
        </Link>
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        {publicationDate.toDate().toLocaleDateString()}
      </p>
      <p>{content}</p>
    </div>
  );
}

export default NoticeItem;
