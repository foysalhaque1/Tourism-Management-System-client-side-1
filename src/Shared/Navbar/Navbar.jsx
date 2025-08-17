import React, { useState } from 'react';
import TourLogo from '../TourLogo/TourLogo';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';


import { Link, NavLink } from 'react-router';
import useTheme from '../../ThemeProvider/ThemeHook';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { isDarkMode, setIsDarkMode } = useTheme();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: 'You Signed Out Successfully',
                    icon: 'success',
                    draggable: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const navItems = (
        <>
            <NavLink
                className={({ isActive }) =>
                    `mr-4 font-bold text-xl ${isActive ? 'text-primary' : ''} ${isDarkMode ? 'text-white' : 'text-gray-800'}`
                }
                to={'/'}
            >
                Home
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `mr-4 font-bold text-xl ${isActive ? 'text-primary' : ''} ${isDarkMode ? 'text-white' : 'text-gray-800'}`
                }
                to={'/communityPage'}
            >
                Community
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `mr-4 font-bold text-xl ${isActive ? 'text-primary' : ''} ${isDarkMode ? 'text-white' : 'text-gray-800'}`
                }
                to={'/aboutUs'}
            >
                About Us
            </NavLink>
            {user && (
                <NavLink
                    className={({ isActive }) =>
                        `mr-4 font-bold text-xl ${isActive ? 'text-primary' : ''} ${isDarkMode ? 'text-white' : 'text-gray-800'}`
                    }
                    to={'/trips'}
                >
                    Trips
                </NavLink>
            )}
            {user && (
                <NavLink
                    className={({ isActive }) =>
                        `mr-4 font-bold text-xl ${isActive ? 'text-primary' : ''} ${isDarkMode ? 'text-white' : 'text-gray-800'}`
                    }
                    to={'/dashboard/joinAsTourGuide'}
                >
                    Join As Tour Guide
                </NavLink>
            )}
        </>
    );

    return (
        <div className={`navbar fixed top-0 left-0 w-full z-50 shadow-sm ${isDarkMode ? 'bg-gray-900' : 'bg-secondary'} p-2.5 transition-colors duration-300`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow ${isDarkMode ? 'bg-gray-800' : 'bg-base-100'} rounded-box w-52`}>
                        {navItems}
                    </ul>
                </div>
                <div className="btn btn-ghost text-xl mb-4 mt-4">
                    <TourLogo />
                    <p className={`text-xl md:text-2xl lg:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        Explore Tours
                    </p>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>

            <div className="navbar-end flex items-center gap-4">
                {/* Dark/Light Mode Toggle Button */}
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {isDarkMode ? (
                        <FaSun className="text-yellow-300 text-lg" />
                    ) : (
                        <FaMoon className="text-gray-700 text-lg" />
                    )}
                </button>

                {user ? (
                    <div className="relative">
                        <button
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <FaUserCircle className="w-full h-full text-3xl text-primary" />
                            )}
                        </button>

                        {dropdownOpen && (
                            <div className={`absolute right-0 mt-2 w-56 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border rounded-lg shadow-md z-50 py-2 text-sm`}>
                                <div className="px-4 font-semibold">{user.displayName || 'User Name'}</div>
                                <div className={`px-4 pb-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} border-b ${isDarkMode ? 'border-gray-700' : ''}`}>
                                    {user.email}
                                </div>

                                <Link
                                    to="/dashboard"
                                    className={`block px-4 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleSignOut}
                                    className={`w-full text-left px-4 py-2 text-red-500 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className={`btn ${isDarkMode ? 'btn-primary' : 'btn-secondary'}`}>
                        <Link to="/login">Log In</Link>/<Link to="/register">Register</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Navbar;