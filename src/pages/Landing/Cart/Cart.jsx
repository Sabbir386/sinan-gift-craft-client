import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Oversized Printed T-shirt",
      size: "White / M",
      price: 18.0,
      quantity: 1,
      img: "https://i.ibb.co.com/frMddxX/image-178.png",
    },
    {
      id: 2,
      name: "Ribbed Tank Top",
      size: "Orange / S",
      price: 18.0,
      quantity: 1,
      img: "https://i.ibb.co.com/n8ts3g7/image-179.png",
    },
    {
      id: 3,
      name: "Regular Fit Oxford Shirt",
      size: "Black / L",
      price: 18.0,
      quantity: 1,
      img: "https://i.ibb.co.com/7rM0q9f/image-180.png",
    },
  ]);

  const handleQuantityChange = (id, action) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity:
                action === "increase"
                  ? product.quantity + 1
                  : product.quantity > 1
                  ? product.quantity - 1
                  : product.quantity,
            }
          : product
      )
    );
  };
  const [giftWrap, setGiftWrap] = useState(false);

  const subtotal = 18.0; // Example subtotal
  const shippingThreshold = 75.0; // Free shipping threshold
  const amountToFreeShipping = Math.max(shippingThreshold - subtotal, 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 mx-auto w-full max-w-7xl">
      {/* left section  */}
      <div className="p-4 w-full mx-auto">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Product
                </th>
                <th className="text-center p-4 text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="text-center p-4 text-sm font-semibold text-gray-600">
                  Quantity
                </th>
                <th className="text-center p-4 text-sm font-semibold text-gray-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {/* Product Column */}
                  <td className="p-4 flex items-center space-x-4">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.size}</p>
                      <button className="text-sm text-red-500 mt-1 hover:underline">
                        Remove
                      </button>
                    </div>
                  </td>
                  {/* Price Column */}
                  <td className="text-center p-4 text-sm font-semibold">
                    ${product.price.toFixed(2)}
                  </td>
                  {/* Quantity Column */}
                  <td className="text-center p-4">
                    <div className="inline-flex items-center border rounded">
                      <button
                        onClick={() =>
                          handleQuantityChange(product.id, "decrease")
                        }
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4">{product.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(product.id, "increase")
                        }
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  {/* Total Column */}
                  <td className="text-center p-4 text-sm font-bold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* right section  */}
      <div className="p-4 w-full mx-auto">
        {/* Free Shipping Progress */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Buy ${amountToFreeShipping.toFixed(2)} more to enjoy
            </span>
            <span className="text-sm font-medium text-gray-600">
              Free Shipping
            </span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
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
              <h2 className="text-sm font-semibold text-gray-800">
                Estimate Shipping
              </h2>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                +
              </button>
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
              <span className="text-sm text-gray-600">
                Do you want a gift wrap? Only $5.00
              </span>
            </label>
          </div>

          {/* Subtotal */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Subtotal
              </span>
              <span className="text-lg font-bold text-gray-800">
                ${(subtotal + (giftWrap ? 5.0 : 0)).toFixed(2)} USD
              </span>
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
        </div>
      </div>
    </div>
  );
};

export default Cart;
