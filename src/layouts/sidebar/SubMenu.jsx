import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = ({ data, setOpen }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <div
        className={`link ${pathname.includes(data.name) && "text-blue-600"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max text-grayColor" />
        <p className="flex-1 capitalize text-grayColor">{data.name}</p>
        <IoIosArrowDown
          className={` ${
            subMenuOpen && "rotate-180"
          } duration-200  text-grayColor`}
        />
      </div>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.menus?.map((menu) => (
          <li key={menu.id}>
            <NavLink
              onClick={() => setOpen(false)}
              to={`/dashboard/${menu.path}`}
              className=" bg-transparent capitalize text-grayColor "
            >
              {menu.name}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
