import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllProductsByCategoryQuery } from "./Product/productApi";


const ViewAllCategoryProduct = () => {
  const { categoryId } = useParams(); 
  const { data, isLoading, error } = useGetAllProductsByCategoryQuery(categoryId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  const products = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Products in Category</h1>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-blue-600">
                ${product.salePrice || product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllCategoryProduct;
