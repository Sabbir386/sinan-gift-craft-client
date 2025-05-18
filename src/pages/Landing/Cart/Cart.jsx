import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../../redux/features/cart/cartSlice";
import Checkout from "../Checkout/Checkout";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();

  // Get cart items and subtotal from Redux store
  const products = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalPrice);
  console.log(products);
  const [giftWrap, setGiftWrap] = useState(false);
  const shippingThreshold = 75.0; // Free shipping threshold
  const amountToFreeShipping = Math.max(shippingThreshold - subtotal, 0);

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = (id, selectedSize, action) => {
    const product = products.find(
      (item) => item._id === id && item.selectedSize === selectedSize
    );
    if (product) {
      const newQuantity =
        action === "increase"
          ? product.quantity + 1
          : Math.max(product.quantity - 1, 1);
      dispatch(
        updateQuantity({ id, size: selectedSize, quantity: newQuantity })
      );
    }
  };

  // Handle product removal from cart
  const handleRemoveProduct = (id, selectedSize) => {
    dispatch(removeFromCart({ _id: id, selectedSize }));
  };

  // Clear all items from the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total price (including gift wrap if selected)
  const getTotalPrice = () => {
    let total = subtotal + (giftWrap ? 5.0 : 0);
    return total.toFixed(2);
  };

  // Calculate total quantity of items in the cart
  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  // Calculate the total price of items (without gift wrap)
  const totalPrice = products.reduce(
    (sum, product) => sum + product.salePrice * product.quantity,
    0
  );

  // Optional: Add a discount amount if required
  const discountAmount = 0;

  return (
    <div className="grid grid-cols-1 gap-4 px-2 md:px-6 mx-auto w-full max-w-7xl py-20 md:py-16">
      {/* Left section: Cart items */}
      <div className="p-1 md:p-4 w-full mx-auto">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-1 md:p-4 text-xs md:text-sm font-semibold text-gray-600">
                  Product Name
                </th>
                <th className="text-center p-1 md:p-4 text-xs md:text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="text-center p-1 md:p-4 text-xs md:text-sm font-semibold text-gray-600">
                  Quantity
                </th>
                <th className="text-center p-1 md:p-4 text-xs md:text-sm font-semibold text-gray-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id + product.selectedSize}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-1 md:p-4 flex flex-col md:flex-row items-start md:items-center justify-start space-x-0 md:space-x-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 md:w-16 md:h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-xs md:text-sm font-medium">{product.title}</p>
                        <p className="text-xs md:text-sm text-gray-500">
                          Size: {product.selectedSize}
                        </p>{" "}
                        {/* Display selected size */}
                        <div>
                          <button
                          onClick={() =>
                            handleRemoveProduct(
                              product._id,
                              product.selectedSize
                            )
                          }
                          className="text-xs md:text-sm text-red-500 mt-1 hover:underline"
                        >
                          <FaTrash />
                        </button>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-1 md:p-4 text-xs md:text-sm font-semibold">
                      {product.salePrice?.toFixed(2)} ট
                    </td>
                    <td className="text-center p-1 md:p-4">
                      <div className="inline-flex items-center border rounded">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product._id,
                              product.selectedSize,
                              "decrease"
                            )
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={product.quantity === 1}
                        >
                          -
                        </button>
                        <span className="px-2 md:px-4">{product.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product._id,
                              product.selectedSize,
                              "increase"
                            )
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center p-1 md:p-4 text-xs md:text-sm font-bold">
                      ট{(product.salePrice * product.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-4 text-sm text-gray-500"
                  >
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-right">
        <button
          onClick={handleClearCart}
          className="mt-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-500"
        >
          Clear Cart
        </button>
      </div>
      {/* Right section: Checkout and shipping details */}
      <div className="p-4 w-full mx-auto">
        <Checkout />
      </div>
    </div>
  );
};

export default Cart;
