import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // إذا كان هناك صفحة واحدة فقط، لا حاجة لعرض Pagination

  return (
    <div className="mt-10 pt-5 flex flex-wrap justify-center gap-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold ${
            currentPage === index + 1
            ? "bg-yellow-500 text-gray-900"
            : "bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 hover:bg-gray-700"
        } shadow-md transition`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
