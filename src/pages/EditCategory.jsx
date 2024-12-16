import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "./categoryApi";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: categoryData, isLoading } = useGetSingleCategoryQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (categoryData) {
      const category = categoryData.data;
      if (category) {
        setValue("categoryName", category.categoryName);
      }
    }
  }, [categoryData, setValue]);

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure you want to update this Category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Updating...");
        try {
          const categoryInfo = {
            categoryName: data.categoryName,
          };

          await updateCategory({ id, ...categoryInfo }).unwrap();
          toast.success("Category successfully updated", {
            id: toastId,
            duration: 2000,
          });
          navigate("/dashboard/view-category");
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
      <div className="w-full flex flex-col md:flex-row items-center mx-5">
        <div className="bg-white w-full flex flex-col items-center py-8 px-8 rounded">
          <h3 className="text-3xl font-bold text-blue-600 mb-4">
            Edit Category
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Category Name
                </label>
                <input
                  type="text"
                  {...register("categoryName", {
                    required: "Category Name is required",
                  })}
                  className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
                {errors.categoryName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.categoryName.message}
                  </p>
                )}
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 font-bold text-sm text-white focus:outline-none rounded p-2.5 w-32 mr-auto">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
