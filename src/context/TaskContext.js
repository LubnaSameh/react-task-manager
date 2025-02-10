import React, { createContext, useContext, useState, useEffect } from "react";

import {
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
} from "../utils/localStorage";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // تحميل المهام من Local Storage عند التحميل الأول
  useEffect(() => {
    const localTasks = getTasksFromLocalStorage();
    setTasks(localTasks);
  }, []);

  // إضافة مهمة جديدة
  const addTask = (newTask) => {
    // دمج الوقت الحالي مع قيمة عشوائية
    const uniqueId = Date.now() + Math.random();
    const updatedTasks = [...tasks, { id: uniqueId, ...newTask }];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };
  

  // حذف مهمة
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // تغيير حالة المهمة (completed / not completed)
  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // تعديل مهمة
  const editTask = (id, updatedTaskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTaskData } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks, // أضفنا setTasks أيضًا حتى نستخدمها من خارج هذا السياق لو احتجنا
        addTask,
        deleteTask,
        toggleTaskStatus,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
