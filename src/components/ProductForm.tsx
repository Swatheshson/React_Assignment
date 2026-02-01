import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { addProduct, type ProductType, updateProduct } from "../services/productService";

interface ProductFormProps {
  product?: ProductType; // optional, if passed → edit mode
  onProductAdded?: (product: ProductType) => void; // for Add
  onSubmit?: (updatedProduct: ProductType) => void; // for Edit
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onProductAdded, onSubmit }) => {
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState<number | null>(product?.price || null);
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [image, setImage] = useState(product?.image || "");
  const toast = useRef<Toast>(null);
 

  // Update fields if editing product changes
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description || "");
      setCategory(product.category || "");
      setImage(product.image || "");
    }
  }, [product]);

  // Determine ID for new local product
  let newId = 0;

if (!product) {
  // Only generate new ID for new products
  const lastId = Number(localStorage.getItem("lastId") || "20");
  newId = lastId + 1;
  localStorage.setItem("lastId", String(newId));
}
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

    try {
      const newOrUpdatedProduct: ProductType = {
        id: product?.id || newId,
        title,
        price,
        description,
        category,
        image,
      };

      if (product && onSubmit) {
        if (typeof product.id === "number" && product.id <= 20) {
          await updateProduct(newOrUpdatedProduct);
        }

        onSubmit(newOrUpdatedProduct);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Product updated!",
          life: 2000,

        });

      } else if (!product && onProductAdded) {
        // ✅ Add mode
        await addProduct(newOrUpdatedProduct); // optional API call
        onProductAdded(newOrUpdatedProduct);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Product added!",
          life: 2000,
        });

        

        // Clear form
        setTitle("");
        setPrice(null);
        setDescription("");
        setCategory("");
        setImage("");
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: product ? "Failed to update product" : "Failed to add product",
        life: 3000,
      });
    }
  }

  return (
    <Card title="Add New Product" style={{ width: "500px", margin: "2rem auto" }}>
      <Toast ref={toast} />
      <form className="professional-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <InputText placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value!)} />
        <InputNumber placeholder="Price" value={price} onValueChange={(e) => setPrice(e.value!)} />
        <InputText placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <InputText placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value!)} />
        <InputText placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value!)} />
        <Button type="submit"  label="Add Product" className="p-button-success" />
      </form>
    </Card>
  );
};

export default ProductForm;