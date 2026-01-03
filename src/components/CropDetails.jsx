import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import LoadingSpinner from "../pages/Loading/Loading";
import IntrestFrom from "./IntrestFrom";
import OwnerTabile from "./OwnerTabile";

const CropDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://krishilink-server-three.vercel.app/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product data");
        return res.json();
      })
      .then((data) => setProduct(data?.name ? data : null))
      .catch((err) => {
        setError(err.message);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ---------- Loading ---------- */
  if (loading) return <LoadingSpinner />;

  /* ---------- Error ---------- */
  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-500">
          The crop you are looking for does not exist or was removed.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Main Details Section */}
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="bg-white border border-green-200 rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div className="overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-green-700">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                {product.type}
              </span>
              <span className="text-lg font-semibold text-green-600">
                ৳{product.pricePerUnit} / {product.unit}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-800">Quantity:</span>{" "}
                {product.quantity}
              </p>
              <p>
                <span className="font-medium text-gray-800">Location:</span>{" "}
                {product.location}
              </p>
            </div>

            {/* Owner */}
            <div className="border border-green-200 bg-green-50 rounded-xl p-4">
              <p className="font-medium text-green-700 mb-1">
                Owner Information
              </p>
              <p className="text-sm text-gray-700">
                {product.owner?.ownerName}
              </p>
              <p className="text-sm text-gray-500">
                {product.owner?.ownerEmail}
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="font-medium text-green-700 mb-1">Description</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Owner / Interest Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        {user && product.owner?.ownerEmail === user.email ? (
          <OwnerTabile
            interests={product.interests}
            cropId={product._id}
            user={user}
          />
        ) : (
          <IntrestFrom crop={product} />
        )}
      </div>
    </>
  );
};

export default CropDetails;
