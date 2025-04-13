import React from "react";
import {  ShareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'; // تأكد من استيراد الأيقونات الصحيحة

function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 flex justify-between items-center flex-col gap-8 lg:flex-row">
          <h5 className="text-5xl">MoviesPage</h5>
          <ul className="text-lg text-center sm:flex items-center justify-center gap-14 lg:gap-10 xl:gap-14 transition-all duration-500">
            <li>
              <a href="#" className="text-white hover:text-gray-400">
                Pagedone
              </a>
            </li>
            <li className="sm:my-0 my-2">
              <a href="#" className="text-white hover:text-gray-400">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-400">
                Resources
              </a>
            </li>
            <li className="sm:my-0 my-2">
              <a href="#" className="text-white hover:text-gray-400">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-400">
                Support
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 sm:justify-center">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-gray-800 flex justify-center items-center hover:bg-indigo-600"
            >
              <ShareIcon   className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-gray-800 flex justify-center items-center hover:bg-indigo-600"
            >
              <ShareIcon  className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-gray-800 flex justify-center items-center hover:bg-indigo-600"
            >
              <CodeBracketIcon   className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        <div className="py-7 border-t border-gray-700">
          <div className="flex items-center justify-center">
            <span className="text-gray-400">
              ©<a href="https://pagedone.io/">pagedone</a>2024, All rights
              reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
