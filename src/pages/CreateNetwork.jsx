import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateNetworkMutation } from "./NetworkApi";

const CreateNetwork = () => {
  const [CreateNetwork] = useCreateNetworkMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Network Creating....");

    try {
      const networkInfo = {
        networkName: data.networkName,
      };
      // console.log(networkInfo);
      await CreateNetwork(networkInfo);
      // reset();
      toast.success("Successfully Network Created", {
        id: toastId,
        duration: 2000,
      });

      // navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      // console.log("err-", error);
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <form
          className="bg-secondaryColor p-6 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Network Name
              </label>
              <input
                type="text"
                id="networkName"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="network"
                required
                {...register("networkName", {
                  required: "network is Required",
                })}
              />
            </div>
          </div>{" "}
          {/* Closing the grid gap div */}
          <button
            type="submit"
            className="ml-auto text-white bg-buttonBackground hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-24 px-5 py-2.5 text-center dark:bg-buttonBackground dark:hover:bg-green-500 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNetwork;
