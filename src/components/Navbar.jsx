import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/themeContext";
import { useAuth, getDisplayName } from "../context"; // <-- تأكد إنك بتستورد useAuth من الملف المجمِّع أو مباشرةً من authContext
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // اسحب حالة المستخدم ودالة الخروج
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // لما يضغط على Logout
  const handleLogout = () => {
    logout();
    // ممكن تضيف تنبيه Toast أو إعادة توجيه أو أي منطق عايزه
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg dark:from-gray-800 dark:to-darkBg font-sans z-50"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-sans font-bold tracking-wide">
          <NavLink to="/">
            <span className="text-yellow-400">Task</span>Flow
          </NavLink>
        </div>

        {/* Navigation Links - Desktop */}
        <ul className="hidden md:flex space-x-10 font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: "AllProjects", path: "/all-projects" }
          ].map((item) => (
            <motion.li
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              key={item.name}
              className="font-sans"
            >
              <NavLink
                to={item.path}
                className="hover:text-yellow-300 transition duration-200"
                style={({ isActive }) => ({
                  color: isActive ? "yellow" : "",
                  textDecoration: isActive ? "underline" : "",
                })}
              >
                {item.name}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* Actions - Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Toggle Dark/Light Mode with Icon */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-yellow-400 focus:outline-none text-xl"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </motion.button>

          {user ? (
            <>
              <span className="text-sm font-semibold">
                Welcome, {getDisplayName(user.email)}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                onClick={handleLogout}
                className="block px-5 py-2 text-sm font-medium bg-red-600 hover:bg-red-500 rounded-full shadow-md transition duration-300 text-white"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <NavLink
                  to="/login"
                  className="block px-5 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-600 rounded-full shadow-md transition duration-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-center"
                >
                  Login
                </NavLink>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <NavLink
                  to="/signup"
                  className="block px-5 py-2 text-sm font-medium bg-yellow-400 text-gray-800 hover:bg-yellow-300 rounded-full shadow-md transition duration-300 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-center"
                >
                  Sign Up
                </NavLink>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Dark/Light Mode Icon for Mobile */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-yellow-400 focus:outline-none text-xl"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-lightText text-white dark:bg-darkBg p-4 rounded-lg shadow-lg space-y-4 font-sans"
        >
          {[
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: "AllProjects", path: "/all-projects" },
          ].map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="block text-lg font-medium transition duration-200 font-sans"
            >
              <NavLink
                to={item.path}
                onClick={() => {
                  setIsMenuOpen(false); // أغلق المنيو عند النقر
                }}
                className={({ isActive }) =>
                  `block transition duration-200 ${
                    isActive
                      ? "text-yellow-300 underline"
                      : "text-white hover:text-yellow-300"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </motion.div>
          ))}

          <div className="mt-4 border-t border-gray-600 pt-4 space-y-2">
            {user ? (
              <>
                <div className="text-center font-semibold">
                  Welcome, {user.email}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false); // أغلق المنيو عند الخروج
                  }}
                  className="block w-full text-center font-medium bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg transition duration-200 text-white"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block text-center font-medium px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-gray-600 text-yellow-300 underline"
                          : "bg-gray-800 hover:bg-gray-600 text-white"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <NavLink
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block text-center font-medium px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-yellow-500 text-gray-900 underline"
                          : "bg-yellow-400 text-gray-800 hover:bg-yellow-300"
                      }`
                    }
                  >
                    Sign Up
                  </NavLink>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
