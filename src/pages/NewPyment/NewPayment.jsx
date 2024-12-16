import React, { useState } from 'react';
import CardInput from './CardInput';
import { FaCcPaypal, FaPaypal } from 'react-icons/fa';
import { BsBank2 } from 'react-icons/bs';

const NewPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="max-w-lg mx-auto bg-secondaryColor p-6 rounded-lg shadow-md">
      {/* Country or Region */}
      <div className="mb-4">
        <label className="block text-buttonBackground text-sm font-medium mb-1">Country or region</label>
        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500">
          <option>United States</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Address Line 1 */}
      <div className="mb-6">
        <label className="block text-buttonBackground text-sm font-medium mb-1">Address line 1</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="210 Townsend st."
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h3 className="block text-buttonBackground text-sm font-medium mb-1">Payment Methods</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 py-3 border ${paymentMethod === 'card' ? 'border-buttonBackground text-buttonBackground' : 'border-gray-300 text-white'} rounded-lg flex items-center justify-center focus:outline-none`}
          >
            <span className="mr-2">💳</span> Card
          </button>
          <button
            onClick={() => setPaymentMethod('googlePay')}
            className={`flex-1 py-3 border ${paymentMethod === 'googlePay' ? 'border-buttonBackground text-buttonBackground' : 'border-gray-300 text-white'} rounded-lg flex items-center justify-center focus:outline-none`}
          >
            <FaPaypal />
             Paypal
          </button>
          <button
            onClick={() => setPaymentMethod('bank')}
            className={`flex-1 py-3 border ${paymentMethod === 'bank' ? 'border-buttonBackground text-buttonBackground' : 'border-gray-300 text-white'} rounded-lg flex items-center justify-center focus:outline-none`}
          >
            <BsBank2 />
            Bank
          </button>
        </div>
      </div>

      {/* Conditionally Render Payment Fields Based on Selection */}
      {paymentMethod === 'card' && (
        <CardInput></CardInput>
      )}

      {paymentMethod === 'googlePay' && (
        <div className="mb-4">
            <div className="mb-4">
            <label className="block text-buttonBackground text-sm font-medium mb-1">Paypal Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your paypal account email"
            />
          </div>
          <p className="text-buttonBackground text-sm">
            To complete your payment with Paypal, click "Save" below. You will be redirected to Google Pay to authorize the transaction.
          </p>
        </div>
      )}

      {paymentMethod === 'bank' && (
        <div>
          {/* Bank Account Number */}
          <div className="mb-4">
            <label className="block text-buttonBackground text-sm font-medium mb-1">Account Number</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your bank account number"
            />
          </div>

          {/* Routing Number */}
          <div className="mb-4">
            <label className="block text-buttonBackground text-sm font-medium mb-1">Routing Number</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your routing number"
            />
          </div>
          {/* Addtional Details */}
          <div className="mb-4">
            <label className="block text-buttonBackground text-sm font-medium mb-1"> Addtional Details</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your addtional details"
            />
          </div>
        </div>
      )}

      {/* Checkbox */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          className="w-5 h-5 text-buttonBackground border-gray-300 rounded focus:outline-none focus:ring-buttonBackground checked:bg-buttonBackground checked:border-buttonBackground"
          id="billingSameAsShipping"
        />
        <label htmlFor="billingSameAsShipping" className="ml-2 text-white text-sm">
          Billing is same as shipping information
        </label>
      </div>

      {/* Information Text */}
      <p className="text-white text-sm mb-6">
        By providing your card information, you allow Name Shop to change your card for future payments in
        accordance with their terms.
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-lg focus:outline-none">Cancel</button>
        <button className="flex-1 py-3 bg-buttonBackground text-white rounded-lg focus:outline-none">Save</button>
      </div>
    </div>
  );
};

export default NewPayment;
