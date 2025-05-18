import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
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

const Testimonial = () => {
    const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
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
    return (
        <div className="max-w-7xl mx-auto py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-600">কাস্টমার রিভিউ</h2>
        </div>

        <Swiper
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          slidesPerView={1}
          spaceBetween={30}
          onSlideChange={(swiper) => setActiveTestimonialIndex(swiper.realIndex)}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10 py-5"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-slate-50 shadow-sm rounded-lg px-6 py-12 text-center flex gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 mx-auto rounded-full"
                />
                <div className="text-left">
                  <div className="flex items-center text-yellow-500 mb-3">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
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
        {/* Custom Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonialIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeTestimonialIndex === index ? "bg-green-500 w-4 h-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    );
};

export default Testimonial;