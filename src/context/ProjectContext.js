import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getProjectsFromLocalStorage,
  saveProjectsToLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/localStorage";
import { useTasks } from "./TaskContext"; 
import { getProjects as fetchApiProjects } from "../utils/api"; 

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const { tasks, setTasks } = useTasks();

  useEffect(() => {
    const localProjects = getProjectsFromLocalStorage();

    const fetchData = async () => {
      try {
        // 1) جلب 5 مشاريع من JSONPlaceholder
        const apiData = await fetchApiProjects(); 
        const mappedData = apiData.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.body,
        }));

        // 3) دمج المشاريع المحليّة + مشاريع السيرفر
        const merged = [...localProjects, ...mappedData];

        // 4) إزالة أي تكرار في الـ id (لو حصل) 
        //    findIndex() يحافظ على أول عنصر مطابق، ويحذف الباقي
        const uniqueProjects = merged.filter(
          (proj, index, self) =>
            self.findIndex((p) => p.id === proj.id) === index
        );

        // 5) حـفـظ المزيج في الحالة والـ Local Storage
        setProjects(uniqueProjects);
        saveProjectsToLocalStorage(uniqueProjects);
      } catch (error) {
        console.error("Failed to fetch from API:", error);
        // في حال حدوث خطأ، نعرض المشاريع المحلية فقط
        setProjects(localProjects);
      }
    };

    fetchData();
  }, []);

  // إضافة مشروع جديد (محلّي فقط)
  const addProject = (newProject) => {
    // ننشئ id مميز (بسيط)
    const updatedProjects = [
      ...projects,
      { id: Date.now(), ...newProject },
    ];
    setProjects(updatedProjects);
    saveProjectsToLocalStorage(updatedProjects);
  };

  // حذف مشروع + حذف المهام المرتبطة
  const deleteProject = (id) => {
    // 1) حذف من المشاريع
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    saveProjectsToLocalStorage(updatedProjects);

    // 2) حذف المهام المتعلقة
    const updatedTasks = tasks.filter((task) => task.projectId !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // تعديل مشروع
  const editProject = (id, updatedProjectData) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === id
          ? {
              ...project,
              title: updatedProjectData.title?.trim() || project.title,
              description:
                updatedProjectData.description?.trim() || project.description,
            }
          : project
      );
      saveProjectsToLocalStorage(updatedProjects);
      return updatedProjects;
    });
  };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, deleteProject, editProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
