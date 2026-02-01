// src/pages/ProductListPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import { getProducts, type ProductType } from "../services/productService";
import { Toast } from "primereact/toast";
import { Paginator } from "primereact/paginator";
import { deleteProduct } from "../services/productService";

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useRef<Toast>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // show 6 products per page


  // 1️⃣ Handle updated products coming back from ProductForm page
  useEffect(() => {
    if (location.state?.products) {
      setProducts(location.state.products); // update list immediately after add/edit
    }
  }, [location.state]);

  // 2️⃣ Fetch products from API + localStorage
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiProducts = await getProducts();
        const savedProductsRaw = localStorage.getItem("addedProducts");
        const savedProducts: ProductType[] = savedProductsRaw
          ? JSON.parse(savedProductsRaw)
          : [];
        setProducts([...savedProducts, ...apiProducts]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiProducts = await getProducts();
        const savedProductsRaw = localStorage.getItem("addedProducts");
        const savedProducts: ProductType[] = savedProductsRaw
          ? JSON.parse(savedProductsRaw)
          : [];

        let allProducts = [...savedProducts, ...apiProducts];

        // Apply updated product if navigated back from EditProductPage
        const updatedProduct = location.state?.updatedProduct as ProductType | undefined;
        if (updatedProduct) {
          allProducts = allProducts.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
          );
        }

        setProducts(allProducts);

        // Clear location.state so it doesn't reapply on refresh
        window.history.replaceState({}, document.title);

      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [location.state]);

  // 3️⃣ Navigate to ProductForm page to edit a product
  const handleEdit = (product: ProductType) => {
    navigate(`/edit-product/${product.id}`, { state: { product } });
  };

  // 4️⃣ Navigate to ProductForm page to add a new product
  const handleAdd = () => {
    toast.current?.show({
      severity: "success",
      summary: "Redirecting",
      detail: "Navigating to Add Products page...",
      life: 1500
    })

    setTimeout(() => {
      navigate("/add-products");
    }, 1500)

  };

  const handleDelete = async (id: number) => {
  try {
    // ✅ Only call API for FakeStore products
    if (id <= 20) {
      await deleteProduct(id); // service handles fetch
    }

    // ✅ Remove from localStorage if it exists
    const savedProductsRaw = localStorage.getItem("addedProducts");
    const savedProducts: ProductType[] = savedProductsRaw
      ? JSON.parse(savedProductsRaw)
      : [];

    const updatedLocalProducts = savedProducts.filter(p => p.id !== id);
    localStorage.setItem("addedProducts", JSON.stringify(updatedLocalProducts));

    // ✅ Update UI state
    setProducts(prev => prev.filter(p => p.id !== id));

    // ✅ Show toast
    toast.current?.show({
      severity: "success",
      summary: "Deleted",
      detail: "Product deleted successfully",
      life: 2000,
    });
  } catch (err) {
    console.error("Delete failed", err);
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Failed to delete product",
      life: 3000,
    });
  }
};
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  return (

    <div style={{ padding: "2rem" }}>
      <h1>Products</h1>
      <Toast ref={toast} />
      <button onClick={handleAdd} className="single-unique">Add Product</button>

      {/* Product list with Edit callback */}
      <ProductList
        products={currentProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
  <Paginator
    first={indexOfFirstItem}
    rows={itemsPerPage}
    totalRecords={products.length}
    rowsPerPageOptions={[6, 12, 18]}
    onPageChange={(e) => setCurrentPage(e.page + 1)}
  />
</div>
    </div>
  );
};

export default ProductListPage;