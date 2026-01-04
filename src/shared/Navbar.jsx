import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { FaHome, FaLeaf } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import { BiLogIn } from "react-icons/bi";
import { MdInterests, MdDashboardCustomize } from "react-icons/md";
import { IoCropSharp } from "react-icons/io5";
import { GoSignIn } from "react-icons/go";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { RiContactsBook3Line } from "react-icons/ri";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOutUserFunc, loading } = useContext(AuthContext);
  const menuRef = useRef(null);

  // Scroll Effect for Glassmorphism border
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Logout Logic
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Log out?",
        text: "Are you sure you want to sign out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log out",
      });

      if (result.isConfirmed) {
        await signOutUserFunc();
        Swal.fire({
          title: "Logged Out!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = [
    { to: "/", name: "Home", icon: <FaHome /> },
    { to: "/all-crop", name: "Crops", icon: <IoCropSharp /> },
    { to: "/dashboard/my-interests", name: "Interests", icon: <MdInterests /> },
    { to: "/contact", name: "Contact", icon: <RiContactsBook3Line /> },
  ];

  // Reusable NavItem Component
  const NavItem = ({ to, name, icon, mobile = false }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium
        ${
          active
            ? "bg-green-100 text-green-700"
            : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
        } ${mobile ? "w-full" : ""}`}
      >
        <span className="text-lg">{icon}</span>
        <span>{name}</span>
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-green-100 p-2 rounded-full text-green-600 group-hover:rotate-12 transition-transform duration-300">
              <FaLeaf className="text-xl" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              KrishiLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavItem key={link.to} {...link} />
            ))}
            {user && (
              <NavItem
                to="/dashboard"
                name="Dashboard"
                icon={<MdDashboardCustomize />}
              />
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Auth Buttons */}
            {loading ? (
              <div className="w-10 h-10 rounded-full border-2 border-green-500 border-t-transparent animate-spin" />
            ) : user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                <div className="relative group">
                  <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border-2 border-green-500 shadow-sm cursor-pointer"
                  />
                  <span className="absolute top-12 right-0 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {user?.displayName}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2.5 flex items-center gap-1 rounded-md cursor-pointer text-green-600 font-bold bg-green-50 hover:bg-green-100 transition-colors"
                  title="Logout"
                >
                  <CgLogOut className="w-5 h-5" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sm font-semibold text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <GoSignIn /> Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-2xl text-gray-600 hover:text-green-600 transition-colors focus:outline-none"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={menuRef}
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-5 invisible"
        }`}
      >
        <div className="p-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} mobile={true} />
          ))}

          {user && (
            <NavItem
              to="/dashboard"
              name="Dashboard"
              icon={<MdDashboardCustomize />}
              mobile={true}
            />
          )}

          <div className="h-px bg-gray-100 my-2" />

          {/* Mobile Auth Actions */}
          {user ? (
            <div className="flex flex-col gap-4 mt-2 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <img
                  src={user?.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full border border-green-500"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {user?.displayName}
                  </span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow"
              >
                <CgLogOut /> Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-green-600 text-green-600 font-semibold hover:bg-green-50 transition-colors"
              >
                <BiLogIn /> Login
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 shadow transition-colors"
              >
                <GoSignIn /> Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
