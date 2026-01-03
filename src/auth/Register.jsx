import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaLeaf, FaTractor, FaUsers } from "react-icons/fa";

const Register = () => {
  const { createUserFunc, signInGooleUserFunc } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const BACKEND_URL = "https://krishilink-server-three.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!name || !photo || !email || !password) {
      return Swal.fire(
        "Missing Fields ⚠️",
        "Please fill all fields",
        "warning"
      );
    }
    const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRules.test(password)) {
      return Swal.fire(
        "Weak Password ⚠️",
        "Password must contain uppercase, lowercase, number & minimum 6 characters",
        "warning"
      );
    }

    try {
      const result = await createUserFunc(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      const userData = {
        name,
        email,
        photo,
      };

      const response = await fetch(
        "https://krishilink-server-three.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success 🎉", data.message || "User saved to DB", "success");
        navigate(location.state?.from?.pathname || "/");
      } else {
        Swal.fire("Error 😢", data.message || "Failed to save user", "error");
      }
    } catch (error) {
      Swal.fire("Error 😢", error.message, "error");
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInGooleUserFunc();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      // Save to backend
      const response = await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to save user");

      Swal.fire(
        "Login Successful 🎉",
        `Welcome, ${user.displayName || "User"}!`,
        "success"
      );

      // Navigate after backend save
      navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire("Login Failed 😢", error.message, "error");
    }
  };
  return (
    <div className="min-h-[85vh] flex items-center justify-center  px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 ">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white  md:rounded-l-2xl shadow-xl border border-green-100 p-8"
        >
          <h2 className="text-3xl font-bold text-center text-green-700">
            Create Account
          </h2>
          <p className="text-center text-slate-500 mt-1">
            Join KrishiLink Farmer Platform
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              name="photo"
              placeholder="Profile Photo URL"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-slate-500"
              >
                {showPassword ? (
                  <IoEyeOutline size={22} />
                ) : (
                  <FaRegEyeSlash size={22} />
                )}
              </span>
            </div>

            <button className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">
              Create Account
            </button>
          </form>

          <button
            onClick={handleGoogle}
            className="w-full cursor-pointer mt-4 py-3 rounded-lg border border-green-600 text-green-700 font-medium hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            Continue with Google
          </button>

          <p className="text-center text-slate-500 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold">
              Sign In
            </Link>
          </p>
        </motion.div>

        {/* RIGHT – INFORMATION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex flex-col justify-center bg-green-600 text-white rounded-r-2xl p-10"
        >
          <h3 className="text-3xl font-bold mb-6">Why Join KrishiLink?</h3>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <FaLeaf className="text-3xl" />
              <p className="text-lg">
                Connect directly with trusted buyers and sellers
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FaTractor className="text-3xl" />
              <p className="text-lg">
                Manage crops, prices, and interests easily
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FaUsers className="text-3xl" />
              <p className="text-lg">
                Build a strong digital farming community
              </p>
            </div>
          </div>

          <p className="mt-8 text-green-100 text-sm">
            Empowering farmers with technology
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
