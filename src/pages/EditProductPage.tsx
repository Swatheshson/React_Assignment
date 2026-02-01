// src/pages/EditProductPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditProduct from "../components/EditProduct";
import { getProducts, type ProductType } from "../services/productService";


const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType | null>(null);



useEffect(() => {
  const fetchProduct = async () => {
    // 1️⃣ Get API products
    const apiProducts = await getProducts();

    // 2️⃣ Get saved products from localStorage
    const savedProductsRaw = localStorage.getItem("addedProducts");
    const savedProducts: ProductType[] = savedProductsRaw
      ? JSON.parse(savedProductsRaw)
      : [];

    // 3️⃣ Merge both
    const allProducts = [...savedProducts, ...apiProducts];

    // 4️⃣ Find product by ID
    const p = allProducts.find((p) => p.id === Number(id));

    if (p) setProduct({ ...p }); // clone to avoid reference issues
  };

  fetchProduct();
}, [id]);

  // Handle save: navigate back to ProductListPage with updated product
  // EditProductPage.tsx
const handleSave = (updatedProduct: ProductType) => {
  // Navigate back and pass updated product
  navigate("/products", { state: { updatedProduct } });
};

  if (!product) return <p>Loading...</p>;

  return <EditProduct product={product} onSave={handleSave} />;
};

export default EditProductPage;