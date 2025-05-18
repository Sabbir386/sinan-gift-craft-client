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

import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useGetAllCategoriesWithProductsQuery } from "./Product/productApi";
import { addToCart } from "../../redux/features/cart/cartSlice";
import FAQSection from "./Faq/FAQSection";
import ImageGallery from "./ImageGallery/ImageGallery";
import HeroSection from "./Hero/HeroSection";
import HeroBackup from "./Hero/HeroBackup";
import Testimonial from "./Testimonial/Testimonial";
import HelpSection from "./HelpSection/HelpSection";
import WhyChooseUs from "./WhyChoseUs/WhyChoseUs";

const Landing = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const { data: categoriesWithProducts, isLoading } =
    useGetAllCategoriesWithProductsQuery();
  console.log("categoriesWithProducts", categoriesWithProducts);

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

  // Animation variants for the slide-in effect

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

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  // Animation variants

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
      <HeroSection />
      {/* banner section  */}
      {/* image gallery  */}
      <ImageGallery />
      {/* image gallery  */}
      {/* All Categories  */}
      <div className="max-w-7xl mx-auto py-10 px-2 xl:px-0">
        <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-green-600 text-center">সকল ক্যাটাগরি</h2>
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
                  // to={"/view-all-category-products/" + category._id}
                  to={"/shop"}
                  className="absolute bottom-5 left-5 z-30  bg-green-600 text-white px-5 py-1"
                >
                  Shop now
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* All Categories  */}
      {/* why chose us  */}
      <WhyChooseUs />
      {/* why chose us  */}
      {/* FAQ section  */}
      <FAQSection />
      {/* FAQ section  */}
      {/* help section  */}
      <HelpSection />
      {/* help section  */}
      {/* testimonial section  */}
      <Testimonial />
      {/* testimonial section  */}
    </div>
  );
};

export default Landing;
