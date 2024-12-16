import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaCommentsDollar,
  FaRegUser,
  FaUnlink,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import {
  logOut,
  setUser,
  useCurrentToken,
} from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Link } from "react-router-dom";
import { FaCommentDollar } from "react-icons/fa";
import DashboardFooter from "./sidebar/DashboardFooter";
import { useRef } from "react";
import { useUserTotalRewardsQuery } from "../rewards/rewardApi";
function RootLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState("bg-transparent");
  const dropdownRef = useRef(null);
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
    console.log(user);
  }
  const {
    data: totalRewards,
    error,
    isLoading,
  } = useUserTotalRewardsQuery(user?.objectId, {
    skip: user?.role !== 'user', 
  });
  
  console.log(totalRewards);

  useEffect(() => {
    if (token) {
      setUser(verifyToken(token));
    }
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBgColor("bg-secondaryColor"); // Change color when scrolled
      } else {
        setBgColor("bg-transparent"); // Default color
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [token,dispatch]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const setLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logOut());
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="min-h-screen ml-0 md:ml-[16rem] flex-1 mx-auto py-4 w-5 md:w-[100% - 16rem] bg-primaryColor px-3 relative">
        <div
          className={`flex justify-end items-center space-x-4 fixed top-0 left-0 w-full h-16 px-4 z-[990] ${bgColor}`}
        >
          {/* Balance Display */}
          <div
  className="flex items-center space-x-2 p-2 rounded-md"
  style={{ backgroundColor: "#141523" }}
>
  <FaCommentsDollar className="text-white text-2xl font-bold" />
  {user?.role === 'user' && (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
        <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-5 h-5 animate-spin"></div>
      </div>
      ) : error ? (
        <span className="text-white">Error</span>
      ) : (
        <span className="text-buttonBackground animate-pulse font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        {totalRewards?.userTotalRewards || "0"} CZ
      </span>
      )}
    </>
  )}
</div>

          {/* Profile and Dropdown */}
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              {/* Profile Image */}
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="https://i.ibb.co.com/5j1jKyC/images.png" // Replace with your profile image URL
                alt="Profile"
              />
              {/* Username */}
              <span className="text-white font-medium">
                {user ? user.name : "Sabbir"}
              </span>
              <FaAngleDown className="text-white" />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-cardBackground ring-1 ring-black ring-opacity-5 z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-2" role="none">
                  <Link
                    to="/dashboard/user-profile"
                    className="flex gap-4 items-center px-4 py-2 text-sm text-white hover:text-buttonBackground border-b-[0.5px] border-b-buttonBackground"
                    role="menuitem"
                  >
                    <FaRegUser />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={setLogout}
                    className="w-full flex gap-3 items-center mx-auto px-4 py-2 text-sm text-red-400 text-left cursor-pointer duration-200 "
                  >
                    <FaUnlink />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="min-h-screen mt-16 pb-10 relative">
          <Outlet></Outlet>
        </div>
        <DashboardFooter></DashboardFooter>
      </main>
    </div>
  );
}

export default RootLayout;
