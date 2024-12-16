import React from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid items-center justify-center">
      <div className="text-center">
        <div className="text-buttonBackground font-bold text-2xl flex gap-2">
          <HiOutlineCurrencyDollar />
          <span>CASHOOZ</span> <HiOutlineCurrencyDollar />
        </div>
        <div className="animate-spin mx-auto rounded-full h-8 w-8 border-t-4 border-b-4 border-buttonBackground"></div>
      </div>
    </div>
  );
};

export default Loader;
