import React, { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import UserNavbar from "../components/UserNavbar";
const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <h1>Welcome to MyShop</h1>
        <p>Browse products and shop your favorites.</p>
      </div>
      <div className="container mt-4">
        <h2 className="mb-4">Latest Products</h2>
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="col-md-3 mb-4">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
