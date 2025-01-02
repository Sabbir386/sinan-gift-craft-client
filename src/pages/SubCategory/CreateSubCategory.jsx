import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useViewCategoryQuery } from "../CategoryApi";
import { useCreateSubCategoryMutation } from "./subCategoryApi";

const CreateSubCategory = () => {
  const { data: categories, error, isLoading } = useViewCategoryQuery();
  const [createSubCategory] = useCreateSubCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const toastId = toast.loading("Creating SubCategory...");
    const subCategoryInfo = {
      categoryId: formData.category,
      subCategory: formData.subCategoryName,
    };

    try {
      await createSubCategory(subCategoryInfo).unwrap();
      toast.success("SubCategory created successfully!", {
        id: toastId,
        duration: 2000,
      });
      reset(); // Reset the form after successful submission
    } catch (err) {
      toast.error("Failed to create SubCategory. Please try again.", {
        id: toastId,
        duration: 2000,
      });
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen">
      <form
        className="p-6 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Dropdown for Categories */}
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-white"
            >
              Select Category
            </label>
            <select
              defaultValue={""}
              {...register("category", { required: "Category is required" })}
              id="category"
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
            >
              <option value="" disabled>
                Choose a Category
              </option>
              {isLoading && <option disabled>Loading categories...</option>}
              {error && <option disabled>Error loading categories</option>}
              {!isLoading &&
                !error &&
                categories?.data?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Input for SubCategory Name */}
          <div>
            <label
              htmlFor="subCategoryName"
              className="block mb-2 text-sm font-medium text-white"
            >
              SubCategory Name
            </label>
            <input
              type="text"
              id="subCategoryName"
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
              placeholder="Subcategory Name"
              {...register("subCategoryName", {
                required: "SubCategory Name is required",
              })}
            />
            {errors.subCategoryName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subCategoryName.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-24 px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSubCategory;
