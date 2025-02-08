

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../db/auth";
import { useFormik } from "formik";
import { MdEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import Loginpic from "../../assets/loginpic.svg";
import * as Yup from "yup";
import BeatLoader from "react-spinners/BeatLoader";

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        await login(values.email, values.password);
        navigate("/"); // Redirect to home or profile page upon success
      } catch (err) {
        setError("Invalid email or password. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="space-y-6 relative ">

      {/* Background Blurred Circles */}
      <div className="absolute inset-[20rem] z-1 flex justify-center items-center">
        <div
          className="absolute w-48 h-48 bg-[#f695f960] rounded-full opacity-50 blur-xl"
          style={{ top: "11rem", left: "-5rem" }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-[#eeb8f6] rounded-full opacity-50 blur-xl"
          style={{ top: "-43rem", left: "-6rem" }}
        ></div>
        <div
          className="absolute w-40 h-32 bg-[#f9c1d5b0] rounded-full opacity-[.7] blur-lg"
          style={{ top: "4rem", right: "15rem" }}
        ></div>
                <div
          className="absolute w-32 h-32 bg-[#fad0f8] rounded-full opacity-[.7] blur-lg"
          style={{ top: "-90%", right: "50%" }}
        ></div>
         <div
          className="absolute w-48 h-48 bg-[#cf7ee85a] rounded-full opacity-50 blur-xl"
          style={{ bottom: "-90%", right: "70%" }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-[#c2c6ff7b] rounded-full opacity-50 blur-xl"
          style={{ top: "-45rem", right: "90%" }}
        ></div>
      </div>
      {/* Welcome Message */}
      <div className="flex relative flex-col z-40 items-center">
        <img
          src={Loginpic}
          alt="Login Illustration"
          className="w-3/4 max-w-xs mb-6"
        />
                <p className="text-sm text-gray-500">Welcome Back !</p>
        <h2 className="text-2xl font-semibold text-violet-950">Log In</h2>
      </div>
      <div>
      {error && <p className="text-red-500 text-center relative z-40 mb-4">{error}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-4 z-40">
{/* Email Field */}
<div className="flex flex-col">
  <div className="relative flex items-center">
    <span className="absolute left-3 text-gray-400">
      <MdEmail className=" text-sm text-violet-950" />
    </span>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Enter your email"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}
      autoComplete="email"
      className={`w-full p-3 pl-10 text-base border rounded-full focus:outline-none focus:ring ${
        formik.touched.email && formik.errors.email
          ? "border-red-500 focus:ring-red-600"
          : "border-gray-300 focus:ring-[#8a76db]"
      }`}
    />
  </div>
  <p className="text-red-500 text-xs mt-1">
    {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
  </p>
</div>

{/* Password Field */}
<div className="flex flex-col">
  <div className="relative flex items-center">
    <span className="absolute left-3 text-gray-400">
      <IoMdKey className="text-xl text-violet-950"  />
    </span>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Enter your password"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
      autoComplete="new-password"
      className={`w-full p-3 pl-10 text-base border rounded-full focus:outline-none focus:ring ${
        formik.touched.password && formik.errors.password
          ? "border-red-500 focus:ring-red-600"
          : "border-gray-300 focus:ring-[#8a76db]"
      }`}
    />
  </div>
  <p className="text-red-500 text-xs mt-1">
    {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
  </p>
</div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full z-40 text-base text-white rounded-full py-3 relative ${
            loading
              ? "bg-violet-300 z-40 cursor-not-allowed"
              : "bg-[#cdc1ff] z-40 w-full hover:bg-[#8a76db] focus:ring focus:ring-violet-800"
          }`}
        >
          {loading ? <BeatLoader color="#A78BFA" /> : "Log In"}
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;
