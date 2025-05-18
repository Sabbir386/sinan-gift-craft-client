import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const HelpSection = () => {
  return (
    <div className="relative w-full h-72 bg-[url('https://images.unsplash.com/photo-1680345575909-99633d4b6f46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center py-16 px-4 md:px-10">
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-75 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            সাহায্য প্রয়োজন?
          </h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            যেকোন জিজ্ঞাসা ও জরুরী সমস্যায় কল করুন আমাদের হেল্পলাইন অথবা নক
            করুন আমাদের হোয়াটসঅ্যাপ বা ফেসবুক পেজে। আমরা আছি সকাল ১০ টা থেকে
            রাত ৮ টা পর্যন্ত আপনার সেবায়।
          </p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-600 transition">
              <FaPhoneAlt /> হেল্পলাইন
            </button>
            <button className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition">
              <FaWhatsapp /> WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
