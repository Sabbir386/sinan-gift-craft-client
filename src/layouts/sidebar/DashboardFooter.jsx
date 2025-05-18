import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaInstagramSquare,
  FaPhoneAlt,
  FaTwitter,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Sinan from "../../assets/img/sinan.png";
import { IoMdMailUnread } from "react-icons/io";
import visa from "../../assets/img/visa.png";
import mastercard from "../../assets/img/mastercard.png";
import paypal from "../../assets/img/paypal.png";
import applepay from "../../assets/img/applepay.png";
import googlepay from "../../assets/img/googlepay.png";

const DashboardFooter = () => {
  return (
    <footer className="max-w-7xl mx-auto text-white py-10 px-6">
      <div className="mx-auto border-b-[1px] border-gray-200 py-5">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Logo Section */}
          <div className="w-full md:w-1/5 text-left md:text-left">
            <div className="flex items-center space-x-2 text-green-600 font-bold text-xl">
              <Link to={'/'}>সিনান গিফট কর্ণার</Link>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              আমাদের কাছে এমন পোশাক রয়েছে যা আপনার স্টাইলের সাথে মানানসই এবং
              আপনি গর্বের সাথে পরতে পারবেন। নারী থেকে পুরুষ পর্যন্ত।
            </p>
            <div className="flex gap-2 items-center text-headingColor mt-3 mb-2">
              <IoMdMailUnread />
              <span className="text-sm">geniusandro02@gmail.com</span>
            </div>
            <div className="flex gap-2 items-center text-headingColor mb-2">
              <FaPhoneAlt />
              <span className="text-sm">+8801740793454</span>
            </div>
          </div>
          {/* Company Section */}
          <div className="w-full md:w-4/5 grid grid-cols-2 md:grid-cols-4 ">
            <div className="text-left">
              <h2 className="text-sm text-headingColor font-semibold mb-4">
                কোম্পানি
              </h2>
              <ul className="space-y-2 text-sm flex flex-col text-gray-500">
                <Link to={"/"}>আমাদের সম্পর্কে</Link>
                <Link to={"/"}>বৈশিষ্ট্য</Link>
                <Link to={"/"}>কর্মপ্রক্রিয়া</Link>
                <Link to={"/"}>ক্যারিয়ার</Link>
              </ul>
            </div>
            <div className="text-left">
              <h2 className="text-sm text-headingColor font-semibold mb-4">
                সহায়তা
              </h2>
              <ul className="space-y-2 text-sm flex flex-col text-gray-500">
                <Link to={"/"}>গ্রাহক সহায়তা</Link>
                <Link to={"/"}>ডেলিভারি বিস্তারিত</Link>
                <Link to={"/"}>শর্তাবলী</Link>
                <Link to={"/"}>গোপনীয়তা নীতি</Link>
              </ul>
            </div>
            <div className="text-left">
              <h2 className="text-sm text-headingColor font-semibold mb-4">
                সাধারণ প্রশ্ন
              </h2>
              <ul className="space-y-2 text-sm flex flex-col text-gray-500">
                <Link to={"/"}>অ্যাকাউন্ট</Link>
                <Link to={"/"}>ডেলিভারি পরিচালনা</Link>
                <Link to={"/"}>অর্ডার</Link>
                <Link to={"/"}>পেমেন্ট</Link>
              </ul>
            </div>
            <div className="text-left">
              <h2 className="text-sm text-headingColor font-semibold mb-4">
                রিসোর্স
              </h2>
              <ul className="space-y-2 text-sm flex flex-col text-gray-500">
                <Link to={"/"}>রিসোর্স</Link>
                <Link to={"/"}>সেবা শর্তাবলী</Link>
                <Link to={"/"}>গোপনীয়তা</Link>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Social Icons */}
          <div className="flex space-x-2">
            <a
              href="https://www.facebook.com/GiftandCraft22"
              target="_blank"
              className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center"
            >
              <FaTwitter />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            <span className="p-1 rounded-xl shadow-sm w-16 h-10 text-center flex justify-center items-center">
              <img src={visa} alt="" />
            </span>
            <span className="p-1 rounded-xl shadow-sm w-16 h-10 text-center flex justify-center items-center">
              <img src={mastercard} alt="" />
            </span>
            <span className="p-1 rounded-xl shadow-sm w-16 h-10 text-center flex justify-center items-center">
              <img src={paypal} alt="" />
            </span>
            <span className="p-1 rounded-xl shadow-sm w-16 h-10 text-center flex justify-center items-center">
              <img src={applepay} alt="" />
            </span>
            <span className="p-1 rounded-xl shadow-sm w-16 h-10 text-center flex justify-center items-center">
              <img src={googlepay} alt="" />
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-center text-textColor mt-8">
        Sinan © 2000-2025, সমস্ত অধিকার সংরক্ষিত।
      </p>
    </footer>
  );
};

export default DashboardFooter;
