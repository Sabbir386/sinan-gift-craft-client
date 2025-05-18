import { FaMedal, FaCrown, FaRedo, FaTruck } from "react-icons/fa";

const WhyChooseUs = () => {
  const services = [
    {
      icon: <FaMedal className="text-green-500 text-4xl" />,
      title: "অথেনটিক প্রোডাক্ট",
      description:
        "আমাদের কাছেই পাচ্ছেন সেরা স্বাদ যুক্ত খোলনলার অথেনটিক দেশীয় চুঁর্মা।",
    },
    {
      icon: <FaCrown className="text-green-500 text-4xl" />,
      title: "প্রিমিয়াম কোয়ালিটি",
      description:
        "রেগুলার বা অপরিচিত নয়, আমরা দিচ্ছি বাছাইকৃত প্রিমিয়াম কোয়ালিটির চুঁর্মা।",
    },
    {
      icon: <FaRedo className="text-green-500 text-4xl" />,
      title: "রিফান্ড পলিসি",
      description:
        "যেকোন ক্লোজড প্যাকেজে প্রোডাক্ট ক্রয় থাকলে প্রোডাক্ট অথবা টাকা রিফান্ডের সুবিধা।",
    },
    {
      icon: <FaTruck className="text-green-500 text-4xl" />,
      title: "ক্যাশ অন ডেলিভারী",
      description:
        "আমাদের রয়েছে পণ্য হাতে পেয়ে তারপর টাকা পরিশোধ করার সুবিধা।",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 md:px-10 text-center">
      <h2 className="text-3xl font-bold text-green-600 text-center">কেন আমরাই সেরা</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white d p-6 rounded-lg flex flex-col items-center text-center group"
          >
            <div className="bg-slate-50 group-hover:bg-slate-100 p-4 rounded-lg">{service.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700 group-hover:text-green-600">
              {service.title}
            </h3>
            <p className="mt-2 text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
