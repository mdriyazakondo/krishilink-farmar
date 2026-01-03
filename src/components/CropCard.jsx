import React from "react";
import { useNavigate } from "react-router";

const CropCard = ({ products }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/crops/${products._id}`);
  };

  return (
    <div className="group bg-white border border-green-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={products.image}
          alt={products.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
          {products.unit}
        </span>
        <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
          {products.location}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition">
          {products.name}
        </h2>

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-lg font-bold text-green-600">
            ৳{products.pricePerUnit}
            <span className="text-sm font-normal text-gray-500">
              {" "}
              / {products.unit}
            </span>
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleViewDetails}
          className="w-full mt-4 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 active:scale-95 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CropCard;
