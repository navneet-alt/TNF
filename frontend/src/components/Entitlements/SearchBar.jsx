import React from 'react';
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
    return (
        <div className="flex w-96"> {/* Adjust width as necessary */}
            <input
                type="text"
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-l-md text-lg bg-white" 
                placeholder="Search by title"
            />
            <button className="px-4 py-2 border-2 border-blue-500 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                <IoSearchSharp />
            </button>
        </div>
    );
};

export default SearchBar;
