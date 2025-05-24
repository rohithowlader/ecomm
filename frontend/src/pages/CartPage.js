import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await API.put("/cart", { productId, quantity });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <h2>Your Cart</h2>

        {cart.items.length === 0 ? (
          <div className="alert alert-info">Your cart is empty.</div>
        ) : (
          <>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map(({ product, quantity }) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={
                          `http://localhost:5000${product.image}` ||
                          "https://via.placeholder.com/150"
                        }
                        alt={product.name}
                        width="70"
                        height="70"
                        style={{ objectFit: "cover" }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          updateQuantity(product._id, parseInt(e.target.value))
                        }
                        style={{ width: "70px" }}
                      />
                    </td>
                    <td>{product.price * quantity}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(product._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end">
              <h4>Total: ₹{totalPrice}</h4>
              <Link to="/checkout" className="btn btn-primary mt-3">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
