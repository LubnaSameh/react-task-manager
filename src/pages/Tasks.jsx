import React, { useState } from "react";
import { TaskCard, SearchBar, Pagination, ReusableForm } from "../components"; 
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useProjects, useTasks } from "../context";
import { useParams, useNavigate } from "react-router-dom";

const Tasks = () => {
  const { tasks, addTask, deleteTask, toggleTaskStatus, editTask } = useTasks();
  const { projects } = useProjects();
  const { projectId } = useParams();
  const navigate = useNavigate(); // ← نُبقيه ونستعمله عند الحاجة

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  // جلب المشروع المطلوب
  const project = projects.find((proj) => proj.id === Number(projectId));
  const projectTitle = project ? project.title : "Unknown Project";

  // تصفية المهام الخاصة بالمشروع
  const projectTasks = tasks.filter(
    (task) => task.projectId && task.projectId === Number(projectId)
  );

  // إضافة مهمة جديدة
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      toast.error("Please fill out the task title!");
      return;
    }

    addTask({ ...newTask, projectId: Number(projectId) });
    setNewTask({ title: "", description: "", completed: false });
    toast.success("Task added successfully!");
  };

  // تعديل مهمة
  const handleEditTask = (id, updatedTask) => {
    editTask(id, updatedTask);
    toast.success("Task updated successfully!");
  };

  // بحث في عناوين المهام
  const filteredTasks = projectTasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // حساب عناصر الصفحة الحالية للـ Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = search.trim()
    ? filteredTasks
    : filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // مثال لاستخدام navigate: عودة إلى قائمة المشاريع
  const handleGoBack = () => {
    navigate("/projects"); // ← ينتقل إلى صفحة المشاريع
  };

  return (
    <div className="relative py-8 min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-800 opacity-30 rounded-full animate-circle" />
      <div className="absolute -bottom-0 -right-0 w-64 h-64 bg-purple-300 opacity-30 rounded-full animate-plus" />
      <div className="absolute -top-0 -right-0 w-72 h-72 bg-pink-700 opacity-25 rounded-full animate-circle" />

      <div className="relative container mx-auto px-6 pt-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl text-yellow-400 font-bold mb-8"
        >
          <span className="text-4xl font-bold">
            Tasks for Project:{" "}
            <span className="text-white">{projectTitle}</span>
          </span>
        </motion.h1>

        {/* نموذج إضافة مهمة جديدة */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <ReusableForm
            titlePlaceholder="Task Title"
            descriptionPlaceholder="Task Description"
            titleValue={newTask.title}
            descriptionValue={newTask.description}
            onTitleChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            onDescriptionChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            onSubmit={handleAddTask}
            buttonText="Add Task"
          />
        </motion.div>

        {/* زر العودة مع شريط البحث */}
        <div className="relative mb-6 w-full min-h-[60px]">
  {/* زر العودة */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    onClick={handleGoBack}
    /*
      - افتراضياً (mobile): 'block mx-auto mb-4' => يظهر أسفل البحث في سطر منفصل
      - في الشاشات المتوسطة وأعلى (md:): 'absolute left-2 top-1/2 -translate-y-1/2' => يرجع لوضعه السابق
    */
    className="
      block mx-auto mb-4
      px-4 py-2 bg-gray-800 text-white font-medium rounded-full shadow-lg 
      hover:bg-gray-700 transition duration-300
      /* عند الشاشة md يصبح مطلق */
      md:absolute
      md:left-4
      md:top-1/2
      md:-translate-y-1/2 
    "
  >
    Back to Projects
  </motion.button>

  {/* شريط البحث في المنتصف */}
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    /* نجعل ارتفاع الحاوية أكبر كي لا يتداخل العنصران */
    className="mx-auto w-full max-w-md h-full flex items-center justify-center z-10"
  >
    <SearchBar
      placeholder="Search Tasks by Title..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
    />
  </motion.div>
</div>




        {/* عرض المهام */}
        <div className="grid pt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentTasks.map((task, index) => (
            <TaskCard
              key={task.id}
              index={index}
              task={task}
              onDelete={() => deleteTask(task.id)}
              onToggleStatus={() => toggleTaskStatus(task.id)}
              onEdit={handleEditTask}
            />
          ))}
        </div>

        {/* Pagination */}
        {!search.trim() && (
          <Pagination
            totalItems={filteredTasks.length}
            itemsPerPage={tasksPerPage}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default Tasks;
