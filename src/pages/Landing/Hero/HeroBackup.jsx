import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
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
import { Link } from "react-router-dom";import {
    FaArrowRight,
    FaBars,
    FaCheck,
    FaEye,
    FaHeart,
    FaStar,
    FaWindowClose,
  } from "react-icons/fa";
  import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

  const imageVariants = {
    enter: { opacity: 0, x: 100 }, // Starts off-screen
    center: { opacity: 1, x: 0 }, // Center position
    exit: { opacity: 0, x: -100 }, // Slides out
  };
  const imageVariantsBanner = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
  };
  const containerVariantsMain = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
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
const HeroBackup = () => {
      const prevButtonRef = useRef(null);
      const nextButtonRef = useRef(null);
      const [activeIndex, setActiveIndex] = useState(0);

      const swiperRef = useRef(null);
  return (
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
  );
};

export default HeroBackup;
