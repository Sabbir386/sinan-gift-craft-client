import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaMinus, FaPlus } from "react-icons/fa";

const faqs = [
  {
    question: "আমি আমার ব্যবসা কোথায় নিবন্ধন করবো?",
    answer:
      "আপনার ব্যবসার ধরণ এবং অবস্থানের উপর নির্ভর করে বিভিন্ন বিকল্প রয়েছে। কর্পোরেট কৌশল উন্নতির জন্য যথাযথ পর্যালোচনা করুন।",
  },
  {
    question: "আমি কি প্রোমোশনাল অফারে আমার পণ্য বিনামূল্যে দিতে পারবো?",
    answer:
      "হ্যাঁ, অনেক ব্যবসা নতুন গ্রাহক আকৃষ্ট করতে এমন অফার প্রদান করে। তবে, কৌশলগত পরিকল্পনা করা গুরুত্বপূর্ণ।",
  },
  {
    question: "আমি কীভাবে নিরাপদে ফাইল ব্যবহার করতে পারবো?",
    answer:
      "আপনার ডিভাইসে অ্যান্টিভাইরাস সফটওয়্যার ব্যবহার করুন এবং নিশ্চিত করুন যে সমস্ত ফাইল নির্ভরযোগ্য সূত্র থেকে এসেছে।",
  },
  {
    question: "কোন ধরণের কোম্পানি পরিমাপ করা হয়?",
    answer:
      "বিভিন্ন কোম্পানির পরিমাপ নির্ভর করে তাদের আকার, রাজস্ব এবং বাজারের অবস্থানের উপর।",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div>
          <p className="text-lg text-gray-500 font-medium">সচরাচর জিজ্ঞাসিত প্রশ্ন</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            আপনার কি কোন প্রশ্ন আছে?
          </h2>
          <p className="text-gray-600 mt-4">
            আপনার ব্যবসা এবং পরিষেবা সম্পর্কে সাধারণ প্রশ্নগুলোর উত্তর এখানে পাবেন।
          </p>
          <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
            যোগাযোগ করুন
          </button>
        </div>

        {/* Right Side (FAQ) */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center px-5 py-4 bg-slate-50 hover:bg-gray-200 transition"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-700">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FaMinus className="text-green-600" />
                ) : (
                  <FaPlus className="text-green-600" />
                )}
              </button>
              <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="p-4 bg-white text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
