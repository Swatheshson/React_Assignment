// src/components/EditProduct.tsx
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { updateProduct, type ProductType } from "../services/productService";

interface EditProductProps {
  product: ProductType;                  // product to edit
  onSave: (updatedProduct: ProductType) => void; // callback to notify parent
}

const EditProduct: React.FC<EditProductProps> = ({ product, onSave }) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState<number | null>(product.price);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);

  const toast = useRef<Toast>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !description || !category || !image) {
      toast.current?.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please fill all fields",
        life: 3000,
      });
      return;
    }

    const updated: ProductType = { ...product, title, price, description, category, image };

    try {
      // 1️⃣ Update API
      await updateProduct(updated);

      // 2️⃣ Update localStorage
      const savedProductsRaw = localStorage.getItem("addedProducts");
      let savedProducts: ProductType[] = savedProductsRaw ? JSON.parse(savedProductsRaw) : [];

      // Replace the edited product in localStorage
      savedProducts = savedProducts.map(p => (p.id === updated.id ? updated : p));

      localStorage.setItem("addedProducts", JSON.stringify(savedProducts));

      // 3️⃣ Show success toast
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Product updated!",
        life: 2000,
      });

      // 4️⃣ Notify parent to update ProductListPage
      onSave(updated);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update",
        life: 3000,
      });
    }
  };

  return (
    <Card title="Edit Product" style={{ width: "500px", margin: "2rem auto" }}>
      <Toast ref={toast} />
      <form className="professional-form"
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <InputText placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <InputNumber
          placeholder="Price"
          value={price}
          onValueChange={(e) => setPrice(e.value!)}
        />
        <InputText
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputText
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <InputText
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button type="submit" label="Update Product" className="p-button-success" />
      </form>
    </Card>
  );
};

export default EditProduct;