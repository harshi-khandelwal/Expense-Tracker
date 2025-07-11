import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../context/theme';
import ThemeBtn from './ThemeBtn';
import { IoMdHome } from "react-icons/io";
import { GoGoal } from "react-icons/go";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaRegFilePdf } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const [themeMode, setThememode] = useState("dark")
  const lightTheme = () => setThememode('light');
  const darkTheme = () => setThememode('dark');

  useEffect(() => {
    const html = document.querySelector('html');
    html.classList.remove('light', 'dark');
    html.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 px-6 py-3 flex items-center justify-between">
        {/* Home */}
        <div
          onClick={() => navigate('/')}
          className={`text-xl cursor-pointer transition hover:scale-110 ${
            isActive('/') ? 'opacity-100' : 'opacity-60'
          }`}
        >
          {themeMode === 'dark' ? <IoMdHome size={24} className='text-white' /> : <IoMdHome size={24} />}
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-3xl font-bold text-primary dark:text-white">
          Expense Tracker
        </h1>

        {/* Right Section: Goals, Analytics, PDF, Theme */}
        <div className="flex items-center gap-5">
          {/* Goals */}
          <div
            onClick={() => navigate('/goal')}
            className={`cursor-pointer transition hover:scale-110 ${
              isActive('/goal') ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {themeMode === 'dark' ? (
              <GoGoal size={24} className='text-white' />
            ) : (
              <GoGoal size={24} />
            )}
          </div>

          {/* Analytics */}
          <div
            onClick={() => navigate('/analytics')}
            className={`cursor-pointer transition hover:scale-110 ${
              isActive('/analytics') ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {themeMode === 'dark' ? (
              <TbBrandGoogleAnalytics size={24} className='text-white' />
            ) : (
              <TbBrandGoogleAnalytics size={24} />
            )}
          </div>

          {/* PDF Download */}
          <div
            onClick={() => navigate('/download')}
            className="cursor-pointer transition hover:scale-110"
          >
            {themeMode === 'dark' ? (
              <FaRegFilePdf size={24} className='text-white'/>
            ) : (
              <FaRegFilePdf size={24} />
            )}
          </div>

          {/* Theme Switch Button */}
          <ThemeBtn />
        </div>
      </nav>
    </ThemeProvider>
  );
};

export default Navbar;
