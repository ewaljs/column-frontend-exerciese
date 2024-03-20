import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../db";
import { doc, getDoc } from "firebase/firestore";

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
    <div>
      <h1>{notice.title}</h1>
      <p>
        {new Date(notice.publicationDate.seconds * 1000).toLocaleDateString()}
      </p>
      <p>{notice.content}</p>
    </div>
  );
}

export default NoticeDetail;
