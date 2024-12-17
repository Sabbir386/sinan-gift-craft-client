import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../redux/features/hooks";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../redux/features/auth/authSlice";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
    const dispatch = useAppDispatch();
  const setLogout = () => {
      Swal.fire({
        title: "Are you sure you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log out!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logOut());
          navigate("/login");
        }
      });
    };
  const orders = [
    {
      id: "#123",
      date: "August 1, 2024",
      status: "On hold",
      total: "$200.0 for 1 items",
    },
    {
      id: "#345",
      date: "August 2, 2024",
      status: "On hold",
      total: "$300.0 for 1 items",
    },
    {
      id: "#567",
      date: "August 3, 2024",
      status: "On hold",
      total: "$400.0 for 1 items",
    },
  ];
  // Define content for each tab
  const tabContent = {
    dashboard: (
      <div>
        <h2 className="text-xl font-bold">Hello Sinan</h2>
        <p className="text-sm mt-2">
          From your account dashboard, you can view your{" "}
          <a href="#" className="text-red-500 underline">
            recent orders
          </a>
          , manage your{" "}
          <a href="#" className="text-red-500 underline">
            shipping and billing address
          </a>
          , and{" "}
          <a href="#" className="text-red-500 underline">
            edit your password and account details
          </a>
          .
        </p>
      </div>
    ),
    orders: (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="border-b-[1px] border-gray-300 px-4 py-5 text-base text-left">
                Order
              </th>
              <th className="border-b-[1px] border-gray-300 px-4 py-5 text-base text-left">
                Date
              </th>
              <th className="border-b-[1px] border-gray-300 px-4 py-5 text-base text-left">
                Status
              </th>
              <th className="border-b-[1px] border-gray-300 px-4 py-5 text-base text-left">
                Total
              </th>
              <th className="border-b-[1px] border-gray-300 px-4 py-5 text-base text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b-[1px] text-sm border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border-b-[1px] text-sm border-gray-300 px-4 py-2">
                  {order.date}
                </td>
                <td className="border-b-[1px] text-sm border-gray-300 px-4 py-2">
                  {order.status}
                </td>
                <td className="border-b-[1px] text-sm border-gray-300 px-4 py-2">
                  {order.total}
                </td>
                <td className="border-b-[1px] text-sm border-gray-300 px-4 py-2">
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    address: <p>Manage your shipping and billing address here.</p>,
    accountDetails: <p>Edit your account details here.</p>,
    wishlist: <p>Your wishlist items will be displayed here.</p>,
    logout: <p onClick={setLogout}>You have logged out..Click Here</p>,
  
    
  };
  return (
    <div className="flex flex-col md:flex-row py-5  gap-4 px-6 mx-auto w-full max-w-7xl">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-1/4 bg-white border rounded-md shadow-lg">
        <ul className="space-y-1">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "orders", label: "Orders" },
            { id: "address", label: "Address" },
            { id: "accountDetails", label: "Account Details" },
            { id: "wishlist", label: "Wishlist" },
            { id: "logout", label: "Logout" },
          ].map((tab) => (
            <li
              key={tab.id}
              className={`px-4 py-2 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-gray-100 text-red-500 font-bold"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="w-full md:w-3/4 bg-white border rounded-md shadow-lg p-6">
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default MyAccount;
