import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../context/theme';
import ThemeBtn from './ThemeBtn';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
   
   const [themeMode, setThememode] = useState("light")
  
    const lightTheme = () =>{
      setThememode("light")
    }
  
     const darkTheme = () =>{
      setThememode("dark")
    }
  
  
    useEffect(() => {
      document.querySelector('html').classList.remove("light", "dark")
      document.querySelector('html').classList.add(themeMode)
    },[themeMode])

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 px-6 py-3 flex items-center justify-between">
      {/* home */}
  <img
    src="/icons/Home.png"
    alt="Home"
    onClick={() => navigate('/')}
    className={`w-6 h-6 cursor-pointer transition transform hover:scale-110 ${isActive('/') ? 'opacity-100' : 'opacity-60'}`}
  />

  {/* heading*/}
  <h1 className="text-3xl sm:text-3xl font-bold text-primary dark:text-white">
    Expense Tracker
  </h1>

  {/* goal */}
  <div className="flex items-center gap-5">
    <img
      src="/icons/goal.jpg"
      alt="Goals"
      onClick={() => navigate('/goal')}
      className={`w-6 h-6 cursor-pointer transition transform hover:scale-110 ${isActive('/goals') ? 'opacity-100' : 'opacity-60'}`}
    />
    {/* analytics */}
    <img
      src="/icons/analytics.png"
      alt="Analytics"
      onClick={() => navigate('/analytics')}
      className={`w-6 h-6 cursor-pointer transition transform hover:scale-110 ${isActive('/analytics') ? 'opacity-100' : 'opacity-60'}`}
    />
    {/* pdf */}
    <img
      src="/icons/pdf.png"
      alt="Download PDF"
      onClick={() => navigate('/download')}
      className="w-6 h-6 cursor-pointer transition transform hover:scale-110"
    />
    <ThemeBtn />
  </div>
</nav>
</ThemeProvider >

  );
};

export default Navbar;
