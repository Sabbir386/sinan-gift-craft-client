import { useState, useEffect } from "react";
import Product from "../assets/img/cashooz.png";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";
import {
  useDeleteOfferMutation,
  useSingleOfferQuery,
  useToggleOfferStatusMutation, 
  useViewOfferQuery,
} from "./offerApi";
import UAParser from "ua-parser-js";
import { detect } from "detect-browser";
import { useCreateCompletedOfferMutation } from "./completedOfferApi";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { useAppSelector } from "../redux/features/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import Swal from "sweetalert2";
import ReactModal from "react-modal";
import "./modal/ModalStyles.css";
import OfferView from "./OfferView/OfferView";
import Loader from "../components/Loader";

const OfferList = () => {
  const [data, setData] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [OSdeviceType, setOSdeviceType] = useState("");
  const [country, setCountry] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [offerStatus, setOfferStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const token = useAppSelector(useCurrentToken);
  const pageSize = 5;
  const [deleteOffer] = useDeleteOfferMutation();
  const [toggleOfferStatus] = useToggleOfferStatusMutation();
  const offset = currentPage * pageSize;

  const handleToggle = async (id) => {
    try {
      await toggleOfferStatus({ id });
      // Optionally, handle additional logic after successful mutation
    } catch (error) {
      console.error("Failed to toggle offer status:", error);
    }
  };
  const {
    data: offersForAdmin,
    isLoadingOffersForAdmin,
    isFetchingOffersForAdmin,
  } = useViewOfferQuery(
    {
      offerStatus,
    },
    { skip: !(userRole === "superAdmin" || userRole === "admin") }
  );
  // // console.log(data);
  const {
    data: offers,
    isLoading,
    isFetching,
    refetch,
  } = useViewOfferQuery(
    {
      offerStatus,
      device: OSdeviceType,
      CountryCode,
      role: userRole,
    },
    { skip: !(userRole === "user" || userRole === "advertiser") }
  );
  if (offersForAdmin) {
    console.log(offersForAdmin);
  }
  useEffect(() => {
    if (token) {
      const user = verifyToken(token);
      // console.log(user);
      setUserRole(user?.role);
      // console.log("offerlist", user?.role);
    }

    const getDeviceInfo = async () => {
      const parser = new UAParser();
      const result = parser.getResult();

      const os = result.os.name || "Unknown OS";
      let deviceType = result.device.type || "desktop";
      const browser = result.browser.name || "Unknown Browser";

      const userAgent = navigator.userAgent.toLowerCase();
      let deviceName = "Unknown Device";

      if (userAgent.includes("iphone")) {
        deviceName = "iPhone";
      } else if (userAgent.includes("ipad")) {
        deviceName = "iPad";
      } else if (userAgent.includes("samsung")) {
        deviceName = "Samsung";
      } else if (
        userAgent.includes("xiaomi") ||
        userAgent.includes("redmi") ||
        userAgent.includes("mi")
      ) {
        deviceName = "Xiaomi";
      } else if (userAgent.includes("huawei")) {
        deviceName = "Huawei";
      } else if (userAgent.includes("pixel")) {
        deviceName = "Google Pixel";
      } else if (userAgent.includes("oneplus")) {
        deviceName = "OnePlus";
      } else if (userAgent.includes("nokia")) {
        deviceName = "Nokia";
      } else if (userAgent.includes("sony")) {
        deviceName = "Sony";
      } else if (userAgent.includes("lg")) {
        deviceName = "LG";
      } else if (userAgent.includes("htc")) {
        deviceName = "HTC";
      } else if (userAgent.includes("motorola")) {
        deviceName = "Motorola";
      }

      let deviceInfo = `OS: ${os}, Device Type: ${deviceType}, Device Name: ${deviceName}, Browser: ${browser}`;

      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        if (!ipResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        if (!locationResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const locationData = await locationResponse.json();
        const country = locationData.country_name;
        const countryCode = locationData.country_code;

        deviceInfo += `, IP: ${ip}, Country: ${country}, CountryCode: ${countryCode}`;
        setCountry(country);
        setCountryCode(CountryCode);
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }

      setDeviceInfo(deviceInfo);
      setDeviceType(deviceType);
      setOSdeviceType(os);
    };

    if (offersForAdmin) {
      setData(offersForAdmin.data);
    }
    if (offers) {
      setData(offers.data);
    }

    getDeviceInfo();
  }, [token, offersForAdmin, offers]);

  if (deviceInfo) {
    // console.log(OSdeviceType);
  }
  // const [createCompletedOffer] = useCreateCompletedOfferMutation();
  const handleDeleteOffer = async (_id) => {
    // console.log(_id);
    Swal.fire({
      title: "Are you sure you want to delete this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        try {
          await deleteOffer(_id).unwrap();
          toast.success("Offer successfully deleted", {
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
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  // Call the hook only if selectedOfferId is set
  const { data: singleOffer, error } = useSingleOfferQuery(selectedOfferId, {
    skip: !selectedOfferId,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch the offer");
    }
  }, [error]);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOfferId(null);
  };
  const handleViewOffer = (_id) => {
    setSelectedOfferId(_id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (singleOffer) {
      // console.log("Single Offer Data:", singleOffer);
    }
  }, [singleOffer]);
  // console.log(deviceInfo);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleStatusChange = (event) => {
    setOfferStatus(event.target.value);
    // refetch(); // Manually refetch data when status changes
  };

  const paginatedData = data.slice(offset, offset + pageSize);

  if (isLoading || isFetching) {
    return <Loader></Loader>; // Show loading state
  }
  if (isLoadingOffersForAdmin || isFetchingOffersForAdmin) {
    return <Loader></Loader>; // Show loading state
  }

  return userRole === "superAdmin" || userRole === "admin" ? (
    <div className="min-h-screen">
      <div className="container mx-auto overflow-auto relative">
        <div className="flex justify-between items-center my-4">
          <h3 className="font-bold text-base text-white">All Offer List</h3>
          <select
            className="px-2 py-3 border-none rounded text-xs"
            id="publish-status"
            value={offerStatus}
            onChange={handleStatusChange}
          >
            <option value="All">All</option>
            <option value="active">active</option>
            <option value="draft">draft</option>
            <option value="deleted">deleted</option>
            <option value="completed">completed</option>
            <option value="non completed">non completed</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-secondaryColor border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-secondaryColor text-buttonBackground">
              <tr className="text-left">
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  SL.
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  Offer
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  Category
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  Network
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  Points
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  Device
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  Country
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300">
                  Status
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedData.map((row, i) => (
                <tr key={row._id} className="bg-secondaryColor">
                  <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    {currentPage * pageSize + i + 1}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    <div className="flex">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-lg object-cover"
                          src={
                            row.image
                              ? row.image
                              : "https://main-p.agmcdn.com/offers/1126583-cwTa2k02.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p
                          className="text-buttonBackground font-medium whitespace-no-wrap cursor-pointer underline"
                          onClick={() => handleViewOffer(row._id)}
                        >
                          {row.name}
                        </p>
                        <p className="text-gray-600 whitespace-no-wrap">
                          {row.date}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    {row.categoryInfo?.categoryName}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    {row.networkInfo?.networkName}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    {row.points}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    {row.device.slice(0, 2).map((device, index) => (
                      <span key={device._id}>
                        {device.label}
                        {index !== row.device.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    {row.country.slice(0, 3).map((country, index) => (
                      <span key={country._id}>
                        {country.label}
                        {index !== row.country.length - 1 && ", "}
                      </span>
                    ))}
                  </td>

                  <td className="w-4 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    {/* <button
                      onClick={() => handleToggle(row._id)}
                      className={`py-1 px-2 block w-full text-center rounded text-white ${
                        row.offerStatus === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {row.offerStatus}
                    </button> */}

                    <label className="relative flex justify-between items-center group p-2 text-xl">
                      <input
                        type="checkbox"
                        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                        checked={row.offerStatus === "active"}
                        onClick={() => handleToggle(row._id)}
                      />
                      <span
                        className={`w-12 h-7 flex items-center flex-shrink-0 ml-4 p-1 bg-red-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5 group-hover:after:translate-x-1`}
                      ></span>
                    </label>
                  </td>
                  <td className="px-1 py-2 border-b border-gray-200 bg-secondaryColor text-white text-sm">
                    <div className="flex flex-col justify-center items-center md:flex-row gap-1">
                      {/* <button
                        onClick={() => handleViewOffer(row._id)}
                        className="w-7 h-7 grid justify-center items-center bg-purple-500 rounded text-white"
                      >
                        <FaEye />
                      </button> */}
                      {(userRole === "superAdmin" || userRole === "admin") && (
                        <div className="flex flex-col md:flex-row gap-1 justify-center items-center">
                          <Link
                            to={`/dashboard/edit-offer/${row._id}`}
                            className="w-7 h-7 grid justify-center items-center bg-blue-500 rounded text-white"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDeleteOffer(row._id)}
                            className="w-7 h-7 grid justify-center items-center bg-red-500 rounded text-white "
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          className="flex mt-5 gap-3 text-buttonBackground"
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
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="modal"
          contentLabel="Offer Details Modal"
        >
          <button className="button-close" onClick={closeModal}>
            &times;
          </button>
          {isLoading ? (
            <div>Loading...</div>
          ) : singleOffer?.data ? (
            <div className="modal-content">
              <div className="modal-header">
                {singleOffer.data.image && (
                  <img
                    src={"https://i.ibb.co/JjrS14H/cashooz.png"}
                    alt={singleOffer.data.name}
                  />
                )}
                <h6 className="text-lg text-blue-600 font-bold uppercase">
                  {singleOffer.data.name}
                </h6>
              </div>
              <div className="modal-body grid grid-cols-1 md:grid-cols-2">
                <div>
                  <p>
                    <span>Points:</span> {singleOffer.data.points}
                  </p>
                  <p>
                    <span>Points:</span> {singleOffer.data.points}
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">
                      Completion Limit:
                    </span>{" "}
                    <br />
                    <span>{singleOffer.data.completionLimit}</span>
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">
                      Completion Count:
                    </span>{" "}
                    <br />
                    <span>{singleOffer.data.completedCount}</span>
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">Start Date:</span>{" "}
                    <br />
                    <span className="text-green-600">
                      {new Date(
                        singleOffer.data.startDate
                      ).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">End Date:</span>{" "}
                    <br />
                    <span className="text-red-600">
                      {new Date(singleOffer.data.endDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="text-blue-600 text-sm">Description:</span>{" "}
                    <span
                      className="text-gray-600 font-light text-xs text-justify"
                      dangerouslySetInnerHTML={{
                        __html: singleOffer.data.description,
                      }}
                    ></span>
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">Country:</span>{" "}
                    <br />
                    {singleOffer.data.country?.map((c) => (
                      <span className="bg-blue-500 text-white text-xs px-5 py-1 rounded-md">
                        {c.label}
                      </span>
                    ))}
                  </p>

                  <p>
                    <span className="text-blue-600 text-sm">Device:</span>{" "}
                    <br />
                    {singleOffer.data.device?.map((d) => (
                      <span className="bg-cyan-500 text-white text-xs px-5 py-1 rounded-md">
                        {d.label}
                      </span>
                    ))}
                  </p>

                  <p>
                    <span className="text-blue-600 text-sm">Offer Status:</span>{" "}
                    <br />
                    <span
                      className={`text-xs px-4 py-1 text-white rounded ${
                        singleOffer.data.offerStatus === "active"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {singleOffer.data.offerStatus}
                    </span>{" "}
                    <br />
                  </p>
                </div>
                <div>
                  <div>
                    <span className="font-bold text-sm text-blue-600">
                      Offer Link:
                    </span>{" "}
                    <br />
                    <a
                      href={singleOffer.data.offerLink}
                      target="_blank"
                      className="underline"
                    >
                      offer link
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </ReactModal>
      </div>
    </div>
  ) : userRole === "user" ? (
    <OfferView />
  ) : (
    ""
  );
};

export default OfferList;
