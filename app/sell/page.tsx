"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

type ProductItem = {
  id: string;
  title: string;
  brand: string;
};

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [items, setItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const list: ProductItem[] = snapshot.docs.map((doc) => {
        const data = doc.data() as { title?: string; brand?: string };
        return {
          id: doc.id,
          title: data.title ?? "",
          brand: data.brand ?? "",
        };
      });

      setItems(list);
    } catch (error) {
      console.error("목록 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "products"), {
        title,
        brand,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setBrand("");
      alert("등록 완료!");

      await loadProducts();
    } catch (error) {
      console.error("저장 오류:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 24,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 24 }}>
        SJ GLOBAL K-CAFE 판매 등록
      </h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 20,
          marginBottom: 32,
          background: "#fafafa",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <label
            style={{ display: "block", marginBottom: 8, fontWeight: 600 }}
          >
            제목
          </label>
          <input
            placeholder="예: 중고 쇼케이스 냉장고"
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
            placeholder="예: DECAFREE / La Cimbali"
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
          disabled={loading}
          style={{
            padding: "12px 20px",
            backgroundColor: loading ? "#777" : "#111",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "등록 중..." : "등록"}
        </button>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        등록된 상품 목록
      </h2>

      {items.length === 0 ? (
        <p>등록된 상품이 없습니다.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 18,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                {item.title}
              </div>
              <div style={{ color: "#555", fontSize: 15 }}>
                브랜드: {item.brand || "-"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
