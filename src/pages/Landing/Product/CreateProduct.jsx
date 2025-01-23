import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateProductMutation } from "./productApi";
import { useViewSubCategoriesQuery } from "../../SubCategory/subCategoryApi";
import { useViewCategoryQuery } from "../../CategoryApi";
import { toast } from "sonner";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    salePrice: 0,
    colours: [],
    sizes: [],
    sku: "",
    category: "",
    subCategory: "",
    slug: "",
    images: [],
  });

  const { data: categories, isLoading: categoriesLoading } =
    useViewCategoryQuery();
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useViewSubCategoriesQuery();
  const [createProduct, { isLoading: creatingProduct }] =
    useCreateProductMutation();

  const [uploading, setUploading] = useState(false);
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedImages = [];
    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cashooz");
      formData.append("cloud_name", "dmnl8yjw9");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dmnl8yjw9/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (data.url) {
          uploadedImages.push(data.url);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image.");
      }
    }

    setUploading(false);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedImages],
    }));
    toast.success("Images uploaded successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert necessary fields to proper types
    const parsedFormData = {
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      salePrice: Number(formData.salePrice),
      sizes: formData.sizes.map((size) => {
        // Sizes are numbers, no mapping needed now
        return parseInt(size);
      }),
    };

    try {
      console.log(parsedFormData);
      await createProduct(parsedFormData).unwrap();
      toast.success("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        salePrice: 0,
        colours: [],
        sizes: [],
        sku: "",
        category: "",
        subCategory: "",
        slug: "",
        images: [],
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="max-w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-Black mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 rounded-md border   text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-black mb-1"
            >
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              className="w-full p-3 rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              multiple
              onChange={handleImageUpload}
            />
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-16 object-cover rounded-md"
                />
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-black mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="w-full p-3 rounded-md border  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-black mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full p-3 rounded-md border  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="salePrice"
              className="block text-sm font-medium text-black mb-1"
            >
              Sale Price
            </label>
            <input
              type="number"
              id="salePrice"
              name="salePrice"
              className="w-full p-3 rounded-md border  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter sale price"
              value={formData.salePrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="colours"
              className="block text-sm font-medium text-black mb-1"
            >
              Colours (comma-separated)
            </label>
            <input
              type="text"
              id="colours"
              className="w-full p-3 rounded-md border  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Red, Blue, Green"
              onChange={(e) => handleArrayChange(e, "colours")}
            />
          </div>
          <div>
            <label
              htmlFor="sizes"
              className="block text-sm font-medium text-black mb-1"
            >
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              id="sizes"
              className="w-full p-3 rounded-md border  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 36, 40, 43"
              onChange={(e) => handleArrayChange(e, "sizes")}
            />
          </div>
          <div>
            <label
              htmlFor="sku"
              className="block text-sm font-medium text-black mb-1"
            >
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              className="w-full p-3 rounded-md border  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter SKU"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-black mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full p-3 rounded-md border  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" className="text-black">
                Select Category
              </option>
              {!categoriesLoading &&
                categories?.data &&
                categories.data.length > 0 &&
                categories.data.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="subCategory"
              className="block text-sm font-medium text-black mb-1"
            >
              SubCategory
            </label>
            <select
              id="subCategory"
              name="subCategory"
              className="w-full p-3 rounded-md border  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.subCategory}
              onChange={handleChange}
              required
            >
              <option value="" className="text-black">
                Select SubCategory
              </option>
              {!subCategoriesLoading &&
                subCategories?.data &&
                subCategories.data.length > 0 &&
                subCategories.data.map((sub) => (
                  <option
                    key={sub._id}
                    value={sub._id}
                    className="text-black bg-white"
                  >
                    {sub.subCategory}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-black mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-3 rounded-md border  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={creatingProduct || uploading}
            className="w-full bg-blue-600 text-white py-3 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {creatingProduct ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
