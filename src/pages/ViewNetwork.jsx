import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useViewNetworkQuery, useDeleteNetworkMutation } from "./networkApi";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Product from "../assets/img/cashooz.png"; // Make sure this import is necessary for your component

const ViewNetwork = () => {
  const { data: networks, error, isLoading } = useViewNetworkQuery();
  const [deleteNetwork] = useDeleteNetworkMutation();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (networks) {
      setData(networks.data);
    }
  }, [networks]);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const offset = currentPage * pageSize;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this Network?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        try {
          await deleteNetwork(id).unwrap();
          toast.success("Network successfully deleted", {
            id: toastId,
            duration: 2000,
          });
          setData(data.filter((network) => network._id !== id));
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const paginatedData = data.slice(offset, offset + pageSize);

  return (
    <div className="container mx-auto overflow-auto min-h-screen">
      <table className="min-w-full bg-secondaryColor border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-secondaryColor text-buttonBackground">
          <tr className="text-left">
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              SL.
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
              Network Name
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {paginatedData.map((row, i) => (
            <tr key={row._id}>
              <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                {i + 1}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                {row.networkName}
              </td>

              <td className="px-1 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                <div className="flex flex-col md:flex-row gap-1 justify-center items-center">
                  <Link
                    to={`/dashboard/edit-network/${row._id}`}
                    className="w-7 h-7 grid justify-center items-center bg-blue-500 rounded text-white"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(row._id)}
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

export default ViewNetwork;
