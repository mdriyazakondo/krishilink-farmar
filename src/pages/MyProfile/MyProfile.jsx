import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import LoadingSpinner from "../Loading/Loading";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserEdit,
  FaShieldAlt,
  FaLeaf,
  FaInfoCircle,
  FaCamera,
} from "react-icons/fa";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";

const MyProfile = () => {
  // Note: Using useContext instead of 'use' for better compatibility across React versions
  const { user, loading, setLoading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { users } = useAuth(); // Assuming this returns db user data including role

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const photo = e.target.photo.value.trim();

    setLoading(true);
    try {
      await updateProfile(user, { displayName: name, photoURL: photo });
      setLoading(false);
      setIsOpen(false);

      // Success Alert with Dark Mode Support
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        background: document.documentElement.classList.contains("dark")
          ? "#1e293b"
          : "#fff",
        color: document.documentElement.classList.contains("dark")
          ? "#fff"
          : "#000",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-gray-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Blobs (Glow Effects) */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-300 dark:bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-lime-300 dark:bg-lime-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
        {/* LEFT – PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700 p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Profile{" "}
                <span className="text-green-600 dark:text-green-400">
                  Settings
                </span>
              </h2>
              {/* Role Badge */}
              <span
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border 
                ${
                  users?.role === "admin"
                    ? "bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                    : "bg-green-100 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                }`}
              >
                {users?.role || "User"}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-lg"
                />
              </div>

              <h3 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
                {user?.displayName}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {user?.email}
              </p>

              <div className="mt-6 w-full h-px bg-gray-200 dark:bg-slate-700"></div>
            </div>
          </div>

          <div className="mt-6">
            {!isOpen ? (
              <button
                onClick={() => setIsOpen(true)}
                className="w-full group relative flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-green-500/30 transition-all active:scale-95"
              >
                <FaUserEdit className="text-lg" />
                <span className="font-semibold">Edit Profile</span>
              </button>
            ) : (
              <AnimatePresence>
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleUpdate}
                  className="space-y-4"
                >
                  <div className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">
                        Display Name
                      </label>
                      <input
                        name="name"
                        defaultValue={user?.displayName}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Photo URL Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">
                        Photo URL
                      </label>
                      <div className="relative">
                        <FaCamera className="absolute left-4 top-3.5 text-gray-400" />
                        <input
                          name="photo"
                          defaultValue={user?.photoURL}
                          type="text"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          placeholder="https://example.com/photo.jpg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors shadow-md"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-2.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* RIGHT – INFORMATION PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex flex-col justify-center bg-gradient-to-br from-green-600 to-emerald-700 dark:from-green-900 dark:to-emerald-950 text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Decor */}
          <FaLeaf className="absolute -bottom-10 -right-10 text-9xl text-white/10 rotate-12" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

          <h3 className="text-3xl font-bold mb-8 relative z-10">
            Account Security & Privacy
          </h3>

          <div className="space-y-6 relative z-10">
            <div className="flex gap-4 items-start p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
              <div className="p-2 bg-white/20 rounded-lg">
                <FaShieldAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Secure Authentication</h4>
                <p className="text-green-50 text-sm mt-1 opacity-90">
                  Your account is protected with Google Firebase end-to-end
                  encryption.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
              <div className="p-2 bg-white/20 rounded-lg">
                <FaLeaf className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Community Trust</h4>
                <p className="text-green-50 text-sm mt-1 opacity-90">
                  A complete profile builds trust with other farmers and buyers
                  in the network.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
              <div className="p-2 bg-white/20 rounded-lg">
                <FaInfoCircle className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Identity Visibility</h4>
                <p className="text-green-50 text-sm mt-1 opacity-90">
                  Your profile photo and name help others recognize you in the
                  marketplace.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 text-center relative z-10">
            <p className="text-green-200/60 text-xs tracking-[0.2em] uppercase font-semibold">
              KrishiLink • Secure • Farmer First
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
