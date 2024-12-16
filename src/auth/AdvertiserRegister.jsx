import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCreateAdvertiserMutation } from "../pages/advertiserApi";

const AdvertiserRegister = () => {
  const navigate = useNavigate();
  const [createAdvertiser] = useCreateAdvertiserMutation();
  const defaultValues = {
    name: "Sabbir",
    email: "sabbir333@gmail.com",
    password: "password12345",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Advertiser Registering...");
    try {
      const advertiser = {
        password: data.password,
        advertiser: {
          name: data.name,
          email: data.email,
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
          isDeleted: false
          
        },
      };

       console.log("Registration data:", advertiser);
      await createAdvertiser(advertiser);
      toast.success("Registration successful", { id: toastId, duration: 2000 });
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="bg-secondaryColor h-screen w-full flex justify-center items-center">
      <div className="bg-cardBackground w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded-md">
        <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl">Hello</h1>
          <p className="text-5xl font-extrabold text-buttonBackground">
            Welcome!
          </p>
          <p className="text-5xl font-extrabold text-buttonBackground">
            To Cashooz
          </p>
        </div>
        <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8 rounded-r-md">
          <h3 className="text-3xl font-bold text-buttonBackground mb-4">
          Advertiser Registration
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
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
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: "email is required" })}
                className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="bg-buttonBackground font-bold text-white uppercase focus:outline-none rounded p-3">
              Register
            </button>
          </form>

          <div className="w-full flex justify-between my-5">
            <Link to={"/"} className="text-primaryColor font-semibold text-sm">
              Back to Home
            </Link>
            <Link
              to={"/register"}
              className="text-cardBackground font-semibold text-sm"
            >
              Go to Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserRegister;
