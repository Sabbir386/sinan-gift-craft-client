import React, { useEffect, useState } from "react";
import { FaArrowAltCircleDown, FaRegClock, FaEdit } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

import { FaCalendarCheck } from "react-icons/fa";
import { verifyToken } from "../../utils/verifyToken";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Line } from "react-chartjs-2";
import UserDashboard from "./UserDashboard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetPaymentInfoQuery } from "../Payment/paymentApi";
import EditProfile from "./EditProfile";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";
import { useUserMultipleWithdrawalsQuery } from "../Withdrawl/withDrawalApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Jul 30",
    "Aug 02",
    "Aug 05",
    "Aug 08",
    "Aug 11",
    "Aug 14",
    "Aug 17",
    "Aug 20",
    "Aug 23",
    "Aug 26",
  ],
  datasets: [
    {
      label: "Earnings",
      data: [0, 0, 0, 0, 0, 0, 400, 0, 0, 0],
      borderColor: "rgba(16, 185, 129, 1)",
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      tension: 0.1,
      fill: false,
      pointBorderColor: "rgba(16, 185, 129, 1)",
      pointBackgroundColor: "rgba(16, 185, 129, 1)",
      pointHoverBackgroundColor: "rgba(16, 185, 129, 1)",
      pointHoverBorderColor: "rgba(16, 185, 129, 1)",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Recent Earnings (30 days)",
      color: "#ffffff",
    },
  },
  scales: {
    x: {
      ticks: { color: "#94a3b8" },
      grid: { display: false },
    },
    y: {
      ticks: { color: "#94a3b8" },
      grid: {
        color: "#334155",
      },
    },
  },
};

