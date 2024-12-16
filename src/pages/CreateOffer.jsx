import { useState, useRef, useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import JoditEditor from "jodit-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateOfferMutation } from "./offerApi";
import { useViewNetworkQuery } from "./NetworkApi";
import { useViewCategoryQuery } from "./CategoryApi";
import Select from "react-select";

const CreateOffer = () => {
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState("https://avatar.iran.liara.run/public");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [CreateOffer] = useCreateOfferMutation();
  const [tags, setTags] = useState([
    { value: "all", label: "all" },
    { value: "AD", label: "AD" },
    { value: "AE", label: "AE" },
    { value: "AF", label: "AF" },
    { value: "AG", label: "AG" },
    { value: "AI", label: "AI" },
    { value: "AL", label: "AL" },
    { value: "AM", label: "AM" },
    { value: "AO", label: "AO" },
    { value: "AQ", label: "AQ" },
    { value: "AR", label: "AR" },
    { value: "AS", label: "AS" },
    { value: "AT", label: "AT" },
    { value: "AU", label: "AU" },
    { value: "AW", label: "AW" },
    { value: "AX", label: "AX" },
    { value: "AZ", label: "AZ" },
    { value: "BA", label: "BA" },
    { value: "BB", label: "BB" },
    { value: "BD", label: "BD" },
    { value: "BE", label: "BE" },
    { value: "BF", label: "BF" },
    { value: "BG", label: "BG" },
    { value: "BH", label: "BH" },
    { value: "BI", label: "BI" },
    { value: "BJ", label: "BJ" },
    { value: "BL", label: "BL" },
    { value: "BM", label: "BM" },
    { value: "BN", label: "BN" },
    { value: "BO", label: "BO" },
    { value: "BQ", label: "BQ" },
    { value: "BR", label: "BR" },
    { value: "BS", label: "BS" },
    { value: "BT", label: "BT" },
    { value: "BV", label: "BV" },
    { value: "BW", label: "BW" },
    { value: "BY", label: "BY" },
    { value: "BZ", label: "BZ" },
    { value: "CA", label: "CA" },
    { value: "CC", label: "CC" },
    { value: "CD", label: "CD" },
    { value: "CF", label: "CF" },
    { value: "CG", label: "CG" },
    { value: "CH", label: "CH" },
    { value: "CI", label: "CI" },
    { value: "CK", label: "CK" },
    { value: "CL", label: "CL" },
    { value: "CM", label: "CM" },
    { value: "CN", label: "CN" },
    { value: "CO", label: "CO" },
    { value: "CR", label: "CR" },
    { value: "CU", label: "CU" },
    { value: "CV", label: "CV" },
    { value: "CW", label: "CW" },
    { value: "CX", label: "CX" },
    { value: "CY", label: "CY" },
    { value: "CZ", label: "CZ" },
    { value: "DE", label: "DE" },
    { value: "DJ", label: "DJ" },
    { value: "DK", label: "DK" },
    { value: "DM", label: "DM" },
    { value: "DO", label: "DO" },
    { value: "DZ", label: "DZ" },
    { value: "EC", label: "EC" },
    { value: "EE", label: "EE" },
    { value: "EG", label: "EG" },
    { value: "EH", label: "EH" },
    { value: "ER", label: "ER" },
    { value: "ES", label: "ES" },
    { value: "ET", label: "ET" },
    { value: "FI", label: "FI" },
    { value: "FJ", label: "FJ" },
    { value: "FM", label: "FM" },
    { value: "FO", label: "FO" },
    { value: "FR", label: "FR" },
    { value: "GA", label: "GA" },
    { value: "GB", label: "GB" },
    { value: "GD", label: "GD" },
    { value: "GE", label: "GE" },
    { value: "GF", label: "GF" },
    { value: "GG", label: "GG" },
    { value: "GH", label: "GH" },
    { value: "GI", label: "GI" },
    { value: "GL", label: "GL" },
    { value: "GM", label: "GM" },
    { value: "GN", label: "GN" },
    { value: "GP", label: "GP" },
    { value: "GQ", label: "GQ" },
    { value: "GR", label: "GR" },
    { value: "GT", label: "GT" },
    { value: "GU", label: "GU" },
    { value: "GW", label: "GW" },
    { value: "GY", label: "GY" },
    { value: "HK", label: "HK" },
    { value: "HM", label: "HM" },
    { value: "HN", label: "HN" },
    { value: "HR", label: "HR" },
    { value: "HT", label: "HT" },
    { value: "HU", label: "HU" },
    { value: "ID", label: "ID" },
    { value: "IE", label: "IE" },
    { value: "IL", label: "IL" },
    { value: "IM", label: "IM" },
    { value: "IN", label: "IN" },
    { value: "IO", label: "IO" },
    { value: "IQ", label: "IQ" },
    { value: "IR", label: "IR" },
    { value: "IS", label: "IS" },
    { value: "IT", label: "IT" },
    { value: "JE", label: "JE" },
    { value: "JM", label: "JM" },
    { value: "JO", label: "JO" },
    { value: "JP", label: "JP" },
    { value: "KE", label: "KE" },
    { value: "KG", label: "KG" },
    { value: "KH", label: "KH" },
    { value: "KI", label: "KI" },
    { value: "KM", label: "KM" },
    { value: "KN", label: "KN" },
    { value: "KP", label: "KP" },
    { value: "KR", label: "KR" },
    { value: "KW", label: "KW" },
    { value: "KY", label: "KY" },
    { value: "KZ", label: "KZ" },
    { value: "LA", label: "LA" },
    { value: "LB", label: "LB" },
    { value: "LC", label: "LC" },
    { value: "LI", label: "LI" },
    { value: "LK", label: "LK" },
    { value: "LR", label: "LR" },
    { value: "LS", label: "LS" },
    { value: "LT", label: "LT" },
    { value: "LU", label: "LU" },
    { value: "LV", label: "LV" },
    { value: "LY", label: "LY" },
    { value: "MA", label: "MA" },
    { value: "MC", label: "MC" },
    { value: "MD", label: "MD" },
    { value: "ME", label: "ME" },
    { value: "MF", label: "MF" },
    { value: "MG", label: "MG" },
    { value: "MH", label: "MH" },
    { value: "MK", label: "MK" },
    { value: "ML", label: "ML" },
    { value: "MM", label: "MM" },
    { value: "MN", label: "MN" },
    { value: "MO", label: "MO" },
    { value: "MP", label: "MP" },
    { value: "MQ", label: "MQ" },
    { value: "MR", label: "MR" },
    { value: "MS", label: "MS" },
    { value: "MT", label: "MT" },
    { value: "MU", label: "MU" },
    { value: "MV", label: "MV" },
    { value: "MW", label: "MW" },
    { value: "MX", label: "MX" },
    { value: "MY", label: "MY" },
    { value: "MZ", label: "MZ" },
    { value: "NA", label: "NA" },
    { value: "NC", label: "NC" },
    { value: "NE", label: "NE" },
    { value: "NF", label: "NF" },
    { value: "NG", label: "NG" },
    { value: "NI", label: "NI" },
    { value: "NL", label: "NL" },
    { value: "NO", label: "NO" },
    { value: "NP", label: "NP" },
    { value: "NR", label: "NR" },
    { value: "NU", label: "NU" },
    { value: "NZ", label: "NZ" },
    { value: "OM", label: "OM" },
    { value: "PA", label: "PA" },
    { value: "PE", label: "PE" },
    { value: "PF", label: "PF" },
    { value: "PG", label: "PG" },
    { value: "PH", label: "PH" },
    { value: "PK", label: "PK" },
    { value: "PL", label: "PL" },
    { value: "PM", label: "PM" },
    { value: "PN", label: "PN" },
    { value: "PR", label: "PR" },
    { value: "PT", label: "PT" },
    { value: "PW", label: "PW" },
    { value: "PY", label: "PY" },
    { value: "QA", label: "QA" },
    { value: "RE", label: "RE" },
    { value: "RO", label: "RO" },
    { value: "RS", label: "RS" },
    { value: "RU", label: "RU" },
    { value: "RW", label: "RW" },
    { value: "SA", label: "SA" },
    { value: "SB", label: "SB" },
    { value: "SC", label: "SC" },
    { value: "SD", label: "SD" },
    { value: "SE", label: "SE" },
    { value: "SG", label: "SG" },
    { value: "SH", label: "SH" },
    { value: "SI", label: "SI" },
    { value: "SJ", label: "SJ" },
    { value: "SK", label: "SK" },
    { value: "SL", label: "SL" },
    { value: "SM", label: "SM" },
    { value: "SN", label: "SN" },
    { value: "SO", label: "SO" },
    { value: "SR", label: "SR" },
    { value: "SS", label: "SS" },
    { value: "ST", label: "ST" },
    { value: "SV", label: "SV" },
    { value: "SX", label: "SX" },
    { value: "SY", label: "SY" },
    { value: "SZ", label: "SZ" },
    { value: "TC", label: "TC" },
    { value: "TD", label: "TD" },
    { value: "TF", label: "TF" },
    { value: "TG", label: "TG" },
    { value: "TH", label: "TH" },
    { value: "TJ", label: "TJ" },
    { value: "TK", label: "TK" },
    { value: "TL", label: "TL" },
    { value: "TM", label: "TM" },
    { value: "TN", label: "TN" },
    { value: "TO", label: "TO" },
    { value: "TR", label: "TR" },
    { value: "TT", label: "TT" },
    { value: "TV", label: "TV" },
    { value: "TW", label: "TW" },
    { value: "TZ", label: "TZ" },
    { value: "UA", label: "UA" },
    { value: "UG", label: "UG" },
    { value: "UM", label: "UM" },
    { value: "US", label: "US" },
    { value: "UY", label: "UY" },
    { value: "UZ", label: "UZ" },
    { value: "VA", label: "VA" },
    { value: "VC", label: "VC" },
    { value: "VE", label: "VE" },
    { value: "VG", label: "VG" },
    { value: "VI", label: "VI" },
    { value: "VN", label: "VN" },
    { value: "VU", label: "VU" },
    { value: "WF", label: "WF" },
    { value: "WS", label: "WS" },
    { value: "YE", label: "YE" },
    { value: "YT", label: "YT" },
    { value: "ZA", label: "ZA" },
    { value: "ZM", label: "ZM" },
    { value: "ZW", label: "ZW" },
  ]); // Update initial state to an empty array
  const [devices, setDevices] = useState([
    { value: "all", label: "all" },
    { value: "iOS", label: "iOS" },
    { value: "Android", label: "Android" },
    { value: "Mac OS", label: "Mac OS" },
    { value: "Windows", label: "Windows" },
  ]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  // Fetch networks data
  const {
    data: networks,
    isLoading: networksLoading,
    isError: networksError,
  } = useViewNetworkQuery();
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useViewCategoryQuery();

  // console.log(categories); // Add this line to check the fetched categories data in console

  const onSubmit = async (data) => {
    const toastId = toast.loading("Offer Creating....");

    // // console.log(data);

    try {
      const image = data.image[0];
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "cashooz");
      formData.append("cloud_name", "dmnl8yjw9");
      const url = `https://api.cloudinary.com/v1_1/dmnl8yjw9/image/upload`;

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(async (imageData) => {
          // console.log(imageData);
          if (imageData.url) {
            const offerInfo = {
              name: data.name,
              network: data.network,
              category: data.category,
              country: data.country,
              device: data.devices,
              gender: ["male"],
              offerLink: data.offerLink,
              offerStatus: "inactive",
              dailyLimit: 100,
              totalLimit: 500,
              price: 500,
              description: content,
              terms: data.terms,
              image: imageData.url,
              points: Number(data.points),
              completionLimit: 200,
              completionWindow: 300,
              completedCount: 50,
              startDate: "2023-11-01T00:00:00.000Z",
              endDate: "2024-01-31T00:00:00.000Z",
            };
            // console.log(offerInfo);
            await CreateOffer(offerInfo);
            toast.success("Successfully Offer Created", {
              id: toastId,
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // reset();
      // navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      // console.log("Error:", error);
    }
  };

  const handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setUploadImage(event.target.files[0]);
    }
  };

  const handleInputChange = (selectedOptions) => {
    setTags(selectedOptions || []);
  };

  return (
    <>
      <div className="">
        <form
          className="bg-secondaryColor p-6 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Offer Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="Name"
                required
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {/* <div>
              <label
                htmlFor="offerStatus"
                className="block mb-2 text-sm font-medium text-white"
              >
                Offer Status
              </label>
              <input
                type="text"
                id="offerStatus"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="Offer Status"
                required
                {...register("offerStatus", {
                  required: "Offer Status is required",
                })}
              />
            </div> */}
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-white"
              >
                Category
              </label>
              <select
                defaultValue={""}
                {...register("category", { required: "Category is required" })}
                id="category"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
              >
                <option value="" disabled>
                  Choose a Category
                </option>
                {!categoriesLoading &&
                  !categoriesError &&
                  Array.isArray(categories?.data) &&
                  categories.data.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                {categoriesLoading && <option>Loading...</option>}
                {categoriesError && <option>Error loading categories</option>}
              </select>
            </div>
            <div>
              <label
                htmlFor="network"
                className="block mb-2 text-sm font-medium text-white"
              >
                Select Network
              </label>
              <select
                defaultValue={""}
                id="network"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                {...register("network", { required: "Network is required" })}
              >
                <option value="" disabled>
                  Choose a Network
                </option>
                {!networksLoading &&
                  !networksError &&
                  Array.isArray(networks?.data) &&
                  networks.data.map((network) => (
                    <option key={network._id} value={network._id}>
                      {network.networkName}
                    </option>
                  ))}
                {networksLoading && <option>Loading...</option>}
                {networksError && <option>Error loading networks</option>}
              </select>
            </div>
            
            <div>
              <label
                htmlFor="contactNo"
                className="block mb-2 text-sm font-medium text-white"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="contactNo"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="+880167904546"
                required
                {...register("contactNo", {
                  required: "Contact number is required",
                })}
              />
            </div>
            <div>
              <label
                htmlFor="points"
                className="block mb-2 text-sm font-medium text-white"
              >
                Points
              </label>
              <input
                type="number"
                id="points"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="123"
                required
                {...register("points", { required: "Points is required" })}
              />
            </div>
            <div>
              <label
                htmlFor="unique"
                className="block mb-2 text-sm font-medium text-white"
              >
                Offer Link
              </label>
              <input
                type="text"
                id="unique"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder=""
                required
                {...register("offerLink", {
                  required: "OfferLink is required",
                })}
                defaultValue={"https://offer.com?clickId=&offerId=&userId="}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="tags"
                className="block mb-2 text-sm font-medium text-white"
              >
                Country
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={tags[0]}
                    isMulti
                    options={tags}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    {...field}
                  />
                )}
              />
              {/* <Select
                defaultValue={[tags[0], tags[1]]}
                isMulti
                options={tags}
                className="basic-multi-select"
                classNamePrefix="select"
                {...register("country")}
              /> */}
                        
            </div>
            <div className="mb-6">
              <label
                htmlFor="tags"
                className="block mb-2 text-sm font-medium text-white"
              >
                Device
              </label>
              <Controller
                name="devices"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={[devices[0]]}
                    isMulti
                    options={devices}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    {...field}
                  />
                )}
              />
              {/* <Select
                defaultValue={[tags[0], tags[1]]}
                isMulti
                options={tags}
                className="basic-multi-select"
                classNamePrefix="select"
                {...register("country")}
              /> */}
                        
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Daily Limit
              </label>
              <input
                type="number"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="5"
                required
                {...register("dailyLimit", {
                  required: "Daily Limit is required",
                })}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Total Limit
              </label>
              <input
                type="number"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="50"
                required
                {...register("email", { required: "Total Limit is required" })}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="john.doe@company.com"
                required
                {...register("email", { required: "Email is required" })}
              />
            </div>
            <div>
              <label
                htmlFor="terms"
                className="block mb-2 text-sm font-medium text-white"
              >
                Terms
              </label>
              <textarea
                rows={3}
                className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
                placeholder="Terms"
                required
                {...register("terms", { required: "Terms is required" })}
              ></textarea>
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Photo is Required",
                })}
                className="border-0 bg-transparent border-b-2 border-b-blue-500 w-full text-black focus:outline-none"
                onChange={handleImage}
              />
            </div>
            <div className="mb-6">
              <img
                src={image}
                alt=""
                className="w-24 h-24 mx-auto  rounded-md shadow-md object-cover"
              />
            </div>
          </div>

          <div className="flex items-start mb-6">
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {}}
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="block mb-2 ml-2 text-sm font-medium text-white"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-buttonBackground hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-buttonBackground dark:hover:bg-green-500 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateOffer;
