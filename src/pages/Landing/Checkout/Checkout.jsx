import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCreateOrderMutation } from "../OrderApi/orderApi";
import { clearCart } from "../../../redux/features/cart/cartSlice";
import { useRegistrationMutation } from "../../../redux/features/auth/authApi";
import Swal from "sweetalert2";

const Checkout = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalPrice);
  const [registration] = useRegistrationMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    email: "",
    phone: "",
  });
  const [uniqueEmail, setUniqueEmail] = useState("");

  const [createOrder, { isLoading, isSuccess, isError }] =
    useCreateOrderMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const generateUniqueEmail = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit random number
    return `sinanUser${randomNumber}@gmail.com`;
  };
  useEffect(() => {
    setUniqueEmail(generateUniqueEmail());
  }, []);
  const handleCreateOrder = async () => {
    // Set the email to formData.email if available, else use uniqueEmail
    const userEmail = formData.email || uniqueEmail;
    const orderData = {
      userInfo: {
        ...formData,
        email: userEmail,
      },
      items: products.map((product) => ({
        productId: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.salePrice,
        size: parseInt(product.selectedSize),
      })),
      totalAmount: subtotal,
      status: "Pending",
    };
    console.log(orderData);
    const normalUser = {
      password: "user12345",
      normalUser: {
        name: formData?.firstName,
        email: userEmail,
        country: "Bangladesh",
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
      Swal.fire({
        title: "Signing in...",
        text: "Please wait a moment while we take your order...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      if (!userEmail) {
        return;
      }
      const user = await registration(normalUser);
      const response = await createOrder(orderData).unwrap();

      if (response.statusCode === 201) {
        handleClearCart();
        Swal.fire({
          icon: "success",
          title: "অর্ডার সম্পন্য হয়েছে!",
          html: `
            <p>আপনার অর্ডার সম্পন্য হয়েছে.</p>
            <p>You can log in to your account to track your order status:</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Password:</strong> user12345</p>
          `,
          confirmButtonText: "Close",
        });
      }

      if (user?.error?.status === 409) {
        const errorMessage =
          user?.error?.data?.errorSources[0]?.message || "Conflict error.";
        Swal.fire({
          icon: "error",
          title: "Conflict Error",
          text: errorMessage,
        });
        return;
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      Swal.fire({
        icon: "error",
        title: "Order Creation Failed",
        text: "An error occurred while creating your order. Please try again later.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 mx-auto w-full max-w-7xl">
      {/* Left Section */}
      <div className="p-4 w-full mx-auto">
        <h3 className="text-base font-bold text-red-400 mb-2">অর্ডার টি সম্পূর্ন করতে আপনার নাম, ঠিকানা নিচে লিখুনঃ-</h3>
        <h2 className="text-xl font-bold mb-6">বিলিংয়ের বিবরণ</h2>
        <form className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
               নাম<span className="text-red-500">*</span>
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
            {/* <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
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
            </div> */}
          </div>

          {/* Town/City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              থানা/উপজেলা<span className="text-red-500">*</span>
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
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              পূর্ণ ঠিকানা<span className="text-red-500">*</span>
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
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
            মোবাইল নাম্বার<span className="text-red-500">*</span>
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              ইমেইল *(Optional)
              {/* <span className="text-red-500">*</span> */}
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
        <h2 className="text-xl font-bold mb-4">আপনার অর্ডার</h2>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img
                  src={product?.images[0]}
                  alt={product.name}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="text-sm font-medium">{product.title}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {product.quantity}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium">
                {(product.salePrice * product.quantity).toFixed(2)} ট
              </p>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Total</p>
            <p className="text-lg font-bold">ট {subtotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="border-t mt-4 pt-4 space-y-4">
          <button
            onClick={handleCreateOrder}
            disabled={isLoading}
            className="w-full bg-black text-white py-2 text-sm font-medium rounded hover:bg-gray-800"
          >
            {isLoading ? "অর্ডার তৈরি হচ্ছে..." : "অর্ডার দিন"}
          </button>
          {isSuccess && (
            <p className="text-green-500">Order created successfully!</p>
          )}
          {isError && (
            <p className="text-red-500">
              Failed to create order. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
