import React, { use, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import LoadingSpinner from "../Loading/Loading";

const MyProfile = () => {
  const { user, loading, setLoading } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const photo = e.target.photo.value.trim();
    setLoading(true);
    updateProfile(user, { displayName: name, photoURL: photo })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex items-center justify-center min-h-[60vh]  px-4">
      <div className="w-full max-w-md bg-white border border-green-200 rounded-2xl shadow-lg p-8 space-y-5">
        {/* Profile Image */}
        <h2 className="mb-4 text-center text-3xl font-semibold">
          <span className="text-green-600">Personal</span> Information
        </h2>
        <div className="flex justify-center">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover ring-4 ring-green-300"
          />
        </div>

        {/* User Info */}
        <div className="text-center space-y-1">
          <h3 className="text-xl font-semibold text-green-700">
            {user.displayName}
          </h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Update Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full py-2 cursor-pointer bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            Update Profile
          </button>
        )}

        {/* Update Form */}
        {isOpen && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.displayName}
                required
                placeholder="Enter your name"
                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                defaultValue={user.photoURL}
                required
                placeholder="Enter photo URL"
                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2 cursor-pointer border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
