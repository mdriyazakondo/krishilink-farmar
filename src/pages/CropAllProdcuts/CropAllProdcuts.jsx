import React, { useEffect, useState } from "react";
import CropCard from "../../components/CropCard";
import LoadingSpinner from "../Loading/Loading";
import { FaSearch } from "react-icons/fa";

const CropAllProducts = () => {
  const [allProduct, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    fetch(`https://krishilink-server-three.vercel.app/products?sort=${sort}`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data), setLoading(false);
      });
  }, [sort]);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value.trim();
    if (!search) return;
    fetch(`https://krishilink-server-three.vercel.app/search?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setCurrentPage(1);
      });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(allProduct.length / productsPerPage);

  if (loading) return <LoadingSpinner />;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className=" px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8">
        All Available Crops
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <form
          onSubmit={handleOnsubmit}
          className="relative w-full md:w-1/2 lg:w-1/3"
        >
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search crops..."
            className="w-full py-2.5 pl-11 pr-24 rounded-full border border-green-500 focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-6 rounded-r-full bg-green-600 text-white hover:bg-green-700 transition"
          >
            Search
          </button>
        </form>

        <div className="w-full md:w-56">
          <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400"
          >
            <option value="" disabled>
              Sort by Price
            </option>
            <option value="bag">Price Per Bag</option>
            <option value="ton">Price Per Ton</option>
            <option value="kg">Price Per Kg</option>
          </select>
        </div>
      </div>

      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <CropCard key={product._id} products={product} />
            ))}
          </div>

          <div className="flex justify-center mt-12 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg border transition ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white border-gray-300 hover:bg-green-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-3xl font-semibold text-green-600">
            No crops found
          </p>
        </div>
      )}
    </div>
  );
};

export default CropAllProducts;
