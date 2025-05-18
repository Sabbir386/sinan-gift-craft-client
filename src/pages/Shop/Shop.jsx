import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Navigation styles
import "swiper/css/pagination"; // Pagination styles
import "swiper/css/thumbs"; // Thumbs styles
import { Autoplay } from "swiper/modules";
import "swiper/css/free-mode";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useGetAllCategoriesWithProductsQuery } from "../Landing/Product/productApi";
import { IoMdClose } from "react-icons/io";

const Shop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const { data: categoriesWithProducts, isLoading } =
    useGetAllCategoriesWithProductsQuery();
  console.log("categoriesWithProducts", categoriesWithProducts);

  // Cart added functionality
  const [cartQuantity, setCartQuantity] = useState(1);
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);

  // Handle quantity change
  const handleQuantityChange = (action) => {
    setCartQuantity((prevQuantity) =>
      action === "increase" ? prevQuantity + 1 : Math.max(prevQuantity - 1, 1)
    );
  };

  // Toggle modal and set selected product
  const toggleModal = (product = null) => {
    setSelectedProduct(product);
    setCartQuantity(1); // Reset quantity when modal opens
    setIsModalOpen(!isModalOpen);
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    if (!selectedProduct || !size) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: "Please select a size before adding to cart.",
      //   timer: 2000,
      //   showConfirmButton: false,
      // });
      setSizeError(true);

      return;
    }

    // Include selected size in the dispatched payload
    console.log("selectedProduct", selectedProduct);
    dispatch(
      addToCart({
        ...selectedProduct,
        quantity: cartQuantity,
        selectedSize: size, // Add selected size to the cart item
      })
    );

    Swal.fire({
      icon: "success",
      title: "কার্টে যুক্ত হয়েছে!",
      text: `You have added "${selectedProduct.name}" (Size: ${size}) to your cart.`,
      timer: 2000,
      showConfirmButton: false,
    });
    setSizeError(false);
    setIsModalOpen(false); // Close modal after adding to cart
  };

  // Animation variants for the slide-in effect
  const imageVariants = {
    enter: { opacity: 0, x: 100 }, // Starts off-screen
    center: { opacity: 1, x: 0 }, // Center position
    exit: { opacity: 0, x: -100 }, // Slides out
  };
  const [size, setSize] = useState();

  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the element is visible
    triggerOnce: true, // Only trigger once
  });

  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      });
    } else {
      animation.start({ opacity: 0, y: 50 });
    }
  }, [inView, animation]);

  const imageArray = [
    "https://i.ibb.co.com/7rM0q9f/image-180.png",
    "https://i.ibb.co.com/frMddxX/image-178.png",
    "https://i.ibb.co.com/p4gjJJp/product-two.png",
    "https://i.ibb.co.com/9wKtYHt/product-three.png",
    "https://i.ibb.co.com/nsvL20H/product-one.png",
    "https://i.ibb.co.com/d7R3x70/product-four.png",
  ];

  // Get a random image from the array
  // const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
  return (
    <div className="py-10">


      {/* Category Wise Products  */}
      <div className="max-w-7xl mx-auto py-10 px-2 xl:px-0">
        {categoriesWithProducts?.data?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-base text-gray-800">
                {category.categoryName}
              </h2>
              {/* <Link
                to={`/view-all-category-products/${category._id}`}
                className="flex items-center gap-1 text-sm font-normal text-headingColor hover:text-secondaryColor duration-300"
              >
                <span>View All</span> <FaArrowRight />
              </Link> */}
            </div>

            <Swiper
              loop={true}
              modules={[Autoplay]}
              autoplay={{ delay: 1500 }}
              slidesPerView={2}
              spaceBetween={30}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
              className="mt-10"
            >
              {category.products.map((product, productIndex) => (
                <SwiperSlide key={productIndex}>
                  <div className="relative group hover:shadow-sm">
                    <div className="w-full h-[282px] relative group overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-125 duration-500"
                      />
                      <div className="w-16 h-7 bg-red-500 bg-opacity-80 flex justify-center items-center text-white text-sm absolute top-2 left-2 z-20 rounded-sm">
                        Save{" "}
                        {(
                          ((product.price - product.salePrice) /
                            product.price) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                      <button
                        className="text-white bg-green-600  w-full px-4 py-3 text-xs absolute -bottom-10 group-hover:bottom-0 duration-300"
                        onClick={() => toggleModal(product)}
                      >
                        <p className="flex justify-center items-center gap-2">
                          <CiShoppingCart className="text-lg text-white" />{" "}
                          <span>কার্টে যোগ করুন</span>
                        </p>
                      </button>
                    </div>
                    <div className="py-2 text-center">
                      <div className="flex justify-center items-center gap-1 py-2">
                        {product.colours.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className={`w-3 h-3 rounded-full`}
                            style={{ backgroundColor: `${color}` }}
                          ></div>
                        ))}
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-purple-400 uppercase">
                          {category.categoryName}
                        </p>
                        <h3 className="font-extrabold text-xl">
                          {product.name}
                        </h3>
                        <h4 className="text-base font-semibold text-secondaryColor">
                          ট {product.price}{" "}
                          <span className="line-through text-sm text-gray-400">
                            ট {product.salePrice}
                          </span>{" "}
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}

        {/* Modal */}
        {isModalOpen && selectedProduct && (
          <div className="modal">
            <div className="modal-content">
              <h3>{selectedProduct.name}</h3>
              <img src={selectedProduct.images[0]} alt={selectedProduct.name} />
              <p>Price: {selectedProduct.salePrice || selectedProduct.price}</p>
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange("decrease")}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange("increase")}>
                  +
                </button>
              </div>
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>

      {/* modal  */}
      {isModalOpen && selectedProduct && (
        <div
          className="p-4 fixed top-0 left-0 z-[9999999] bg-black bg-opacity-75 w-full h-screen flex items-center justify-center"
          onClick={() => toggleModal(null)}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-3/4 h-4/5 overflow-y-auto md:h-[80vh] mx-auto bg-white p-7 rounded-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-0 top-0 m-4 w-10 h-10 flex items-center justify-center text-white rounded-full bg-red-400"
              onClick={() => toggleModal(null)}
            >
              <IoMdClose />
            </button>

            {/* Left Section: Image Gallery */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative overflow-hidden rounded-lg w-4/6 h-[50vh]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imageIndex}
                    src={selectedProduct.images[imageIndex]}
                    alt={selectedProduct.name}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full object-cover rounded-lg"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.3 },
                    }}
                  />
                </AnimatePresence>
              </div>

              <div className="flex overflow-x-auto space-x-4 mt-4">
                {selectedProduct.images.map((image, index) => (
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
                {selectedProduct.name}
              </h2>
              <p className="text-xl font-semibold text-gray-800">
                {selectedProduct.salePrice || selectedProduct.price} ট
              </p>
              <p className="text-gray-600 mt-2">
                {selectedProduct.description}
              </p>

              <div className="mt-4">
                <span className="font-medium">Size: </span>
                <div className="flex flex-wrap space-x-2 mt-2">
                  {selectedProduct.sizes.map((s) => (
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
                {sizeError && (
                  <small className="text-red-500">Please Select a size</small>
                )}
              </div>

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
                  className=" text-lg px-4 py-2 border rounded-r-lg"
                >
                  +
                </button>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full text-center py-3 bg-green-600 text-white rounded-lg hover:bg-gray-700"
                >
                  কার্টে যোগ করুন
                </button>
                <Link
                  to="/cart"
                  className="w-full text-center py-3 bg-black text-white rounded-lg hover:bg-gray-700"
                >
                  এখনি কিনুন
                </Link>
              </div>

              <div className="mt-6">
                <p className="text-gray-700">
                  Total Items in Cart:{" "}
                  <span className="font-bold">{cartTotalQuantity}</span>
                </p>
              </div>
              {/* Additional Information */}
              <div className="mt-6 text-sm text-gray-600">
                <p>
                  Vendor:{" "}
                  <span className="font-semibold">
                    {selectedProduct.categoryName || "Unknown Vendor"}
                  </span>
                </p>
                <p>
                  Type:{" "}
                  <span className="font-semibold">
                    {selectedProduct.slug || "Unknown Type"}
                  </span>
                </p>
                <p>
                  Sku:{" "}
                  <span className="font-semibold">
                    {selectedProduct.sku || "N/A"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
