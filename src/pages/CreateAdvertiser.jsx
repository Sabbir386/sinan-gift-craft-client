import { useNavigate } from "react-router-dom";
import { useCreateAdvertiserMutation } from "./advertiserApi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const CreateAdvertiser = () => {
  const navigate = useNavigate();
  const [createAdvertiser] = useCreateAdvertiserMutation();
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
    const toastId = toast.loading("Advertiser Registering...");
    try {
      const advertiserInfo = {
        password: data.password,
        advertiser: {
          name: {
            firstName: data.firstName,
            middleName: "xyz",
            lastName: data.lastName,
          },
          gender: "male",
          email: data.email,
          contactNo: data.contactNo,
          presentAddress: data.presentAddress,
          designation: data.designation,
          emergencyContactNo: "01578458458",
          bloodGroup: "A-",
          role:'adverstiser',
          permanentAddress: "456 Second Avenue, Town, Country",
        },
      };

      // console.log("Registration data:", advertiserInfo);
      await createAdvertiser(advertiserInfo);
      toast.success("Registration successful", { id: toastId, duration: 2000 });
      //   navigate("/login");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="h-full py-5 w-full flex justify-center items-center">
        <div className="w-full flex flex-col md:flex-row items-left mx-5">
          <div className="bg-secondaryColor w-full flex flex-col items-left py-8 px-8 rounded">
            <h3 className="text-2xl text-white font-bold mb-4">
              Create Advertiser{" "}
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              action="#"
              className="w-full flex flex-col justify-center"
            >
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Due"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                    className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    {...register("contactNo", {
                      required: "Phone Number is required",
                    })}
                    className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Designation
                  </label>
                  <select
                    {...register("designation", {
                      required: "designation is required",
                    })}
                    id="advertiser"
                    className="w-full p-2 rounded border text-gray-400 focus:outline-none focus:border-blue-600"
                  >
                    <option selected>advertiser</option>
                    <option value="advertiser">advertiser</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Address
                </label>
                <textarea
                  name=""
                  id=""
                  placeholder="Address"
                  {...register("presentAddress", {
                    required: "Address is required",
                  })}
                  className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                ></textarea>
              </div>
              <div className="mb-2 flex">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="remember"
                  className="block mb-2 ml-1 text-sm font-medium text-white"
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
              <button className="ml-auto text-white bg-buttonBackground hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-24 px-5 py-2.5 text-center dark:bg-buttonBackground dark:hover:bg-green-500 dark:focus:ring-blue-800">
                Submit
              </button>
              <div className=""></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdvertiser;
