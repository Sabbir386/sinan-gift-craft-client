import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateProductMutation } from "./productApi";
import { useViewSubCategoriesQuery } from "../../SubCategory/subCategoryApi";
import { useViewCategoryQuery } from "../../CategoryApi";
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
    // console.log(categories)
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useViewSubCategoriesQuery();
  const [createProduct, { isLoading: creatingProduct }] =
    useCreateProductMutation();

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
    try {
      await createProduct(formData).unwrap();
      alert("Product created successfully!");
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
      alert("Failed to create product. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sale Price:</label>
          <input
            type="number"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Colours (comma-separated):</label>
          <input
            type="text"
            onChange={(e) => handleArrayChange(e, "colours")}
          />
        </div>
        <div>
          <label>Sizes (comma-separated):</label>
          <input type="text" onChange={(e) => handleArrayChange(e, "sizes")} />
        </div>
        <div>
          <label>SKU:</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Slug:</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Images (comma-separated URLs):</label>
          <input type="text" onChange={(e) => handleArrayChange(e, "images")} />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {!categoriesLoading &&
              categories?.data?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>SubCategory:</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select SubCategory</option>
            {!subCategoriesLoading &&
              subCategories?.data?.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit" disabled={creatingProduct}>
          {creatingProduct ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
