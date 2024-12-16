import React, { useState, useEffect } from "react";
import {
  useClaimBonusMutation,
  useGetUserRewardQuery,
  useTaskCompletedMutation,
} from "./rewardApi";
import Swal from "sweetalert2";
import { verifyToken } from "../utils/verifyToken";
import { useViewCompletedOfferQuery } from "../pages/completedOfferApi";
import { useAppSelector } from "../redux/features/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";

const Reward = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [userReward, setUserReward] = useState(null);
  const [userCompletedTask, setUserCompletedTask] = useState(0);
  const [userTaskClaimCount, setUserTaskClaimCount] = useState(0);
  const [claimedDays, setClaimedDays] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [claimedTasks, setClaimedTasks] = useState([]);
  const [isClaiming, setIsClaiming] = useState(false); // New state for claiming tasks

  const { data: rewardData, refetch: refetchRewardData } =
    useGetUserRewardQuery();
  const [claimBonus] = useClaimBonusMutation();
  const token = useAppSelector(useCurrentToken);
  const [taskCompleted] = useTaskCompletedMutation();
  const [isLoading, setIsLoading] = useState(false);

  let user = null;
  if (token) {
    user = verifyToken(token);
  }

  const userId = user?.objectId || "";
  const {
    data: completedOfferData,
    isLoading: isOffersLoading,
    error: offersError,
  } = useViewCompletedOfferQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (completedOfferData) {
      setUserCompletedTask(completedOfferData.data.length);
    }
  }, [completedOfferData]);

  useEffect(() => {
    setIsLoading(true);
    if (rewardData) {
      setUserReward(rewardData);
      setUserTaskClaimCount(userReward?.taskClaimCount);
      setClaimedDays(rewardData.claimedDays || []);
      setClaimedTasks(rewardData.taskClaimCount || []);
      setIsLoading(false);
    }
  }, [rewardData]);
  console.log(rewardData);
  const handleClaimBonus = async (day) => {
    try {
      setIsClaiming(true); // Set loading state
      const response = await claimBonus().unwrap();

      Swal.fire({
        icon: "success",
        title: "Bonus Claimed!",
        text: response.message,
      });

      // Update the state after claiming the reward
      setClaimedDays([...claimedDays, day]);
      setCurrentDay(rewardData.currentDay || 1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to claim bonus! Try Again Tomorrow",
      });
    } finally {
      setIsClaiming(false); // Reset loading state
    }
  };

  const handleClaimTaskBonus = async (taskId, taskReward) => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "User ID Not Found",
        text: "Unable to claim task bonus. Please try logging in again.",
      });
      return; // Exit the function if userId is not available
    }

    try {
      setIsClaiming(true); // Set loading state
      const response = await taskCompleted({ userId, taskReward }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Bonus Claimed!",
        text: response.message,
      });

      // Update claimed tasks state to include the newly claimed task
      setClaimedTasks((prev) =>
        Array.isArray(prev) ? [...prev, taskId] : [taskId]
      );

      // Refetch user rewards to get updated claimedTasks from the server
      await refetchRewardData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to claim task reward!",
      });
    } finally {
      setIsClaiming(false); // Reset loading state
    }
  };

  const renderRewards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {[1, 2, 3, 4, 5, 6, 7].map((day, idx) => (
          <div
            key={day}
            className={`${
              day === 7
                ? "bg-gradient-to-l from-transparent via-[#4a6fa1] to-[#2c3e5c] "
                : "bg-gradient-to-b from-gray-800 to-gray-900"
            } p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              claimedDays.includes(day) ? "opacity-50" : ""
            } flex flex-col items-center justify-center`}
          >
            <div className="text-lg font-bold text-yellow-400 mb-2">
              Day {day}
            </div>

            {day === 7 ? (
              <img
                src="https://www.kindpng.com/picc/m/18-182340_golden-cup-prize-png-prize-png-transparent-png.png"
                alt="Exclusive Skin"
                className="w-16 h-16 object-cover mb-1 rounded-full shadow-lg"
              />
            ) : (
              <div className="text-white text-2xl">Reward: 5 CZ</div>
            )}
            {!userReward ? (
              <div class="flex flex-row gap-2 py-5">
                <div class="w-4 h-4 rounded-full bg-buttonBackground animate-bounce"></div>
                <div class="w-4 h-4 rounded-full bg-buttonBackground animate-bounce [animation-delay:-.3s]"></div>
                <div class="w-4 h-4 rounded-full bg-buttonBackground animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : idx + 1 <= userReward?.claimCount ||
              idx + 1 > userReward?.claimCount + 1 ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 opacity-50 cursor-not-allowed"
                onClick={() => handleClaimBonus(day)}
                disabled
              >
                {idx + 1 <= userReward?.claimCount
                  ? "Claimed"
                  : idx + 1 > userReward?.claimCount + 1
                  ? "Not Available"
                  : ""}
              </button>
            ) : (
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2`}
                onClick={() => handleClaimBonus(day)}
              >
                {isClaiming
                  ? "Claiming..."
                  : claimedDays.includes(day)
                  ? "Claimed"
                  : "Claim Bonus"}
              </button>
            )}
            {/* {idx + 1 <= userReward?.claimCount ||
            idx + 1 > userReward?.claimCount + 1 ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 opacity-50 cursor-not-allowed"
                onClick={() => handleClaimBonus(day)}
                disabled
              >
                {idx + 1 <= userReward?.claimCount
                  ? "Claimed"
                  : idx + 1 > userReward?.claimCount + 1
                  ? "Not Available"
                  : ""}
              </button>
            ) : (
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2`}
                onClick={() => handleClaimBonus(day)}
              >
                {isClaiming
                  ? "Claiming..."
                  : claimedDays.includes(day)
                  ? "Claimed"
                  : "Claim Bonus"}
              </button>
            )} */}
          </div>
        ))}
      </div>
    );
  };
  const renderTaskBonuses = () => {
    // Ensure claimedTasks is an array (default to an empty array if undefined)
    const validClaimedTasks = Array.isArray(claimedTasks) ? claimedTasks : [];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { id: 1, reward: 20, requiredTasks: 10, totalClaimCount: 1 },
          { id: 2, reward: 30, requiredTasks: 15, totalClaimCount: 2 },
          { id: 3, reward: 40, requiredTasks: 20, totalClaimCount: 3 },
          { id: 4, reward: 60, requiredTasks: 30, totalClaimCount: 4 },
        ].map((task, idx) => (
          <div
            key={task.id}
            className={`p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              validClaimedTasks.includes(task.id) ||
              userTaskClaimCount === task.id
                ? "opacity-50"
                : ""
            } flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900`}
          >
            <div className="text-lg font-bold text-yellow-400 mb-2">
              {task.requiredTasks}-Task Bonus
            </div>

            <div className="text-white text-2xl">Reward: {task.reward} CZ</div>

            <div className="flex justify-center items-center mt-4 mb-4">
              <div className="grid grid-cols-10 gap-2">
                {[...Array(task.requiredTasks)].map((_, index) => {
                  const step = index + 1;
                  return (
                    <div
                      key={step}
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        userCompletedTask >= step
                          ? "bg-purple-600 text-white"
                          : "border-2 border-gray-400 text-gray-400"
                      }`}
                    >
                      {userCompletedTask >= step ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="text-sm">{step}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-sm text-gray-400 text-center mt-4">
              <span className="font-bold text-green-300">
                {Math.min(userCompletedTask, task.requiredTasks)}
              </span>
              /<span className="text-yellow-400">{task.requiredTasks}</span>{" "}
              Tasks Completed
            </div>
            {userCompletedTask >= task.requiredTasks ? (
              rewardData.taskClaimCount < task.totalClaimCount ? (
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer`}
                  onClick={() => handleClaimTaskBonus(task.id, task.reward)}
                >
                  Claim
                </button>
              ) : (
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 opacity-50 cursor-not-allowed"
              `}
                  disabled
                >
                  Claimed
                </button>
              )
            ) : (
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 opacity-50 cursor-not-allowed"
              `}
                disabled
              >
                {userCompletedTask < task.requiredTasks
                  ? "Not Available"
                  : "Claimed"}
              </button>
            )}
            {/* {rewardData.taskClaimCount === 0 && idx === 0 ? (
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer`}
                onClick={() => handleClaimTaskBonus(task.id, task.reward)}
              >
                Claim Task Bonus
              </button>
            ) : userCompletedTask >= task.requiredTasks &&
              (rewardData.taskClaimCount === task.id ||
                rewardData.taskClaimCount === 0) ? (
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer`}
                onClick={() => handleClaimTaskBonus(task.id, task.reward)}
              >
                Claim Task Bonus
              </button>
            ) : (
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 opacity-50 cursor-not-allowed"
              `}
                disabled
              >
                {userCompletedTask < task.requiredTasks
                  ? "Not Available"
                  : "Claimed"}
              </button>
            )} */}
            {/* {
               userCompletedTask >= task.requiredTasks &&  (rewardData.taskClaimCount === task.id || rewardData.taskClaimCount === 0) ? (

                <button
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer`}
                onClick={() => handleClaimTaskBonus(task.id, task.reward)}
                
              >
               
                Claim Task Bonus
              </button>
               ) : 
               
               
               
               
               (
                <button
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 opacity-50 cursor-not-allowed"
                `}
                disabled
              >
               
                  Claimed
                
              </button>
               )
            } */}
          </div>
        ))}
      </div>
    );
  };

  const renderAffiliatedBonus = () => (
    <div className="flex justify-center items-center">
      <div className="text-center p-10 rounded-lg bg-gray-800 shadow-md text-white">
        <h3 className="text-2xl font-bold">Affiliated Bonus</h3>
        <p className="mt-4">
          Earn more bonuses by referring others to our platform!
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-transparent p-6 rounded-xl shadow-2xl w-full max-w-3xl mx-auto lg:max-w-5xl lg:my-12 lg:py-10">
      <div className="relative flex justify-between items-center bg-gradient-to-r from-transparent via-[#285D65] to-blue-500 p-4 rounded-lg shadow-lg mb-6 backdrop-filter backdrop-blur-md">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Rewards</h2>
          <p className="text-sm text-gray-200 mt-1">
            Claim bonuses by completing tasks, logging in, or referring others.
          </p>
        </div>
        <img
          src="https://img.freepik.com/premium-vector/cashback-rewards-icon-discount-promotion-icon_1024563-41.jpg?w=740"
          alt="Reward"
          className="w-20 h-20 object-cover rounded-full shadow-lg"
        />
      </div>

      <div className="flex gap-3 flex-wrap justify-start bg-transparent backdrop-blur-md p-2 rounded-xl shadow-inner mb-6">
        <button
          className={`text-center w-full md:w-40 text-sm p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
            activeTab === 1
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
              : "bg-gray-800 text-white font-bold hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Daily Bonus
        </button>
        <button
          className={`text-center w-full md:w-40 text-sm p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
            activeTab === 2
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
              : "bg-gray-800 text-white font-bold hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Task <br /> Completed Bonus
        </button>
        <button
          className={`text-center w-full md:w-40 text-sm p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-2 ${
            activeTab === 3
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
              : "bg-gray-800 text-white font-bold hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab(3)}
        >
          Affiliated <br /> Bonus
        </button>
      </div>

      {activeTab === 1 && renderRewards()}
      {activeTab === 2 && renderTaskBonuses()}
      {activeTab === 3 && renderAffiliatedBonus()}
    </div>
  );
};

export default Reward;
