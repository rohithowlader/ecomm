import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api"; // Axios with auth header
import UserNavbar from "../components/UserNavbar";
const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setQuantity(1);
      } catch (err) {
        setError("Failed to load product");
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: quantity,
      });
      setMessage(`Added ${quantity} x "${product.name}" to cart`);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add to cart");
      setMessage("");
    }
  };

  if (error && !product) {
    return <div className="alert alert-danger mt-4 text-center">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-md-6 text-center">
            <img
              src={
                `http://localhost:5000${product.image}` ||
                "https://via.placeholder.com/150"
              }
              alt={product.name}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">{product.name}</h2>
            <h4 className="text-success mb-3">₹{product.price}</h4>
            <p className="text-muted mb-4">{product.description}</p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>In Stock:</strong>{" "}
              {product.stock > 0 ? product.stock : "Out of Stock"}
            </p>

            {product.stock > 0 && (
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.min(
                        product.stock,
                        Math.max(1, Number(e.target.value))
                      )
                    )
                  }
                  className="form-control"
                  style={{ width: "120px" }}
                />
              </div>
            )}

            <div className="d-flex gap-3 mt-4">
              <button
                className="btn btn-primary px-4"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-outline-dark px-4"
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
            </div>

            {message && (
              <div className="alert alert-success mt-3">{message}</div>
            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
