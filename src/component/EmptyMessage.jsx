import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const EmptyMessage = ({ content, className = "" }) => {
  return (
    <div
      className={`w-full flex items-center justify-center h-full mb-[2rem] ${className}`}
    >
      <div className="text-center">
        <div className="my-[3rem] text-2xl lg:text-6xl text-gray-400 flex justify-center items-center">
          <FaExclamationCircle className="text-red-500 text-6xl" />
        </div>
        <p className="mt-2 text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export default EmptyMessage;
