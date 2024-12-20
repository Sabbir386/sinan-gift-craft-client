import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const products = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalPrice);
  console.log('products',products)

  // checkOut functinality 
  // const [createOrder, { isLoading, isSuccess, isError }] = useCreateOrderMutation();

  // const handleCreateOrder = async () => {
  //   const orderData = {
  //     userInfo: {
  //       firstName: "John",
  //       lastName: "Doe",
  //       city: "New York",
  //       country: "USA",
  //       address: "123 Elm Street",
  //       email: "john.doe@example.com",
  //       phone: "1234567890",
  //     },
  //     items: [
  //       { productId: "64ab2f3e1234567890abcdef", quantity: 2, price: 50.99 },
  //       { productId: "64ab2f3e1234567890abcdee", quantity: 1, price: 30.5 },
  //     ],
  //     totalAmount: 132.48,
  //     status: "Pending",
  //   };

  //   try {
  //     const response = await createOrder(orderData).unwrap();
  //     console.log("Order created:", response);
  //   } catch (error) {
  //     console.error("Failed to create order:", error);
  //   }
  // };

  // return (
  //   <div>
  //     <button onClick={handleCreateOrder} disabled={isLoading}>
  //       {isLoading ? "Creating Order..." : "Create Order"}
  //     </button>
  //     {isSuccess && <p>Order created successfully!</p>}
  //     {isError && <p>Failed to create order. Please try again.</p>}
  //   </div>
  // );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 mx-auto w-full max-w-7xl">
      {/* left section  */}
      <div className="p-4 w-full mx-auto">
        <h2 className="text-xl font-bold mb-6">Billing details</h2>
        <form className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
              />
            </div>
          </div>

          {/* Country/Region */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country/Region<span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            >
              <option value="">---</option>
              {/* Add country options here */}
            </select>
          </div>

          {/* Town/City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Town/City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
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
              Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
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
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
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
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
          </div>

          {/* Order Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Order notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              className="mt-1 block w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          {/* <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 text-sm font-medium rounded hover:bg-gray-800"
            >
              Submit
            </button>
          </div> */}
        </form>
      </div>
      {/* right section  */}
      <div className="p-4 w-full mx-auto">
      <h2 className="text-xl font-bold mb-4">Your order</h2>
      <div className="space-y-4">
        {/* Product Items */}
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
                <p className="text-sm text-gray-500">{product.quantity}</p>
              </div>
            </div>
            <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Total and Discount */}
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Total</p>
          <p className="text-lg font-bold">
            ${subtotal.toFixed(2)}
          </p>
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Discount code"
            className="flex-1 px-4 py-2 border rounded-l text-sm focus:outline-none"
          />
          <button className="px-4 py-2 bg-black text-white text-sm rounded-r">
            Apply
          </button>
        </div>
      </div>

      {/* Payment Options */}
      <div className="border-t mt-4 pt-4">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="direct-bank"
            name="payment"
            className="mr-2"
            checked
            readOnly
          />
          <label htmlFor="direct-bank" className="text-sm">
            Direct bank transfer
          </label>
        </div>
        <div className="flex items-center">
          <input type="radio" id="cash" name="payment" className="mr-2" />
          <label htmlFor="cash" className="text-sm">
            Cash on delivery
          </label>
        </div>
      </div>

      {/* Terms & Place Order */}
      <div className="border-t mt-4 pt-4 space-y-4">
        <div className="flex items-start space-x-2">
          <input type="checkbox" id="terms" className="mt-1" />
          <label htmlFor="terms" className="text-sm">
            I have read and agree to the website{" "}
            <a href="#" className="text-blue-500 underline">
              terms and conditions
            </a>
            .
          </label>
        </div>
        <Link to="/my-account" className="w-full block text-center bg-black text-white py-2 text-sm rounded">
          Place order
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Checkout;
