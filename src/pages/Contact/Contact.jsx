import { useState } from "react";
import Swal from "sweetalert2";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire("Oops!", "Please fill all fields", "warning");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      Swal.fire("Thank You!", "Message sent successfully!", "success");
      setFormData({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-[70vh]  py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
        Contact Us
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left: Contact Info + Social */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h3 className="text-2xl font-semibold text-green-700">
            Get in Touch
          </h3>

          <p className="text-gray-600">
            Have questions about crops, farmers, or services? Feel free to reach
            out anytime.
          </p>

          {/* Contact Info */}
          <div className="space-y-3 text-gray-700">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-green-600" />
              support@farmer.com
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-green-600" />
              +880 1234-567890
            </p>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 bg-green-100 text-green-700 rounded-full hover:bg-green-600 hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-3 bg-green-100 text-green-700 rounded-full hover:bg-green-600 hover:text-white transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="p-3 bg-green-100 text-green-700 rounded-full hover:bg-green-600 hover:text-white transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="p-3 bg-green-100 text-green-700 rounded-full hover:bg-green-600 hover:text-white transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none  border-gray-300"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none  border-gray-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none resize-none border-gray-300"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
