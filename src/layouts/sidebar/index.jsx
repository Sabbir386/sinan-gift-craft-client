import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import SubMenu from "./SubMenu";
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import {
  HiOutlineUsers,
  HiCurrencyDollar,
  HiChartBar,
  HiColorSwatch,
  HiUser,
  HiAdjustments,
  HiClipboardList,
  HiSparkles,
} from "react-icons/hi";
import { CiBullhorn } from "react-icons/ci";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2";
import { verifyToken } from "../../utils/verifyToken";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const [user, setUser] = useState();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  // useEffect(() => {
  //   if (open) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [open]);

  // const handleClickOutside = (event) => {
  //   if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
  //     setIsOpen(false);
  //   }
  // };

  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    if (token) {
      setUser(verifyToken(token));
    }
  }, [token]);

  let menulist;

  if (user?.role === "admin") {
    menulist = [
      {
        id: "admin-offers",
        name: "Offer's",
        icon: HiAdjustments,
        menus: [
          {
            id: "admin-create-offer",
            path: "create-offer",
            name: "- Create New Offer",
          },
          {
            id: "admin-offer-list",
            path: "offer-list",
            name: "- All Offer List",
          },
        ],
      },
      // {
      //   id: "admin-advertisers",
      //   name: "Advertiser's",
      //   icon: CiBullhorn,
      //   menus: [
      //     {
      //       id: "admin-create-advertiser",
      //       path: "create-advertiser",
      //       name: "- Create Advertiser",
      //     },
      //     {
      //       id: "admin-view-advertiser",
      //       path: "view-advertiser",
      //       name: "- All-Advertiser List",
      //     },
      //   ],
      // },
      {
        id: "admin-users",
        name: "User's",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "admin-create-user",
            path: "create-user",
            name: "- Create User",
          },
          { id: "admin-view-user", path: "view-user", name: "- All-User List" },
        ],
      },
      {
        id: "admin-network",
        name: "Network",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "admin-create-network",
            path: "create-network",
            name: "- Create New Network",
          },
          {
            id: "admin-view-network",
            path: "view-network",
            name: "- All Network List",
          },
        ],
      },
      {
        id: "admin-category",
        name: "Category",
        icon: HiChartBar,
        menus: [
          {
            id: "admin-create-category",
            path: "create-category",
            name: "- Create New Category",
          },
          {
            id: "admin-view-category",
            path: "view-category",
            name: "- All Category List",
          },
        ],
      },
    ];
  } else if (user?.role === "user") {
    menulist = [
      {
        id: "user-offers",
        name: "Offer's",
        icon: HiAdjustments,
        path: "offer-list",
        menus: [
          {
            id: "user-offer-list",
            path: "offer-list",
            name: "- All Offer List",
          },
        ],
      },
      {
        id: "user-Surveys",
        name: "Surveys",
        icon: HiClipboardList,
        path: "survey-list",
      },
      {
        id: "withdraw",
        name: "Withdraw",
        icon: HiCurrencyDollar,
        path: "payment",
      },
      {
        id: "user-Rewards",
        name: "Rewards",
        icon: HiSparkles,
        path: "rewards",
      },
      {
        id: "user-leaderboard",
        name: "Leaderboard",
        icon: HiChartBar,
        path: "leaderboard",
      },
      {
        id: "user-Affiliate",
        name: "Affiliate",
        icon: HiColorSwatch,
        path: "affiliates",
      },
      {
        id: "user-profile",
        name: "Profile",
        icon: HiUser,
        path: "user-profile",
      },
      // {
      //   id: "new-payment",
      //   name: "New Payment",
      //   icon: HiUser,
      //   path: "new-payment",
      // },
      // {
      //   id: "edit-profile",
      //   name: "Edit Profile",
      //   icon: HiUser,
      //   path: "edit-profile",
      // },
    ];
  } else if (user?.role === "advertiser") {
    menulist = [
      {
        id: "advertiser-offers",
        name: "Offer's",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "advertiser-offer-list",
            path: "offer-list",
            name: "- All Offer List",
          },
        ],
      },
    ];
  } else if (user?.role === "superAdmin") {
    menulist = [
      {
        id: "superadmin-offers",
        name: "Offer's",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "superadmin-create-offer",
            path: "create-offer",
            name: "- Create New Offer",
          },
          {
            id: "superadmin-offer-list",
            path: "offer-list",
            name: "- All Offer List",
          },
        ],
      },
      {
        id: "superadmin-admins",
        name: "Admin's",
        icon: BsPerson,
        menus: [
          {
            id: "superadmin-create-admin",
            path: "create-admin",
            name: "- Create Admin",
          },
          {
            id: "superadmin-view-admin",
            path: "view-admin",
            name: "- All-Admin List",
          },
        ],
      },
      {
        id: "superadmin-advertisers",
        name: "Advertiser's",
        icon: CiBullhorn,
        menus: [
          // {
          //   id: "superadmin-create-advertiser",
          //   path: "create-advertiser",
          //   name: "- Create Advertiser",
          // },
          {
            id: "superadmin-view-advertiser",
            path: "view-advertiser",
            name: "- All-Advertiser List",
          },
        ],
      },
      {
        id: "superadmin-users",
        name: "User's",
        icon: HiOutlineUsers,
        menus: [
          // {
          //   id: "superadmin-create-user",
          //   path: "create-user",
          //   name: "- Create User",
          // },
          {
            id: "superadmin-view-user",
            path: "view-user",
            name: "- All-User List",
          },
        ],
      },
      {
        id: "superadmin-network",
        name: "Network",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "superadmin-create-network",
            path: "create-network",
            name: "- Create New Network",
          },
          {
            id: "superadmin-view-network",
            path: "view-network",
            name: "- All Network List",
          },
        ],
      },
      {
        id: "superadmin-category",
        name: "Category",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "superadmin-create-category",
            path: "create-category",
            name: "- Create New Category",
          },
          {
            id: "superadmin-view-category",
            path: "view-category",
            name: "- All Category List",
          },
        ],
      },
      {
        id: "Withdrawl",
        name: "withdrawl",
        icon: HiOutlineUsers,
        menus: [
          {
            id: "superadmin-withdrawl-list",
            path: "withdrawl-list",
            name: "Withdrawl History",
          },
        
        ],
      },
    ];
  }

  const location = useLocation();

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div className="fixed z-[99999]">
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="bg-secondaryColor text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
          <span className="text-buttonBackground font-bold text-4xl whitespace-pre">
            CASHOOZ
          </span>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            <li>
              <Link
                to={"/dashboard"}
                className={`p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium ${
                  location.pathname === "/dashboard"
                    ? "text-grayColor hover:text-buttonBackground"
                    : "text-grayColor hover:text-buttonBackground"
                }`}
                onClick={() => setOpen(false)}
              >
                <AiOutlineAppstore size={23} className="min-w-max" />
                Dashboard
              </Link>
            </li>

            {menulist?.map((menu) =>
              menu?.menus ? (
                <li key={menu.id} className="flex flex-col gap-1 mb-1">
                  <SubMenu data={menu} setOpen={setOpen} />
                </li>
              ) : (
                <li
                  key={menu.id}
                  className="mb-1 text-grayColor hover:text-buttonBackground"
                >
                  <Link
                  onClick={() => setOpen(false)}
                    to={`/dashboard/${menu.path}`}
                    className={`p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium hover:text-buttonBackground hover:bg-hoverBgColor`}
                  >
                    <menu.icon size={23} className="min-w-max" />
                    {menu.name}
                  </Link>
                </li>
              )
            )}
          </ul>

          {open && (
            <div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div className="text-grayColor">
                  <p>Cashooz</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-white py-1.5 px-3 text-xs bg-buttonBackground rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>
        {/* <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div> */}
      </motion.div>
      <div className="m-3 md:hidden text-white" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
