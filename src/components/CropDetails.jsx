import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import LoadingSpinner from "../pages/Loading/Loading";
import IntrestFrom from "./IntrestFrom";
import OwnerTabile from "./OwnerTabile";
import { MapPin, Calendar, Tag, Package, User, Mail } from "lucide-react"; 

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

  if (loading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-500 max-w-md">
            We couldn't find the crop you're looking for. It might have been
            sold or removed.
          </p>
        </div>
      </div>
    );
  }

  const isOwner = user && product.owner?.ownerEmail === user.email;

  return (
    <div className=" min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb or Back Link (Optional) */}
        <p className="text-sm text-gray-500 mb-6">
          Products / {product.type} /{" "}
          <span className="text-green-600 font-medium">{product.name}</span>
        </p>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-[400px] lg:h-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-green-700 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-2">
                  <Tag size={14} /> {product.type}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">
                    ৳{product.pricePerUnit}
                  </span>
                  <span className="text-gray-500 font-medium">
                    / {product.unit}
                  </span>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-green-50 rounded-lg text-green-600">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Stock
                    </p>
                    <p className="text-gray-900 font-medium">
                      {product.quantity} {product.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Location
                    </p>
                    <p className="text-gray-900 font-medium">
                      {product.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed italic">
                  "{product.description}"
                </p>
              </div>

              {/* Owner Card */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                  {product.owner?.ownerName?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {product.owner?.ownerName}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Mail size={12} /> {product.owner?.ownerEmail}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(product?.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Section (Table or Form) */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {isOwner ? "Buyer Interest List" : "Send Purchase Interest"}
            </h2>

            {isOwner ? (
              <OwnerTabile
                interests={product.interests}
                cropId={product._id}
                user={user}
              />
            ) : (
              <IntrestFrom crop={product} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
