import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useDeleteSubCategoryMutation, useUpdateSubCategoryMutation, useViewSubCategoriesQuery } from "./subCategoryApi";

const ViewAllSubCategory = () => {
  const { data: subCategories, error, isLoading } = useViewSubCategoriesQuery();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ _id: "", subCategory: "" });

  useEffect(() => {
    if (subCategories) {
      setData(subCategories.data);
    }
  }, [subCategories]);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const offset = currentPage * pageSize;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this SubCategory?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        try {
          await deleteSubCategory(id).unwrap();
          toast.success("SubCategory successfully deleted", {
            id: toastId,
            duration: 2000,
          });
          setData(data.filter((subCategory) => subCategory._id !== id));
        } catch (error) {
          toast.error("Something went wrong", {
            id: toastId,
            duration: 2000,
          });
          console.error("Error:", error);
        }
      }
    });
  };

  const handleEdit = (id) => {
    const subCategoryToEdit = data.find((item) => item._id === id);
    if (subCategoryToEdit) {
      setEditMode(true);
      setEditData({ _id: subCategoryToEdit._id, subCategory: subCategoryToEdit.subCategory });
    }
  };

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating...");
    try {
      await updateSubCategory({ id: editData._id, subCategory: editData.subCategory }).unwrap();
      toast.success("SubCategory successfully updated", {
        id: toastId,
        duration: 2000,
      });
      setData(
        data.map((item) =>
          item._id === editData._id ? { ...item, subCategory: editData.subCategory } : item
        )
      );
      setEditMode(false);
      setEditData({ _id: "", subCategory: "" });
    } catch (error) {
      toast.error("Failed to update SubCategory", {
        id: toastId,
        duration: 2000,
      });
      console.error("Error:", error);
    }
  };
  

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData({ _id: "", subCategory: "" });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const paginatedData = data.slice(offset, offset + pageSize);

  return (
    <div className="container mx-auto overflow-auto min-h-screen">
      {editMode ? (
        <div className="mb-5">
          <h2 className="text-lg font-semibold mb-2">Edit SubCategory</h2>
          <input
            type="text"
            value={editData.subCategory}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, subCategory: e.target.value }))
            }
            className="border rounded px-3 py-2 mr-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Update
          </button>
          <button
            onClick={handleCancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : null}

      <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="text-black">
          <tr className="text-left">
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              SL.
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              SubCategory Name
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-black">
          {paginatedData.map((row, i) => (
            <tr key={row._id}>
              <td className="px-5 py-2 border-b border-gray-200 text-sm">
                {offset + i + 1}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 text-sm">
                {row.subCategory}
              </td>
              <td className="px-1 py-2 border-b border-gray-200 text-sm">
                <div className="flex flex-col md:flex-row gap-1 justify-center items-center">
                  <button
                    onClick={() => handleEdit(row._id)}
                    className="w-7 h-7 grid justify-center items-center bg-blue-500 rounded text-white"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(row._id)}
                    className="w-7 h-7 grid justify-center items-center bg-red-500 rounded text-white"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        className="flex mt-5 gap-3 text-white"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(data.length / pageSize)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ViewAllSubCategory;
