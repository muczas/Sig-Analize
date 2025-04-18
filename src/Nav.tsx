import React from "react";
import { Link } from 'react-router-dom';

function Nav() {  
    return(
        <nav className="flex justify-between items-center flex-wrap p-4 bg-gray-200 dark:text-whitebg-gray-800 dark:text-white bg-gray-800">
        {/* Prawa strona – linki */}
        <div className="flex gap-4 flex-wrap justify-end">
          <Link
            to="/"
            className="text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
          >
           Welcome
          </Link>
          <Link
            to="/registry"
            className="text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
          >
            register
          </Link>
          <Link
            to="/avatar"
            className="text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
          >
            Avatar
          </Link>
          <Link
            to="/login"
            className="text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
          >
            login
          </Link>
          <Link
            to="/signal"
            className="text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
          >
            signal
          </Link>
          <Link
            to="/signal/details"
            className="text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
          >
            parametry
          </Link>
        </div>
      </nav>
)
;}
export default Nav;