import React, { useState } from "react";

const EthereumCryptoModal = ({ onClose, onSubmit }) => {
  const [ethereumAddress, setEthereumAddress] = useState("");
  const [amountUSD, setAmountUSD] = useState(0);
  const ETH_RATE = 1800.45; // Example ETH rate
  const MIN_WITHDRAWAL = 5;
  const FEE = 2.0; // Example fee for Ethereum
  const BONUS = 0;

  const calculateETH = () => {
    if (amountUSD < MIN_WITHDRAWAL) return 0;
    return ((amountUSD - FEE) / ETH_RATE).toFixed(8);
  };

  const handleWithdraw = () => {
    const data = {
      ethereumAddress,
      amountUSD,
      ethAmount: calculateETH(),
    };

    onSubmit(data); // Pass the data to the parent
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <span className="text-white text-xl">Ξ</span>
            </div>
            <h2 className="text-xl font-semibold">Ethereum</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Notice Section */}
        <div className="bg-blue-600 text-sm rounded-md p-3 mb-6">
          Crypto withdrawals take a few minutes to be sent. New users have to
          earn $2.00 to make their first withdrawal.
        </div>

        {/* Ethereum Address Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Ethereum Address
          </label>
          <input
            type="text"
            value={ethereumAddress}
            onChange={(e) => setEthereumAddress(e.target.value)}
            placeholder="Enter Ethereum Address..."
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <small className="text-gray-400">
            The Ethereum Address for your Ethereum Wallet.
          </small>
        </div>

        {/* Amount in USD Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Amount in USD
          </label>
          <div className="relative">
            <input
              type="number"
              value={amountUSD}
              onChange={(e) => setAmountUSD(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setAmountUSD(100)} // Set to max amount
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 px-3 py-1 rounded-md text-sm font-medium text-white"
            >
              Max amount
            </button>
          </div>
          <small className="text-gray-400">Minimum $5.00</small>
        </div>

        {/* ETH Rate and Fee Section */}
        <div className="flex items-center justify-between mb-6">
          <p>
            <span className="text-gray-400">ETH rate:</span>{" "}
            <span className="text-white font-semibold">{ETH_RATE}</span>
          </p>
          <p>
            <span className="text-gray-400">Withdrawal Fee:</span>{" "}
            <span className="text-green-500 font-semibold">${FEE}</span>
          </p>
        </div>

        {/* You'll Receive Section */}
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold">
            You’ll receive (ETH):{" "}
            <span className="text-green-400">{calculateETH()}</span>
          </p>
        </div>

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          disabled={!ethereumAddress || amountUSD < MIN_WITHDRAWAL}
          className={`w-full py-3 rounded-md text-lg font-semibold ${
            ethereumAddress && amountUSD >= MIN_WITHDRAWAL
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default EthereumCryptoModal;
