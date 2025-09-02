import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
const { user, clearUser } = useContext(UserContext);
const navigate = useNavigate();
  return (
 <div className="flex items-center justify-between bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
    {/* Left section */}
    <div className="flex items-center gap-4">
      {/* Burger menu */}
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* App Title */}
      <h2 className="text-lg font-medium text-black">Task Manager</h2>
    </div>

    {/* Right section: Profile Image */}
    <div className="relative">

      <img
        src={user?.profileImageUrl || ""}
        alt="Profile"
        className="w-14 h-14 rounded-full object-cover bg-slate-400"
        onClick={() => navigate("/user/myprofile")}
      />
    </div>

    {/* Side menu overlay */}
    {openSideMenu && (
      <div className="fixed top-[61px] left-0 w-full bg-white shadow-md z-40">
        <SideMenu activeMenu={activeMenu} />
      </div>
    )}
  </div>
  );
};

export default Navbar;