const TabOneComponent = () => (
  <div className="w-full p-4 bg-gray-900 rounded-lg h-72">
    <Line data={data} options={options} />
  </div>
);
const TabTwoComponent = ({ withdrawals }) => (
  <div className="w-full overflow-x-scroll p-4 bg-gray-900 rounded-lg">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="text-xs uppercase text-buttonBackground border-b border-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">
            Method
          </th>
          <th scope="col" className="px-6 py-3">
            Amount
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Wallet Address
          </th>
          <th scope="col" className="px-6 py-3">
            Transaction ID
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Requested Date
          </th>
        </tr>
      </thead>
      <tbody>
        {withdrawals.length > 0 ? (
          withdrawals.map((withdrawal) => (
            <tr key={withdrawal._id} className="bg-gray-800">
              <td className="px-6 py-4 text-white">{withdrawal.method}</td>
              <td className="px-6 py-4 text-white">
                ${withdrawal.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-white">
                {withdrawal.paypalEmail || "N/A"}
              </td>
              <td className="px-6 py-4 text-white">
                {withdrawal.btcAddress || "N/A"}
              </td>
              <td className="px-6 py-4 text-white">
                {withdrawal.transactionId}
              </td>
              <td
                className={`px-6 py-4 ${
                  withdrawal.status === "pending"
                    ? "text-yellow-500"
                    : withdrawal.status === "completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {withdrawal.status.charAt(0).toUpperCase() +
                  withdrawal.status.slice(1)}
              </td>

              <td className="px-6 py-4 text-white">
                {new Date(
                  withdrawal.timestamps.requestedAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))
        ) : (
          <tr className="bg-gray-800">
            <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
              No withdrawal records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
const TabThreeComponent = () => (
  <div className="w-full overflow-x-scroll p-4 bg-gray-900 rounded-lg">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="text-xs uppercase text-buttonBackground border-b border-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">
            Reward Name
          </th>
          <th scope="col" className="px-6 py-3">
            Reward
          </th>
          <th scope="col" className="px-6 py-3">
            Reward Status
          </th>
          <th scope="col" className="px-6 py-3">
            Reward From
          </th>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
        </tr>
      </thead>
      {/* <tbody>
        {payments.length > 0 ? (
          payments.map((payment) => (
            <tr key={payment._id} className="bg-gray-800">
              <td className="px-6 py-4 text-white">{payment.paymentType}</td>
              <td className="px-6 py-4 text-white">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-white">{payment.userEmail}</td>
              <td className="px-6 py-4 text-white">{payment.transactionId}</td>
              <td className="px-6 py-4 text-white">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-green-500">Completed</td>
            </tr>
          ))
        ) : (
          <tr className="bg-gray-800">
            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
              No payment records found
            </td>
          </tr>
        )}
      </tbody> */}
    </table>
  </div>
);
const TabFourComponent = () => (
  <div className="w-full overflow-x-scroll p-4 bg-gray-900 rounded-lg">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="text-xs uppercase text-buttonBackground border-b border-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">
            Survey Name
          </th>
          <th scope="col" className="px-6 py-3">
            Reward
          </th>
          <th scope="col" className="px-6 py-3">
            Reward Status
          </th>
          <th scope="col" className="px-6 py-3">
            Survey Partner
          </th>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
        </tr>
      </thead>
      {/* <tbody>
        {payments.length > 0 ? (
          payments.map((payment) => (
            <tr key={payment._id} className="bg-gray-800">
              <td className="px-6 py-4 text-white">{payment.paymentType}</td>
              <td className="px-6 py-4 text-white">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-white">{payment.userEmail}</td>
              <td className="px-6 py-4 text-white">{payment.transactionId}</td>
              <td className="px-6 py-4 text-white">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-green-500">Completed</td>
            </tr>
          ))
        ) : (
          <tr className="bg-gray-800">
            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
              No payment records found
            </td>
          </tr>
        )}
      </tbody> */}
    </table>
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useAppSelector(useCurrentToken);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  let user;
  if (token) {
    user = verifyToken(token);
    console.log(user?.email);
  }
  // withdraw history

  const {
    data: withdrawalData,
    error: withdrawalError,
    isLoading: isWithdrawalLoading,
  } = useUserMultipleWithdrawalsQuery(user?.email);

  if (isWithdrawalLoading) return <Loader />;
  if (withdrawalError) return <p>Error: {withdrawalError.message}</p>;

  const withdrawals = withdrawalData?.data || [];

  console.log("Fetched withdraw  Data:", withdrawals);

  // Array of components corresponding to each tab
  const tabComponents = [
    <TabOneComponent />,
    <TabTwoComponent withdrawals={withdrawals} />,
    <TabThreeComponent />,
    <TabFourComponent />,
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-cardBackground p-4 rounded-md my-4">
        <div className="py-4 flex flex-col md:flex-row gap-3 justify-between">
          <div>
            <h3 className="text-xl font-bold text-white border-l-4 border-buttonBackground pl-3 ">
              Details Information
            </h3>
          </div>
          <div className="flex flex-col items-center lg:flex-row gap-3">
            <div
              className="flex justify-center items-center gap-2 text-white cursor-pointer"
              onClick={() => toggleModal()}
            >
              <CiSettings className="block hover:rotate-45 transition-transform duration-300" />

              <small className="block">Edit profile</small>
            </div>
            <select
              name=""
              id=""
              className="w-[190px] cursor-pointer bg-transparent border py-2 px-4 rounded-md text-sm text-white text-center"
            >
              <option value="">this year</option>
            </select>
            <button className="w-[190px] bg-buttonBackground px-4 py-3 text-sm text-white rounded-md font-semibold flex items-center justify-center gap-2">
              {" "}
              <span>Download Info</span> <FaArrowAltCircleDown />
            </button>
          </div>
        </div>
        <div className="py-4 flex flex-col lg:flex-row gap-3">
          <div>
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-xl text-white font-bold">
              {user.email.match(/^([^@]*)@/)[1]}
            </h4>
            <div className="flex flex-col md:flex-row gap-10 my-5">
              {/* <div>
                <h5 className="text-gray-300 text-sm font-medium">Role</h5>
                <h6 className="font-semibold text-white text-base capitalize">
                  Backend Dev
                </h6>
              </div> */}
              <div>
                <h5 className="text-gray-300 text-sm font-medium">
                  Phone Number
                </h5>
                <h6 className="font-semibold text-white text-base capitalize">
                  +880 174 093 454
                </h6>
              </div>
              <div>
                <h5 className="text-gray-300 text-sm font-medium">
                  Email Address
                </h5>
                <h6 className="font-semibold text-white text-base capitalize">
                  {user.email}
                </h6>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center justify-start">
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
          <div className="bg-primaryColor text-white flex gap-3 px-4 py-3 rounded-lg">
            <div className="flex justify-center items-center w-12 h-12 bg-secondaryColor rounded-full">
              <FaCalendarCheck />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">309</h5>
              <p className="text-gray-300 text-xs font-semibold">
                Total Attendence
              </p>
            </div>
          </div>
        </div> */}
      </div>

      <UserDashboard />

      <div className="bg-cardBackground p-4 rounded-md my-4">
        <div className="py-4 flex flex-col md:flex-row gap-3 justify-between">
          <div>
            <h3 className="text-xl font-bold text-white border-l-4 border-buttonBackground pl-3 ">
              Information Overview
            </h3>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-4">
            {["Earnings", "Withdraw", "Rewards", "Survey"].map(
              (tabTitle, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 text-sm -mb-px transition-colors duration-300 ease-in-out ${
                    activeTab === index
                      ? "text-buttonBackground bg-buttonBackground bg-opacity-20 border-buttonBackground border-b-2"
                      : "text-gray-400 bg-gray-700 hover:text-buttonBackground hover:bg-buttonBackground hover:bg-opacity-20"
                  }`}
                >
                  {tabTitle}
                </button>
              )
            )}
          </div>
        </div>

        <div className="p-4 mt-4">{tabComponents[activeTab]}</div>
      </div>
      {isModalOpen && (
        <div
          className={`w-full min-h-screen fixed inset-0 bg-black bg-opacity-75 z-[99999] p-0 md:p-6 overflow-y-scroll transition-opacity duration-700 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full md:w-3/4 mx-auto p-3 relative">
            {/* <button
              onClick={handleCloseModal} // This should be bound correctly
              className="text-white text-2xl bg-red-500 w-8 h-8 rounded-full cursor-pointer absolute left-0 z-50"
            >
              ×
            </button> */}
            <EditProfile onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
