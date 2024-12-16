import React from "react";

const Card = ({ image, title, description, price, rating }) => {
  return (
    <div className="bg-[#222339] p-4 rounded-lg shadow-lg w-40">
      <img
        src={image}
        alt={title}
        className="w-full h-36 mx-auto object-cover rounded-md"
      />
      <div className="mt-4">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-white text-xl font-bold">${price}</span>
          <div className="flex items-center text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927a1 1 0 011.902 0l1.2 3.681a1 1 0 00.95.69h3.874a1 1 0 01.592 1.805l-3.132 2.26a1 1 0 00-.364 1.118l1.2 3.681a1 1 0 01-1.538 1.118l-3.132-2.26a1 1 0 00-1.176 0l-3.132 2.26a1 1 0 01-1.538-1.118l1.2-3.681a1 1 0 00-.364-1.118L2.333 9.103a1 1 0 01.592-1.805h3.874a1 1 0 00.95-.69l1.2-3.681z" />
            </svg>
            <span className="text-white ml-1">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
