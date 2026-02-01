import axios from "axios";

// ✅ Type for a product
export type ProductType = {
  id?: number;  // id optional for new products before POST
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
};

// ✅ Function to fetch products
export const getProducts = async (): Promise<ProductType[]> => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data; // returns array of products
};

// ✅ Function to add a new product
export const addProduct = async (product: ProductType): Promise<ProductType> => {
  const response = await axios.post("https://fakestoreapi.com/products", product, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data; // returns the added product with id
};

export const updateProduct = async (product: ProductType): Promise<ProductType> => {
  const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`, product);
  return response.data;
};

// src/services/productService.ts



// src/services/productService.ts
export const deleteProduct = async (id: number): Promise<void> => {
  if (id <= 20) {
    // FakeStore API product
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete API product");
  } else {
    // Local product → remove from localStorage
    const savedProductsRaw = localStorage.getItem("addedProducts");
    const savedProducts: ProductType[] = savedProductsRaw
      ? JSON.parse(savedProductsRaw)
      : [];
    const updatedLocalProducts = savedProducts.filter(p => p.id !== id);
    localStorage.setItem("addedProducts", JSON.stringify(updatedLocalProducts));
  }
};