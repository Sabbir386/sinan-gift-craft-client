import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAllProductsByCategoryQuery } from "./Product/productApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";


const ViewAllCategoryProduct = () => {
  const { categoryId } = useParams(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const [size, setSize] = useState("41");
  const [color, setColor] = useState("White");
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading, error } = useGetAllProductsByCategoryQuery(categoryId);
  const sizes = [41, 42, 43, 44];

      // Cart added functionality
      const [cartQuantity, setCartQuantity] = useState(1);
      const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
    
      // Handle quantity change
      const handleQuantityChange = (action) => {
        setCartQuantity((prevQuantity) =>
          action === "increase" ? prevQuantity + 1 : Math.max(prevQuantity - 1, 1)
        );
      };
    // Add to cart functionality
    const handleAddToCart = () => {
      if (!selectedProduct) return;
      console.log("selectedProduct", selectedProduct);
      dispatch(addToCart({ ...selectedProduct, quantity: cartQuantity })); // Use cartQuantity here
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `You have added "${selectedProduct.name}" to your cart.`,
        timer: 2000,
        showConfirmButton: false,
      });
      setIsModalOpen(false); // Close modal after adding to cart
    };
  
      // Toggle modal and set selected product
      const toggleModal = (product = null) => {
        setSelectedProduct(product);
        setCartQuantity(1); // Reset quantity when modal opens
        setIsModalOpen(!isModalOpen);
      };
    // Animation for the entire container
    const containerVariants = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05, // Delay between each child animation
        },
      },
    };
    // Animation for individual characters
    const textVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };
    // Animation variants for the slide-in effect
    const imageVariants = {
      enter: { opacity: 0, x: 100 }, // Starts off-screen
      center: { opacity: 1, x: 0 }, // Center position
      exit: { opacity: 0, x: -100 }, // Slides out
    };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  const products = data?.data || [];


  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Products in Category</h1>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product,productIndex) => (
             <div
                              key={`${productIndex}`}
                              className="rounded-xl relative h-[550px] md:h-[550px] group overflow-hidden bg-white shadow-md"
                            >
                              <div className="absolute top-0 left-0 z-10 object-cover rounded-xl w-full h-[420px] md:h-[420px] duration-300 overflow-hidden">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full group-hover:scale-125 duration-500"
                                />
                              </div>
            
                              <Link
                                to={{
                                  pathname: `/product/${product._id}`,
                                }}
                                state={{ product }}
                                className="absolute bottom-12 w-full"
                              >
                                <h4 className="text-headingColor font-medium text-base">
                                  {product.name}
                                </h4>
                                <div className="flex gap-3 justify-start items-center">
                                  <h3 className="font-extrabold text-lg ">
                                    ${product.salePrice || product.price}
                                  </h3>
                                  {product.salePrice && (
                                    <h5 className="line-through text-sm text-gray-500">
                                      ${product.price}
                                    </h5>
                                  )}
                                </div>
                              </Link>
                              <div className="absolute bottom-2 w-full grid grid-cols-2 gap-2">
                                <button
                                  className="text-white bg-secondaryColor rounded-full px-4 py-1"
                                  onClick={() => toggleModal(product)}
                                >
                                  Add to Cart
                                </button>
                                <button
                                  className="text-white bg-secondaryColor rounded-full px-4 py-1"
                                  onClick={() => toggleModal(product)}
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
          ))}
        </div>



      )}


       {/* modal  */}
       {isModalOpen && selectedProduct && (
        <div
          className="p-4 fixed top-0 left-0 z-[9999999] bg-black bg-opacity-75 w-full h-screen flex items-center justify-center"
          onClick={() => toggleModal(null)}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-3/4 h-4/5 overflow-y-auto md:h-auto mx-auto bg-white p-7 rounded-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-0 top-0 m-4 w-10 h-10 flex items-center justify-center text-white rounded-full bg-red-400"
              onClick={() => toggleModal(null)}
            >
              <IoMdClose />
            </button>

            {/* Left Section: Image Gallery */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative overflow-hidden rounded-lg w-4/6 h-84">
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
                ${selectedProduct.salePrice || selectedProduct.price}
              </p>
              <p className="text-gray-600 mt-2">
                {selectedProduct.description}
              </p>

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

export default ViewAllCategoryProduct;
