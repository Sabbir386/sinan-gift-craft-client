import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart, updateQuantity } from "../../../redux/features/cart/cartSlice"; 

const Cart = () => {
  const dispatch = useDispatch();
  
  // Get cart items and subtotal from Redux store
  const products = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalPrice);
  
  const [giftWrap, setGiftWrap] = useState(false);
  const shippingThreshold = 75.0; // Free shipping threshold
  const amountToFreeShipping = Math.max(shippingThreshold - subtotal, 0);

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = (id, action) => {
    const product = products.find((item) => item.id === id);
    if (product) {
      const newQuantity =
        action === "increase" ? product.quantity + 1 : Math.max(product.quantity - 1, 1);
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  // Handle product removal from cart
  const handleRemoveProduct = (id) => {
    dispatch(removeFromCart({ id }));
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
  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

  // Calculate the total price of items (without gift wrap)
  const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // Optional: Add a discount amount if required
  const discountAmount = 0;  // Replace with actual discount logic if needed

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 mx-auto w-full max-w-7xl">
  {/* Left section: Cart items */}
  <div className="p-4 w-full mx-auto">
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left p-4 text-sm font-semibold text-gray-600">Product</th>
            <th className="text-center p-4 text-sm font-semibold text-gray-600">Price</th>
            <th className="text-center p-4 text-sm font-semibold text-gray-600">Quantity</th>
            <th className="text-center p-4 text-sm font-semibold text-gray-600">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="p-4 flex items-center space-x-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <p className="text-sm font-medium">{product.title}</p>
                  <p className="text-sm text-gray-500">{product.size}</p>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="text-sm text-red-500 mt-1 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </td>
              <td className="text-center p-4 text-sm font-semibold">${product.price?.toFixed(2)}</td>
              <td className="text-center p-4">
                <div className="inline-flex items-center border rounded">
                  <button
                    onClick={() => handleQuantityChange(product.id, "decrease")}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={product.quantity === 1}
                  >
                    -
                  </button>
                  <span className="px-4">{product.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, "increase")}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="text-center p-4 text-sm font-bold">${(product.price * product.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Right section: Checkout and shipping details */}
  <div className="p-4 w-full mx-auto">
    {/* Free Shipping Progress */}
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm font-medium text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
      Buy ${amountToFreeShipping.toFixed(2)} more to enjoy Free Shipping
    </span>
    <span className="text-sm font-medium text-gray-600">Free Shipping</span>
  </div>
  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="absolute top-0 left-0 h-2 bg-red-500 rounded-full"
      style={{
        width: `${(subtotal / shippingThreshold) * 100}%`,
      }}
    ></div>
  </div>
</div>


    {/* Estimate Shipping and Checkout */}
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">Estimate Shipping</h2>
          <button className="text-sm text-gray-500 hover:text-gray-700">+</button>
        </div>
      </div>

      {/* Gift Wrap Option */}
      <div className="mb-4">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            checked={giftWrap}
            onChange={() => setGiftWrap(!giftWrap)}
            className="text-red-500 focus:ring-red-500"
          />
          <span className="text-sm text-gray-600">Do you want a gift wrap? Only $5.00</span>
        </label>
      </div>

      {/* Subtotal */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Subtotal</span>
          <span className="text-lg font-bold text-gray-800">${getTotalPrice()} USD</span>
        </div>
        <p className="text-sm text-gray-500">
          Taxes and{" "}
          <a href="#" className="text-blue-500 underline">
            shipping
          </a>{" "}
          calculated at checkout
        </p>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="text-red-500 focus:ring-red-500"
          />
          <span className="text-sm text-gray-600">
            I agree with the{" "}
            <a href="#" className="text-blue-500 underline">
              terms and conditions
            </a>
          </span>
        </label>
      </div>

      {/* Checkout Button */}
      <Link
        to="/checkout"
        className="w-full block text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Check out
      </Link>
      {/* Cart Summary */}
  <div className="cart-summary mt-6 p-4 bg-gray-100 rounded">
    <h2 className="text-xl font-bold">Summary</h2>
    <p className="text-gray-700">Total Items: {totalQuantity}</p>
    <p className="text-gray-700">Total Price: ${totalPrice.toFixed(2)}</p>
    
    {/* Display Subtotal and Amount */}
    <p className="text-gray-700">
      Subtotal: ${(totalPrice - discountAmount).toFixed(2)}
    </p>
    
    <button
      onClick={handleClearCart}
      className="mt-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-500"
    >
      Clear Cart
    </button>
  </div>
    </div>
    
  </div>

  
</div>

  );
};

export default Cart;
