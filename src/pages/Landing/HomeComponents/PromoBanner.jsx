import React from 'react';
import { FaTruck, FaMoneyBillAlt, FaHeadset } from 'react-icons/fa';

const PromoBanner = () => {
  return (
    <div className="max-w-7xl mx-auto py-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="px-6 py-1">
            <div className="flex justify-center mb-2">
              <FaTruck className="text-4xl text-blue-500" />
            </div>
            <h3 className="font-bold mb-2 text-sm">FREE SHIPPING & RETURN</h3>
            <p className="text-gray-600 text-xs">Free shipping on all orders over $99.</p>
          </div>
          <div className="px-6 py-1">
            <div className="flex justify-center mb-2">
              <FaMoneyBillAlt className="text-4xl text-green-500" />
            </div>
            <h3 className="font-bold mb-2 text-sm">MONEY BACK GUARANTEE</h3>
            <p className="text-gray-600 text-xs">100% money back guarantee</p>
          </div>
          <div className="px-6 py-1">
            <div className="flex justify-center mb-2">
              <FaHeadset className="text-4xl text-purple-500" />
            </div>
            <h3 className="font-bold mb-2 text-sm">ONLINE SUPPORT 24/7</h3>
            <p className="text-gray-600 text-xs">we have your back anytime</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;