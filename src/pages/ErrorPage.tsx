import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftCircle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-lg w-full bg-white shadow-xl rounded-3xl p-10 text-center"
      >
        {/* Animated heading */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-6xl font-bold text-[#1e3a8a] mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl font-semibold text-gray-800 mb-2"
        >
          Page Not Found
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-gray-600 mb-6"
        >
          Sorry, we couldn’t find the page you’re looking for.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#3b82f6] text-white font-medium px-5 py-3 rounded-xl shadow-lg hover:bg-[#2563eb] transition"
          >
            <ArrowLeftCircle className="w-5 h-5" />
            Return to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
