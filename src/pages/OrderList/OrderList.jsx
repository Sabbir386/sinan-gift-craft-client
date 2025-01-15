import React, { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import {
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useViewOrdersQuery,
} from "../Landing/OrderApi/orderApi";

const OrderList = () => {
  const { data: ordersData, isLoading, error } = useViewOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        try {
          await deleteOrder(id).unwrap();
          toast.success("Order successfully deleted", { id: toastId });
        } catch (err) {
          toast.error("Failed to delete order", { id: toastId });
        }
      }
    });
  };

  // Handle update
  const handleUpdate = async (id, updatedStatus) => {
    const toastId = toast.loading("Updating...");
    try {
      await updateOrder({ id, status: updatedStatus }).unwrap();
      toast.success("Order successfully updated", { id: toastId });
    } catch (err) {
      toast.error("Failed to update order", { id: toastId });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto text-black shadow-md">
      <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b border-gray-300">SL.</th>
            <th className="py-3 px-4 border-b border-gray-300">Order ID</th>
            <th className="py-3 px-4 border-b border-gray-300">Customer</th>
            <th className="py-3 px-4 border-b border-gray-300">Total Amount</th>
            <th className="py-3 px-4 border-b border-gray-300">Status</th>
            <th className="py-3 px-4 border-b border-gray-300 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordersData?.data.map((order, index) => (
            <tr className="text-center" key={order._id}>
              <td className="px-5 py-2 border-b">{index + 1}</td>
              <td className="px-5 py-2 border-b">{order.orderId}</td>
              <td className="px-5 py-2 border-b">
                {order.userInfo.firstName} {order.userInfo.lastName}
              </td>
              <td className="px-5 py-2 border-b">${order.totalAmount}</td>
              <td className="px-5 py-2 border-b">
                <select
                  className="bg-gray-800 text-white px-2 py-1 rounded"
                  value={order.status}
                  onChange={(e) => handleUpdate(order._id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-5 py-2 border-b">
                <div className="flex flex-row gap-5 justify-center">
                  <button
                    className="w-7 h-7 grid place-content-center bg-blue-500 text-white rounded"
                    onClick={() => console.log("View Details", order._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="w-7 h-7 grid place-content-center bg-red-500 text-white rounded"
                    onClick={() => handleDelete(order._id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
