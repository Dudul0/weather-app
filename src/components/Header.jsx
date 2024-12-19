import React, { useState } from "react";

export default function Header({ getLL }) {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      getLL(value);
      setValue("");
    }
  };

  return (
    <header className="bg-gray-500 text-white py-3 px-4 flex items-center justify-between md:py-4 xl:px-8 2xl:py-5">
      <div className="flex items-center gap-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search The City..."
            className="bg-gray-300 rounded py-1.5 px-2.5 border text-xs border-gray-300 text-black focus:outline-none 
              xl:py-2 xl:px-3 xl:text-sm 
              2xl:py-2 2xl:px-3 2xl:text-base"
            value={value}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-white py-1.5 px-3 text-xs text-gray-500 rounded-lg font-semibold hover:bg-gray-600
              md:text-sm 
              xl:py-2 xl:px-3 xl:text-sm 
              2xl:py-2 2xl:px-4 2xl:text-base"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
