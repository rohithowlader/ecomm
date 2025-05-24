import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";
const AdminEditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setMessage("Failed to load product"));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (let key in product) {
        formData.append(key, product[key]);
      }
      if (image) formData.append("image", image);

      await API.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Product updated successfully");
    } catch (err) {
      setMessage("Update failed");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <h2>Edit Product</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Product Name</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Stock</label>
            <input
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Category</label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>

          <button className="btn btn-success w-100">Update Product</button>
        </form>
      </div>
    </>
  );
};

export default AdminEditProduct;
