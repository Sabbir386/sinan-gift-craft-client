import { useState, useEffect } from "react";
import Product from "../assets/img/cashooz.png";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useDeleteAdminMutation, useViewAdminQuery } from "./adminApi";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const ViewAdminList = () => {
  // Use the Redux query hook to fetch data
  const { data: admins, error, isLoading } = useViewAdminQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  // console.log(admins);
  const [data, setData] = useState([]);

  // Update state when admins data is available
  useEffect(() => {
    if (admins) {
      setData(admins.data);
    }
  }, [admins]);

  const handleDeleteAdmin = async (_id) => {
    // console.log(_id);
    Swal.fire({
      title: "Are you sure you want to delete this Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        try {
          await deleteAdmin(_id).unwrap();
          toast.success("Admin successfully deleted", {
            id: toastId,
            duration: 2000,
          });
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5; // Number of items per page
  const offset = currentPage * pageSize;

  // Handle page click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // If data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching data
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Paginated data
  const paginatedData = data.slice(offset, offset + pageSize);

  return (
    <div className="container mx-auto overflow-auto min-h-screen">
      <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-secondaryColor text-buttonBackground">
          <tr className="text-left">
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              SL.
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Name
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Gender
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              ContactNo
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {paginatedData.map((row, i) => (
            <tr key={row.id}>
              <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white  text-sm">
                {i + 1}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white  text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-lg object-cover"
                      src={Product}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium secbg-secondaryColor text-white space-no-wrap">
                      {row.fullName}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white  text-sm">
                {row.gender}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white  text-sm">
                {row.contactNo}
              </td>

              <td className="px-1 py-2 border-b border-gray-200 bg-secondaryColor text-white  text-sm">
                <div className="flex flex-col md:flex-row gap-1 justify-center items-center">
                  <Link
                    to={`/dashboard/edit-admin/${row._id}`}
                    className="w-7 h-7 grid justify-center items-center bg-blue-500 rounded text-white"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDeleteAdmin(row._id)}
                    className="w-7 h-7 grid justify-center items-center bg-red-500 rounded text-white "
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

export default ViewAdminList;
