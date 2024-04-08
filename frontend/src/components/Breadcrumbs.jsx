import React from "react";

export function Breadcrumb() {
  return (
    <div>
      <nav aria-label="breadcrumb" class="w-max">
        <ol class="flex flex-wrap m-4 items-center w-full px-4 py-2 rounded-md bg-blue-gray-50 bg-opacity-60">
          <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500">
            <a href="#" class="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </a>
            <span class="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">
              /
            </span>
          </li>
          <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500">
            <a href="#" class="opacity-60">
              <span>Components</span>
            </a>
            <span class="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">
              /
            </span>
          </li>
          <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500">
            <a href="#">Breadcrumbs</a>
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
