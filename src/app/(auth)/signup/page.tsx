"use client";
import { useAppDispatch } from "@/hooks/store.hooks";
import { signUp } from "@/store/features/user.slice";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(\+2)?0(10|11|12|15)[0-9]{8}$/;

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("Name is required")
      .min(3, "firstName must be at least 3 characters")
      .max(10, "firstName must be at most 10 characters"),
    lastName: yup
      .string()
      .required("lastName is required")
      .min(3, "lastName must be at least 3 characters")
      .max(10, "lastName must be at most 10 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    gender: yup
      .string()
      .required("Gender is Required")
      .oneOf(["male", "female"], "select a valid gender"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(
        phoneRegex,
        "Please enter a valid Egyptian phone number (e.g. +201XXXXXXXX)",
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signUp(values))
        .then((res: any) => {
          if (res.payload.status == 201) {
            toast.success("Account Created Successfully , Check Your Email");
            setTimeout(() => {
              router.push("/verify");
            }, 1500);
          }
        })
        .catch((err: any) => {
          console.log("err", err);
        });
    },
  });

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-9 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl w-full space-y-8 bg-white/90 backdrop-blur-lg p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

        <div className="text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="mt-3 text-base text-gray-500 font-medium">
            Join our community and start your journey
          </p>
        </div>

        <form
          className="mt-8 space-y-6 relative z-10"
          onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none block w-full px-4 py-3 bg-gray-50 border ${
                  formik.errors.firstName && formik.touched.firstName
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out hover:bg-white`}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-fadeIn">
                  * {formik.errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none block w-full px-4 py-3 bg-gray-50 border ${
                  formik.errors.lastName && formik.touched.lastName
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out hover:bg-white`}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-fadeIn">
                  * {formik.errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`appearance-none block w-full px-4 py-3 bg-gray-50 border ${
                formik.errors.email && formik.touched.email
                  ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
              } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out hover:bg-white`}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-fadeIn">
                * {formik.errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+201XXXXXXXX"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`appearance-none block w-full px-4 py-3 bg-gray-50 border ${
                formik.errors.phone && formik.touched.phone
                  ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
              } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out hover:bg-white`}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-fadeIn">
                * {formik.errors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`appearance-none block w-full px-4 py-3 bg-gray-50 border ${
                formik.errors.password && formik.touched.password
                  ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
              } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out hover:bg-white`}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-fadeIn">
                * {formik.errors.password}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
            >
              Gender
            </label>
            <div className="relative">
              <select
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none block w-full px-4 py-3 bg-gray-50 border ${
                  formik.errors.gender && formik.touched.gender
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out hover:bg-white`}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {formik.errors.gender && formik.touched.gender && (
              <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-fadeIn">
                * {formik.errors.gender}
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 active:scale-95"
            >
              create account
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
