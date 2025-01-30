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

// 3) AuthProvider
export const AuthProvider = ({ children }) => {
  // قراءة المستخدمين من localStorage أو وضع قيم افتراضية
  const [users, setUsers] = useState(() => {
    const localUsers = getAllUsersFromLocalStorage();
    return localUsers.length > 0
      ? localUsers
      : [{ email: "user@example.com", password: "password" }];
  });

  // قراءة المستخدم الحالي من localStorage
  const [user, setUser] = useState(() => {
    return getActiveUserFromLocalStorage();
  });

  /**
   * دالة تسجيل الدخول:
   * تبحث في users عن إيميل وباسورد متطابق
   * لو موجود تضبط user بـ { email } وترجع true
   * لو غير موجود ترجع false.
   */
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

  /**
   * دالة تسجيل مستخدم جديد:
   * تتحقق إن ما فيش يوزر بنفس الإيميل،
   * لو فيه ترجع false
   * لو لأ تضيفه في مصفوفة users وترجع true
   */
  const signUp = (email, password) => {
    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      return false; 
    }
    setUsers([...users, { email, password }]);
    return true;
  };

  /**
   * مزامنة (Sync) مع الـ localStorage:
   * كلما تتغير قائمة المستخدمين (users)، نخزنها في allUsers
   */
  useEffect(() => {
    saveAllUsersToLocalStorage(users);
  }, [users]);

  /**
   * كلما تتغير user (تسجيل دخول أو خروج)، نخزنها أو نمسحها من localStorage
   */
  useEffect(() => {
    if (user) {
      saveActiveUserToLocalStorage(user);
    } else {
      localStorage.removeItem("activeUser");
    }
  }, [user]);

  // توفير القيم والدوال لباقي التطبيق
  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4) Hook جاهز للاستخدام في أي كومبوننت
export const useAuth = () => useContext(AuthContext);
