import React, { createContext, useContext, useState, useEffect } from "react";

// 1) إنشاء الـ Context
const AuthContext = createContext();

/**
 * دالة مساعده عشان نعرض جزء من الإيميل بدون الأرقام والرموز.
 * ممكن تستخدمها في أي مكان تعرض فيه اسم المستخدم.
 */
export const getDisplayName = (email) => {
  if (!email) return "";
  const namePart = email.split("@")[0];
  // اشيل أي حاجة غير الأحرف A-Z أو a-z
  const justLetters = namePart.replace(/[^A-Za-z]/g, "");
  // عمل Capitalize لأول حرف
  if (!justLetters) return "";
  return justLetters.charAt(0).toUpperCase() + justLetters.slice(1);
};

// 2) دوال التخزين/الاسترجاع من localStorage (بسيطة)
const getAllUsersFromLocalStorage = () => {
  try {
    const savedUsers = localStorage.getItem("allUsers");
    return savedUsers ? JSON.parse(savedUsers) : [];
  } catch {
    return [];
  }
};

const saveAllUsersToLocalStorage = (users) => {
  localStorage.setItem("allUsers", JSON.stringify(users));
};

const getActiveUserFromLocalStorage = () => {
  try {
    const savedUser = localStorage.getItem("activeUser");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
};

const saveActiveUserToLocalStorage = (user) => {
  localStorage.setItem("activeUser", JSON.stringify(user));
};

export const AuthProvider = ({ children }) => {

  const [users, setUsers] = useState(() => {
    const localUsers = getAllUsersFromLocalStorage();
    return localUsers.length > 0
      ? localUsers
      : [{ email: "user@example.com", password: "password" }];
  });

  const [user, setUser] = useState(() => {
    return getActiveUserFromLocalStorage();
  });
  const login = (email, password) => {
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (existingUser) {
      setUser({ email });
      return true; // نجح
    }
    return false; // فشل
  };

  /** دالة الخروج */
  const logout = () => {
    setUser(null);
  };
  const signUp = (email, password) => {
    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      return false;
    }
    setUsers([...users, { email, password }]);
    return true;
  };

  useEffect(() => {
    saveAllUsersToLocalStorage(users);
  }, [users]);

  useEffect(() => {
    if (user) {
      saveActiveUserToLocalStorage(user);
    } else {
      localStorage.removeItem("activeUser");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4) Hook جاهز للاستخدام في أي كومبوننت
export const useAuth = () => useContext(AuthContext);
