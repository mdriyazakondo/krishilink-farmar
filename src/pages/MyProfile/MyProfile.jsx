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
  const { user, loading, setLoading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { users } = useAuth();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const photo = e.target.photo.value.trim();

    setLoading(true);
    try {
      await updateProfile(user, { displayName: name, photoURL: photo });
      setLoading(false);
      setIsOpen(false);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        background: "#fff",
        color: "#000",
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-gray-50 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
        {/* LEFT – PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Profile <span className="text-green-600">Settings</span>
              </h2>
              <span
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                  users?.role === "admin"
                    ? "bg-red-50 text-red-600 border-red-100"
                    : "bg-green-50 text-green-600 border-green-100"
                }`}
              >
                {users?.role || "User"}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-20"></div>
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>

              <h3 className="mt-4 text-xl md:text-2xl font-bold text-gray-800">
                {user?.displayName || "Anonymous User"}
              </h3>
              <p className="text-gray-500 text-sm font-medium">{user?.email}</p>

              <div className="mt-6 w-full h-px bg-gray-100"></div>
            </div>
          </div>

          <div className="mt-6">
            {!isOpen ? (
              <button
                onClick={() => setIsOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition-all active:scale-95 font-semibold"
              >
                <FaUserEdit /> Edit Profile
              </button>
            ) : (
              <AnimatePresence>
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleUpdate}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1 ml-1 uppercase">
                      Display Name
                    </label>
                    <input
                      name="name"
                      defaultValue={user?.displayName}
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1 ml-1 uppercase">
                      Photo URL
                    </label>
                    <div className="relative">
                      <FaCamera className="absolute left-4 top-3.5 text-gray-400" />
                      <input
                        name="photo"
                        defaultValue={user?.photoURL}
                        type="text"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-sm"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-all"
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
          className="hidden md:flex flex-col justify-center bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-3xl p-10 shadow-xl relative overflow-hidden"
        >
          <FaLeaf className="absolute -bottom-10 -right-10 text-9xl text-white/10 rotate-12" />

          <h3 className="text-2xl font-bold mb-8">Account Security</h3>

          <div className="space-y-5">
            {[
              {
                icon: <FaShieldAlt />,
                title: "Secure Auth",
                desc: "Protected by Firebase encryption.",
              },
              {
                icon: <FaLeaf />,
                title: "Farmer Trust",
                desc: "Build trust with a complete profile.",
              },
              {
                icon: <FaInfoCircle />,
                title: "Visibility",
                desc: "Help others recognize you easily.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-start p-4 bg-white/10 rounded-2xl border border-white/5 hover:bg-white/15 transition-all"
              >
                <div className="p-2 bg-white/20 rounded-lg">{item.icon}</div>
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-green-50 text-xs opacity-80">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 text-center">
            <p className="text-green-100/50 text-[10px] tracking-widest uppercase font-bold">
              KrishiLink • Secure Platform
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
