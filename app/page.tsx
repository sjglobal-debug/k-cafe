"use client";

import { useState } from "react";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
        판매 등록 테스트
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

        <button
          style={{
            padding: 14,
            background: "#111",
            color: "#fff",
            borderRadius: 10,
            border: "none",
            fontWeight: 700,
          }}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
