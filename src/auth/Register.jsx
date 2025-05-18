import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UAParser } from "ua-parser-js";
import { useSearchParams } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [registration] = useRegistrationMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [OSdeviceType, setOSdeviceType] = useState("");
  const [country, setCountry] = useState("");
  const [ip, setIP] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [refId, setrefId] = useState("");
  const [searchParams] = useSearchParams();
  // device tracking ip address
  useEffect(() => {
    const getDeviceInfo = async () => {
      const parser = new UAParser();
      const result = parser.getResult();

      const os = result.os.name || "Unknown OS";
      let deviceType = result.device.type || "desktop";
      const browser = result.browser.name || "Unknown Browser";

      const userAgent = navigator.userAgent.toLowerCase();
      let deviceName = "Unknown Device";

      if (userAgent.includes("iphone")) {
        deviceName = "iPhone";
      } else if (userAgent.includes("ipad")) {
        deviceName = "iPad";
      } else if (userAgent.includes("samsung")) {
        deviceName = "Samsung";
      } else if (
        userAgent.includes("xiaomi") ||
        userAgent.includes("redmi") ||
        userAgent.includes("mi")
      ) {
        deviceName = "Xiaomi";
      } else if (userAgent.includes("huawei")) {
        deviceName = "Huawei";
      } else if (userAgent.includes("pixel")) {
        deviceName = "Google Pixel";
      } else if (userAgent.includes("oneplus")) {
        deviceName = "OnePlus";
      } else if (userAgent.includes("nokia")) {
        deviceName = "Nokia";
      } else if (userAgent.includes("sony")) {
        deviceName = "Sony";
      } else if (userAgent.includes("lg")) {
        deviceName = "LG";
      } else if (userAgent.includes("htc")) {
        deviceName = "HTC";
      } else if (userAgent.includes("motorola")) {
        deviceName = "Motorola";
      }

      let deviceInfo = `OS: ${os}, Device Type: ${deviceType}, Device Name: ${deviceName}, Browser: ${browser}`;

      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        if (!ipResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        setIP(ip); // Set IP in state

        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        if (!locationResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const locationData = await locationResponse.json();
        const country = locationData.country_name;
        const countryCode = locationData.country_code;

        deviceInfo += `, IP: ${ip}, Country: ${country}, CountryCode: ${countryCode}`;

        setCountry(country); // Set Country in state
        setCountryCode(countryCode); // Set Country Code in state
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }

      setDeviceInfo(deviceInfo);
      setDeviceType(deviceType);
    };

    getDeviceInfo();

    const refIdFromURL = searchParams.get("refId"); // Extract refId from the URL
    if (refIdFromURL) {
      setrefId(refIdFromURL); // Set refId to state
    }

  }, [searchParams]);

  if (deviceInfo) {
    console.log("Device Info:", deviceInfo);
    console.log("IP:", ip);
    console.log("Country:", country);
  }
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const defaultValues = {
    username: "Sabbir",
    email: "sabbir333@gmail.com",
    password: "password12345",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("User Registering...");

    const normalUser = {
      password: data.password,
      normalUser: {
        name: data.name,
        email: data.email,
        ip: ip,
        country: country,
        designation: "Advertiser manager",
        username: "sharukh Khan",
        gender: "male",
        dateOfBirth: "1985-07-15",
        contactNo: "9876543210",
        emergencyContactNo: "1234567890",
        bloodGroup: "A+",
        presentAddress: "456 Elm Street, Cityville, Country",
        permanentAddress: "789 Maple Avenue, Townsville, Country",
        profileImg: "profile_picture.jpg",
        isDeleted: false,
      },
    };

    console.log(normalUser);

    try {
      const user = await registration(normalUser);

      // Check if response contains an error status
      console.log(user);
      if (user?.error?.status == 409) {
        // Handle specific error messages
        const errorMessage =
          user?.error?.data?.errorSources[0]?.message || "Conflict error.";
        toast.error(errorMessage, {
          id: toastId,
          duration: 2000,
        });
        console.error("Error:", errorMessage);
        return; // Exit the function here to avoid further processing
      }

      // Only log user and show success if registration was successful
      console.log(user);
      toast.success("Registration successful", {
        id: toastId,
        duration: 2000,
      });
      navigate("/login");
    } catch (error) {
      // Handle unexpected errors from the registration process
      toast.error("Something went wrong. Please try again later.", {
        id: toastId,
        duration: 2000,
      });
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="bg-white h-screen w-full flex justify-center items-center">
      <div className="bg-cardBackground w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded-md">
        <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-black">
        <div className="flex items-center space-x-2 text-green-600 font-bold text-xl">
                          <Link to="/">সিনান গিফট কর্ণার</Link>
                        </div>
          <h1 className="text-3xl text-black">Hello</h1>
          <p className="text-5xl font-extrabold text-buttonBackground">
            Welcome!
          </p>
          <p className="text-5xl font-extrabold text-buttonBackground">
            To Sinan
          </p>
        </div>
        <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8 rounded-r-md">
          {/* <h3 className="text-3xl font-bold text-buttonBackground mb-4">
            REGISTER
          </h3> */}
         
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            {/* Name field */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            {/* Email field with format validation */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            {/* Password field with eye icon and strong password hint */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                 
                  
                })}
                className="w-full p-3 pr-10 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
              />
              <span
                className="absolute right-3 top-7 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
             
            </div>

         
            
            <button
            
              className={`font-bold text-white uppercase focus:outline-none rounded p-3 bg-green-600`}
            >
              Register
            </button>
          </form>

          <div className="w-full flex justify-between my-5">
            <Link to={"/"} className="text-black font-semibold text-sm">
              Back to Home
            </Link>
            <div className="text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-buttonBackground text-sm font-bold"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
