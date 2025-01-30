// eslint.config.js 
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1) تعيين الملفات المستهدفة
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },

  // 2) وضع globals المتاحة في المتصفح
  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  // 3) التوصيات العامة من ESLint والـ pluginJs
  pluginJs.configs.recommended,

  // 4) توصيات React مع النظام الجديد (flat)
  pluginReact.configs.flat.recommended,

  // 5) قواعدنا المخصصة
  {
    rules: {
      "react/react-in-jsx-scope": "off", // إيقاف تحذير وجوب React في النطاق
      "react/prop-types": "off",        // إيقاف تحذير نقص PropTypes
      "no-unused-vars": "warn",         // جعل متغيرات غير مستخدمة مجرد تحذير
      // ... إلخ
    },
  },

  // 6) دعم Jest في الاختبارات
  {
    files: ["**/*.test.{js,jsx}", "**/__tests__/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
