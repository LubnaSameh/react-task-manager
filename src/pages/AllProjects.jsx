// src/pages/AllProjects.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useProjects, useTasks } from "../context";
import { SearchBar, Pagination } from "../components";

// كومبوننت فرعية تمثل مشروع واحد
function ProjectItem({ project, tasks, index, toggleTaskStatus }) {
  const [titleExpanded, setTitleExpanded] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const CARD_HEIGHT = 420;

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className={`bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800
                  dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 
                  rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500 
                  flex flex-col p-6 h-[${CARD_HEIGHT}px]
                  z-10 relative // نجعلها نسبية وعليها z-10 لتكون فوق خلفية الدوائر
                  `}
    >
      <div className="mb-4 ">
        {/* عنوان المشروع */}
        <div className="relative">
          <p
            className={`font-bold text-xl md:text-2xl text-yellow-200 ${
              titleExpanded
                ? ""
                : "line-clamp-1 overflow-hidden text-ellipsis"
            } transition-all duration-300`}
          >
            {project.title}
          </p>
          {project.title && project.title.length > 30 && (
            <button
              onClick={() => setTitleExpanded(!titleExpanded)}
              className="text-sm text-blue-300 hover:underline ml-2"
            >
              {titleExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* وصف المشروع */}
        <div className="relative mt-2">
          <p
            className={`text-sm md:text-base text-gray-300 break-words transition-all duration-300 ${
              descExpanded
                ? ""
                : "line-clamp-1 overflow-hidden text-ellipsis"
            }`}
          >
            {project.description}
          </p>
          {project.description && project.description.length > 50 && (
            <button
              onClick={() => setDescExpanded(!descExpanded)}
              className="text-xs text-blue-300 hover:underline ml-2"
            >
              {descExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>

      {/* الجزء الأوسط: زر Details + المهام */}
      <div className="mb-4 flex-1">
      <div className="flex flex-col text-center sm:flex-row sm:gap-4 sm:justify-between mb-4">

      <Link
        to={`/projects/${project.id}`}
        className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full shadow transition duration-300 mb-3 sm:mb-0"
      >
        View Details
      </Link>

      <Link
        to={`/projects/${project.id}/tasks`}
        className="inline-block px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-full shadow transition duration-300"
      >
        View Tasks
      </Link>
    </div>

        {tasks.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">Tasks:</h3>
            <div className="max-h-36 overflow-y-auto space-y-3 pr-1">
              {tasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: "easeOut",
                  }}
                  className="p-3 bg-gray-900 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-md text-yellow-100">
                      {task.title}
                    </h4>
                    {toggleTaskStatus && (
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`px-2 py-1 ml-2 text-xs font-medium rounded-full 
                          ${
                            task.completed
                              ? "bg-green-500 text-white"
                              : "bg-yellow-400 text-gray-900"
                          }`}
                      >
                        {task.completed ? "Completed" : "Mark as Done"}
                      </button>
                    )}
                  </div>
                  <p className="text-gray-200 mt-1">{task.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 italic mt-2">No tasks for this project.</p>
        )}
      </div>
    </motion.div>
  );
}

// الكومبوننت الرئيسية AllProjects
export default function AllProjects() {
  const { projects } = useProjects();
  const { tasks, toggleTaskStatus } = useTasks();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  // فلترة المشاريع
  const filteredProjects = projects
    .filter((project) => {
      const projectTitle = project.title ? project.title.toLowerCase() : "";
      return projectTitle.includes(search.toLowerCase());
    })
    .reverse();

  // تقسيم الصفحات
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = search.trim()
    ? filteredProjects
    : filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="relative  flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700
                 dark:from-gray-700 dark:via-gray-700 dark:to-gray-700
                 text-white pt-24 pb-10 px-6 overflow-hidden"
    >
      {/* ضع الدوائر المطلقة هنا، خلف كل العناصر */}
      <div className="absolute z-0 top-1/4 -left-20 w-72 h-72 bg-blue-400 opacity-20 rounded-full animate-circle" />
      <div className="absolute z-0 -bottom-0 -right-0 w-64 h-64 bg-purple-500 opacity-20 rounded-full animate-plus" />
      <div className="absolute z-0 -top-0 -right-0 w-72 h-72 bg-pink-500 opacity-20 rounded-full animate-circle" />

      <div className="container mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-yellow-400 text-center mb-6"
        >
          All Projects Overview
        </motion.h1>

        <div className="max-w-md mx-auto mb-10">
          <SearchBar
            placeholder="Search Projects by Title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => {
            const relatedTasks = tasks.filter(
              (task) => task.projectId === project.id
            );

            return (
              <ProjectItem
                key={project.id}
                project={project}
                tasks={relatedTasks}
                index={index}
                toggleTaskStatus={toggleTaskStatus}
              />
            );
          })}
        </div>

        {!search.trim() && (
          <div className="mt-8">
            <Pagination
              totalItems={filteredProjects.length}
              itemsPerPage={projectsPerPage}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          </div>
        )}
      </div>
    </div>
  );
}
