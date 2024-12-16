import React, { useEffect, useState } from "react";
import {
  useUpdateWithdrawalStatusMutation,
  useViewWithdrawalsQuery,
} from "./withDrawalApi";
import Swal from "sweetalert2";

const WithdrawlHistory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["all", "completed", "pending", "failed"];
  const [allWithdrawls, setAllWithdrawls] = useState([]);

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useViewWithdrawalsQuery();
  const [updateWithdrawalStatus] = useUpdateWithdrawalStatusMutation();
  useEffect(() => {
    if (apiResponse?.data) {
      console.log(apiResponse?.data);
      setAllWithdrawls(apiResponse.data); // Ensure `data` is an array from API response
    }
  }, [apiResponse]);

  const handleTabClick = (tab, index) => {
    setActiveTab(index);
    if (tab === "all") {
      setAllWithdrawls(apiResponse?.data || []); 
    } else {
      setAllWithdrawls(
        (apiResponse?.data || []).filter((item) => tab === item.status)
      );
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Call the API to update the withdrawal status
      const response = await updateWithdrawalStatus({
        id,
        status: newStatus,
      }).unwrap();
      console.log("Status updated:", response);

      // Show success message using Swal
      Swal.fire({
        title: "Success!",
        text: "Payment successfully Transfered.",
        icon: "success",
        confirmButtonText: "Okay",
        customClass: {
          popup: "swal-popup-success",
        },
        willOpen: () => {
          const swalContainer = document.querySelector(".swal-popup-success");
          if (swalContainer) {
            swalContainer.style.backgroundColor = "#d4edda";
          }
        },
      });

      // Update the state to reflect the new status locally
      setAllWithdrawls((prevWithdrawals) =>
        prevWithdrawals.map((withdrawal) =>
          withdrawal._id === id
            ? { ...withdrawal, status: newStatus }
            : withdrawal
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);

      // Show error message using Swal
      Swal.fire({
        title: "Error!",
        text: "Failed to Trasfer Payment",
        icon: "error",
        confirmButtonText: "Retry",
        customClass: {
          popup: "swal-popup-error",
        },
        willOpen: () => {
          const swalContainer = document.querySelector(".swal-popup-error");
          if (swalContainer) {
            swalContainer.style.backgroundColor = "#f8d7da";
          }
        },
      });
    }
  };

  if (isLoading) {
    return <p>Loading withdrawals...</p>;
  }

  if (isError) {
    return (
      <p>Error fetching withdrawals: {error?.data?.message || error.message}</p>
    );
  }

  return (
    <div className="p-4 min-h-screen">
      <div className="overflow-x-auto bg-secondaryColor shadow-md rounded-lg">
        <div className="flex flex-wrap gap-4 justify-between items-center p-4">
          <ul className="flex flex-wrap gap-4 text-sm font-medium">
            {tabs.map((tab, index) => (
              <li
                key={tab}
                className={`px-4 py-2 cursor-pointer rounded transition duration-200 ${
                  activeTab === index
                    ? "bg-buttonBackground text-white"
                    : "bg-primaryColor text-gray-200 hover:bg-buttonBackground"
                }`}
                onClick={() => handleTabClick(tab, index)}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Past 90 Days</span>
            <span>17 Jun 2021</span>
            <span>15 Sep 2021</span>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          {/* {content[activeTab]} */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600">
                <th className="px-4 py-3">Name/Business</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Invoice ID</th>
                <th className="px-4 py-3">Paypal Email</th>
                <th className="px-4 py-3">Wallet Address</th>
                <th className="px-4 py-3">Network</th>
                <th className="px-4 py-3">description</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              $
              {allWithdrawls.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 group">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div>
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={row.profileImg}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-buttonBackground">
                          {row.userName}
                        </div>
                        <div className="text-gray-300 text-xs  group-hover:text-buttonBackground">
                          ID:{row.userRegisterId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white group-hover:text-buttonBackground">
                      {/* Format the requestedAt date */}
                      {new Date(row.createdAt).toLocaleDateString() || "N/A"}
                    </div>
                    <div className="text-xs text-gray-300 group-hover:text-black">
                      {/* Format the requestedAt time */}
                      {new Date(row.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) || "N/A"}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white group-hover:text-buttonBackground">
                    {row.invoiceId}
                  </td>

                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.paypalEmail ? row.paypalEmail : "N/A"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.method !== "paypal" ? (
                        <div>{row.btcAddress || "N/A"}</div>
                      ) : (
                        <div>N/A</div>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.networkType}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-300 group-hover:text-black">
                      {row.description}
                    </button>
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      row.status === "Completed"
                        ? "text-green-500"
                        : row.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {row.amount}
                  </td>

                  <td className="px-4 py-3">
                    <button className="text-blue-500 hover:underline">
                      {row.method}
                    </button>
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      row.status === "completed"
                        ? "text-green-500"
                        : row.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    <select
                      className="bg-transparent webkit-appearance-none"
                      value={row.status}
                      onChange={(e) =>
                        handleStatusChange(row._id, e.target.value)
                      }
                      disabled={row.status === "completed"}
                    >
                      <option value="failed">Failed</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawlHistory;
