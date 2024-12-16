import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBars,
  FaCheck,
  FaEye,
  FaHeart,
  FaStar,
  FaWindowClose,
} from "react-icons/fa";

const Categories = () => {
  const [selectedPrice, setSelectedPrice] = useState({ min: 40, max: 346 });
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const priceOptions = [
    { min: 40, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 346 },
  ];
  const colors = [
    "black",
    "#00bcd4",
    "#4caf50",
    "#ff9800",
    "#f48fb1",
    "#9c27b0",
    "#2196f3",
    "#cddc39",
  ];
  const sizes = [4, 6, 8, 10, 12, 14, 16, 18, 20];

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    setPrice((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const trendingProducts = [
    {
      id: 1,
      image: "https://i.ibb.co.com/frMddxX/image-178.png",
      title: "Modest Kaftan",
      price: 25.99,
      discountedPrice: 15.99,
      rating: 4.5,
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/n8ts3g7/image-179.png",
      title: "Modest Kaftan",
      price: 145.99,
      discountedPrice: 125.99,
      rating: 5,
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/7rM0q9f/image-180.png",
      title: "Modest Kaftan",
      price: 578.99,
      discountedPrice: 400.5,
      rating: 5,
    },
    {
      id: 4,
      image: "https://i.ibb.co.com/p4gjJJp/product-two.png",
      title: "Modest Kaftan",
      price: 325.99,
      discountedPrice: 259.52,
      rating: 3.5,
    },
    {
      id: 5,
      image: "https://i.ibb.co.com/nsvL20H/product-one.png",
      title: "Modest Kaftan",
      price: 5.99,
      discountedPrice: 3.25,
      rating: 5,
    },
  ];
  return (
    <div className="px-6 flex flex-col md:flex-row gap-4 items-start justify-start py-5">
      {/* fliter area  */}
      <div className="w-full md:w-1/5 p-6 bg-white rounded-md shadow-md">
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-lg">Filter</h2>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div
            className={`relative w-full max-w-md transition-all duration-300 ${
              isFocused ? "scale-105 shadow-lg" : "scale-100 shadow-md"
            }`}
          >
            {/* Search Icon */}
            <span
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                isFocused ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
            </span>

            {/* Input */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full pl-10 pr-4 py-3 text-sm text-gray-700 bg-white border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300"
            />
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Price</h3>
          <div className="flex flex-wrap gap-2">
            {priceOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedPrice(option)}
                className={`px-3 py-1 rounded-md text-sm border ${
                  selectedPrice.min === option.min &&
                  selectedPrice.max === option.max
                    ? "border-black bg-gray-100"
                    : "border-gray-300"
                } hover:bg-gray-100`}
              >
                ${option.min} - ${option.max}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Color</h3>
          <div className="flex gap-2">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-black"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
                  selectedSize === size ? "border-black" : "border-gray-300"
                } hover:bg-gray-100`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium mb-2">Category</h3>
          <ul>
            {[
              { name: "Dresses", count: 10 },
              { name: "Top & Blouses", count: 5 },
              { name: "Boots", count: 17 },
              { name: "Jewelry", count: 13 },
            ].map((category, index) => (
              <li
                key={index}
                className="flex justify-between text-sm text-gray-600 py-1"
              >
                <span>{category.name}</span>
                <span>({category.count})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Trending Products  */}
      <div className="w-full md:w-4/5 px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Amazing Deals</h2>
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-normal text-headingColor hover:text-secondaryColor duration-300"
          >
            <span>View All</span> <FaArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 py-4">
          {trendingProducts.map((product, index) => (
            <div
              key={index}
              className="rounded-xl relative h-[420px] md:h-[510px] group overflow-hidden"
            >
              <div className="absolute top-0 left-0 z-10 object-cover rounded-xl w-full h-[320px] md:h-[420px] duration-300 overflow-hidden">
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full group-hover:scale-125 duration-500"
                />
              </div>

              <div className="absolute  -right-8 group-hover:right-4 top-4 rounded-full w-7 h-7 text-secondaryColor  z-10  bg-white hover:bg-secondaryColor hover:text-white duration-300 flex justify-center items-center">
                <p className="text-center text-sm opacity-50 group-hover:opacity-100 cursor-pointer">
                  <FaHeart />
                </p>
              </div>
              <div
                className="absolute -right-8 group-hover:right-4 top-12 rounded-full w-7 h-7 text-secondaryColor  z-10  bg-white hover:bg-secondaryColor hover:text-white duration-300 flex justify-center items-center cursor-pointer"
                // onClick={toggleModal}
              >
                <p className="text-center text-sm opacity-50 group-hover:opacity-100">
                  <FaEye />
                </p>
              </div>
              <Link to={"/product/1"} className="absolute bottom-2 w-full">
                <h4 className="text-headingColor font-medium text-base">
                  {product.title}
                </h4>
                <div className="flex gap-1 justify-start items-center text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <div>
                    (<span>{product.rating}</span>)
                  </div>
                </div>
                <div className="flex gap-3 justify-start items-center">
                  <h3 className="font-extrabold text-lg ">
                    ${product.discountedPrice}
                  </h3>
                  <h5 className="line-through text-sm text-gray-500">
                    ${product.price}
                  </h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
