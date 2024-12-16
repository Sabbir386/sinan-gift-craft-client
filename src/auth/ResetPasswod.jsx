import React from "react";
import { Link } from "react-router-dom";

const ResetPasswod = () => {
  return (
    <div className="bg-secondaryColor h-screen w-full flex flex-col justify-center items-center p-5">
      <p className="text-white">
        A link with password reset link has been sent to your email
      </p>
      <h3 className="text-base text-slate-400">
        Please confirm your email address to reset your password within 10
        minutes
      </h3>
      <p className="mt-3">
        <Link to={"/login"} className="inline-block text-buttonBackground">
          Back to Login
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswod;
