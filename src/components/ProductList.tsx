// src/components/ProductList.tsx
import React from "react";

import { type ProductType } from "../services/productService";


interface ProductListProps {
  products: ProductType[];
  onEdit: (product: ProductType) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
   <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
    padding: "2rem",
    backgroundColor: "#f5f6fa" // subtle corporate background
  }}
>
  {products.map((product) => (
    <div
      key={product.id}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "contain",
          marginBottom: "1rem",
        }}
      />
      <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem 0", color: "#333" }}>
        {product.title}
      </h3>
      <p style={{ margin: "0 0 1rem 0", fontWeight: 500, color: "#0d6efd" }}>
        ${product.price}
      </p>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
        <button
          onClick={() => onEdit(product)}
          style={{
            flex: 1,
            padding: "0.5rem 0",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#0d6efd",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0b5ed7")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0d6efd")}
        >
          Edit
        </button>
        <button
          onClick={() => product.id !== undefined && onDelete(product.id)}
          style={{
            flex: 1,
            padding: "0.5rem 0",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#6c757d",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5c636a")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
  );
};

export default ProductList;