import React, { useEffect, useState } from "react";

const Timer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-03-01T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="bg-gray-100 px-8 py-20 rounded-lg flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto bg-[url('https://uomo-nextjs-ecommerce.vercel.app/assets/images/deal_timer_bg.jpg')] bg-cover bg-center">
      <div>
        <div className="text-left">
          <p className="text-red-500 font-semibold mb-2 border-l-4 border-red-500 pl-2">
            DEAL OF THE WEEK
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-black">
            SPRING COLLECTION
          </h1>
          <p className="text-black mt-4 underline cursor-pointer">SHOP NOW</p>
        </div>
        <div className="flex space-x-4 text-center mt-6 md:mt-0">
          {["days", "hours", "minutes", "seconds"].map((unit, index) => (
            <div key={index} className="text-black">
              <span className="text-4xl md:text-5xl font-bold">
                {timeLeft[unit] < 10 ? `0${timeLeft[unit]}` : timeLeft[unit]}
              </span>
              <p className="text-sm uppercase text-gray-600">
                {unit.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Timer;
