"use client";

import React, { useState } from "react";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");

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

      <button>등록</button>
    </div>
  );
}
