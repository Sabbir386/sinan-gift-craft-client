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
  useLoggedInUserDailycCompletedOfferCountsQuery,
  useLoggedInUserOfferNameandTotalCountsQuery,
  useLoggedUserTotalCompletedOfferQuery,
} from "../dashboardApi";
import { Link } from "react-router-dom";
import "swiper/css";
import { useAppSelector } from "../../redux/features/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";

const UserDashboard = () => {
  const token = useAppSelector(useCurrentToken);

  let userRole;
  let user;
  if (token) {
    user = verifyToken(token);
    userRole = user.role;
  }
  // console.log(user);

  //logged User --......>
  const [CountLoggedUserTotalCompletedOffer, setLoggedUserTotalCompletedOffer] =
    useState(null);
  const {
    data: loggedUserTotalCompletedOffer,
    isLoading: isLoadingloggedUserTotalCompletedOffer,
    error: errorloggedUserTotalCompletedOffer,
  } = useLoggedUserTotalCompletedOfferQuery(
    {},
    { skip: !(userRole === "user" || userRole === "advertiser") }
  );
  //loggedUser Daily
  const [
    CountLoggedInUserDailycCompletedOfferCounts,
    setLoggedInUserDailycCompletedOfferCounts,
  ] = useState(null);
  const {
    data: loggedInUserDailycCompletedOfferCounts,
    isLoading: isLoadingloggedInUserDailycCompletedOfferCounts,
    error: errorloggedInUserDailycCompletedOfferCounts,
  } = useLoggedInUserDailycCompletedOfferCountsQuery(
    {},
    { skip: !(userRole === "user" || userRole === "advertiser") }
  );

  // loogeduser OfferName And total Counts
  const [
    CountLoggedInUserOfferNameandTotalCounts,
    setLoggedInUserOfferNameandTotalCounts,
  ] = useState(null);
  const {
    data: loggedInUserOfferNameandTotalCounts,
    isLoading: isLoadingloggedInUserOfferNameandTotalCounts,
    error: errorloggedInUserOfferNameandTotalCounts,
  } = useLoggedInUserOfferNameandTotalCountsQuery(
    {},
    { skip: !(userRole === "user" || userRole === "advertiser") }
  );

  useEffect(() => {
    if (loggedUserTotalCompletedOffer) {
      console.log(loggedUserTotalCompletedOffer);
      setLoggedUserTotalCompletedOffer(loggedUserTotalCompletedOffer);
    }
    if (loggedInUserDailycCompletedOfferCounts) {
      console.log(loggedInUserDailycCompletedOfferCounts);
      setLoggedInUserDailycCompletedOfferCounts(
        loggedInUserDailycCompletedOfferCounts
      );
    }
    if (loggedInUserOfferNameandTotalCounts) {
      console.log(loggedInUserOfferNameandTotalCounts);
      setLoggedInUserOfferNameandTotalCounts(
        loggedInUserOfferNameandTotalCounts
      );
    }
  }, [
    loggedUserTotalCompletedOffer,
    loggedInUserDailycCompletedOfferCounts,
    loggedInUserOfferNameandTotalCounts,
  ]);

  // const data = countSpecificUserWiseCompletedOffer?.data ?? [];
  let LoggedData = [];
  if (userRole === "user" || userRole === "advertiser") {
    LoggedData = CountLoggedUserTotalCompletedOffer?.data ?? [];
    console.log("loged", LoggedData);
  }
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

  // const data01 = countSpecificOfferWiseCompletedOffer?.data;

  let LoggedDatawithNameAndCount = [];
  if (userRole === "user" || userRole === "advertiser") {
    LoggedDatawithNameAndCount =
      CountLoggedInUserOfferNameandTotalCounts?.data ?? [];
    console.log("logedwithNameData", LoggedDatawithNameAndCount);
  }

  // Check if LoggedDatawithNameAndCount.data exists and is an array
  const transformedLoggedDatawithNameAndCount =
    LoggedDatawithNameAndCount.length > 0 &&
    LoggedDatawithNameAndCount[0]?.offerInfo
      ? LoggedDatawithNameAndCount[0]?.offerInfo?.map((info) => ({
          name: info.offerName,
          value: info.count,
        }))
      : [];
  
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
    <div className="w-full ">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {(userRole === "user" || userRole === "advertiser") && (
          <div className="bg-cardBackground text-white px-4 py-6 rounded shadow-sm">
            <h4 className="font-bold text-">Total Completed Offer</h4>
            {isLoadingloggedUserTotalCompletedOffer && <p>Loading...</p>}
            {errorloggedUserTotalCompletedOffer && (
              <p>Error loading offer data</p>
            )}
            <h5 className="font-semibold text-base">
              {CountLoggedUserTotalCompletedOffer?.data?.length > 0
                ? CountLoggedUserTotalCompletedOffer?.data[0].TotalCount
                : "0"}
            </h5>
          </div>
        )}
        {(userRole === "user" || userRole === "advertiser") && (
          <div className="bg-cardBackground text-white px-4 py-6 rounded shadow-sm">
            <h4 className="font-bold text-">Today Completed Offer</h4>
            {isLoadingloggedInUserDailycCompletedOfferCounts && (
              <p>Loading...</p>
            )}
            {errorloggedInUserDailycCompletedOfferCounts && (
              <p>Error loading offer data</p>
            )}
            <h5 className="font-semibold text-base">
              {CountLoggedInUserDailycCompletedOfferCounts?.data[0]?.TotalCount}
            </h5>
          </div>
        )}
      </div>
      <div className="grid gap-4 mt-5 grid-cols-1 md:grid-cols-2">
        {(userRole === "user" || userRole === "advertiser") && (
          <div className="bg-cardBackground px-4 py-6 rounded shadow-sm">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={transformedData}>
                <XAxis dataKey="date" stroke="#8884d8" />
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
                <Bar dataKey="count" fill="#8884d8" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {(userRole === "user" || userRole === "advertiser") && (
          <div className="bg-cardBackground px-4 py-6 rounded shadow-sm">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart width={400} height={400}>
                <Pie
                  data={transformedLoggedDatawithNameAndCount}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {transformedLoggedDatawithNameAndCount.map((entry, index) => (
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
    </div>
  );
};

export default UserDashboard;
