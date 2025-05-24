import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
// import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminProductList from "./pages/AdminProductList";
import AdminEditProduct from "./pages/AdminEditProduct";
import ProductView from "./pages/ProductView";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} />

          <Route path="/admin/products" element={<AdminProductList />} />
          <Route
            path="/admin/edit-product/:id"
            element={<AdminEditProduct />}
          />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
