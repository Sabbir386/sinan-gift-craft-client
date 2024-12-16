import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Swal from "sweetalert2";
import { useCreateWithdrawalMutation } from "../Withdrawl/withDrawalApi";
import { useSingleNormalUserQuery } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";

const PaypalBox = () => {
  const location = useLocation();
  const { selectedAmount, method } = location.state || {};
  const [paypalEmail, setPaypalEmail] = useState("");
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
    // console.log(user);
  }
  // Mutation hook for the createWithdrawal API
  const [createWithdrawal, { isLoading }] = useCreateWithdrawalMutation();
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useSingleNormalUserQuery(user?.objectId);
  console.log(userData?.data);
  // Handle form submission
  const handleWithdraw = async (e) => {
    e.preventDefault();

    // Sample backend structure
    const requestBody = {
      userId: userData?.data?._id,
      userName: userData?.data?.name,
      userRegisterId: userData?.data?.id,
      userEmail: userData?.data?.email,
      profileImg: userData?.data?.profileImg,
      paypalEmail: paypalEmail,
      btcAddress: "",
      networkType: "paypal",
      description: `Withdrawal request for ${method} payout`,
      method: "paypal",
      amount: selectedAmount,
      transactionId: "TXN123456789",
      invoiceId: "",
      country: userData?.data?.country,
      status: "pending",
      timestamps: {
        requestedAt: new Date(),
        processedAt: null,
      },
    };
    console.log(requestBody);
    try {
      // Send the withdrawal request
      await createWithdrawal(requestBody).unwrap();
      Swal.fire(
        "Success",
        "Your withdrawal request has been submitted.stay Tuned ! you will got notified within 24 hours.",
        "success"
      );
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to submit withdrawal request. Please try again.",
        "error"
      );
    }
  };

  return (
    <form
      className="w-full md:w-1/2 mb-4 bg-secondaryColor p-6 rounded-lg"
      onSubmit={handleWithdraw}
    >
      <div className="mb-4">
        <label className="block text-buttonBackground text-sm font-medium mb-1">
          {method} Address for withdrawal of ${selectedAmount}
        </label>
        <input
          type="email"
          value={paypalEmail}
          onChange={(e) => setPaypalEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="Enter your PayPal account email"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-buttonBackground text-white border rounded-md mt-6 px-8 py-2"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Withdraw"}
      </button>
    </form>
  );
};

export default PaypalBox;
