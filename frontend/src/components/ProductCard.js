import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        className="card-img-top"
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">₹{product.price}</p>
        <p className="card-text small">
          {product.description?.slice(0, 60)}...
        </p>
        <button className="btn btn-sm btn-primary mt-auto">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
