import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../context/theme';
import ThemeBtn from './ThemeBtn';
import { IoMdHome } from "react-icons/io";
import { GoGoal } from "react-icons/go";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaRegFilePdf } from "react-icons/fa";
import ReactTooltip from "react-tooltip"

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const [themeMode, setThememode] = useState("dark");

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
        
        <div
          onClick={() => navigate('/')}
          data-tip="Home"
          className={`text-xl cursor-pointer transition hover:scale-110 ${
            isActive('/') ? 'opacity-100' : 'opacity-60'
          }`}
        >
          {themeMode === 'dark' ? <IoMdHome size={24} className='text-white' /> : <IoMdHome size={24} />}
        </div>

        <h1 className="text-3xl sm:text-3xl font-bold text-primary dark:text-white">
          Expense Tracker
        </h1>

        <div className="flex items-center gap-5">
          
          {/* Goals */}
          <div
            onClick={() => navigate('/goal')}
            data-tip="Goals"
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
            data-tip="Analytics"
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
            data-tip="Download PDF"
            className="cursor-pointer transition hover:scale-110"
          >
            {themeMode === 'dark' ? (
              <FaRegFilePdf size={24} className='text-white'/>
            ) : (
              <FaRegFilePdf size={24} />
            )}
          </div>

          <ThemeBtn />
        </div>
      </nav>
      <ReactTooltip 
        place="bottom" 
        effect="solid" 
        className="!text-sm !bg-gray-700 !text-white !px-3 !py-1 !rounded"
      />
    </ThemeProvider>
  );
};

export default Navbar;
