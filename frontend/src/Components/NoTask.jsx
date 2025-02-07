import React from "react";
import { FaClipboard } from "react-icons/fa"; // Or any other suitable icon

const NoTasks = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <FaClipboard className="text-gray-400 text-6xl mb-4" />
      <p className="text-gray-500 text-lg">You have no tasks for now.</p>
    </div>
  );
};

export default NoTasks;
