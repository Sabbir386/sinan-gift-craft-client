import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "./loginApi";
import Swal from "sweetalert2";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/features/hooks";

const ConfirmReset = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [resetPassword, { isLoading, isError, isSuccess, error: apiError }] =
    useResetPasswordMutation();

  // Retrieve specific query parameters
  const email = queryParams.get("email"); // replace "paramName" with the actual query key
  const token = queryParams.get("token"); // replace "paramName" with the actual query key

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword && e.target.value !== newPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword({
        token,
        email,
        newPassword,
      }).unwrap();

      if (response) {
        Swal.fire({
          title: "Success!",
          text: "Password reset successfully. You can now log in with your new password.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Navigate to the login page after the user acknowledges the success message
          dispatch(logOut());
          navigate("/login");
        });
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      Swal.fire({
        title: "Error",
        text: "An error occurred while resetting your password. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-full h-screen grid place-items-center justify-center p-5">
      <div>
        <h3 className="text-base text-slate-400">
          Please confirm your email address to reset your password within 10
          minutes
        </h3>

        {/* New Password Field */}
        <div className="mb-4 relative">
          <label className="block text-buttonBackground text-sm font-medium mb-1">
            New Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="*********"
            value={newPassword}
            onChange={handlePasswordChange}
          />
          <span
            className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4 relative">
          <label className="block text-buttonBackground text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className={`w-full px-4 py-3 pr-10 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:border-blue-500`}
            placeholder="*********"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <span
            className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Reset Password Button */}
        <button
          className="inline-block bg-buttonBackground py-2 px-4 text-white rounded mt-2"
          disabled={error || !newPassword || !confirmPassword || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>

        {/* Success/Error Message */}
        {isSuccess && (
          <p className="text-green-500 mt-2">Password reset successful!</p>
        )}
        {isError && (
          <p className="text-red-500 mt-2">
            {apiError?.message || "Error resetting password"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmReset;
