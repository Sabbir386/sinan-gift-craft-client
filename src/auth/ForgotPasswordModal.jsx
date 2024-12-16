import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useForgetPasswordMutation } from "./loginApi";
import { useNavigate } from "react-router-dom";

const ForgotPasswordModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [forgetPassword, { isLoading, isError, error, isSuccess }] =
    useForgetPasswordMutation();
  const navigate = useNavigate();

  const sendMail = async (data) => {
    const { email } = data; // Extract email from form data
    try {
      // Call the forgetPassword mutation
      const response = await forgetPassword({ email }).unwrap();
      console.log("API Response:", response);

      // Handle success response
      if (response?.success) {
        Swal.fire({
          title: "Success!",
          text: response.message || "Password reset email has been sent.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Redirect to reset link
          navigate("/auth/forgot-password");
        });
      } else {
        // Handle error response
        const errorMessage =
          response?.errorSources?.[0]?.message ||
          "Something went wrong. Please try again.";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Error Details:", err);

      // Handle network or unexpected errors
      const errorMessage =
        err?.data?.errorSources?.[0]?.message ||
        "Something went wrong. Please try again.";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-300 transition-colors duration-200 rounded-full"
          onClick={onClose}
          style={{
            fontSize: "1.5rem",
            width: "2.5rem",
            height: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &times;
        </button>

        {/* Lock Icon */}
        <div className="flex justify-center mb-4">
          <div
            className="p-4 rounded-full"
            style={{ backgroundColor: "#01D676" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-white transition-all duration-300 transform hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m0 0h.008m-.008 0H11.992m2.016 0H12m-7-8V8a5 5 0 0110 0v3m-4 4h3v4H8v-4h3z"
              />
            </svg>
          </div>
        </div>

        {/* Modal Header */}
        <h2 className="text-center text-2xl font-semibold text-white mb-2">
          Forgot your password?
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Enter your registered email below to receive your password reset
          instructions.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(sendMail)}
          className="w-full max-w-md mx-auto mt-10"
        >
          <label className="block text-gray-400 text-sm font-medium mb-1">
            Email
          </label>
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 transition-all duration-200 transform hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.34 5.106a1.5 1.5 0 001.66 0L19 8m-9 8h8m2-8V6a1 1 0 00-1-1H6a1 1 0 00-1 1v2"
                />
              </svg>
            </span>

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 pl-10 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Feedback Messages */}
          {/* {isSuccess && (
            <p className="text-green-500">
              Password reset link sent successfully!
            </p>
          )}
          {isError && (
            <p className="text-red-500">
              {error?.data?.message || "An error occurred. Please try again."}
            </p>
          )} */}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-600 py-2 px-4 rounded-lg text-white hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-lg text-white transition-colors duration-200"
              style={{ backgroundColor: "#01D676" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#01B963")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#01D676")
              }
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Mail"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
