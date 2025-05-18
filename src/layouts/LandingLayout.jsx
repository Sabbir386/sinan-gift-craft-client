import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBars,
  FaCartArrowDown,
  FaCheck,
  FaFacebookMessenger,
  FaHeart,
  FaPhone,
  FaSearch,
  FaUser,
  FaWhatsapp,
  FaWindowClose,
} from "react-icons/fa";
import Sinan from "../assets/img/sinan.png";
import { CiShoppingCart } from "react-icons/ci";
import DashboardFooter from "./sidebar/DashboardFooter";
import ScrollToTop from "./ScrollToTop";
import { useSelector } from "react-redux";
import { useGetAllCategoriesWithProductsQuery } from "../pages/Landing/Product/productApi";

const LandingLayout = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const placeholderTexts = [
    "search your product",
    "find Islamic dresses",
    "explore craft items",
  ]; // Array of placeholder texts
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true); // Tracks if we are typing or erasing
  //cardt quantity
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const menuArray = [
    { name: "men", path: "/category/1" },
    { name: "women", path: "/category/1" },
    { name: "kids", path: "/category/1" },
    { name: "gift & craft", path: "/category/1" },
    { name: "skin & hair", path: "/category/1" },
    { name: "brands", path: "/category/1" },
    { name: "sale 24", path: "/category/1" },
  ];
  const maniMenuArray = [
    { name: "হোম", path: "/" },
    { name: "পণ্য", path: "/shop" },
    { name: "গ্যালারি", path: "/gallery" },
    { name: "রিভিউ", path: "/review" },
    { name: "জিজ্ঞাসা", path: "/faq" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Add class when scrolled
      } else {
        setIsScrolled(false); // Remove class when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { data: categoriesWithProducts, isLoading } =
    useGetAllCategoriesWithProductsQuery();
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger each Link animation
      },
    },
  };
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  const handleMouseEnter = (index) => {
    setActiveIndex(index); // Set the hovered item as active
    setIsHovered(true); // Stop the loop
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Resume the loop
  };

  useEffect(() => {
    if (isHovered) return; // Stop looping when hovered

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % menuArray.length);
    }, 2000); // Adjust the timing here (1000ms = 1s)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isHovered, menuArray.length]);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (isTyping) {
        if (charIndex < placeholderTexts[textIndex].length) {
          setCurrentText(
            (prev) => prev + placeholderTexts[textIndex][charIndex]
          );
          setCharIndex((prev) => prev + 1);
        } else {
          // Pause before erasing
          setIsTyping(false);
          setTimeout(() => {
            clearInterval(typingInterval); // Clear interval before switching to erasing
          }, 1000); // Pause duration after typing
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
          setCurrentText((prev) => prev.slice(0, -1));
        } else {
          setIsTyping(true);
          setTextIndex((prev) => (prev + 1) % placeholderTexts.length); // Move to the next text
        }
      }
    }, 100); // Typing and erasing speed

    return () => clearInterval(typingInterval); // Cleanup interval
  }, [charIndex, isTyping, placeholderTexts, textIndex]);

  return (
    <div className="">
      <ScrollToTop />
      {/* <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
       
        <a
          href="https://wa.me/+8801902766289" // Replace with your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          <FaWhatsapp size={24} />
        </a>

       
        <a
          href="tel:+8801902766289" // Replace with your phone number
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <FaPhone size={24} />
        </a>
       
        <a
          href="https://m.me/SinanGiftandCraft" // Replace 'yourpage' with your Facebook page username
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <FaFacebookMessenger size={24} />
        </a>
      </div> */}
      {/* main container */}
      <div className="mx-auto bg-white">
        {/* header section  */}
        <div
          className={`fixed w-full top-0 z-[99999] ${
            isScrolled ? "bg-white" : "bg-white"
          }`}
        >
          {/* naver section  */}
          <header className="z-[999]  w-full max-w-7xl mx-auto left-0 top-0">
            <nav className="bg-white px-4 md:px-0 py-5">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2 text-green-600 font-bold text-xl">
                  <Link to="/">সিনান গিফট কর্ণার</Link>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 text-gray-700">
                  {maniMenuArray.map((item, index) => (
                    <li
                      key={index}
                      className="hover:text-green-600 cursor-pointer font-bold"
                    >
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>

                {/* Order Button */}
                <div className="flex justify-center md:justify-end items-center gap-3 -translate-x-4 md:translate-x-0">
                  <Link
                    to={"/login"}
                    className={`border-[1px] flex items-center justify-center w-8 h-8 rounded-full ${
                      isScrolled
                        ? "text-black border-black hover:border-green-600"
                        : "text-green-500 border-green-600"
                    } hover:text-white hover:bg-green-500 duration-300`}
                  >
                    <FaUser className="text-xs" />
                  </Link>
                  <Link
                    to={"/cart"}
                    className={`border-[1px] flex items-center justify-center w-8 h-8 rounded-full ${
                      isScrolled
                        ? "text-black border-black hover:border-green-600"
                        : "text-green-500 border-green-600"
                    } hover:text-white hover:bg-green-500 duration-300`}
                  >
                    <FaHeart className="text-xs" />
                  </Link>

                  <Link
                    to="/cart"
                    className={`group border-[1px] flex items-center justify-center w-8 h-8 rounded-full ${
                      isScrolled
                        ? "text-black border-black hover:border-green-600"
                        : "text-green-500 border-green-600"
                    } hover:text-white hover:bg-green-500 duration-300`}
                  >
                    <FaCartArrowDown
                      className={`text-xs group-hover:text-white ${
                        isScrolled ? "text-black" : "text-green-500"
                      }`}
                    />
                    {cartTotalQuantity > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {cartTotalQuantity}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="block md:hidden">
                  <button
                    onClick={() => setOpen(!open)}
                    className="relative w-10 h-10 flex items-center justify-center"
                  >
                    {/* Top bar */}
                    <span
                      className={`absolute w-6 h-[1px] bg-black transform transition-transform duration-300 ${
                        open ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                      }`}
                    ></span>
                    {/* Bottom bar */}
                    <span
                      className={`absolute w-6 h-[1px] bg-black transform transition-transform duration-300 ${
                        open ? "-rotate-45 -translate-y-0" : "translate-y-1.5"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              {open && (
                <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 text-gray-700 shadow-sm py-4 rounded-md">
                  {maniMenuArray.map((item, index) => (
                    <li
                      key={index}
                      className="hover:text-green-600 cursor-pointer font-bold"
                    >
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </header>

          {/* naver section  */}
        </div>
        {/* header section  */}
        {/* page sections */}
        <div>
          <Outlet></Outlet>
        </div>
        {/* page sections */}
        {/* footer section  */}
        <DashboardFooter></DashboardFooter>
        {/* footer section  */}
      </div>

      {/* main container */}
    </div>
  );
};

export default LandingLayout;
