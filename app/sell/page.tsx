"use client";

import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목 입력하세요");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        title,
        brand,
        createdAt: serverTimestamp(),
      });

      alert("등록 완료!");

      setTitle("");
      setBrand("");
    } catch (error) {
      console.error(error);
      alert("에러 발생");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>판매 등록 테스트</h1>

      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="브랜드"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={handleSubmit}>등록</button>
    </div>
  );
}
