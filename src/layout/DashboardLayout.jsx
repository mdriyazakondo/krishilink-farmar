import { use, useState } from "react";
import { BsPostcardFill } from "react-icons/bs";
import { FaBars, FaTimes, FaUserCheck } from "react-icons/fa";
import { MdInterests, MdLibraryAdd } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router";
import { AuthContext } from "../context/AuthProvider";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { user } = use(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white  text-gray-700 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Link
          to={"/"}
          className="h-16 flex items-center justify-center text-xl font-bold border-b-2 text-green-600 border-slate-100"
        >
          KrishiLink Farmer
        </Link>
        <nav className="p-4 space-y-2">
          <Link to={"/dashboard"} onClick={() => setOpen(false)}>
            <NavItem
              icon={<FaUserCheck />}
              label="My Profile"
              path="/dashboard"
            />
          </Link>
          <Link to={"/dashboard/addCrop"} onClick={() => setOpen(false)}>
            <NavItem
              icon={<MdLibraryAdd />}
              label="Add Crop"
              path="/dashboard/addCrop"
            />
          </Link>
          <Link to={"/dashboard/my-post"} onClick={() => setOpen(false)}>
            <NavItem
              icon={<BsPostcardFill />}
              label="My Posts"
              path="/dashboard/my-post"
            />
          </Link>
          <Link to={"/dashboard/my-interests"} onClick={() => setOpen(false)}>
            <NavItem
              icon={<MdInterests />}
              label="My Interests"
              path="/dashboard/my-interests"
            />
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Topbar */}
        <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow flex items-center justify-between px-4 z-30">
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <h1 className="font-semibold text-2xl ">My Dashboard </h1>
          <Link to={"/dashboard"}>
            <img
              src={user?.photoURL || "https://i.pravatar.cc/40"}
              alt="user"
              className="w-9 h-9 rounded-full"
            />
          </Link>
        </header>

        {/* Page Content */}
        <main className="pt-20 px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, path }) {
  const location = useLocation();
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg  transition ${
        location.pathname === path && "bg-green-500 text-white"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
