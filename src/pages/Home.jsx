import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTasks, FaProjectDiagram, FaBullseye } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import "../styles/Home.css";

const Home = () => {
  const features = [
    {
      title: "Track Your Tasks",
      description: "Keep track of your daily tasks and meet your deadlines efficiently.",
      icon: <FaTasks size={48} className="mx-auto text-yellow-400" />,
    },
    {
      title: "Manage Projects",
      description: "Organize projects, assign tasks, and monitor progress seamlessly.",
      icon: <FaProjectDiagram size={48} className="mx-auto text-blue-400" />,
    },
    {
      title: "Achieve Goals",
      description: "Stay focused on your goals and improve your productivity.",
      icon: <FaBullseye size={48} className="mx-auto text-green-400" />,
    },
  ];

  return (
    <div className="bg-gradient-to-r pt-12 min-h-screen from-blue-500 via-indigo-600 to-purple-700 text-white dark:from-gray-900 dark:to-gray-800 dark:text-gray-300 relative flex items-center justify-center overflow-hidden">
      {/* Moving Circles in Background */}
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-blue-800 opacity-30 rounded-full animate-circle"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500 opacity-30 rounded-full animate-circle"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-yellow-700 opacity-20 rounded-full animate-circle-slow"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-pink-500 opacity-25 rounded-full animate-circle-fast"></div>

      <div className="container mx-auto px-6 pt-10 text-center relative z-10">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-bold font-heading mb-6"
        >
          Welcome to <span className="text-yellow-400">TaskFlow</span>
        </motion.h1>


        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-lg font-sans mb-10"
        >
          Organize your projects, track your tasks, and stay on top of your progress.
        </motion.p>

        {/* Buttons with Hover Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          {/* الزر الأول */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Link
              to="/projects"
              className="px-6 py-3 bg-yellow-400 text-gray-800 font-medium rounded-full shadow-lg hover:bg-yellow-300 transition duration-300 text-center flex items-center justify-center w-48"
            >
              Create Projects
            </Link>
          </motion.div>

          {/* الزر الثاني */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Link
              to="/all-projects"
              className="px-6 py-3 bg-gray-800 text-white font-medium rounded-full shadow-lg hover:bg-gray-700 transition duration-300 text-center flex items-center justify-center w-48"
            >
             Explore Projects
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid pb-5 grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
              scale={1.05}
              transitionSpeed={400}
              className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
