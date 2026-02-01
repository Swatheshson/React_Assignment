// src/pages/ProductFormPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { type ProductType } from "../services/productService";

const ProductFormPage: React.FC = () => {
  const navigate = useNavigate();

const handleProductAdded = (newProduct: ProductType) => {
  // 1️⃣ Assign a unique id if it doesn't exist
  if (!newProduct.id) {
    newProduct.id = Date.now(); // simple unique id
  }

  // 2️⃣ Read existing products from localStorage
  const savedProductsRaw = localStorage.getItem("addedProducts");
  let savedProducts: ProductType[] = savedProductsRaw ? JSON.parse(savedProductsRaw) : [];

  // 3️⃣ Merge new product with existing products
  const updatedProducts = [newProduct, ...savedProducts];

  // 4️⃣ Save the updated array back to localStorage
  localStorage.setItem("addedProducts", JSON.stringify(updatedProducts));

  // 5️⃣ Navigate to ProductList page and pass new product in state
  navigate("/products", { state: { newProduct } });
};

  return (
    <div style={{ padding: "2rem" }}>
      {/* <h1>Add New Product</h1> */}
      <ProductForm onProductAdded={handleProductAdded} />
    </div>
  );
};

export default ProductFormPage;