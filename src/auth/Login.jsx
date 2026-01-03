import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaLeaf, FaUsers, FaShieldAlt } from "react-icons/fa";

const Login = () => {
  const { signInUserFunc, signInGooleUserFunc } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUserFunc(email, password)
      .then((result) => {
        Swal.fire(
          "Login Successful 🎉",
          `Welcome, ${result.user.displayName || "User"}!`,
          "success"
        );
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        Swal.fire("Login Failed 😢", error.message, "error");
      });
  };

  const handleGoogle = () => {
    signInGooleUserFunc()
      .then((result) => {
        Swal.fire(
          "Login Successful 🎉",
          `Welcome, ${result.user.displayName || "User"}!`,
          "success"
        );
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        Swal.fire("Login Failed 😢", error.message, "error");
      });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 ">
        {/* LEFT – LOGIN FORM */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-l-2xl shadow-xl border border-green-100 p-8"
        >
          <h2 className="text-3xl font-bold text-center text-green-700">
            Sign In
          </h2>
          <p className="text-center text-slate-500 mt-1">
            Login to your KrishiLink account
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              name="email"
              defaultValue={"mdriyazakondo26@gmail.com"}
              placeholder="Email Address"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                defaultValue={"Riyaz111!"}
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

            <div className="text-right">
              <Link to="/forget" className="text-sm text-green-600 font-medium">
                Forgot password?
              </Link>
            </div>

            <button className="w-full cursor-pointer py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">
              Sign In
            </button>
          </form>

          <button
            onClick={handleGoogle}
            className="w-full mt-4 py-3 cursor-pointer rounded-lg border border-green-600 text-green-700 font-medium hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            Continue with Google
          </button>

          <p className="text-center text-slate-500 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex flex-col justify-center bg-green-600 text-white rounded-r-2xl p-10"
        >
          <h3 className="text-3xl font-bold mb-6">Welcome Back </h3>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <FaLeaf className="text-3xl" />
              <p className="text-lg">
                Stay connected with the farming community
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FaUsers className="text-3xl" />
              <p className="text-lg">Access buyers, sellers & crop interests</p>
            </div>

            <div className="flex items-center gap-4">
              <FaShieldAlt className="text-3xl" />
              <p className="text-lg">Secure & trusted farmer platform</p>
            </div>
          </div>

          <p className="mt-8 text-green-100 text-sm">
            KrishiLink – Smart Farming Starts Here
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
