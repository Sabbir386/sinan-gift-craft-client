import React, { useState } from 'react';

const CardInput = () => {
  const [cardType, setCardType] = useState('');

  const detectCardType = (number) => {
    const visaRegex = /^4/;
    const masterCardRegex = /^5[1-5]/;
    const amexRegex = /^3[47]/;

    if (visaRegex.test(number)) {
      return 'visa';
    } else if (masterCardRegex.test(number)) {
      return 'mastercard';
    } else if (amexRegex.test(number)) {
      return 'amex';
    } else {
      return '';
    }
  };

  const handleCardNumberChange = (e) => {
    const cardNumber = e.target.value;
    setCardType(detectCardType(cardNumber));
  };

  const cardIcons = {
    visa: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
    mastercard: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
    amex: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg',
  };

  return (
    <div className="max-w-lg mx-auto  p-6 rounded-lg">
      {/* Card Number */}
      <div className="mb-4">
        <label className="block text-buttonBackground text-sm font-medium mb-1">Card number</label>
        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 p-3">
          <input
            type="text"
            onChange={handleCardNumberChange}
            className="w-full bg-transparent outline-none text-gray-600"
            placeholder="Enter your card number"
          />
          {cardType && (
            <img
              src={cardIcons[cardType]}
              alt={cardType}
              className="h-6 ml-2"
            />
          )}
        </div>
      </div>

      {/* Expiry and CVC */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-buttonBackground text-sm font-medium mb-1">Expiry</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="MM / YY"
          />
        </div>
        <div className="flex-1">
          <label className="block text-buttonBackground text-sm font-medium mb-1">CVC</label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="CVC"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">🔒</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInput;
