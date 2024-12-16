import React, { useState } from "react";

const Affiliate = () => {
  const [referralLink, setReferralLink] = useState(
    "http://localhost:5173/register?refId=CZ47382"
  );
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center text-white">
          <div className="rounded-full bg-orange-500 h-16 w-16 flex items-center justify-center text-3xl font-bold">
            M
          </div>
          <h3 className="mt-4 text-xl font-semibold">Muhaiminur</h3>
          <div className="mt-2 text-sm flex items-center">
            <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
            <p>Tier 1</p>
          </div>
          <div className="text-green-300 mt-1">5% Commission</div>
          <div className="flex mt-4">
            <p className="text-lg font-bold">$0.00</p>
            <button className="bg-green-500 hover:bg-green-600 text-white rounded-md ml-2 px-4 py-1">
              Claim
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-800 p-4 rounded-lg text-white">
          <h3 className="font-semibold text-lg mb-2">Statistics</h3>
          <div className="flex justify-between items-center mb-4">
            <p>Total Earnings</p>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Users Referred</p>
            <p>0</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p>Earnings Last 30 Days</p>
            <p>$0.00</p>
          </div>
        </div>
      </div>
      {/* Referral */}
      <div className="bg-gray-800 p-4 rounded-lg text-white mt-4">
        <h3 className="font-semibold text-lg mb-2">Your Referral Link</h3>
        <div className="flex items-center justify-between">
          <p>{referralLink}</p>
          <button
            onClick={copyToClipboard}
            className="bg-gray-700 hover:bg-gray-600 text-white rounded-md px-2 py-1"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="mt-4 flex justify-evenly">
          {/* Social Icons */}
          <a href="#" className="bg-gray-700 p-2 rounded-full">
            🌐
          </a>
          <a href="#" className="bg-gray-700 p-2 rounded-full">
            💬
          </a>
          <a href="#" className="bg-gray-700 p-2 rounded-full">
            🐦
          </a>
          <a href="#" className="bg-gray-700 p-2 rounded-full">
            📨
          </a>
        </div>
      </div>

      {/* Tiers Section */}
      <div className="bg-gray-800 p-6 mt-6 rounded-lg hidden">
        {/* <div className="flex flex-wrap gap-2 justify-start text-white">
          <button className="px-4 py-2 bg-green-500 rounded-lg">Tiers</button>
          <button className="px-4 py-2 bg-gray-700 rounded-lg">
            Affiliates
          </button>
          <button className="px-4 py-2 bg-gray-700 rounded-lg">
            Leaderboard
          </button>
          <button className="px-4 py-2 bg-gray-700 rounded-lg">Earnings</button>
        </div> */}

        <div className="mt-6 text-white">
          {/* <h3 className="text-lg font-semibold mb-4">
            Reach the next Tier to earn a higher commission from your
            affiliates.
          </h3> */}

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tier 1 */}
            {/* <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-lg">Tier 1</h4>
                <span className="bg-green-500 px-2 py-1 rounded-md text-sm">
                  5% Commission
                </span>
              </div>
              <p className="text-sm text-gray-400">Requirements:</p>
              <p className="text-white">$0.00 affiliate earnings</p>
            </div> */}

            {/* Tier 2 */}
            {/* <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-lg">Tier 2</h4>
                <span className="bg-green-500 px-2 py-1 rounded-md text-sm">
                  6% Commission
                </span>
              </div>
              <p className="text-sm text-gray-400">Requirements:</p>
              <p className="text-white">$10.00 affiliate earnings</p>
            </div> */}

            {/* Tier 3 */}
            {/* <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-lg">Tier 3</h4>
                <span className="bg-green-500 px-2 py-1 rounded-md text-sm">
                  7% Commission
                </span>
              </div>
              <p className="text-sm text-gray-400">Requirements:</p>
              <p className="text-white">$25.00 affiliate earnings</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
