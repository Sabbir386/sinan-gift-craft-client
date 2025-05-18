import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";
import CountUp from "react-countup";

const heroImages = [
  "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/20420560/pexels-photo-20420560/free-photo-of-woman-in-floral-chinese-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/22064216/pexels-photo-22064216/free-photo-of-brunette-woman-wearing-pink-gown.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/25185004/pexels-photo-25185004/free-photo-of-model-in-traditional-blue-dress-with-embroidery-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/25288450/pexels-photo-25288450/free-photo-of-model-in-embroidered-blue-dress-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/20420573/pexels-photo-20420573/free-photo-of-woman-in-shawl-and-traditional-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/27603176/pexels-photo-27603176/free-photo-of-fashion-eastern-dresses-by-dhanno.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/28949643/pexels-photo-28949643/free-photo-of-elegant-pakistani-fashion-model-in-floral-dress.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
];

const HeroSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-10 flex flex-col md:flex-row gap-6 items-center to-black  text-black mt-16">
      {/* Left Text Section */}
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          আবিষ্কার করুন, সংগ্রহ করুন এবং বিক্রি করুন{" "}
          <span className="text-green-600">NFTS</span>
        </h1>
        <p className="text-gray-500 mt-4">
          বৃহত্তম NFT মার্কেটপ্লেস, যেখানে সৃজনশীল ও সত্যিকারের অনন্য ডিজিটাল
          কনটেন্ট তৈরি ও প্রকাশ করা হয় নির্মাতার দ্বারা, যা সম্ভব হয়েছে
          ব্লকচেইন প্রযুক্তির মাধ্যমে।
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
            অন্বেষণ করুন
          </button>
          <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
            যোগাযোগ করুন
          </button>
        </div>

        {/* Stats */}
        <div className="mt-10 flex gap-10 text-gray-300">
          <div>
            <h3 className="text-3xl font-bold text-black"><CountUp end={200} duration={2} />+</h3>
            <p className="text-sm text-gray-700">শিল্পকর্ম</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-black"><CountUp end={40} duration={2} />+</h3>
            <p className="text-sm text-gray-700">বিশ্বব্যাপী ক্লায়েন্ট</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-black"><CountUp end={12} duration={2} />+</h3>
            <p className="text-sm text-gray-700">পুরস্কার</p>
          </div>
        </div>
      </div>
      {/* Right Image Swiper */}
      <div className="w-full md:w-1/2">
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          className="w-full max-w-lg"
        >
          {heroImages.map((src, index) => (
            <SwiperSlide
              key={index}
              className="w-64 transition-all duration-300"
            >
              <img
                src={src}
                alt={`Hero Slide ${index + 1}`}
                className="w-full h-[50vh] object-cover rounded-lg shadow-lg transition-all duration-300 swiper-slide:not(.swiper-slide-active):blur-sm"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSection;
