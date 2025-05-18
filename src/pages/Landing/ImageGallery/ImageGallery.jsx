import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const images = [
    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/20420560/pexels-photo-20420560/free-photo-of-woman-in-floral-chinese-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/22064216/pexels-photo-22064216/free-photo-of-brunette-woman-wearing-pink-gown.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/25185004/pexels-photo-25185004/free-photo-of-model-in-traditional-blue-dress-with-embroidery-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/25288450/pexels-photo-25288450/free-photo-of-model-in-embroidered-blue-dress-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/20420573/pexels-photo-20420573/free-photo-of-woman-in-shawl-and-traditional-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/27603176/pexels-photo-27603176/free-photo-of-fashion-eastern-dresses-by-dhanno.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/28949643/pexels-photo-28949643/free-photo-of-elegant-pakistani-fashion-model-in-floral-dress.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImage = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 py-20">
          <h2 className="text-3xl font-bold text-green-600 text-center">গ্যালারী</h2>
      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 py-5">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index}`}
            className="w-full h-72 object-cover cursor-pointer rounded-lg shadow-md hover:opacity-80 transition"
            onClick={() => openImage(index)}
          />
        ))}
      </div>

      {/* Full View Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeImage}
        >
          <div
            className="relative max-w-4xl w-full p-4 flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeImage}
            >
              <FaTimes />
            </button>

            {/* Left Navigation */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
              onClick={prevImage}
            >
              <FaChevronLeft />
            </button>

            {/* Image */}
            <img src={selectedImage} alt="Selected" className="h-[50vh] object-fill rounded-lg shadow-lg" />

            {/* Right Navigation */}
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
              onClick={nextImage}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
