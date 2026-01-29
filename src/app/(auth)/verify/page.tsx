"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/hooks/store.hooks";
import { verifyAccount } from "@/store/features/user.slice";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    otp: yup
      .string()
      .required("OTP is required")
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(verifyAccount(values))
        .then((res: any) => {
          console.log("verify", res);
          if (res.payload.message === "User Verified Successfully") {
            toast.success("Email Verified Successfully");
            setTimeout(() => {
              router.push("/login");
            }, 1500);
          }
        })
        .catch((err) => {
          toast.error("Invalid otp or expire date");
        });
    },
  });

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 font-sans min-h-[80vh]">
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-lg p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

        <div className="text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Verify Your Account
          </h2>
          <p className="mt-3 text-base text-gray-500 font-medium">
            Enter the code sent to your email
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
              className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
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
                placeholder="name@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none block w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out hover:bg-white`}
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium italic">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* OTP */}
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
            >
              Verification Code (OTP)
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength={6}
                placeholder="000000"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`appearance-none block w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                  formik.errors.otp && formik.touched.otp
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out hover:bg-white tracking-[0.5em] text-center font-bold`}
              />
            </div>
            {formik.errors.otp && formik.touched.otp && (
              <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium italic">
                {formik.errors.otp}
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 active:scale-95"
            >
              Verify Account
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200 underline"
                onClick={() => toast.info("Resending code...")}
              >
                Resend OTP
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
