//npm install -D tailwindcss postcss autoprefixer
//npm install -D tailwindcss@3.3.3 postcss@8.5.1 autoprefixer@10.4.20

//npx tailwindcss init
//npm install react-router-dom
//npm install framer-motion
//npm install react-icons

//npm install react-parallax-tilt    =>3D
//npm install react-toastify

import '@testing-library/jest-dom';
import React from "react";
import AppRouter from "./router/Router";

const App = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};
export default App;

// npx eslint src => tell me if there are errors
// npx eslint src --fix => if make update in file eslint.config.js

// test
//npm install --save-dev @babel/plugin-proposal-private-property-in-object
//npm install --save-dev jest @testing-library/react @testing-library/jest-dom
//npm install react-scripts@latest








