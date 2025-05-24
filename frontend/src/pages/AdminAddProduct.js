import React, { useState } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";
const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image.");
      return;
    }

    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }
      formData.append("image", image);

      await API.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Product added successfully!");
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
      setImage(null);
    } catch (err) {
      setMessage("Failed to add product");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <h2>Add New Product</h2>
        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              name="price"
              type="number"
              className="form-control"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              name="stock"
              type="number"
              className="form-control"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              name="category"
              type="text"
              className="form-control"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminAddProduct;
