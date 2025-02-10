import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdDelete, MdEdit} from "react-icons/md";

// لة لتقصير النصوص الطويلة
const truncateText = (text, maxLength) => {
  if (!text) return "No description available";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const TaskCard = ({ index, task, onDelete, onToggleStatus, onEdit }) => {
  const { id, title, description, completed } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title, description });

  const handleSaveEdit = () => {
    if (!editedTask.title?.trim()) {
      return;
    }

    onEdit(id, {
      title: editedTask.title.trim(),
      description: editedTask.description?.trim() || "No description available",
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
      {/* زر الحذف في الأعلى */}
      <button
        onClick={onDelete}
        className="absolute top-5 right-4 text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center transition"
      >
        <MdDelete className="text-lg" />
      </button>

      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full px-4 py-2 mb-2 rounded-lg bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full px-4 py-2 mb-2 rounded-lg bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-400 transition"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          {/* عنوان المهمة */}
          <h2 className="text-xl font-bold mb-2 text-gray-100 pe-2">
            {truncateText(title, 20)}
          </h2>

          {/* وصف المهمة مع دعم الأسطر الجديدة */}
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
            {/* زر تغيير الحالة */}
            <button
              onClick={onToggleStatus}
              className={`px-4 py-2 rounded-lg font-semibold shadow transition ${
                completed
                  ? "bg-green-500 text-white hover:bg-green-400"
                  : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
              }`}
            >
              {completed ? "Completed" : "Mark as Done"}
            </button>

            {/* زر تعديل */}
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-500 rounded-lg transition"
            >
              <MdEdit className="text-lg" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TaskCard;
