import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";

const Details = () => {
  const location = useLocation();
  const { product } = location.state || {};
  console.log(product)
  const [activeTab, setActiveTab] = useState(0);
  const [size, setSize] = useState(product?.sizes[0] || "M");
  const [color, setColor] = useState(product?.colours[0] || "#000000");
  const [imageIndex, setImageIndex] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleQuantityChange = (action) => {
    setCartQuantity((prevQuantity) =>
      action === "increase" ? prevQuantity + 1 : Math.max(prevQuantity - 1, 1)
    );
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: cartQuantity }));
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `You have added ${cartQuantity} "${product?.name}" to your cart.`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Animation variants for the slide-in effect
  const imageVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-3/4 h-4/5 overflow-y-auto md:h-auto mx-auto bg-white p-7 rounded-xl relative">
        {/* Left Section: Image Gallery */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative overflow-hidden rounded-lg w-4/6 h-84">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIndex}
                src={product?.images[imageIndex]}
                alt={`Product Image ${imageIndex}`}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full object-cover rounded-lg"
              />
            </AnimatePresence>
          </div>
          <div className="flex overflow-x-auto space-x-4 mt-4">
            {product?.images.map((image, index) => (
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
          <h2 className="text-3xl font-semibold mb-4">{product?.name}</h2>
          <p className="text-xl font-semibold text-gray-800">
            ${product?.salePrice || product?.price}
          </p>
          <p className="text-gray-600 mt-2">{product?.description}</p>

          {/* Size Selection */}
          <div className="mt-4">
            <span className="font-medium">Size: </span>
            <div className="flex flex-wrap space-x-2 mt-2">
              {product?.sizes.map((s) => (
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
              {product?.colours.map((c, index) => (
                <button
                  key={index}
                  className={`p-2 rounded-full ${
                    color === c ? "border-2 border-gray-700" : "border"
                  }`}
                  onClick={() => setColor(c)}
                >
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{
                      backgroundColor: c.toLowerCase(),
                      borderColor: c === "White" ? "#ccc" : "transparent",
                    }}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="text-lg px-4 py-2 border rounded-l-lg"
            >
              -
            </button>
            <input
              type="text"
              value={cartQuantity}
              readOnly
              className="w-12 text-center border-t border-b py-2"
            />
            <button
              onClick={() => handleQuantityChange("increase")}
              className="text-lg px-4 py-2 border rounded-r-lg"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="w-full text-center py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Add To Cart
            </button>
            <Link
              to="/cart"
              className="w-full text-center py-3 bg-black text-white rounded-lg hover:bg-gray-700"
            >
              Buy It Now
            </Link>
          </div>

          {/* Additional Information */}
          <div className="mt-6 text-sm text-gray-600">
            <p>
              SKU: <span className="font-semibold">{product?.sku}</span>
            </p>
            <p>
              Quantity Available:{" "}
              <span className="font-semibold">{product?.quantity}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
