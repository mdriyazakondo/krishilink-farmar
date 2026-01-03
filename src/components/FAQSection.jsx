import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "What is KrishiLink?",
    answer:
      "KrishiLink is a digital platform that connects farmers directly with buyers, helping them manage crops, prices, and interests efficiently.",
  },
  {
    question: "Is KrishiLink free for farmers?",
    answer:
      "Yes, KrishiLink is completely free for farmers. You can create an account, manage your profile, and connect with buyers without any cost.",
  },
  {
    question: "How do I update my profile information?",
    answer:
      "Go to the My Profile page and click on the 'Edit Profile' button. You can update your name and photo anytime.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Absolutely. KrishiLink uses Firebase Authentication to keep your data secure and protected.",
  },
  {
    question: "Can I use Google to sign in?",
    answer:
      "Yes, you can sign in easily using your Google account for faster and safer access.",
  },
  {
    question: "Who can join KrishiLink?",
    answer:
      "Farmers, buyers, and agriculture-related users can join KrishiLink to build a trusted farming community.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-green-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 flex justify-center items-center gap-2">
            <FaQuestionCircle />
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 mt-2">
            Find answers to common questions about KrishiLink
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-green-200 rounded-xl shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left"
              >
                <span className="font-medium text-slate-800">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
