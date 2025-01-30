const fs = require('fs');
const path = require('path');

// personal project manage
const baseDir = path.join(__dirname, 'src'); // تأكد من أن المسار يشير إلى src مباشرة

// الهيكلية المطلوبة
const structure = {
  assets: {
    images: {}, // يمكن إضافة ملفات الصور هنا لاحقًا
    fonts: {},  // يمكن إضافة ملفات الخطوط هنا لاحقًا
  },
  components: {
    'Navbar.jsx': '',
    'Footer.jsx': '',
    'TaskCard.jsx': '',
    'ProjectCard.jsx': '',
    'ProgressBar.jsx': '',
    'index.js': '',
  },
  layouts: {
    'AdminLayout.jsx': '',
    'DefaultLayout.jsx': '',
  },
  pages: {
    'Home.jsx': '',
    'Projects.jsx': '',
    'ProjectDetails.jsx': '',
    'Tasks.jsx': '',
    'NotFound.jsx': '',
    'index.js': '',
  },
  router: {
    'Router.jsx': '',
  },
  context: {
    'ProjectContext.js': '',
    'TaskContext.js': '',
    'themeContext.js': '',
    'index.js': '',
  },
  utils: {
    'api.js': '',
    'formatDate.js': '',
    'calculateStats.js': '',
    'localStorage.js': '',
    'index.js': '',
  },
  styles: { // تم نقل styles ليكون مجلدًا مستقلاً
    'tailwind.css': '',
  },
};

// وظيفة لإنشاء الملفات والمجلدات
const createStructure = (basePath, structure) => {
  for (const key in structure) {
    const newPath = path.join(basePath, key);

    if (typeof structure[key] === 'object') {
      // إنشاء مجلد
      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
        console.log(`📁 Created folder: ${newPath}`);
      }
      // استدعاء الوظيفة مرة أخرى للمجلدات الفرعية
      createStructure(newPath, structure[key]);
    } else {
      // إنشاء ملف
      if (!fs.existsSync(newPath)) {
        fs.writeFileSync(newPath, structure[key]);
        console.log(`📄 Created file: ${newPath}`);
      }
    }
  }
};

// تنفيذ الوظيفة لإنشاء الهيكلية
createStructure(baseDir, structure);

console.log('✅ Project structure created successfully!');
