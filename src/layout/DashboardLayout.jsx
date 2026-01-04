import { useContext, useState } from "react";
import { BsPostcardFill } from "react-icons/bs";
import { FaBars, FaTimes, FaUser, FaUserCheck, FaLeaf } from "react-icons/fa";
import { MdInterests, MdLibraryAdd, MdLibraryAddCheck } from "react-icons/md";
import { FiArrowLeft, FiLogOut } from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { user, signOutUserFunc } = useContext(AuthContext);
  const { users } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Logout Handler
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Log out?",
        text: "Are you sure you want to end your session?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log out",
      });

      if (result.isConfirmed) {
        await signOutUserFunc();
        navigate("/");
        Swal.fire({
          title: "Logged Out!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Overlay for mobile sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 
        bg-white border-r border-gray-200 
        flex flex-col transform transition-all duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100 shrink-0">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-green-600 p-1.5 rounded-lg text-white shadow-lg shadow-green-500/30">
              <FaLeaf size={18} />
            </div>
            <span className="text-xl font-bold text-gray-800">
              KrishiLink <span className="text-green-600">Farmer</span>
            </span>
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 mt-4 overflow-y-auto">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            Main Dashboard
          </p>

          <SidebarLink
            to="/dashboard"
            icon={<FaUserCheck />}
            label="My Profile"
            onClick={() => setOpen(false)}
          />

          {users?.role === "admin" && (
            <>
              <SidebarLink
                to="/dashboard/overview"
                icon={<MdLibraryAddCheck />}
                label="Overview"
                onClick={() => setOpen(false)}
              />
              <SidebarLink
                to="/dashboard/addCrop"
                icon={<MdLibraryAdd />}
                label="Add New Crop"
                onClick={() => setOpen(false)}
              />
              <SidebarLink
                to="/dashboard/my-post"
                icon={<BsPostcardFill />}
                label="Manage Posts"
                onClick={() => setOpen(false)}
              />
              <SidebarLink
                to="/dashboard/all-users"
                icon={<FaUser />}
                label="User Management"
                onClick={() => setOpen(false)}
              />
            </>
          )}

          <SidebarLink
            to="/dashboard/my-interests"
            icon={<MdInterests />}
            label="My Interests"
            onClick={() => setOpen(false)}
          />
        </nav>

        {/* Sidebar Bottom Actions */}
        <div className="p-4 border-t border-gray-100 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-green-600 hover:bg-green-50 transition-all font-medium"
          >
            <FiArrowLeft /> <span>Back to Home</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-semibold"
          >
            <FiLogOut /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-72 flex flex-col">
        {/* Header / Topbar */}
        <header
          className="sticky top-0 right-0 h-20 bg-white/80 backdrop-blur-md
          border-b border-gray-100 flex items-center justify-between px-6 z-30"
        >
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-lg bg-gray-100 text-gray-600"
              onClick={() => setOpen(!open)}
            >
              {open ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <h1 className="font-extrabold text-xl text-gray-800 hidden sm:block tracking-tight">
              {getPageTitle(location.pathname)}
            </h1>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full border border-gray-200">
            <img
              src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
              alt="user"
              className="w-8 h-8 rounded-full border border-white object-cover"
            />
            <div className="hidden lg:flex flex-col leading-none">
              <span className="text-xs font-bold text-gray-800">
                {user?.displayName || "Farmer"}
              </span>
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-0.5">
                {users?.role || "Member"}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, label, onClick }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link to={to} onClick={onClick}>
      <div
        className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium
        ${
          active
            ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
            : "text-gray-600 hover:bg-green-50 hover:text-green-600"
        }`}
      >
        <span
          className={`text-xl ${
            active ? "text-white" : "text-gray-400 group-hover:text-green-600"
          }`}
        >
          {icon}
        </span>
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
}

function getPageTitle(pathname) {
  if (pathname === "/dashboard") return "Profile Overview";
  if (pathname.includes("addCrop")) return "Post New Crop";
  if (pathname.includes("my-post")) return "My Published Posts";
  if (pathname.includes("my-interests")) return "My Interest List";
  if (pathname.includes("all-users")) return "System Users";
  return "Dashboard";
}
