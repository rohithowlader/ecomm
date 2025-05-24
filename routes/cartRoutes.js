const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// GET /api/cart - get user's cart
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product"
  );
  res.json(cart || { user: req.user.id, items: [] });
});

// POST /api/cart - add item or update quantity
router.post("/", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({
      user: req.user.id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const index = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );
    if (index >= 0) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }

  await cart.save();
  res.json(cart);
});

// PUT /api/cart - update quantity of an item
router.put("/", auth, async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((i) => i.product.equals(productId));
  if (!item) return res.status(404).json({ message: "Item not in cart" });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
});

// DELETE /api/cart/:productId - remove item from cart
router.delete("/:productId", auth, async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((item) => !item.product.equals(productId));
  await cart.save();
  res.json(cart);
});

// DELETE /api/cart - clear cart
router.delete("/", auth, async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user.id });
  res.json({ message: "Cart cleared" });
});

module.exports = router;
