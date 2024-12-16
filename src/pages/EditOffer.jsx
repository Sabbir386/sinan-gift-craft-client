import { useEffect, useRef, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useUpdateOfferMutation, useSingleOfferQuery } from "./offerApi";
import { useParams } from "react-router-dom";

const EditOffer = () => {
  const { id } = useParams(); // Get the id from the route parameters
  const [tags, setTags] = useState([]);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data: singleOffer, isLoading } = useSingleOfferQuery(id);
  const [updateOffer] = useUpdateOfferMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (singleOffer) {
      // Set default form values using setValue
      setValue("name", singleOffer.data.name);
      setValue("offerStatus", singleOffer.data.offerStatus);
      setValue("category", singleOffer.data.category);
      setValue("network", singleOffer.data.network);
      setValue("company", singleOffer.data.company);
      setValue("contactNo", singleOffer.data.contactNo);
      setValue("price", singleOffer.data.price);
      setTags(singleOffer.data.tags || []);
      setContent(singleOffer.data.description || "");
    }
  }, [singleOffer, setValue]);

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure you want to edit this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Editing Offer...");
        try {
          const offerInfo = {
            ...singleOffer,
            name: data.name,
            offerStatus: data.offerStatus,
            tags,
            description: content,
          };
          await updateOffer({ id, ...offerInfo }).unwrap();
          toast.success("Successfully Edited Offer", {
            id: toastId,
            duration: 2000,
          });
        } catch (error) {
          toast.error("Something went wrong", { id: toastId, duration: 2000 });
          // console.log("Error:", error);
        }
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="">
      <form
        className="bg-white p-6 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Offer Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
              placeholder="name"
              required
              {...register("name", {
                required: "Name is Required",
              })}
            />
          </div>
          <div>
            <label
              htmlFor="offerStatus"
              className="block mb-2 text-sm font-medium text-gray-900"
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
                required: "Offer Status is Required",
              })}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <select
              defaultValue={""}
              {...register("category", {
                required: "Category is Required",
              })}
              id="category"
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
            >
              <option value="">Choose a Category</option>
              <option value="Referral Rewards">Referral Rewards</option>
              <option value="First-Time Buyer Offers">
                First-Time Buyer Offers
              </option>
              <option value="Happy Hour Discounts">Happy Hour Discounts</option>
              <option value="Daily Deals">Daily Deals</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="network"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select Network
            </label>
            <select
              defaultValue={""}
              id="network"
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
              {...register("network", {
                required: "Network is Required",
              })}
            >
              <option value="">Choose a Network</option>
              <option value="network 1">network 1</option>
              <option value="network 2">network 2</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="company"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
              placeholder="Company"
              required
              {...register("company", {
                required: "Company is Required",
              })}
            />
          </div>
          <div>
            <label
              htmlFor="contactNo"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="contactNo"
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
              {...register("contactNo", {
                required: "Phone number is Required",
              })}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="border border-gray-400 outline-none p-2.5 rounded-md w-full focus:border-blue-700 text-sm"
              placeholder="$299"
              required
              {...register("price", {
                required: "Price is Required",
              })}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tags
          </label>
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="Enter Tags"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {}}
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" {...register("remember")} />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2.5 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditOffer;
