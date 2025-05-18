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
import { CiShoppingCart } from "react-icons/ci";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Navigation styles
import "swiper/css/pagination"; // Pagination styles
import "swiper/css/thumbs"; // Thumbs styles
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import "swiper/css/free-mode";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useGetAllCategoriesWithProductsQuery } from "./Product/productApi";
import { addToCart } from "../../redux/features/cart/cartSlice";
import AllAds from "./HomeComponents/AllAds";
import Timer from "./HomeComponents/Timer";
import PromoBanner from "./HomeComponents/PromoBanner";
import InfiniteScroll from "./HomeComponents/InfiniteScroll";

const BackupLanding = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const { data: categoriesWithProducts, isLoading } =
    useGetAllCategoriesWithProductsQuery();
  console.log("categoriesWithProducts", categoriesWithProducts);

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
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

  const sliderItems = [
    {
      id: 1,
      backgroundImage: "https://i.ibb.co.com/zxCk7xT/slider3.webp",
      badge: "Spring Sale",
      title: `Fashionable Islami Clothing for Girls`,
      description: "Get 20% off on all products in our store",
      buttonText: { text: "Discover Now", url: "/" },
    },
    {
      id: 2,
      backgroundImage: "https://i.ibb.co.com/s5Ny9cY/slider2.webp",
      badge: "hot item",
      title: `Craft that will Match your life`,
      description: "Get 5% off on all products in our store",
      buttonText: { text: "Shop Now", url: "/" },
    },
    {
      id: 3,
      backgroundImage: "https://i.ibb.co.com/YbywWDX/slider1.webp",
      badge: "Spring Sale",
      title: `Fashionable Islamic Clothing for Girls`,
      description: "Get 20% off on all products in our store",
      buttonText: { text: "Shop Now", url: "/" },
    },
  ];
  const testimonials = [
    {
      name: "আলী আহমেদ",
      position: "প্রতিষ্ঠাতা, ইসলামিক স্টোর",
      image: "https://i.pravatar.cc/150?img=1",
      quote: "গুণমান এবং পরিষেবাটি সত্যিই অসাধারণ। উচ্চভাবে সুপারিশ করছি!",
    },
    {
      name: "ফাতিমা নূর",
      position: "উদ্যোক্তা",
      image: "https://i.pravatar.cc/150?img=2",
      quote: "ইসলামিক পোশাক কেনার সেরা অভিজ্ঞতা। আবারও কিনবো!",
    },
    {
      name: "ওমর হাসান",
      position: "গ্রাহক",
      image: "https://i.pravatar.cc/150?img=3",
      quote: "তাদের ইসলামিক হস্তশিল্পের কারুকাজ সত্যিই চমৎকার।",
    },
    {
      name: "আলী আহমেদ",
      position: "প্রতিষ্ঠাতা, ইসলামিক স্টোর",
      image: "https://i.pravatar.cc/150?img=1",
      quote: "গুণমান এবং পরিষেবাটি সত্যিই অসাধারণ। উচ্চভাবে সুপারিশ করছি!",
    },
    {
      name: "ফাতিমা নূর",
      position: "উদ্যোক্তা",
      image: "https://i.pravatar.cc/150?img=2",
      quote: "ইসলামিক পোশাক কেনার সেরা অভিজ্ঞতা। আবারও কিনবো!",
    },
    {
      name: "ওমর হাসান",
      position: "গ্রাহক",
      image: "https://i.pravatar.cc/150?img=3",
      quote: "তাদের ইসলামিক হস্তশিল্পের কারুকাজ সত্যিই চমৎকার।",
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
    <div className="pb-6">
      {/* banner section  */}
      <div
        className="max-w-full mx-auto relative mt-16
      "
      >
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          spaceBetween={0}
          slidesPerView={1}
          // pagination={{ clickable: true }}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {sliderItems.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="w-full relative h-[90vh] md:h-[70vh] overflow-hidden">
                <motion.img
                  src={item.backgroundImage}
                  alt=""
                  className="absolute top-0 left-0 w-full h-full object-cover  z-10"
                  variants={imageVariantsBanner}
                  initial="hidden"
                  animate={activeIndex === index ? "visible" : "hidden"}
                  exit="exit"
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <div className="absolute top-0 left-0 w-full h-full rounded-md z-20 flex items-center px-16 bg-black bg-opacity-25">
                  <div className="absolute z-40 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4/5 p-5">
                    <motion.div
                      className="text-left"
                      initial="hidden"
                      animate={activeIndex === index ? "visible" : "hidden"}
                      variants={containerVariants}
                    >
                      {/* <motion.span
                        className="px-4 py-2 text-sm text-white bg-primaryColor bg-opacity-50 rounded-full inline-block"
                        variants={textVariants}
                      >
                        {item.badge}
                      </motion.span> */}
                      <h3 className="text-xs font-semibold text-white uppercase">
                        <span className="inline-block h-[2px] w-5 bg-black"></span>{" "}
                        {item.badge}
                      </h3>

                      {/* Text Reveal Animation for Title */}
                      <motion.h1
                        className="text-3xl md:text-5xl font-extrabold text-white mt-2"
                        // variants={containerVariants}
                      >
                        {item.title}
                        {/* {item.title.split("").map((char, i) => (
                          <motion.span key={i} variants={textVariants}>
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))} */}
                      </motion.h1>

                      {/* Text Reveal Animation for Description */}
                      <motion.h2
                        className="text-sm font-semibold text-white/70 mt-2"
                        // variants={containerVariants}
                      >
                        {item.description}
                        {/* {item.description.split("").map((char, i) => (
                          <motion.span key={i} variants={textVariants}>
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))} */}
                      </motion.h2>

                      <motion.div variants={textVariants}>
                        <Link
                          className="px-9 py-4 bg-white mt-5 text-sm text-secondaryColor capitalize hover:bg-secondaryColor hover:text-white duration-300 shadow-md flex justify-center items-center gap-2 w-48"
                          to={item.buttonText.url}
                        >
                          <span>{item.buttonText.text}</span>{" "}
                          <span>
                            <FaArrowRight />
                          </span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Buttons */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
          <button
            ref={prevButtonRef}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent text-secondaryColor rounded-full p-2 bg-white hover:bg-secondaryColor hover:text-white border-[1px] w-10 h-10 flex justify-center items-center duration-300"
          >
            <IoIosArrowForward />
          </button>
          <button
            ref={nextButtonRef}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent text-secondaryColor rounded-full p-2 bg-white hover:bg-secondaryColor hover:text-white border-[1px] w-10 h-10 flex justify-center items-center duration-300"
          >
            <IoIosArrowBack />
          </button>
        </div>
        {/* Custom Pagination */}
        <div className="flex flex-col items-center justify-center gap-2 h-full absolute left-5 top-1/2 -translate-y-1/2 z-30">
          {sliderItems.map((_, index) => (
            <button
              key={index}
              className={`w-5 h-5 flex items-center justify-center rounded-full border-2 border-black transition-all ${
                activeIndex === index ? "scale-110" : "opacity-50"
              }`}
              onClick={() => swiperRef.current?.slideTo(index)}
            >
              {activeIndex === index && (
                <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* banner section  */}
      {/* promo banner  */}
      <PromoBanner />
      {/* promo banner  */}
      {/* Ads section  */}
      <AllAds />
      {/* Ads section  */}

      {/* All Categories  */}
      <div className="max-w-7xl mx-auto py-10 px-2 xl:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-base text-gray-800">Shop by Category</h2>
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-normal text-headingColor hover:text-secondaryColor duration-300"
          >
            <span>View All</span> <FaArrowRight className="-rotate-45" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-2 md:gap-7 py-4">
          {categoriesWithProducts?.data?.map((category, categoryIndex) => (
            <Link key={categoryIndex} to={"/"} className="group">
              <div className="rounded-full relative w-full h-[300px] ">
                <img
                  src={
                    imageArray[Math.floor(Math.random() * imageArray.length)]
                  }
                  alt=""
                  className="absolute top-0 left-0 z-10 object-cover w-full h-full rounded-lg"
                />

                <div className="absolute top-0 left-5 z-20 ">
                  <h4 className="text-center text-base font-bold mt-4 uppercase tracking-wide">
                    {category.categoryName}
                  </h4>
                  <p className="text-center text-base font-base text-gray-600">
                    {category?.products?.length || 0} items
                  </p>
                </div>
                <Link
                  to={"/view-all-category-products/" + category._id}
                  className="absolute bottom-5 left-5 z-30  bg-black text-white px-5 py-1"
                >
                  Shop now
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* All Categories  */}
      {/* Timer Section  */}
      <Timer />
      {/* Timer Section  */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 py-10">
        <div className="w-full h-[300px] relative group overflow-hidden">
          <img
            className="w-full h-full absolute object-cover z-10 group-hover:scale-110 duration-300"
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute w-full h-full bg-black/25 group-hover:bg-black/50 z-20">
            <div className="absolute bottom-14 left-12 text-white">
              <h3 className="text-4xl font-bold">
                Exclusive Fashion Collection
              </h3>

              <Link
                to="/"
                className="inline-block border border-white text-white py-1 px-5 mt-4 hover:bg-white hover:text-black duration-100"
              >
                Discover Now
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-[300px] relative group overflow-hidden">
          <img
            className="w-full h-full absolute object-cover z-10 group-hover:scale-110 duration-300"
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute w-full h-full bg-black/25 group-hover:bg-black/50 z-20">
            <div className="absolute bottom-14 right-12 text-white">
              <h3 className="text-4xl font-bold">Carfts Items</h3>

              <Link
                to="/"
                className="inline-block border border-white text-white py-1 px-5 mt-4 hover:bg-white hover:text-black duration-100"
              >
                Discover Now
              </Link>
            </div>
          </div>
        </div>
      </div>

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
                        className="text-white bg-secondaryColor  w-full px-4 py-3 text-xs absolute -bottom-10 group-hover:bottom-0 duration-300"
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
      {/* infinite scroll  */}
      <InfiniteScroll />
      {/* infinite scroll  */}
      {/* testimonial section  */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-700">
          কাস্টমার রিভিউ
          </h2>
        </div>

        <Swiper
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10 py-5"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-slate-50 shadow-sm rounded-lg px-6 py-12 text-center flex gap-2">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 mx-auto rounded-full"
                />
                <div className="text-left">
                  <div className="flex items-center text-yellow-500 mb-1">
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                  </div>
                  <p className="text-gray-700">"{testimonial.quote}"</p>
                  <div>
                  <h3 className="text-lg font-semibold mt-3">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.position}
                  </p>
                  </div>
                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* testimonial section  */}
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

export default BackupLanding;
