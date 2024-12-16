import React, { useEffect, useState } from "react";
import { useUpdateNormalUserMutation } from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import Swal from "sweetalert2";

const EditProfile = ({ onClose }) => {
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }

  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const handleChangePhoto = () => {
    console.log("Change Photo clicked");
  };

  const handleDeletePhoto = () => {
    setProfileImage(
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
  };

  const [updateNormalUser, { isLoading, isSuccess, isError, error }] =
    useUpdateNormalUserMutation();

  const [formData, setFormData] = useState({
    name: "Jaxon Riverstone",
    gender: "male",
    dateOfBirth: "1985-07-15T00:00:00.000+00:00",
    contactNo: "951-239-0523",
    bloodGroup: "A+",
    state: "Oakwood Street, California",
    postalCode: "01996",
    presentAddress: "5678 Maple Avenue, California, USA",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!user) {
      console.error("No user data found");
      return;
    }

    const normalUser = {
      normalUser: {
        name: formData.name,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        contactNo: formData.contactNo,
        bloodGroup: formData.bloodGroup,
        state: formData.state,
        postalCode: formData.postalCode,
        presentAddress: formData.presentAddress,
      },
    };

    updateNormalUser({ id: user?.objectId, normalUser })
      .unwrap()
      .then((response) => {
        console.log("Full response:", response);

        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Profile updated successfully",
            // confirmButtonColor: "#3085d6",
            // cancelButtonColor: "#d33",
            timer: 1800,
          });
          console.log("User updated successfully:", response.message);
        } else {
          console.error("Update failed:", response.message);
        }
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  // UseEffect to trigger onClose after successful save
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose(); // Automatically close after success
      }, 400); // Adjust timing as needed
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  return (
    <div className="w-full flex flex-col items-start min-h-screen p-0 md:p-6 relative">
      {/* Loading Spinner Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <span className="text-white font-semibold">Saving...</span>
          </div>
        </div>
      )}

      <div className="w-full md:w-3/6 mx-auto bg-secondaryColor rounded-lg shadow-md p-6 space-y-6 relative">
        <button
          onClick={onClose} // This should be bound correctly
          className="text-white text-2xl bg-red-500 w-8 h-8 rounded-full cursor-pointer absolute -right-2 -top-3 z-50"
        >
          ×
        </button>
        <div className="bg-primaryColor p-6 rounded-lg shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleChangePhoto}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition"
              >
                Change photo
              </button>
              <button
                onClick={handleDeletePhoto}
                className="bg-white text-red-500 px-4 py-2 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition"
              >
                <span className="flex items-center space-x-1">
                  <span>🗑️</span> <span>Delete</span>
                </span>
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              Cashooz keeps your profile private
            </p>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="bg-primaryColor p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Edit Profile
          </h2>
          <div className="space-y-4">
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <div className="flex justify-between items-center gap-2">
            <SelectField
              label="Gender"
              name="gender"
              options={["male", "female", "other"]}
              value={formData.gender}
              onChange={handleInputChange}
            />
            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth.split("T")[0]}
              onChange={handleInputChange}
            />
            </div>
            
            <div className="flex space-x-2">
              <select
                name="countryCode"
                onChange={(e) =>
                  setFormData({ ...formData, countryCode: e.target.value })
                }
                value={formData.countryCode || "+1"} // Default to +1 (USA)
                className="border border-gray-300 rounded-lg px-2 py-1 w-2/6"
              >
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+49">+49 (Germany)</option>
                <option value="+33">+33 (France)</option>
                <option value="+86">+86 (China)</option>
                <option value="+39">+39 (Italy)</option>
                <option value="+7">+7 (Russia)</option>
                <option value="+34">+34 (Spain)</option>
                <option value="+55">+55 (Brazil)</option>
                <option value="+82">+82 (South Korea)</option>
                <option value="+27">+27 (South Africa)</option>
                <option value="+65">+65 (Singapore)</option>
                <option value="+66">+66 (Thailand)</option>
                <option value="+52">+52 (Mexico)</option>
                <option value="+34">+34 (Argentina)</option>
                <option value="+60">+60 (Malaysia)</option>
                <option value="+90">+90 (Turkey)</option>
                <option value="+47">+47 (Norway)</option>
                <option value="+46">+46 (Sweden)</option>
                <option value="+31">+31 (Netherlands)</option>
                <option value="+48">+48 (Poland)</option>
                <option value="+45">+45 (Denmark)</option>
                <option value="+64">+64 (New Zealand)</option>
                <option value="+32">+32 (Belgium)</option>
                <option value="+43">+43 (Austria)</option>
                <option value="+41">+41 (Switzerland)</option>
                <option value="+351">+351 (Portugal)</option>
                <option value="+353">+353 (Ireland)</option>
                <option value="+353">+353 (Saudi Arabia)</option>
                <option value="+92">+92 (Pakistan)</option>
                <option value="+963">+963 (Egypt)</option>
                <option value="+971">+971 (United Arab Emirates)</option>
                <option value="+94">+94 (Sri Lanka)</option>
                <option value="+66">+66 (Vietnam)</option>
                <option value="+84">+84 (Philippines)</option>
                <option value="+234">+234 (Nigeria)</option>
                <option value="+962">+962 (Jordan)</option>
                <option value="+966">+966 (Saudi Arabia)</option>
                <option value="+374">+374 (Armenia)</option>
                <option value="+995">+995 (Georgia)</option>
                <option value="+420">+420 (Czech Republic)</option>
                <option value="+371">+371 (Latvia)</option>
                <option value="+370">+370 (Lithuania)</option>
                <option value="+372">+372 (Estonia)</option>
                <option value="+386">+386 (Slovenia)</option>
                <option value="+381">+381 (Serbia)</option>
                <option value="+380">+380 (Ukraine)</option>
              </select>
              <input
                type="tel"
                name="contactNo"
                placeholder="Enter Contact Number"
                value={formData.contactNo}
                onChange={(e) =>
                  setFormData({ ...formData, contactNo: e.target.value })
                }
                className="w-4/6 text-primaryColor border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-buttonBackground"
              />
            </div>

            <SelectField
              label="Blood Group"
              name="bloodGroup"
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              value={formData.bloodGroup}
              onChange={handleInputChange}
            />

            <InputField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
            <InputField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
            <InputField
              label="Present Address"
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Save Button Section */}
        <div className="flex justify-end items-center space-x-4 p-4 rounded-lg shadow-lg  bg-opacity-80 backdrop-blur-md transition-all duration-300 ease-in-out">
          <button
            className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out 
    ${
      isLoading
        ? "bg-blue-300 cursor-not-allowed"
        : "bg-buttonBackground hover:bg-opacity-80"
    }
  `}
            type="button"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-pulse">Saving...</span>
            ) : (
              "Save"
            )}
          </button>
          {isSuccess && (
            <p className="text-white font-medium text-sm transition-opacity duration-500">
              Profile updated successfully! Closing shortly...
            </p>
          )}
          {isError && (
            <p className="text-red-500 font-medium text-sm transition-opacity duration-500">
              Error updating profile: {error?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Input field component
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div className="w-full">
    <label className="block text-buttonBackground mb-1 text-sm">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full text-primaryColor border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-buttonBackground"
    />
  </div>
);

// Select field component
const SelectField = ({ label, name, options, value, onChange }) => (
  <div className="w-full">
    <label className="block text-buttonBackground mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default EditProfile;
