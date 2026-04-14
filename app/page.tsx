"use client";

import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");

  const handleSubmit = async () => {
    await addDoc(collection(db, "products"), {
      title,
      brand,
      createdAt: new Date(),
    });

    alert("등록 완료!");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>판매 등록 테스트</h1>

      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="브랜드"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />

      <button onClick={handleSubmit}>등록</button>
    </div>
  );
}
