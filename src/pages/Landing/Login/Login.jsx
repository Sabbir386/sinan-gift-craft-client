import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../../redux/features/hooks";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { verifyToken } from "../../../utils/verifyToken";
import { setUser } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";
import Sinan from "../../../assets/img/sinan.png";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Login handler
  const loginUser = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    const toastId = toast.loading("Logging in");
    // const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      //  console.log(userInfo)
      const res = await login(userInfo).unwrap(); // Call the login API
      const user = verifyToken(res.data.accessToken); // Decode the JWT

      dispatch(setUser({ user, token: res.data.accessToken })); // Save user to Redux
      toast.success("Logged in", { id: toastId, duration: 2000 });
      console.log(user)
      navigate(user.role === 'superAdmin' ? "/dashboard" : "/my-account");
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong";
      toast.error(errorMessage, { id: toastId, duration: 2000 });
      console.error("Login error:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
         <div className="flex items-center space-x-2 text-green-600 font-bold text-xl">
                           <Link to="/">সিনান গিফট কর্ণার</Link>
                         </div>
        </div>

        {/* Welcome Back Text */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Welcome back</h2>
          <p className="text-gray-500">Please enter your details to sign in.</p>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-1/3 border-b border-gray-300"></div>
          <span className="text-gray-400 px-3">OR</span>
          <div className="w-1/3 border-b border-gray-300"></div>
        </div>

        {/* Input Fields */}
        <form onSubmit={loginUser} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              E-Mail Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email..."
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password Field with Show/Hide Toggle */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Toggle between text and password types
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825L9 12m4.875 6.825l4.875-6.825M9 12L4.125 5.175M9 12l4.875-6.825"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 15.825l4.5-6.45m0 0l4.5 6.45M14.25 9.375H9.75m9 5.625a8.25 8.25 0 11-9-13.875"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-500">
                Remember me
              </label>
            </div>
            <div>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6 text-gray-500">
          Don&apos;t have an account yet?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
