// ✅ التأكد من إزالة أي مراجع دائرية قبل الحفظ
export const saveProjectsToLocalStorage = (projects) => {
  const sanitizedProjects = projects.map(({ id, title, description }) => ({
    id,
    title,
    description,
  }));
  localStorage.setItem("projects", JSON.stringify(sanitizedProjects));
};

export const getProjectsFromLocalStorage = () => {
  const savedProjects = localStorage.getItem("projects");
  return savedProjects ? JSON.parse(savedProjects) : [];
};
///////////////////////////////////////////////////
// ✅ التعامل مع المهام بطريقة منظمة
export const saveTasksToLocalStorage = (tasks) => {
  const sanitizedTasks = tasks.map(({ id, title, description, completed, projectId }) => ({
    id,
    title,
    description,
    completed,
    projectId,
  }));
  localStorage.setItem("tasks", JSON.stringify(sanitizedTasks));
};

export const getTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};
///////////////////////
// تخزين بيانات المستخدم الحالي (اللي عامل Login)
export const saveUserToLocalStorage = (user) => {
  localStorage.setItem("activeUser", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem("activeUser");
  return savedUser ? JSON.parse(savedUser) : null;
};

// تخزين كل المستخدمين (لو بتحتاجهم عشان login/signup محلي)
export const saveAllUsersToLocalStorage = (users) => {
  localStorage.setItem("allUsers", JSON.stringify(users));
};

export const getAllUsersFromLocalStorage = () => {
  const savedUsers = localStorage.getItem("allUsers");
  return savedUsers ? JSON.parse(savedUsers) : [];
};
