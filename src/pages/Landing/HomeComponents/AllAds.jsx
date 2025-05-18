import React from "react";
import { Link } from "react-router-dom";

const AllAds = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 py-10">
      <div className="w-full h-[500px] relative group overflow-hidden">
        <img
          className="w-full h-full absolute object-cover z-10 group-hover:scale-110 duration-300"
          src="https://images.unsplash.com/photo-1525457136159-8878648a7ad0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="absolute w-full h-full bg-black/25 group-hover:bg-black/50 z-20">
          <div className="absolute bottom-14 left-12 text-white">
            <h4 className="text-xl font-medium">Clearence</h4>
            <h3 className="text-4xl font-bold">Winter Collection</h3>
            <h4 className="text-xl font-medium">by $19.00</h4>
            <Link
              to="/"
              className="inline-block border border-white text-white py-1 px-5 mt-4 hover:bg-white hover:text-black duration-100"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full h-[242px] relative group overflow-hidden">
          <img
            className="w-full h-full absolute object-cover z-10 group-hover:scale-110 duration-300"
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute w-full h-full bg-black/25 group-hover:bg-black/50 z-20">
            <div className="absolute bottom-14 left-12 text-white">
              <h4 className="text-xl font-medium">New Arrivals</h4>
              <h3 className="text-4xl font-bold">Accessories and Wallets</h3>

              <Link
                to="/"
                className="inline-block border border-white text-white py-1 px-5 mt-4 hover:bg-white hover:text-black duration-100"
              >
                Discover Now
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-[242px] relative group overflow-hidden">
          <img
            className="w-full h-full absolute object-cover z-10 group-hover:scale-110 duration-300"
            src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute w-full h-full bg-black/25 group-hover:bg-black/50 z-20">
            <div className="absolute bottom-14 left-12 text-white">
              <h4 className="text-xl font-medium">New Arrivals</h4>
              <h3 className="text-4xl font-bold">Spring 2019
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
      </div>
      <div className="w-full h-[500px] relative group overflow-hidden">
        <img
          className="w-full h-full absolute object-cover z-10 group-hover:scale-110 duration-300"
          src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="absolute w-full h-full bg-black/40 group-hover:bg-black/70 z-20">
          <div className="absolute bottom-14 left-12 text-white">
            <h4 className="text-xl font-medium">On Sale</h4>
            <h3 className="text-4xl font-bold">Women's Sportswear</h3>
        
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
  );
};

export default AllAds;
