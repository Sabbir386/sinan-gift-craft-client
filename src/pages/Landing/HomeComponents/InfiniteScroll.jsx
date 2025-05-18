import React, { useEffect, useRef } from "react";

const InfiniteScroll = () => {
  const scrollContainerRef = useRef(null);
  const scrollSpeed = 1; // Adjust this to control scrolling speed

  const items = [
    {
      name: "PayPal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
    {
      name: "Stripe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    },
    {
      name: "Apple Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
    },
    {
      name: "Google Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
    },
    {
      name: "Bitcoin",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg",
    },
    {
      name: "Litecoin",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Litecoin_Logo.jpg",
    },
    {
      name: "Ethereum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg",
    },
    {
      name: "Dogecoin",
      logo: "https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png",
    },
  ];

  const duplicatedItems = [...items, ...items]; // Duplicate the items for seamless scrolling

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const scrollStep = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset scroll position to create seamless scrolling
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth / 2
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scrollStep, 20); // Adjust interval for smoothness

    return () => clearInterval(interval);
  }, [scrollSpeed]);

  return (
    <div className="max-w-7xl mx-auto my-4 py-5">
      <h3 className="text-center text-2xl font-bold">Trusted Partner</h3>
      <div
        ref={scrollContainerRef}
        className="overflow-x-hidden whitespace-nowrap scrollbar-hide w-full p-4"
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          gap: "50px",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <img
            key={index}
            src={item.logo}
            alt={item.name}
            className="inline-block w-20 h-20 object-scale-down"
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
