import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";

import {
  useSingleNormalUserQuery,
  useUpdateNormalUserMutation,
} from "../redux/features/auth/authApi";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: userData, isLoading } = useSingleNormalUserQuery(id);
  const [updateNormalUser] = useUpdateNormalUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userData) {
      const user = userData.data;
      if (user) {
        setValue("firstName", user.name.firstName);
        setValue("lastName", user.name.lastName);
        setValue("contactNo", user.contactNo);
        setValue("email", user.email);
        setValue("presentAddress", user.presentAddress);
      }
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure you want to update this User?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Updating...");
        try {
          const userInfo = {
            password: data.password,
            normalUser: {
              name: {
                firstName: data.firstName,
                lastName: data.lastName,
              },
              gender: "male", // Assuming gender is available in your data
              email: data.email,
              contactNo: data.contactNo,
              presentAddress: data.presentAddress,
              // You can add other fields as needed
            },
          };

          await updateNormalUser({ id, ...userInfo }).unwrap();
          toast.success("User successfully updated", {
            id: toastId,
            duration: 2000,
          });
          navigate("/dashboard/view-user");
        } catch (error) {
          toast.error("Something went wrong", {
            id: toastId,
            duration: 2000,
          });
          // console.log("Error:", error);
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full py-5 w-full flex justify-center items-center">
      <div className="w-full  flex flex-col md:flex-row items-left mx-5">
        <div className="bg-white w-full flex flex-col items-left py-8 px-8 rounded">
          <h3 className="text-3xl font-bold text-blue-600 mb-4">Edit User</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Phone Number
                </label>
                <input
                  type="number"
                  {...register("contactNo", {
                    required: "Phone Number is required",
                  })}
                  className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
                {errors.contactNo && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactNo.message}
                  </p>
                )}
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Role
                </label>
                <select
                  {...register("role", { required: "Role is required" })}
                  className="w-full p-2 rounded border text-gray-400 focus:outline-none focus:border-blue-600"
                >
                  <option value="user">user</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Address
              </label>
              <textarea
                {...register("presentAddress", {
                  required: "Address is required",
                })}
                className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
              ></textarea>
              {errors.presentAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.presentAddress.message}
                </p>
              )}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 font-bold text-sm text-white focus:outline-none rounded p-2.5 w-32 ml-auto">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
