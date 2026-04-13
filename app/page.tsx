"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("판매 제목을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "items"), {
        title,
        brand,
        year,
        condition,
        description,
        status: "new",
        createdAt: serverTimestamp(),
      });

      alert("등록 완료!");

      setTitle("");
      setBrand("");
      setYear("");
      setCondition("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
        판매 등록
      </h1>

      <div style={{ display: "grid", gap: 16 }}>
        <input
          style={{ padding: 14, border: "1px solid #ccc", borderRadius: 10 }}
          placeholder="판매 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={{ padding: 14, border: "1px solid #ccc", borderRadius: 10 }}
          placeholder="브랜드"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          style={{ padding: 14, border: "1px solid #ccc", borderRadius: 10 }}
          placeholder="구입 연도"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          style={{ padding: 14, border: "1px solid #ccc", borderRadius: 10 }}
          placeholder="상태"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />

        <textarea
          style={{
            padding: 14,
            border: "1px solid #ccc",
            borderRadius: 10,
            minHeight: 140,
          }}
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: 14,
            background: "#111",
            color: "#fff",
            borderRadius: 10,
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
}
