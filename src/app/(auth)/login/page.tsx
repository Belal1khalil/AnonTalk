"use client";
import { useAppDispatch } from "@/hooks/store.hooks";
import { login } from "@/store/features/user.slice";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";
import Link from "next/link";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values))
        .then((res: any) => {

          if (res.payload.message === "success") {
            toast.success("Welcome back!");
            setTimeout(() => {
              router.push("/");
            }, 1000);
          }
        })
        .catch((err) => {
          toast.error("Invalid email or password");
        });
    },
  });

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8 font-sans min-h-[80vh] transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-white/50 dark:border-gray-700/50 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-300 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

        <div className="text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400 font-medium">
            Login to your account to continue
          </p>
        </div>

        <form
          className="mt-8 space-y-6 relative z-10"
          onSubmit={formik.handleSubmit}
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none block w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-200 dark:focus:ring-indigo-800"
                } rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out hover:bg-white dark:hover:bg-gray-600`}
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium italic">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none block w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-200 dark:focus:ring-indigo-800"
                } rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out hover:bg-white dark:hover:bg-gray-600`}
              />
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium italic">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-800 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 active:scale-95"
            >
              Sign In
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors duration-200"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
