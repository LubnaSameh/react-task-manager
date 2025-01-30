import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdDelete, MdEdit } from "react-icons/md";

// ✅ دالة لتقصير النصوص الطويلة
const truncateText = (text, maxLength) => {
  if (!text) return "No data available";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const ProjectCard = ({ index, project, onDelete, onEdit }) => {
  const { id, title, description } = project;
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({ title, description });

  const handleSaveEdit = () => {
    if (!editedProject?.title?.trim()) {
      return;
    }

    onEdit(id, {
      title: editedProject.title.trim(),
      description: editedProject.description.trim() || "No description available",
    });

    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.3 }}
      className="relative bg-gradient-to-br from-gray-600 via-gray-600 to-gray-700 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-500 hover:scale-105 transition-transform duration-300 overflow-hidden group"
    >
      {/* زر الحذف */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onDelete(id)}
        className="absolute top-5 right-4 text-yellow-400 rounded-full w-10 h-10 flex items-center justify-center transition cursor-pointer"
      >
        <MdDelete className="text-xl" />
      </motion.button>

      {isEditing ? (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <input
            type="text"
            value={editedProject.title}
            onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
            className="w-full px-4 py-2 mb-2 rounded-lg bg-gray-900 text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editedProject.description}
            onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
            className="w-full px-4 py-2 mb-2 rounded-lg bg-gray-900 text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-400 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* عنوان المشروع */}
          <h2 className="text-xl font-bold mb-2 text-gray-100 pe-2">
            {truncateText(title, 20)}
          </h2>

          {/* وصف المشروع مع دعم الأسطر الجديدة */}
          <p
            className="text-md text-gray-400 mb-4"
            style={{
              whiteSpace: "pre-wrap", // ✅ دعم فواصل الأسطر
              wordBreak: "break-word", // ✅ تجنب تجاوز النص للحاوية
            }}
          >
            {truncateText(description, 100)}
          </p>

          <div className="flex justify-between items-center mt-4">
            {/* زر عرض التفاصيل */}
            <Link
              to={`/projects/${id}`}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:from-blue-400 hover:to-purple-500 transition duration-300"
            >
              View Details
            </Link>

            {/* زر التعديل */}
            <button
              onClick={() => setIsEditing(true)}
              className="py-2 text-yellow-400 rounded-lg transition"
            >
              <MdEdit className="text-xl" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ProjectCard;
