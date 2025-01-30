import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="mb-6 relative w-full max-w-md mx-auto">
      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg  focus:outline-none 
          bg-gray-800 dark:text-gray-900 dark:bg-gray-300 text-white transition-colors duration-300"
      />
      {/* Search Icon */}
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-00 text-2xl pointer-events-none" />
    </div>
  );
};

export default SearchBar;
