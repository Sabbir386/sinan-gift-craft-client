import React, { useEffect, useRef, useState } from "react";
import { useOfferByNetworkQuery } from "../dashboardApi";
import { useSingleOfferQuery } from "../offerApi";
import { useCreateCompletedOfferMutation } from "../completedOfferApi";
import Swal from "sweetalert2";
import { verifyToken } from "../../utils/verifyToken";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaStar, FaStarHalf } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Loader from "../../components/Loader";

const OfferView = () => {
  const [networkOffers, setNetworkOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

  const params = useParams();
  const token = useAppSelector(useCurrentToken);
  const user = token ? verifyToken(token) : null;

  const { data: singleOffer } = useSingleOfferQuery(
    selectedOffer?._id || params.id
  );
  const {
    data: offers,
    isLoading,
    error: offerError,
  } = useOfferByNetworkQuery();
  const [createCompletedOffer] = useCreateCompletedOfferMutation();

  useEffect(() => {
    if (offers?.data) {
      setNetworkOffers(offers.data);
    }
  }, [offers]);

  const prevRefs = useRef([]);
  const nextRefs = useRef([]);
  prevRefs.current = networkOffers.map(
    (_, i) => prevRefs.current[i] ?? React.createRef()
  );
  nextRefs.current = networkOffers.map(
    (_, i) => nextRefs.current[i] ?? React.createRef()
  );

  const toggleModal = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(!isModalOpen);
  };

  const toggleMoreInfo = () => {
    setIsMoreInfoOpen(!isMoreInfoOpen);
  };

  const truncatedDescription = (description) => {
    if (!description) return "No description available.";
    const words = description.split(" ");
    return words.length > 35
      ? `${words.slice(0, 35).join(" ")}...`
      : description;
  };

  const handleCompleteOffer = async () => {
    try {
      await createCompletedOffer({
        clickId: "clickIdValue",
        offerId: selectedOffer?._id || params.id,
        userId: user?.objectId,
        points: selectedOffer?.points,
      }).unwrap();

      Swal.fire({
        title: "Success!",
        text: "Offer completed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to complete offer.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (offerError) {
    return <p>Error loading offers. Please try again later.</p>;
  }

  return (
    <div>
      <div className="min-h-screen">
        {networkOffers.length > 0 ? (
          networkOffers.map((networkOffer, idx) => (
            <div key={idx} className="my-8">
              <h2 className="text-3xl font-bold text-white border-b-[1px] border-b-secondaryColor pb-4">
                {networkOffer.networkName}
              </h2>

              <div className="relative w-full">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={10}
                  slidesPerView={2}
                  navigation={{
                    prevEl: prevRefs.current[idx].current,
                    nextEl: nextRefs.current[idx].current,
                    disabledClass: "opacity-25 cursor-not-allowed",
                  }}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl =
                      prevRefs.current[idx].current;
                    swiper.params.navigation.nextEl =
                      nextRefs.current[idx].current;
                  }}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 10 },
                    768: { slidesPerView: 4, spaceBetween: 10 },
                    1024: { slidesPerView: 7, spaceBetween: 10 },
                  }}
                >
                  {networkOffer.offers.map((offer) => (
                    <SwiperSlide className="text-white" key={offer._id}>
                      <div
                        className="cursor-pointer bg-cardBackground p-4 rounded-md"
                        onClick={() => toggleModal(offer)}
                      >
                        <img
                          src={
                            offer.image ||
                            "https://main-p.agmcdn.com/offers/1126583-cwTa2k02.jpg"
                          }
                          alt={offer.name}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <div className="mt-4 text-white">
                          <h4 className="font-bold text-base">
                            {offer?.name
                              ? offer.name.slice(0, 11)
                              : "Offer Name"}
                            {offer.name.length > 11 && "..."}
                          </h4>
                          <h6 className="text-grayColor text-sm">
                            {offer?.categoryName || offer.category}
                          </h6>
                          <h3 className="font-semibold">
                            {offer?.points || "00"} CZ
                          </h3>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Pagination Controls */}

                <div className="flex justify-center items-center space-x-6 mt-6">
                  {/* Previous Button */}
                  <button
                    ref={prevRefs.current[idx]}
                    className="flex items-center space-x-2 font-semibold" // Cursor pointer added here
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded bg-green-500 ">
                      <FaArrowLeft className="text-white hover:text-white" />
                    </div>
                    <span className="text-white hidden sm:inline">
                      PREVIOUS
                    </span>
                  </button>

                  {/* Results Info */}
                  <span className="text-white font-semibold">
                    1 - {networkOffer.offers.length} of results
                  </span>

                  {/* Next Button */}
                  <button
                    ref={nextRefs.current[idx]}
                    className="flex items-center space-x-2 font-semibold" // Cursor pointer added here
                  >
                    <span className="text-white hidden sm:inline">NEXT</span>
                    <div className="flex items-center justify-center w-8 h-8 rounded bg-green-500">
                      <FaArrowRight className="text-white hover:text-white" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No offers available.</p>
        )}
      </div>

      {/* Modal for displaying selected offer details */}
      {isModalOpen && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[999]">
          <div className="bg-[#1f2029] p-6 rounded-lg w-full max-w-md h-[600px] shadow-lg relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 sticky h-[50px]">
              <h2 className="text-white text-xl font-bold">
                {selectedOffer.name
                  ? selectedOffer.name.split(" ").slice(0, 7).join(" ") +
                    (selectedOffer.name.split(" ").length > 7 ? "..." : "")
                  : "Not Available!"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white text-2xl bg-red-500 w-8 h-8 rounded-full cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col mb-4  h-[430px] overflow-y-auto ">
              {/* Offer Image */}
              <div className="flex items-center justify-start gap-3 mb-4">
                <img
                  src={
                    selectedOffer.image ||
                    "https://i.ibb.co/JjrS14H/cashooz.png"
                  }
                  alt="Offer"
                  className="w-14 h-14 rounded-full mr-4"
                />
                <div>
                  <p className="text-white text-2xl font-bold">
                    CZ {selectedOffer.points || "0"}
                  </p>{" "}
                  <div className="text-cyan-400 text-sm">
                    <div className="text-yellow-400 flex gap-1">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </div>{" "}
                    <p> Popularity Score</p>
                  </div>{" "}
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 bg-gray-700 p-2 rounded-md">
                <p className="text-white font-semibold">Description</p>

                <div className="text-gray-300 text-sm mb-2">
                  {/* Always display truncated description, even when More Info is clicked */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: truncatedDescription(selectedOffer.description),
                    }}
                  ></p>
                </div>

                <div
                  className="text-blue-400 cursor-pointer flex items-center"
                  onClick={toggleMoreInfo}
                >
                  <span>{isMoreInfoOpen ? "Less Info" : "More Info"}</span>
                  <span className="ml-1">{isMoreInfoOpen ? "▲" : "▼"}</span>
                </div>

                {/* Display additional info (e.g., Status, Category, Provider) when expanded */}
                {isMoreInfoOpen && (
                  <div className="text-gray-400 mt-2">
                    <div className="flex justify-between text-sm mb-4 mt-2">
                      <div className="text-center">
                        <p className="text-gray-400">Status</p>
                        <p className="text-white">Not Started</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">Category</p>
                        <p className="text-green-400">Survey</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">Provider</p>
                        <p className="text-blue-400 flex items-center">
                          Adsend
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rewards Section */}
              <div className="mb-4">
                <p className="text-white font-semibold">Rewards</p>
                <div className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
                  <p className="text-green-400 font-bold">
                    CZ {selectedOffer.points || "0"}
                  </p>
                  <p className="text-white">Complete Quiz - (15 questions)</p>
                </div>
              </div>

              {/* Status, Category, Provider */}
              <div className="mb-4">
                <p className="text-white font-semibold mb-2">Terms</p>
                <p className="text-white text-sm">{selectedOffer.terms} </p>
              </div>
            </div>
            {/* Earn Button */}
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
              onClick={handleCompleteOffer}
            >
              Earn CZ {selectedOffer.points || "0"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferView;
