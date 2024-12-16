import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
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
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.ibb.co.com/frMddxX/image-178.png" // Replace with actual image URL
                alt="Ribbed modal T-shirt"
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="text-sm font-medium">Ribbed modal T-shirt</p>
                <p className="text-sm text-gray-500">Brown / M</p>
              </div>
            </div>
            <p className="text-sm font-medium">$25.00</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.ibb.co.com/n8ts3g7/image-179.png" // Replace with actual image URL
                alt="Vanilla White"
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="text-sm font-medium">Vanilla White</p>
                <p className="text-sm text-gray-500"></p>
              </div>
            </div>
            <p className="text-sm font-medium">$35.00</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.ibb.co.com/7rM0q9f/image-180.png" // Replace with actual image URL
                alt="Cotton jersey top"
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="text-sm font-medium">Cotton jersey top</p>
                <p className="text-sm text-gray-500">Beige / S</p>
              </div>
            </div>
            <p className="text-sm font-medium">$8.00</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.ibb.co.com/nsvL20H/product-one.png" // Replace with actual image URL
                alt="Ribbed Tank Top"
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="text-sm font-medium">Ribbed Tank Top</p>
                <p className="text-sm text-gray-500">Orange / S</p>
              </div>
            </div>
            <p className="text-sm font-medium">$54.00</p>
          </div>
        </div>

        {/* Total and Discount */}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Total</p>
            <p className="text-lg font-bold">$122.00</p>
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
          <Link to={'/my-account'} className="w-full block text-center bg-black text-white py-2 text-sm rounded">
            Place order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
