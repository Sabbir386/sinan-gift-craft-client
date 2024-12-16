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
    <footer className=" text-white py-10 px-6">
      <div className="mx-auto border-b-[1px] border-gray-200 py-5">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Logo Section */}
          <div className="w-full md:w-1/5 text-left md:text-center">
            <img src={Sinan} alt="" />
            <p className="text-xs text-gray-400 mt-3">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
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
                COMPANY
              </h2>
              <ul className="space-y-2 text-sm flex flex-col text-gray-500">
                <Link to={"/aboutus"}>About Us</Link>
                <Link to={"/termsncondition"}>Features</Link>
                <Link to={"/privecy-policy"}>Works </Link>
                <Link to={"/privecy-policy"}>Carrer </Link>
              </ul>
            </div>
            <div className="text-left">
              <h2 className="text-sm text-headingColor font-semibold mb-4">
                Help
              </h2>
              <ul className="space-y-2 text-sm flex flex-col text-gray-500">
                <Link to={"/aboutus"}>Customer Support</Link>
                <Link to={"/termsncondition"}>Delivery Details</Link>
                <Link to={"/privecy-policy"}>Terms & Conditions</Link>
                <Link to={"/privecy-policy"}>Privecy Policy</Link>
              </ul>
            </div>
            <div className="text-left">
              <h2 className="text-sm text-headingColor font-semibold mb-4">
                FAQ
              </h2>
              <ul className="space-y-2 text-sm flex flex-col text-gray-500">
                <Link to={"/aboutus"}>Account</Link>
                <Link to={"/termsncondition"}>Manage Deliverie</Link>
                <Link to={"/privecy-policy"}>Orders</Link>
                <Link to={"/privecy-policy"}>Payments</Link>
              </ul>
            </div>
            <div className="text-left">
              <h2 className="text-sm text-headingColor font-semibold mb-4">
                Resources
              </h2>
              <ul className="space-y-2 text-sm flex flex-col text-gray-500">
                <Link to={"/aboutus"}>Resources</Link>
                <Link to={"/termsncondition"}>Terms of Service</Link>
                <Link to={"/privecy-policy"}>Privacy</Link>
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
              className="w-8 h-8 bg-primaryColor text-secondaryColor rounded-full flex items-center justify-center"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-primaryColor text-secondaryColor rounded-full flex items-center justify-center"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-primaryColor text-secondaryColor rounded-full flex items-center justify-center"
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
      <p className="text-sm text-center text-textColor mt-8">Sunnahdress © 2000-2024, All Rights Reserved</p>
    </footer>
  );
};

export default DashboardFooter;
