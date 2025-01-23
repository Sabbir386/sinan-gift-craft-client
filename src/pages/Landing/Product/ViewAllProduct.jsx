import React, { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useGetAllProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from "./productApi"; // Adjust import path
import { MdDelete,MdEdit  } from "react-icons/md";

const  ViewAllProduct = () => {
  const { data: productsData, isLoading, error } = useGetAllProductsQuery();
  console.log(productsData)
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalItems = productsData?.data.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Get paginated items
  const paginatedItems = productsData?.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle product deletion
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        try {
          await deleteProduct(id).unwrap();
          toast.success("Product deleted successfully", { id: toastId });
        } catch (err) {
          toast.error("Failed to delete product", { id: toastId });
        }
      }
    });
  };

  // Handle product update
  const handleUpdate = async (id) => {
    Swal.fire({
      title: "Update Product",
      input: "text",
      inputLabel: "Enter updated product name",
      inputPlaceholder: "Product Name",
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const toastId = toast.loading("Updating...");
        try {
          await updateProduct({ id, name: result.value }).unwrap();
          toast.success("Product updated successfully", { id: toastId });
        } catch (err) {
          toast.error("Failed to update product", { id: toastId });
        }
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto text-black shadow-md p-6">
  <h1 className="text-2xl font-bold mb-4">All Products</h1>
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300 rounded-lg">
      <thead>
        <tr>
          <th className="py-3 px-4 border-b border-gray-300">SL.</th>
          <th className="py-3 px-4 border-b border-gray-300">Name</th>
          <th className="py-3 px-4 border-b border-gray-300">Description</th>
          <th className="py-3 px-4 border-b border-gray-300">Price</th>
          <th className="py-3 px-4 border-b border-gray-300">Sale Price</th>
          <th className="py-3 px-4 border-b border-gray-300">Quantity</th>
          <th className="py-3 px-4 border-b border-gray-300">Category</th>
          <th className="py-3 px-4 border-b border-gray-300">Slug</th>
          <th className="py-3 px-4 border-b border-gray-300">SubCategory</th>
          <th className="py-3 px-4 border-b border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedItems?.map((product, index) => (
          <tr key={product._id} className="text-center">
            <td className="px-5 py-2 border-b">
              {(currentPage - 1) * itemsPerPage + index + 1}
            </td>
            <td className="px-5 py-2 border-b">{product.name}</td>
            <td className="px-5 py-2 border-b">{product.description}</td>
            <td className="px-5 py-2 border-b">${product.price.toFixed(2)}</td>
            <td className="px-5 py-2 border-b">${product.salePrice.toFixed(2)}</td>
            <td className="px-5 py-2 border-b">{product.quantity}</td>
            <td className="px-5 py-2 border-b">{product?.category?.categoryName}</td>
            <td className="px-5 py-2 border-b">{product.slug || "N/A"}</td>
            <td className="px-5 py-2 border-b">
              {product.subCategory?.subCategory || "N/A"}
            </td>
            <td className="px-5 py-2 border-b">
              <div className="flex gap-4 justify-center">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleUpdate(product._id)}
                >
                  <MdEdit />
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(product._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {/* Pagination Controls */}
  <div className="flex justify-center items-center mt-4 gap-2">
    <button
      className="bg-gray-500 text-white px-3 py-1 rounded"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      className="bg-gray-500 text-white px-3 py-1 rounded"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
</div>

  );
};

export default ViewAllProduct;
