import React, { useState } from "react";
import { ProjectCard, SearchBar, Pagination, ReusableForm } from "../components";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useProjects } from "../context/ProjectContext";

const Projects = () => {
  const { projects, addProject, deleteProject, editProject } = useProjects();
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // عدد العناصر في كل صفحة
  const projectsPerPage = 6;

  // إضافة مشروع جديد
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) {
      toast.error("Please fill out all fields!");
      return;
    }

    addProject(newProject);
    setNewProject({ title: "", description: "" });
    toast.success("Project added successfully!");
  };

  // تعديل مشروع
  const handleEditProject = (id, updatedData) => {
    if (!updatedData?.title?.trim()) {
      toast.error("Project title cannot be empty!");
      return;
    }

    editProject(id, {
      title: updatedData.title.trim(),
      description: updatedData.description?.trim() || "No description available",
    });

    setNewProject({ title: "", description: "" });
    toast.success("Project updated successfully!");
  };

  // حذف مشروع
  const handleDeleteProject = (id) => {
    deleteProject(id);
    toast.info("Project deleted successfully!");
  };

  // تصفية المشاريع على أساس البحث + الترتيب عكسي (الأحدث أولاً)
  const filteredProjects = projects
    .filter((project) => {
      const projectTitle = project.title ? project.title.toLowerCase() : "untitled project";
      return projectTitle.includes(search.toLowerCase());
    })
    .reverse();

  // حساب حدود الصفحة الحالية
  const indexOfLastProject = currentPage * projectsPerPage; // آخر عنصر في الصفحة
  const indexOfFirstProject = indexOfLastProject - projectsPerPage; // أول عنصر في الصفحة

  // لو في بحث، اعرض كل نتائج البحث (بدون Pagination)، وإلا اعرض الصفحة الحالية فقط
  const currentProjects = search.trim()
    ? filteredProjects
    : filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // تغيير الصفحة
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative py-8 min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white">
       {/* Moving Circles in Background */}
       <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-800 opacity-30 rounded-full animate-circle"></div>
      <div className="absolute -bottom-0 -right-0 w-64 h-64 bg-purple-300 opacity-30 rounded-full animate-plus"></div>
      <div className="absolute -top-0 -right-0 w-72 h-72 bg-pink-700 opacity-25 rounded-full animate-circle"></div>

      <div className="relative container mx-auto px-6 pt-20 text-center">
        {/* عنوان الصفحة */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl text-yellow-400 font-bold mb-8"
        >
          Projects
        </motion.h1>

        {/* نموذج إضافة مشروع جديد */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <ReusableForm
            titlePlaceholder="Project Title"
            descriptionPlaceholder="Project Description"
            titleValue={newProject.title}
            descriptionValue={newProject.description}
            onTitleChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            onDescriptionChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            onSubmit={handleAddProject}
            buttonText="Add Project"
          />
        </motion.div>

        {/* مربع البحث */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 relative"
        >
          <SearchBar
            placeholder="Search Projects by Title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // ارجع للصفحة الأولى عند الكتابة في البحث
            }}
          />
        </motion.div>

        {/* عرض المشاريع */}
        <div className="grid pt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              index={index}
              project={project}
              onDelete={() => handleDeleteProject(project.id)}
              onEdit={(id, updatedData) => handleEditProject(id, updatedData)}
            />
          ))}
        </div>

        {/* عرض الـ Pagination في حالة عدم وجود بحث */}
        {!search.trim() && (
          <Pagination
            totalItems={filteredProjects.length}
            itemsPerPage={projectsPerPage}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
