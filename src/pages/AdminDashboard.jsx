import React, { useEffect, useState } from "react";
import { FaCcPaypal, FaCcStripe, FaPaypal, FaStripeS } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Line,
  LineChart,
  Cell,
} from "recharts";
import {
  useCompletedOfferQuery,
  useDateAndOfferWiseCompletedOfferQuery,
  useDateWiseCompletedOfferQuery,
  useLoggedInUserDailycCompletedOfferCountsQuery,
  useLoggedInUserOfferNameandTotalCountsQuery,
  useLoggedUserTotalCompletedOfferQuery,
  useOfferByNetworkQuery,
  usePerDayCompletedOfferQuery,
  useSpecificOfferTotalCountsQuery,
  useSpecificUserTotalOfferCountsQuery,
  useTotalAdminQuery,
  useTotalAdvertiserQuery,
  useTotalOfferQuery,
  useTotalUserQuery,
} from "./dashboardApi";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { useAppSelector } from "../redux/features/hooks";
import { verifyToken } from "../utils/verifyToken";
import { logOut, useCurrentToken } from "../redux/features/auth/authSlice";
import { HiOutlineStar } from "react-icons/hi";
// import SurveyList from "./SurveyList";
import OfferView from "./OfferView/OfferView";
import { useGetAllPaymentsQuery } from "./Leaderboard/leaderBoardApi";
const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [cpaOffers, setCpaOffers] = useState([]);

  //moments js on dashbaord top
  const { data: paymentsResponse, error, isLoading } = useGetAllPaymentsQuery();
  const paymentsData = paymentsResponse?.payments || [];
  console.log(paymentsData);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          "https://www.cpalead.com/api/offers?id=2184269&limit=15"
        );
        const data = await response.json();
        console.log("Fetched data:", data);
        setCpaOffers(data.offers ? data.offers.slice(0, 15) : []); // Adjust according to the actual data structure
      } catch (error) {
        console.error("Error fetching the offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const token = useAppSelector(useCurrentToken);

  let userRole;
  let user;
  if (token) {
    user = verifyToken(token);
    userRole = user.role;
  }
  // console.log(user);
  const [countTotalOffer, setCountTotalOffer] = useState(null);
  const {
    data: totalOffer,
    isLoading: isLoadingOffer,
    error: errorOffer,
  } = useTotalOfferQuery(
    {},
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  const [countCompletedOffer, setCountCompletedOffer] = useState(null);
  const {
    data: completedOffer,
    isLoading: isLoadingCompleted,
    error: errorCompleted,
  } = useCompletedOfferQuery(
    {},
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  const [countTotalAdmin, setCountTotalAdmin] = useState(null);
  const {
    data: totalAdmins,
    isLoading: isLoadingAdmins,
    error: errorAdmins,
  } = useTotalAdminQuery(
    {},
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  const [countTotalUser, setCountTotalUser] = useState(null);
  const {
    data: totalUsers,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useTotalUserQuery(
    {},
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  const [countTotalAdvertiser, setCountTotalAdvertiser] = useState(null);
  const {
    data: totalAdvertisers,
    isLoading: isLoadingAdvertisers,
    error: errorAdvertisers,
  } = useTotalAdvertiserQuery(
    {},
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  //dateWiseCompletedOfferCount
  const [countDateWiseCompletedOffer, setCountDateWiseCompletedOffer] =
    useState(null);
  const {
    data: dateWiseCompletedOffer,
    isLoading: isLoadingdateWiseCompletedOffer,
    error: errordateWiseCompletedOffer,
  } = useDateWiseCompletedOfferQuery(
    {},
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  //date + offer+ user wise completed Offer
  const [
    countDateandOfferandUserWiseCompletedOffer,
    setCountDateandOfferandUserWiseCompletedOffer,
  ] = useState(null);
  const {
    data: dateAndOfferAnduserWiseCompletedOffer,
    isLoading: isLoadingdateAndOfferAnduserWiseCompletedOffer,
    error: errordateAndOfferAnduserWiseCompletedOffer,
  } = useDateAndOfferWiseCompletedOfferQuery(
    {},
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  //specific-user-total-offer-counts
  const [
    countSpecificUserWiseCompletedOffer,
    setCountSpecificUserWiseCompletedOffer,
  ] = useState(null);
  const {
    data: specificUserWiseCompletedOffer,
    isLoading: isLoadingspecificUserWiseCompletedOffer,
    error: errorspecificUserWiseCompletedOffer,
  } = useSpecificUserTotalOfferCountsQuery(
    {},
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  //specific-offer-total-counts
  const [
    countSpecificOfferWiseCompletedOffer,
    setCountSpecificOfferWiseCompletedOffer,
  ] = useState(null);
  const {
    data: specificOfferWiseCompletedOffer,
    isLoading: isLoadingspecificOfferWiseCompletedOffer,
    error: errorspecificOfferWiseCompletedOffer,
  } = useSpecificOfferTotalCountsQuery(
    {},
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  //Per Day Completed Offer
  const [countPerDayCompletedOffer, setCountPerDayCompletedOffer] =
    useState(null);
  const {
    data: regularCompletedOffer,
    isLoading: isLoadingregularCompletedOffer,
    error: errorregularCompletedOffer,
  } = usePerDayCompletedOfferQuery(
    {},
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );

  //logged User --......>

  useEffect(() => {
    if (totalOffer && totalOffer.meta) {
      setCountTotalOffer(totalOffer.meta.total);
    }
    if (completedOffer && completedOffer.meta) {
      setCountCompletedOffer(completedOffer.meta.total);
    }
    if (totalAdmins && totalAdmins.meta) {
      setCountTotalAdmin(totalAdmins.meta.total);
    }
    if (totalUsers && totalUsers.meta) {
      setCountTotalUser(totalUsers.meta.total);
    }
    if (totalAdvertisers && totalAdvertisers.meta) {
      setCountTotalAdvertiser(totalAdvertisers.meta.total);
    }
    if (regularCompletedOffer) {
      console.log(regularCompletedOffer);
      setCountPerDayCompletedOffer(regularCompletedOffer);
    }
    if (dateWiseCompletedOffer) {
      console.log(dateWiseCompletedOffer);
      setCountDateWiseCompletedOffer(dateWiseCompletedOffer);
    }
    if (dateAndOfferAnduserWiseCompletedOffer) {
      console.log(dateAndOfferAnduserWiseCompletedOffer);
      setCountDateandOfferandUserWiseCompletedOffer(
        dateAndOfferAnduserWiseCompletedOffer
      );
    }
    if (specificUserWiseCompletedOffer) {
      console.log(specificUserWiseCompletedOffer);
      setCountSpecificUserWiseCompletedOffer(specificUserWiseCompletedOffer);
    }
    if (specificOfferWiseCompletedOffer) {
      console.log(specificOfferWiseCompletedOffer);
      setCountSpecificOfferWiseCompletedOffer(specificOfferWiseCompletedOffer);
    }
  }, [
    totalOffer,
    completedOffer,
    totalAdmins,
    totalUsers,
    totalAdvertisers,
    dateWiseCompletedOffer,
    dateAndOfferAnduserWiseCompletedOffer,
    specificUserWiseCompletedOffer,
    regularCompletedOffer,
    specificOfferWiseCompletedOffer,
  ]);

  const data = countSpecificUserWiseCompletedOffer?.data ?? [];
  let LoggedData = [];
  // if (userRole === "user" || userRole === "advertiser") {
  //   LoggedData = CountLoggedUserTotalCompletedOffer?.data ?? [];
  //   console.log("loged", LoggedData);
  // }
  const transformedData = LoggedData.flatMap((entry) =>
    entry.offerInfo.map((info) => ({
      date: info.date,
      count: info.count,
    }))
  );

  const data2 = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const data01 = countSpecificOfferWiseCompletedOffer?.data;

  let LoggedDatawithNameAndCount = [];
  // if (userRole === "user" || userRole === "advertiser") {
  //   LoggedDatawithNameAndCount =
  //     CountLoggedInUserOfferNameandTotalCounts?.data ?? [];
  //   console.log("logedwithNameData", LoggedDatawithNameAndCount);
  // }

  // Check if LoggedDatawithNameAndCount.data exists and is an array
  const transformedLoggedDatawithNameAndCount =
    LoggedDatawithNameAndCount.length > 0 &&
    LoggedDatawithNameAndCount[0]?.offerInfo
      ? LoggedDatawithNameAndCount[0]?.offerInfo?.map((info) => ({
          name: info.offerName,
          value: info.count,
        }))
      : [];
  if (LoggedDatawithNameAndCount) {
    console.log("daa", transformedLoggedDatawithNameAndCount);
  }
  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
    { name: "B3", value: 40 },
    { name: "B4", value: 30 },
    { name: "B5", value: 50 },
    { name: "C1", value: 100 },
    { name: "C2", value: 200 },
    { name: "D1", value: 150 },
    { name: "D2", value: 50 },
  ];

  const lineData = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="container mx-auto">
      <div className="overflow-hidden mt-4 mb-6 z-[97]">
        <div className="text-white p-2 rounded shadow-sm inline-flex flex-nowrap gap-5 overflow-hidden animate-infinite-scroll">
          {paymentsData.map((payment, index) => (
            <div
              key={payment._id}
              className="w-[200px] flex gap-3 justify-center items-center border-r-2"
            >
              {/* Conditionally render icons based on paymentType */}
              <div>
                <div className="w-8 h-8 grid justify-center items-center rounded bg-secondaryColor">
                  {
                    payment.paymentType === "paypal" ? (
                      <FaCcPaypal />
                    ) : payment.paymentType === "stripe" ? (
                      <FaCcStripe />
                    ) : payment.name ? (
                      payment.name.charAt(0)
                    ) : (
                      "C"
                    ) // Default to initials if no match
                  }
                </div>
              </div>

              {/* Display first name */}
              <div>
                <h5 className="text-sm">
                  {payment.name ? payment.name.split(" ")[0] : "Unknown"}
                </h5>
                <h6 className="text-xs mt-1">{payment.paymentType}</h6>
              </div>

              {/* Display payment amount */}
              <div>
                <span className="px-4 py-2 bg-secondaryColor rounded text-buttonBackground">
                  ${parseFloat(payment.amount / 100).toFixed(2)}{" "}
                  {/* Convert amount to dollars */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {(userRole === "admin" || userRole === "superAdmin") && (
          <div className="bg-cardBackground text-white px-4 py-6 rounded shadow-sm">
            <h4 className="font-bold text-xl">Total Offer</h4>
            {isLoadingOffer && <p>Loading...</p>}
            {errorOffer && <p>Error loading offer data</p>}
            <h5 className="font-semibold text-base">{countTotalOffer}</h5>
          </div>
        )}

        {(userRole === "admin" || userRole === "superAdmin") && (
          <div className="bg-secondaryColor text-white px-4 py-6 rounded shadow-sm">
            <h4 className="font-bold text-">All Completed Offer</h4>
            {isLoadingCompleted && <p>Loading...</p>}
            {errorCompleted && <p>Error loading offer data</p>}
            <h5 className="font-semibold text-base">{countCompletedOffer}</h5>
          </div>
        )}

        {(userRole === "admin" || userRole === "superAdmin") && (
          <div className="bg-secondaryColor text-white px-4 py-6 rounded shadow-sm">
            <h4 className="font-bold text-xl">Total Admin</h4>
            {isLoadingAdmins && <p>Loading...</p>}
            {errorAdmins && <p>Error loading offer data</p>}
            <h5 className="font-semibold text-base">{countTotalAdmin}</h5>
          </div>
        )}

        {(userRole === "admin" || userRole === "superAdmin") && (
          <div className="bg-secondaryColor text-white px-4 py-6 rounded shadow-sm">
            <h4 className="font-bold text-">Total User</h4>
            {isLoadingUsers && <p>Loading...</p>}
            {errorUsers && <p>Error loading offer data</p>}
            <h5 className="font-semibold text-base">{countTotalUser}</h5>
          </div>
        )}

        {(userRole === "admin" || userRole === "superAdmin") && (
          <div className="bg-secondaryColor text-white px-4 py-6 rounded shadow-sm">
            <h4 className="font-bold text-xl">Total Advertiser</h4>
            {isLoadingAdvertisers && <p>Loading...</p>}
            {errorAdvertisers && <p>Error loading offer data</p>}
            <h5 className="font-semibold text-base">
              {countTotalAdvertiser ? countTotalAdvertiser : "0"}
            </h5>
          </div>
        )}

        {(userRole === "admin" || userRole === "superAdmin") && (
          <div className="bg-secondaryColor text-white px-4 py-6 rounded shadow-sm">
            <h4 className="font-bold text-xl">Today Completed Offer</h4>
            <h5 className="font-semibold text-base">
              {regularCompletedOffer?.data[0]?.TotalCount}
            </h5>
          </div>
        )}
      </div>
      <div className="grid gap-4 mt-5 grid-cols-1 md:grid-cols-2">
        {(userRole === "admin" || userRole === "superAdmin") && (
          <div className="bg-cardBackground px-4 py-6 rounded shadow-sm">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="id" stroke="#8884d8" />
                <YAxis />
                <Tooltip
                  wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                />
                <Legend
                  width={100}
                  wrapperStyle={{
                    top: 40,
                    right: 20,
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #d5d5d5",
                    borderRadius: 3,
                    lineHeight: "40px",
                  }}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="TotalCount" fill="#8884d8" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {(userRole === "admin" || userRole === "superAdmin") && (
          <div className="bg-secondaryColor px-4 py-6 rounded shadow-sm">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart width={400} height={400}>
                <Pie
                  data={data01}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="TotalCount"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="grid gap-4 mt-5 grid-cols-1 md:grid-cols-2">
        {(userRole === "admin" || userRole === "superAdmin") && (
          <div
            style={{ width: "100%", height: 300 }}
            className="bg-secondaryColor px-4 py-6 rounded shadow-sm mt-5"
          >
            <ResponsiveContainer>
              <AreaChart
                data={countDateWiseCompletedOffer?.data.offerInfo}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        {(userRole === "admin" || userRole === "superAdmin") && (
          <div className="bg-secondaryColor px-4 py-6 rounded shadow-sm mt-5 overflow-x-auto">
            <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-secondaryColor text-white">
                <tr className="text-left">
                  <th className="py-3 px-4 uppercase font-semibold text-sm bg-secondaryColor border-b border-gray-300">
                    No.
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm bg-secondaryColor border-b border-gray-300">
                    Offer
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm bg-secondaryColor border-b border-gray-300">
                    Completed
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm bg-secondaryColor border-b border-gray-300">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {countDateandOfferandUserWiseCompletedOffer?.data
                  .slice(0, 3)
                  .map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                        {idx + 1}
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-xs">
                        {row.name}
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                        {row.count}
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                        {row.date}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <OfferView></OfferView>

      <div className="hidden w-full bg-white px-4 py-6 rounded shadow-sm my-5">
        <Swiper
          className="w-full"
          spaceBetween={50}
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 2,
            },
            1024: {
              width: 768,
              slidesPerView: 3,
            },
          }}
        >
          {cpaOffers &&
            cpaOffers.map((offer, index) => (
              <SwiperSlide key={index} className="w-full">
                <div className="w-full border p-3 rounded-md shadow-sm">
                  <h3 className="font-bold text-base">{offer.title}</h3>
                  <p className="text-sm font-semibold">{offer.description}</p>
                  <p className="text-xs font-semibold">
                    {offer.amount} {offer.payout_currency}
                  </p>
                  <Link to={offer.link} className="text-xs font-medium">
                    See campaign
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AdminDashboard;
