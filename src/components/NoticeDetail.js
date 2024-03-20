import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../db";

function NoticeDetail() {
  const [notice, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchNotice = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "notices", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNotice({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
      setIsLoading(false);
    };

    fetchNotice();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!notice) return <div>No notice found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{notice.title}</h1>
      <p className="text-gray-500 mb-4">
        {notice.publicationDate.toDate().toLocaleDateString()}
      </p>
      <div className="border-t pt-4">{notice.content}</div>
    </div>
  );
}

export default NoticeDetail;
