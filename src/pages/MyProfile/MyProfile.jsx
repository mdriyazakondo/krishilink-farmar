import React, { use, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import LoadingSpinner from "../Loading/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserEdit, FaShieldAlt, FaLeaf, FaInfoCircle } from "react-icons/fa";
import useAuth from "../../hook/useAuth";

const MyProfile = () => {
  const { user, loading, setLoading } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { users } = useAuth();

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const photo = e.target.photo.value.trim();

    setLoading(true);
    updateProfile(user, { displayName: name, photoURL: photo })
      .then(() => {
        setLoading(false);
        setIsOpen(false);
      })
      .catch(() => setLoading(false));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[75vh]  flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT – PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-green-100 p-10"
        >
          <h2 className="text-center text-3xl font-bold mb-6">
            <span className="text-green-600">My</span> Profile
          </h2>

          <div className="flex justify-center mb-2">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover ring-4 ring-green-400 shadow-md"
            />
          </div>

          <div className="text-center mb-6 flex flex-col items-center justify-center">
            <p className="text-center py-1 px-2 w-20 bg-green-100 text-green-600 rounded-full">
              {users?.role}
            </p>
            <h3 className="text-xl font-semibold text-green-700">
              {user.displayName}
            </h3>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>

          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="w-full cursor-pointer flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              <FaUserEdit />
              Edit Profile
            </button>
          )}

          <AnimatePresence>
            {isOpen && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                onSubmit={handleUpdate}
                className="mt-6 space-y-4 overflow-hidden"
              >
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    defaultValue={user.displayName}
                    className="w-full px-4 py-2 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    Photo URL
                  </label>
                  <input
                    name="photo"
                    defaultValue={user.photoURL}
                    className="w-full px-4 py-2 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 cursor-pointer py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT – INFORMATION PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="hidden md:flex flex-col justify-center bg-green-600 text-white rounded-3xl p-10"
        >
          <h3 className="text-3xl font-bold mb-6">Account Information</h3>

          <div className="space-y-5">
            <div className="flex gap-4 items-start">
              <FaShieldAlt className="text-2xl mt-1" />
              <p className="text-lg">
                Your account is secured using Firebase authentication.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <FaLeaf className="text-2xl mt-1" />
              <p className="text-lg">
                Keep your profile updated to build trust with buyers and
                sellers.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <FaInfoCircle className="text-2xl mt-1" />
              <p className="text-lg">
                Profile information helps others identify and connect with you.
              </p>
            </div>
          </div>

          <p className="mt-8 text-green-100 text-sm">
            KrishiLink – Empowering Farmers Digitally
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
