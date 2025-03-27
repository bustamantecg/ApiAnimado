import React, { useState } from 'react';
import './index.css';
import { ToastContainer, toast } from "react-toastify"; // No olvides este componente
import "react-toastify/dist/ReactToastify.css";

import Footer from './components/Footer';
import NavBar_2 from './components/NavBar_2';

import ApiPersonajes from './components/ApiPersonajes';
import { FavoritosProvider } from './components/context/FavoritosContext';

function App() {
 
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <>
    <div className="min-h-screen flex flex-col bg-base-200">
    <ToastContainer />      
      <FavoritosProvider>
        <NavBar_2 toggleTheme={toggleTheme} />        
        <ApiPersonajes />
      </FavoritosProvider>
      <Footer />      
    </div>  
    </>
  )
}

export default App
