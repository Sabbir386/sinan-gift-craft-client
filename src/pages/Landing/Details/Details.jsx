import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Details = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("#000000");
  const [imageIndex, setImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const sizes = ["S", "M", "L"];
  const colors = [
    "#000000", // Black
    "#0000FF", // Blue
    "#FF0000", // Red
    "#008000", // Green
    "#FFFF00", // Yellow
    "#FFFFFF", // White
    "#FFC0CB", // Pink
  ];

  const handleQuantityChange = (change) => {
    setQuantity((prev) => (prev + change > 0 ? prev + change : 1));
  };
  const images = [
    "https://i.ibb.co.com/n8ts3g7/image-179.png",
    "https://i.ibb.co.com/7rM0q9f/image-180.png",
    "https://i.ibb.co.com/p4gjJJp/product-two.png",
    "https://i.ibb.co.com/nsvL20H/product-one.png",
  ];
  // Animation variants for the slide-in effect
  const imageVariants = {
    enter: { opacity: 0, x: 100 }, // Starts off-screen
    center: { opacity: 1, x: 0 }, // Center position
    exit: { opacity: 0, x: -100 }, // Slides out
  };
  const DescriptionLayout = () => (
    <div>
      <h2 className="text-xl font-bold">Product Description</h2>
      <p className="mt-2 text-gray-700">
        This is a high-quality product made from the finest materials. It offers
        durability and comfort for all your needs.
      </p>
    </div>
  );

  const AdditionalInfoLayout = () => (
    <div>
      <h2 className="text-xl font-bold">Additional Information</h2>
      <ul className="mt-2 text-gray-700 list-inside list-disc">
        <li>Size: Available in S, M, L, XL</li>
        <li>Material: 100% Cotton</li>
        <li>Color: Available in Black, White, and Navy</li>
      </ul>
    </div>
  );

  const ReviewsLayout = () => (
    <div>
      <h2 className="text-xl font-bold">Customer Reviews</h2>
      <div className="mt-4 space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="font-semibold">John Doe</p>
          <p className="text-gray-600">
            "Amazing product! Exceeded my expectations."
          </p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="font-semibold">Jane Smith</p>
          <p className="text-gray-600">
            "Very comfortable, great value for money."
          </p>
        </div>
      </div>
    </div>
  );

  const SuppliedDeliveryLayout = () => (
    <div>
      <h2 className="text-xl font-bold">Shipping and Delivery</h2>
      <p className="mt-2 text-gray-700">
        We offer free standard shipping on all orders over $50. Delivery time
        ranges from 3 to 7 business days.
      </p>
    </div>
  );

  const DetailsCareLayout = () => (
    <div>
      <h2 className="text-xl font-bold">Details & Care</h2>
      <ul className="mt-2 text-gray-700 list-inside list-disc">
        <li>Machine wash cold with like colors</li>
        <li>Do not bleach</li>
        <li>Tumble dry low</li>
        <li>Iron on low heat if necessary</li>
      </ul>
    </div>
  );

  const tabs = [
    { label: "Description", content: <DescriptionLayout /> },
    { label: "Additional Information", content: <AdditionalInfoLayout /> },
    { label: "Reviews", content: <ReviewsLayout /> },
    { label: "SUPPLIED & DELIVERY", content: <SuppliedDeliveryLayout /> },
    { label: "Details & care", content: <DetailsCareLayout /> },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-3/4 h-4/5 overflow-y-auto md:h-auto mx-auto bg-white p-7 rounded-xl relative">
        {/* Left Section: Image Gallery */}
        <div className="flex flex-col items-center space-y-4">
          {/* Large Image Container */}
          <div className="relative overflow-hidden rounded-lg w-4/6 h-84">
            {" "}
            {/* Ensure a fixed height */}
            <AnimatePresence mode="wait">
              {" "}
              {/* Smoothly handle the transition */}
              <motion.img
                key={imageIndex} // Ensures Framer Motion tracks image changes
                src={images[imageIndex]}
                alt="Product Image"
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full object-cover rounded-lg"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 }, // Defines the hover-specific transition
                }}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail Container */}
          <div className="flex overflow-x-auto space-x-4 mt-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                  index === imageIndex ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Info */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Boho Floral Maxi Dress
          </h2>
          <p className="text-xl font-semibold text-gray-800">$25.00</p>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took...
          </p>

          {/* Size Selection */}
          <div className="mt-4">
            <span className="font-medium">Size: </span>
            <div className="flex flex-wrap space-x-2 mt-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-lg border ${
                    size === s
                      ? "bg-black text-white"
                      : "bg-white text-gray-800"
                  } hover:bg-gray-200`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div className="mt-6">
            <p className="text-lg font-medium">Color</p>
            <div className="flex flex-wrap space-x-4 mt-2">
              {colors.map((c, index) => (
                <button
                  key={index}
                  className={`p-2 rounded-full ${
                    color === c ? "border-2 border-gray-700" : "border"
                  }`}
                  onClick={() => setColor(c)}
                >
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: c }}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Size Guide Link */}
          <div className="mt-2">
            <button className="text-sm text-blue-500 hover:underline">
              Size Guide
            </button>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="text-lg px-4 py-2 border rounded-l-lg"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 text-center border-t border-b py-2"
            />
            <button
              onClick={() => handleQuantityChange(1)}
              className="text-lg px-4 py-2 border rounded-r-lg"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <Link
              to={"/cart"}
              className="block  text-center w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Add To Cart
            </Link>
            <Link
              to={"/cart"}
              className="block  text-center w-full py-3 bg-black text-white rounded-lg hover:bg-gray-700"
            >
              Buy It Now
            </Link>
          </div>

          {/* Additional Information */}
          <div className="mt-6 text-sm text-gray-600">
            <p>
              Vendor: <span className="font-semibold">Bohemian Bliss</span>
            </p>
            <p>
              Type: <span className="font-semibold">Dress</span>
            </p>
            <p>
              Sku: <span className="font-semibold">null</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="tabs">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`py-2 px-4 text-lg font-semibold ${
                  activeTab === index
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tabs[activeTab] && tabs[activeTab].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
