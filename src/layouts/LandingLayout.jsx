import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBars,
  FaCheck,
  FaHeart,
  FaSearch,
  FaUser,
  FaWindowClose,
} from "react-icons/fa";
import Sinan from "../assets/img/sinan.png";
import { CiShoppingCart } from "react-icons/ci";
import DashboardFooter from "./sidebar/DashboardFooter";
import ScrollToTop from "./ScrollToTop";

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

  const menuArray = [
    { name: "men", path: "/category/1" },
    { name: "women", path: "/category/1" },
    { name: "kids", path: "/category/1" },
    { name: "gift & craft", path: "/category/1" },
    { name: "skin & hair", path: "/category/1" },
    { name: "brands", path: "/category/1" },
    { name: "sale 24", path: "/category/1" },
  ];
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
      {/* main container */}
      <div className="mx-auto bg-white">
        {/* header section  */}
        <div className="">
          {/* naver section  */}
          <header className="z-[999] bg-white w-full left-0 top-0">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center py-5 px-6">
              <div>
                <Link to="/">
                  <img src={Sinan} alt="" className="w-full object-cover" />
                </Link>
              </div>
              <div>
                <form action="" className="flex border-[1px] rounded-full">
                  <select
                    name=""
                    id=""
                    className="border-none outline-none px-2 bg-gray-100 rounded-none rounded-l-full"
                    defaultValue={"Categories"}
                  >
                    {menuArray.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="border-none outline-none text-xs px-4 h-10"
                    placeholder={currentText}
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 flex justify-center items-center bg-secondaryColor rounded-full"
                  >
                    <FaSearch className="text-white text-xs" />
                  </button>
                </form>
              </div>
              <div className="flex justify-end items-cente gap-3">
                <Link to={'/cart'} className="border-[1px] flex items-center justify-center w-8 h-8 rounded-full hover:text-white hover:bg-secondaryColor duration-300">
                  <FaHeart className="text-xs" />
                </Link>
                <Link to={'/cart'} className="border-[1px] flex items-center justify-center w-8 h-8 rounded-full hover:text-white hover:bg-secondaryColor duration-300">
                  <CiShoppingCart className="text-xs" />
                </Link>
                <Link to={'/my-account'} className="border-[1px] flex items-center justify-center w-8 h-8 rounded-full hover:text-white hover:bg-secondaryColor duration-300">
                  <FaUser className="text-xs" />
                </Link>
              </div>
            </div>
            <div className="py-5 px-2 flex flex-wrap flex-row gap-4 justify-center items-center bg-primaryColor">
              {menuArray.map((item, index) => (
                <Link
                  key={index}
                  className={`uppercase text-headingColor border text-sm border-gray-300 px-5 py-1 rounded-full transform transition-transform duration-500 ${
                    activeIndex === index
                      ? "scale-125 bg-secondaryColor text-white"
                      : ""
                  }`}
                  to={item.path}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </header>
          {/* naver section  */}
        </div>
        {/* header section  */}
        {/* page sections */}
        <Outlet></Outlet>
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
