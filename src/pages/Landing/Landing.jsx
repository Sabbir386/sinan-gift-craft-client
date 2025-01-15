import React, { useEffect, useRef, useState } from "react";
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

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Navigation styles
import "swiper/css/pagination"; // Pagination styles
import "swiper/css/thumbs"; // Thumbs styles
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useGetAllCategoriesWithProductsQuery } from "./Product/productApi";
import { addToCart } from "../../redux/features/cart/cartSlice";

const Landing = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const { data: categoriesWithProducts, isLoading } =
    useGetAllCategoriesWithProductsQuery();
  console.log("categoriesWithProducts", categoriesWithProducts);

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Toggle modal and set selected product
  const toggleModal = (product = null) => {
    setSelectedProduct(product);
    setCartQuantity(1); // Reset quantity when modal opens
    setIsModalOpen(!isModalOpen);
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    if (!selectedProduct || !size) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a size before adding to cart.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
  
    // Include selected size in the dispatched payload
    console.log("selectedProduct", selectedProduct);
    dispatch(addToCart({
      ...selectedProduct,
      quantity: cartQuantity,
      selectedSize: size, // Add selected size to the cart item
    }));
  
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `You have added "${selectedProduct.name}" (Size: ${size}) to your cart.`,
      timer: 2000,
      showConfirmButton: false,
    });
  
    setIsModalOpen(false); // Close modal after adding to cart
  };
  

  const sliderItems = [
    {
      id: 1,
      backgroundImage: "https://i.ibb.co.com/tXw5Yxm/banner-left.png",
      badge: "Spring Sale",
      title: `Fashionable Islami Clothing for Girls`,
      description: "Get 20% off on all products in our store",
      buttonText: { text: "Discover Now", url: "/" },
    },
    {
      id: 2,
      backgroundImage: "https://i.ibb.co.com/923YSm2/banner-two.jpg",
      badge: "hot item",
      title: `Craft that will Match your life`,
      description: "Get 5% off on all products in our store",
      buttonText: { text: "Shop Now", url: "/" },
    },
    {
      id: 3,
      backgroundImage: "https://i.ibb.co.com/3MDc6dG/banner-three.jpg",
      badge: "Spring Sale",
      title: `Fashionable Islamic Clothing for Girls`,
      description: "Get 20% off on all products in our store",
      buttonText: { text: "Shop Now", url: "/" },
    },
  ];
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
  const [size, setSize] = useState();

  const [color, setColor] = useState("White");
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const colors = [
    "#000000", // Black
    "#0000FF", // Blue
    "#FF0000", // Red
    "#008000", // Green
    "#FFFF00", // Yellow
    "#FFFFFF", // White
    "#FFC0CB", // Pink
  ];
  const images = [
    "https://i.ibb.co.com/n8ts3g7/image-179.png",
    "https://i.ibb.co.com/7rM0q9f/image-180.png",
    "https://i.ibb.co.com/p4gjJJp/product-two.png",
    "https://i.ibb.co.com/nsvL20H/product-one.png",
  ];
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the element is visible
    triggerOnce: true, // Only trigger once
  });
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
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

  const containerVariantsMain = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  // Animation variants
  const imageVariantsBanner = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
  };
  return (
    <div className="pb-6">
      {/* banner section  */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center py-4 px-6">
        <div className="w-full md:w-5/6 relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 4000 }}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              prevEl: prevButtonRef.current,
              nextEl: nextButtonRef.current,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {sliderItems.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className="rounded-lg w-full relative h-[400px] md:h-[600px] overflow-hidden">
                  <motion.img
                    src={item.backgroundImage}
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-md z-10"
                    variants={imageVariantsBanner}
                    initial="hidden"
                    animate={activeIndex === index ? "visible" : "hidden"}
                    exit="exit"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  <div className="absolute top-0 left-0 w-full h-full rounded-md z-20 flex items-center px-16">
                    <motion.div
                      className=""
                      initial="hidden"
                      animate={activeIndex === index ? "visible" : "hidden"}
                      variants={containerVariants}
                    >
                      <motion.span
                        className="px-4 py-2 text-sm text-white bg-primaryColor bg-opacity-50 rounded-full inline-block"
                        variants={textVariants}
                      >
                        {item.badge}
                      </motion.span>

                      {/* Text Reveal Animation for Title */}
                      <motion.h1
                        className="text-xl md:text-4xl font-extrabold text-headingColor mt-4"
                        variants={containerVariants}
                      >
                        {item.title.split("").map((char, i) => (
                          <motion.span key={i} variants={textVariants}>
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </motion.h1>

                      {/* Text Reveal Animation for Description */}
                      <motion.h1
                        className="text-sm font-semibold text-headingColor mt-1"
                        variants={containerVariants}
                      >
                        {item.description.split("").map((char, i) => (
                          <motion.span key={i} variants={textVariants}>
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </motion.h1>

                      <motion.div variants={textVariants}>
                        <Link
                          className="px-5 py-2 rounded-full bg-white mt-1 inline-block text-sm text-secondaryColor capitalize hover:bg-secondaryColor hover:text-white duration-300 shadow-md"
                          to={item.buttonText.url}
                        >
                          {item.buttonText.text}
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Navigation Buttons */}
          <div className="absolute bottom-16 right-28 z-30">
            <button
              ref={prevButtonRef}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent text-secondaryColor rounded-full p-2 hover:bg-secondaryColor hover:text-white border-[1px] w-10 h-10 flex justify-center items-center duration-300"
            >
              <IoIosArrowForward />
            </button>
            <button
              ref={nextButtonRef}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent text-secondaryColor rounded-full p-2 hover:bg-secondaryColor hover:text-white border-[1px] w-10 h-10 flex justify-center items-center duration-300"
            >
              <IoIosArrowBack />
            </button>
          </div>
        </div>
        <div className="w-full hidden md:block md:w-1/6 rounded-md">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={1}
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <div className="rounded-lg w-full relative h-[300px] md:h-[600px] overflow-hidden group">
                <img
                  src={"https://i.ibb.co.com/XXC60c1/banner-right.png"}
                  alt=""
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-10 group-hover:scale-150 duration-300"
                />
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-5/6 l z-20 bg-white/30 backdrop-blur-sm rounded-lg shadow-lg p-2 text-center group-hover:bottom-1/2 group-hover:translate-y-1/2 duration-300">
                  <h3 className="font-medium text-6xl text-white uppercase">
                    +15k
                  </h3>
                  <div className="flex gap-1 justify-center items-center text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="font-semibold">Product Reviews</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg w-full relative h-[300px] md:h-[600px] overflow-hidden group">
                <img
                  src={"https://i.ibb.co.com/frMddxX/image-178.png"}
                  alt=""
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-10 group-hover:scale-150 duration-300"
                />
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-5/6 l z-20 bg-white/30 backdrop-blur-sm rounded-lg shadow-lg p-2 text-center group-hover:bottom-1/2 group-hover:translate-y-1/2 duration-300">
                  <h3 className="font-medium text-6xl text-white uppercase">
                    +15k
                  </h3>
                  <div className="flex gap-1 justify-center items-center text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="font-semibold">Product Reviews</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-lg w-full relative h-[300px] md:h-[600px] overflow-hidden group">
                <img
                  src={"https://i.ibb.co.com/XXC60c1/banner-right.png"}
                  alt=""
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-10 group-hover:scale-150 duration-300"
                />
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-5/6 l z-20 bg-white/30 backdrop-blur-sm rounded-lg shadow-lg p-2 text-center group-hover:bottom-1/2 group-hover:translate-y-1/2 duration-300">
                  <h3 className="font-medium text-6xl text-white uppercase">
                    +15k
                  </h3>
                  <div className="flex gap-1 justify-center items-center text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="font-semibold">Product Reviews</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* top categories  */}
      <div className="px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Top Categories</h2>
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-normal text-headingColor hover:text-secondaryColor duration-300"
          >
            <span>View All</span> <FaArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-7 py-4">
          {categoriesWithProducts?.data?.map((category, categoryIndex) => (
            <Link
              key={categoryIndex}
              to={"/view-all-category-products/" + category._id}
              className="rounded-lg relative h-[180px] md:h-[420px] group"
            >
              <img
                src={"https://i.ibb.co.com/3MDc6dG/banner-three.jpg"}
                alt=""
                className="absolute top-0 left-0 z-10 object-cover rounded-lg w-full h-full group-hover:blur-[2px] duration-300"
              />
              <div className="w-5/6 md:w-auto absolute bottom-10 rounded-full left-1/2 -translate-x-1/2 z-10 px-2 md:px-5 py-3 bg-white hover:bg-secondaryColor hover:text-white duration-300 group-hover:bottom-1/2 group-hover:translate-y-1/2">
                <p className="text-center text-sm ">{category.categoryName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* new arrival */}
      {/* <div className="px-6">
        <div className="flex flex-col items-center md:flex-row gap-10 bg-gradient-to-r from-primaryColor to-secondaryColor animate-floatingBackground py-10 md:py-20 px-12 rounded-md">
          <div className="flex justify-between items-baseline gap-7 relative">
            <img
              src={"https://i.ibb.co.com/Vt993n6/new-arrival-one.png"}
              alt=""
              className="w-full h-56 md:h-96  rounded-xl object-cover hover:scale-110 duration-300"
            />
            <img
              src={"https://i.ibb.co.com/TRVdXNz/new-arrival-two.png"}
              alt=""
              className="absolute md:relative -bottom-10 md:bottom-0 -right-10 md:left-0 w-32 md:w-full h-36 md:h-72 rounded-xl object-cover hover:scale-110 duration-300"
            />
          </div>
          <div className=" md:px-52">
            <h2 className="text-3xl md:text-5xl font-bold text-headingColor">
              New Arrival <br /> Collection 24
            </h2>
            <p className="text-sm">
              The brand took its name from Van Gogh’s iconic painting,
              'Sunflower', symbolizing warmth, happiness, loyalty, and
              long-lasting connections
            </p>
            <Link
              className="px-5 py-2 rounded-full bg-white mt-1 inline-block text-sm text-secondaryColor capitalize hover:bg-secondaryColor hover:text-white hover:translate-y-1 hover:scale-110 duration-300 shadow-md"
              to=""
            >
              Explore More
            </Link>
          </div>
        </div>
      </div> */}
      {/* Trending Products  */}
      <div className="px-6 py-5">
        {categoriesWithProducts?.data?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {category.categoryName}
              </h2>
              <Link
                to={`/view-all-category-products/${category._id}`}
                className="flex items-center gap-1 text-sm font-normal text-headingColor hover:text-secondaryColor duration-300"
              >
                <span>View All</span> <FaArrowRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-7 py-4">
              {category.products.map((product, productIndex) => (
                <div
                  key={`${categoryIndex}-${productIndex}`}
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
          </div>
        ))}

        {/* Modal */}
        {isModalOpen && selectedProduct && (
          <div className="modal">
            <div className="modal-content">
              <h3>{selectedProduct.name}</h3>
              <img src={selectedProduct.images[0]} alt={selectedProduct.name} />
              <p>
                Price: ${selectedProduct.salePrice || selectedProduct.price}
              </p>
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

      {/* new arrival two  */}
      {/* <div className="px-6 flex flex-col md:flex-row justify-between items-center gap-5">
      
        <div className="w-full lg:w-4/6 bg-gradient-to-r from-primaryColor to-secondaryColor animate-floatingBackground py-12 px-12 rounded-md flex flex-col md:flex-row items-center gap-4">
          <img
            src="https://i.ibb.co.com/Vt993n6/new-arrival-one.png"
            alt=""
            className="h-84 object-cover rounded-xl hidden lg:block"
          />
          <div>
            <h2 className="text-5xl font-bold text-headingColor">
              New Arrival <br /> Collection 24
            </h2>
            <p className="text-sm">
              The brand took its name from Van Gogh’s iconic painting,
              'Sunflower', symbolizing warmth, happiness, loyalty, and
              long-lasting connections
            </p>
            <Link
              className="px-5 py-2 rounded-full bg-white mt-1 inline-block text-sm text-secondaryColor capitalize hover:bg-secondaryColor hover:text-white hover:translate-y-1 hover:scale-110 duration-300 shadow-md"
              to=""
            >
              Discover More
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-2/6 overflow-hidden rounded-xl">
          <img
            src="https://i.ibb.co.com/0qmGPNx/image-186.png"
            alt=""
            className="rounded-xl w-full h-60 md:h-88 object-cover hover:scale-105 duration-500"
          />
        </div>
      </div> */}
      {/* Amazing Deals  */}
      {/* <div className="px-6 py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Amazing Deals</h2>
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-normal text-headingColor hover:text-secondaryColor duration-300"
          >
            <span>View All</span> <FaArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 py-4">
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

              <div className="absolute  -right-8 group-hover:right-4 top-4 rounded-full w-7 h-7 text-secondaryColor  z-10  bg-white hover:bg-secondaryColor hover:text-white duration-300 flex justify-center items-center cursor-pointer">
                <p className="text-center text-sm opacity-50 group-hover:opacity-100">
                  <FaHeart />
                </p>
              </div>
              <div
                className="absolute -right-8 group-hover:right-4 top-12 rounded-full w-7 h-7 text-secondaryColor  z-10  bg-white hover:bg-secondaryColor hover:text-white duration-300 flex justify-center items-center cursor-pointer"
                onClick={toggleModal}
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
      </div> */}
      {/* News latter  */}
      {/* <div className="px-6 flex flex-col md:flex-row justify-center items-center gap-5">
        <div className="w-full bg-gradient-to-r from-primaryColor to-secondaryColor animate-floatingBackground py-12 px-12 rounded-md flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="text-center">
            <p className="text-sm">Stay Informed with Our</p>
            <h2 className="text-4xl font-bold text-headingColor">
              Latest News and Updates!
            </h2>

            <form
              action=""
              className="pl-5 pr-2 py-2 bg-white rounded-full mt-5 flex"
            >
              <input
                type="email"
                className="block w-[90%] border-none outline-none text-sm rounded-full pr-2"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-secondaryColor inline-block text-sm text-white capitalize hover:bg- hover:text-white duration-300 shadow-md"
              >
                subscribe
              </button>
            </form>
          </div>
        </div>
      </div> */}

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

export default Landing;
