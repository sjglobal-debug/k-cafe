"use client";

import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("에스제이 글로벌");
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
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 24,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        판매 등록 테스트
      </h1>

      <div style={{ marginBottom: 16 }}>
        <label
          style={{ display: "block", marginBottom: 8, fontWeight: 600 }}
        >
          제목
        </label>
        <input
          placeholder="예: 중고 카페 쇼케이스 냉장고"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            border: "1px solid #999",
            borderRadius: 8,
            fontSize: 16,
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label
          style={{ display: "block", marginBottom: 8, fontWeight: 600 }}
        >
          브랜드
        </label>
        <input
          placeholder="예: 라심발리"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            border: "1px solid #999",
            borderRadius: 8,
            fontSize: 16,
            boxSizing: "border-box",
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          padding: "12px 20px",
          backgroundColor: "#111",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        등록
      </button>
    </div>
  );
}
