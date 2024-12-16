/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
      },
      colors: {
        primaryColor: "#F8F5F2",
        secondaryColor: "#A36D5D",
        headingColor: "#252B37",
        textColor: "#535862",
        sidebarBackground: "#1e333c",
        grayColor: "#a9a9ca",
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'floatingBackground': "floatingBackground 5s ease infinite",
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% + 16rem))' },
        },
        floatingBackground: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(to top, #224446 0%, #212235 50%)',
        'red-gradient': 'linear-gradient(to top, #402432 0%, #212235 50%)',
        'slate-gradient': 'linear-gradient(to top, #303950 0%, #212235 50%)',
        'gray-gradient': 'linear-gradient(to top, #2B3A4D 0%, #212235 50%)',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1a73e8",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
