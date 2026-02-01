
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsListPage";
import ProductFormPage from "./pages/ProductFormPage";
import EditProductPage from "./pages/EditProductPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/add-products" element={<ProductFormPage/>} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
