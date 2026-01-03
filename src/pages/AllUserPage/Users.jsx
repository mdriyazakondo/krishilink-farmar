import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import {  FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingSpinner from "../Loading/Loading";
const UsersTable = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://krishilink-server-three.vercel.app/users",
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `https://krishilink-server-three.vercel.app/users/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      const result = await res.json();
      if (result.deletedCount > 0) {
        Swal.fire("Deleted!", "User has been removed.", "success");
        setUsers(users.filter((u) => u._id !== id));
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="py-10 px-3 sm:px-6 lg:px-10 min-h-[60vh] mx-auto w-full max-w-6xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-green-600">
        All Users
      </h2>

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm sm:text-base">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-center">Profile</th>
                <th className="px-4 py-3 text-center">Name</th>
                <th className="px-4 py-3 text-center">Email</th>
                <th className="px-4 py-3 text-center">Role</th>
                <th className="px-4 py-3 text-center">Created At</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 border-r border-gray-300 text-center">
                    <img
                      src={u.photo || "https://via.placeholder.com/40"}
                      alt={u.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border-r border-gray-300 text-center">
                    {u.name}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-300 text-center">
                    {u.email}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-300 text-center">
                    {u.role || "user"}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-300 text-center">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-300 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-700 text-xl mt-10">
          No users found.
        </p>
      )}
    </div>
  );
};

export default UsersTable;
