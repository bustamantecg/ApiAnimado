import React, { useState } from 'react';
import './index.css'
import Footer from './components/Footer'
import NavBar from './components/NavBar'

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
      <NavBar toggleTheme={toggleTheme}/>          
      <Footer />
     
    </div>  
    </>
  )
}

export default App
