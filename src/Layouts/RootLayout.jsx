import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTheme from '../ThemeProvider/ThemeHook';


const RootLayout = () => {
    const { isDarkMode } = useTheme();
    
    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
            <div className='max-w-full mx-auto transition-colors duration-300'>
                <Navbar />
                <div className='pt-24 max-w-[1280px] mx-auto'>
                    <Outlet />
                </div>
            </div>
            <Footer />
            <ToastContainer 
                position="top-right" 
                autoClose={3000}
                theme={isDarkMode ? 'dark' : 'light'}
            />
        </div>
    );
};

export default RootLayout;