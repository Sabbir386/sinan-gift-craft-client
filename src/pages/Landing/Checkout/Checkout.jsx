import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useCreateOrderMutation } from "../OrderApi/orderApi";
import { clearCart } from "../../../redux/features/cart/cartSlice";
import { useRegistrationMutation } from "../../../redux/features/auth/authApi";

const Checkout = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalPrice);
  const [registration] = useRegistrationMutation();
  console.log(products)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    address: "",
    email: "",
    phone: "",
  });

  const [createOrder, { isLoading, isSuccess, isError }] = useCreateOrderMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleClearCart = () => {
    dispatch(clearCart()); // Assumes `clearCart` is an action in your Redux store
  };
  const handleCreateOrder = async () => {
    const orderData = {
      userInfo: formData,
      items: products.map((product) => ({
        productId:(product.id).toString(),
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: subtotal,
      status: "Pending",
    };
    const normalUser = {
      password: "user12345",
      normalUser: {
        name: formData?.firstName,
        email: formData?.email,
        // ip: ip,
        // country: country,
        designation: "Client",
        username: "sharukh Khan",
        gender: "male",
        dateOfBirth: "1985-07-15",
        contactNo: "9876543210",
        emergencyContactNo: "1234567890",
        bloodGroup: "A+",
        presentAddress: "456 Elm Street, Cityville, Country",
        permanentAddress: "789 Maple Avenue, Townsville, Country",
        profileImg: "profile_picture.jpg",
        isDeleted: false,
      },
    };
    try {
      // console.log(object)
      const user = await registration(normalUser);
      const response = await createOrder(orderData).unwrap();
      console.log("Order created:", response);
      console.log(user);
      if (user?.error?.status == 409) {
        // Handle specific error messages
        const errorMessage =
          user?.error?.data?.errorSources[0]?.message || "Conflict error.";
        toast.error(errorMessage, {
          id: toastId,
          duration: 2000,
        });
        console.error("Error:", errorMessage);
        return; // Exit the function here to avoid further processing
      }
      if (response.statusCode === 201) {
        console.log("Order created successfully:", response.message);
        
        // Clear the cart after successful order creation
        handleClearCart();
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
    
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 mx-auto w-full max-w-7xl">
      {/* Left Section */}
      <div className="p-4 w-full mx-auto">
        <h2 className="text-xl font-bold mb-6">Billing details</h2>
        <form className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
              />
            </div>
          </div>

          {/* Country/Region */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country/Region<span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            >
              <option value="">---</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              {/* Add more country options */}
            </select>
          </div>

          {/* Town/City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              Town/City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="p-4 w-full mx-auto">
        <h2 className="text-xl font-bold mb-4">Your order</h2>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="text-sm font-medium">{product.title}</p>
                  <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Total</p>
            <p className="text-lg font-bold">${subtotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="border-t mt-4 pt-4 space-y-4">
          <button
            onClick={handleCreateOrder}
            disabled={isLoading}
            className="w-full bg-black text-white py-2 text-sm font-medium rounded hover:bg-gray-800"
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
          {isSuccess && <p className="text-green-500">Order created successfully!</p>}
          {isError && <p className="text-red-500">Failed to create order. Please try again.</p>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
