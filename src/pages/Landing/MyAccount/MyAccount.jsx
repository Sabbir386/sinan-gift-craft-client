import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../redux/features/hooks";
import { useNavigate } from "react-router-dom";
import { logOut, useCurrentToken } from "../../../redux/features/auth/authSlice";
import {
  useGetOrdersByEmailQuery,
  useViewOrdersQuery,
} from "../OrderApi/orderApi";
import Modal from "react-modal";
import { verifyToken } from "../../../utils/verifyToken";

// Modal styles (optional)
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#f3f4f6", // Change to your desired color
    padding: "20px",
  },
};

Modal.setAppElement("#root"); // Required for accessibility
const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
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
  const token = useAppSelector(useCurrentToken);
  const user = token ? verifyToken(token) : null;
  console.log(user)
  const { 
    data: ordersData, 
    isLoading, 
    isError, 
    error 
  } = useGetOrdersByEmailQuery(user?.email, {
    skip: !user?.email, // Skip the query if user or user.email is undefined
  });
  

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (isError) {
    return (
      <div>Error loading orders: {error?.data?.message || error.message}</div>
    );
  }

  const orders = ordersData?.data || []; // Assuming `data` contains the orders list
  console.log(orders);

  console.log(orders);
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

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
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
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
                  <td className="border-b-[1px] text-sm border-gray-300 px-4 py-2">
                    {order.orderId || "N/A"}
                  </td>
                  <td className="border-b-[1px] text-sm border-gray-300 px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString() || "N/A"}
                  </td>
                  <td className="border-b-[1px] text-sm border-gray-300 px-4 py-2">
                    {order.status || "N/A"}
                  </td>
                  <td className="border-b-[1px] text-sm border-gray-300 px-4 py-2">
                    ${order?.totalAmount || "0.00"} - (
                    {order.items?.length || 0} items)
                  </td>
                  <td className="border-b-[1px] text-sm border-gray-300 px-4 py-2">
                    <button
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                      onClick={() => handleViewOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Order Details"
          >
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder.orderId}
            </p>
            <p>
              <strong className="text-blue-500">Status:</strong>{" "}
              {selectedOrder.status}
            </p>
            <p>
              <strong>Total Amount:</strong> ${selectedOrder.totalAmount}
            </p>
            <p>
              <strong>User Info:</strong>{" "}
              {`${selectedOrder.userInfo.firstName} ${selectedOrder.userInfo.lastName}, ${selectedOrder.userInfo.address}, ${selectedOrder.userInfo.city}`}
            </p>
            <h3 className="mt-4 font-semibold">Items:</h3>
            <ul className="list-disc ml-5">
              {selectedOrder.items.map((item, idx) => (
                <li key={idx}>
                  <p>
                    <strong>Product Name:</strong> {item.name},{" "}
                    <strong>Price:</strong> ${item.price},{" "}
                    <strong>Quantity:</strong> {item.quantity}{" "}
                    <strong>Size:</strong>{item.size}{" "} {" "}
                  </p>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
          </Modal>
        )}
      </div>
    ),
    address: <p>Manage your shipping and billing address here.</p>,
    accountDetails: <p>Edit your account details here.</p>,
    wishlist: <p>Your wishlist items will be displayed here.</p>,
    logout: <p>You have logged out.. <button className="cursor-pointer px-3 py-2 rounded-md bg-red-600 text-white" onClick={setLogout}>Logout</button></p>,
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
