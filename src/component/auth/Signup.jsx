import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "../../db/auth";
import Signuppic from "../../assets/signinlogo.svg";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoMdKey } from "react-icons/io";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().trim().required("Username is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters.")
      .matches(/\d/, "Password must contain at least one number."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await signup(values.email, values.password, values.username);
        navigate("/");
      } catch (err) {
        setErrors({ submit: "Error creating account. Please try again." });
      } finally {
        setSubmitting(false);
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

      <div className="flex relative flex-col z-40 items-center">
        <img
          src={Signuppic}
          alt="signup Illustration"
          className="w-3/4 max-w-xs mb-6"
        />
        <p className="text-sm text-gray-500">Hi There !</p>
        <h2 className="text-2xl font-semibold text-violet-950">
          Let's Get Started
        </h2>
      </div>
      {formik.errors.submit && (
        <p className="text-red-500 relative z-40 text-center mb-2">
          {formik.errors.submit}
        </p>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4 z-40">

        {/* username field */}
        <div className="flex flex-col">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-400">
              <FaUserAlt className=" text-sm text-violet-950" />
            </span>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...formik.getFieldProps("username")}
              autoComplete="username" 
              className={`w-full p-3 pl-10 text-base border rounded-full focus:outline-none focus:ring  ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500 focus:ring-red-600"
                  : "border-gray-300 focus:ring-[#8a76db]"
              }`}
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.username}
            </p>
          )}
        </div>
        {/* Email field */}
        <div className="flex flex-col">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-400">
              <MdEmail className=" text-sm text-violet-950" />
            </span>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
              autoComplete="email" 
              className={`w-full p-3 pl-10 text-base border rounded-full focus:outline-none focus:ring ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-[#8a76db]"
              }`}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* password field */}
        <div className="flex flex-col">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-400">
              <IoMdKey className="text-xl text-violet-950" />
            </span>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
              autoComplete="new-password"
              className={`w-full p-3 pl-10 text-base border rounded-full focus:outline-none focus:ring ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-600"
                  : "border-gray-300 focus:ring-[#8a76db]"
              }`}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`w-full z-40 text-base rounded-full py-3 relative flex items-center justify-center ${
            formik.isSubmitting
              ? "bg-violet-500 cursor-not-allowed"
              : "bg-violet-300 hover:bg-violet-600 text-white"
          }`}
        >
          {formik.isSubmitting ? <BeatLoader color="#A78BFA" /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
