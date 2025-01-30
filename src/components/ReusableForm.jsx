import React from "react";
import { AiFillFolderAdd, AiOutlineFileText } from "react-icons/ai"; // استيراد الأيقونات

const ReusableForm = ({
  titlePlaceholder,
  descriptionPlaceholder,
  titleValue,
  descriptionValue,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  buttonText,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-10 bg-gradient-to-br from-gray-600 via-gray-600 to-gray-700 p-6 rounded-lg shadow-lg max-w-xl mx-auto"
    >
      {/* حقل الإدخال مع الأيقونة */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder={titlePlaceholder || "Title"}
          value={titleValue}
          onChange={onTitleChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <AiFillFolderAdd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
      </div>

      {/* حقل النص مع الأيقونة */}
      <div className="mb-4 relative">
        <textarea
          placeholder={descriptionPlaceholder || "Description"}
          value={descriptionValue}
          onChange={onDescriptionChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <AiOutlineFileText className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
      </div>

      {/* الزر */}
      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
      >
        {buttonText || "Submit"}
      </button>
    </form>
  );
};

export default ReusableForm;
