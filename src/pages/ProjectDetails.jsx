import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProjects, useTasks } from "../context";
import ProgressBar from "../components/ProgressBar";

const ProjectDetails = () => {
  const { id } = useParams();
  const { projects } = useProjects();
  const { tasks } = useTasks();

  const [project, setProject] = useState(null);
  const [filter, setFilter] = useState("all"); // فلتر المهام (all, completed, pending)

  useEffect(() => {
    const foundProject = projects.find((proj) => proj.id === Number(id));
    setProject(foundProject || null);
  }, [id, projects]);

  // إذا لم يوجد المشروع
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Project Not Found</h1>
        <Link
          to="/projects"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  // حساب نسبة المهام المكتملة
  const projectTasks = tasks.filter((task) => task.projectId === Number(id));
  const completedTasks = projectTasks.filter((task) => task.completed).length;
  const totalTasks = projectTasks.length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // تصفية المهام
  const filteredTasks =
    filter === "completed"
      ? projectTasks.filter((task) => task.completed)
      : filter === "pending"
      ? projectTasks.filter((task) => !task.completed)
      : projectTasks; // all

  return (
  

    <div className=" flex items-center min-h-screen justify-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white ">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-800 opacity-30 rounded-full animate-circle"></div>
      <div className="absolute -bottom-0 -right-0 w-64 h-64 bg-purple-300 opacity-30 rounded-full animate-plus"></div>
      <div className="absolute -top-0 -right-0 w-72 h-72 bg-pink-700 opacity-25 rounded-full animate-circle"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl   w-full mt-12  rounded-lg  bg-gray-800/20 dark:bg-gray-900/80 backdrop-blur-sm p-10 space-y-8"
      >
        {/* عنوان ووصف المشروع */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-yellow-400">
            {project.title}
          </h1>
          <p className="text-gray-200 whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* شريط التقدّم */}
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold text-gray-100">
            Progress: {progress}%
          </h3>
          <ProgressBar progress={progress} />
        </div>

        {/* أزرار الفلترة */}
        <div className="flex flex-wrap justify-center items-center gap-4">
  <button
    onClick={() => setFilter("all")}
    className={`px-6 py-2 rounded-full font-medium transition ${
      filter === "all"
        ? "bg-blue-500 hover:bg-blue-400 text-white"
        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
    }`}
  >
    All Tasks
  </button>

  <button
    onClick={() => setFilter("completed")}
    className={`px-6 py-2 rounded-full font-medium transition ${
      filter === "completed"
        ? "bg-green-500 hover:bg-green-400 text-white"
        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
    }`}
  >
    Completed
  </button>

  <button
    onClick={() => setFilter("pending")}
    className={`px-6 py-2 rounded-full font-medium transition ${
      filter === "pending"
        ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
    }`}
  >
    Pending
  </button>
</div>


        <p className="text-center text-sm text-gray-300">
          Showing {filteredTasks.length} tasks
        </p>

        {/* قائمة المهام المختصرة، نجعلها في شبكية بعمدودين على الشاشات المتوسطة فأعلى */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-4 rounded-lg bg-gray-800 shadow"
              >
                <div className="space-y-1">
                  <h4 className="text-lg font-medium text-gray-100">
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-400">
                    Status:{" "}
                    <span
                      className={
                        task.completed ? "text-green-400" : "text-yellow-400"
                      }
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 col-span-full">
              No tasks found.
            </div>
          )}
        </div>

        {/* زر لعرض صفحة المهام الكاملة */}
        <div className="text-center pt-2">
          <Link
            to={`/projects/${project.id}/tasks`}
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-400 transition"
          >
            View All Tasks
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
