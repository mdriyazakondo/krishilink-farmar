import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const IntrestFrom = ({ crop }) => {
  const { user } = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const ownerEmail = crop?.owner?.ownerEmail;
  const ownerName = crop?.owner?.ownerName;

  const totalPrice = (Number(quantity) || 0) * (crop?.pricePerUnit || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Login Required", "Please login to send interest", "warning");
      return;
    }

    if (quantity < 1) {
      Swal.fire("Invalid Quantity", "Quantity must be at least 1", "warning");
      return;
    }

    const confirm = await Swal.fire({
      title: "Confirm Interest?",
      html: `You are interested in <b>${quantity} ${crop?.unit}</b><br/>Total price: <b>${totalPrice} BDT</b>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      setSubmitting(true);

      const response = await fetch(
        `https://krishilink-server-three.vercel.app/products/${crop._id}/interests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            userEmail: user.email,
            userName: user.displayName,
            ownerEmail,
            ownerName,
            quantity,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      } else {
        Swal.fire("Success", "Your interest has been submitted!", "success");
        setQuantity(1);
        setMessage("");
      }
    } catch (err) {
      Swal.fire("Error", "Server error", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border mb-8">
      <h3 className="text-xl font-semibold mb-4 text-center text-green-700">
        Send Interest for {crop?.name}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Quantity ({crop?.unit})
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Message
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Total Price
          </label>
          <input
            type="text"
            value={`${totalPrice} BDT`}
            readOnly
            className="w-full border rounded-lg p-2 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-2 rounded-lg"
        >
          {submitting ? "Submitting..." : "Submit Interest"}
        </button>
      </form>
    </div>
  );
};

export default IntrestFrom;
