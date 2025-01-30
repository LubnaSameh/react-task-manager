// api.js: This file handles API calls

// Use JSONPlaceholder API
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// نضيف بارامتر ?_limit لتحديد العدد

export const getProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?_limit=5`); 
    // هيجيب أول 5 عناصر فقط
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};


export const addProject = async (newProject) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });
    // JSONPlaceholder returns the added object
    return await response.json();
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    await fetch(`${API_BASE_URL}/posts/${projectId}`, {
      method: "DELETE",
    });
    
    // JSONPlaceholder does not actually delete but responds with status 200
    return { success: true, id: projectId };
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
