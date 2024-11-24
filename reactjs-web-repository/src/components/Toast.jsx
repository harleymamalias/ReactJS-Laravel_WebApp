import React from "react";

const Toast = ({ message, icon, actionIcon, actionIconAlt, onClose }) => (
  <div className="fixed top-4 right-4 bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex items-center space-x-3 z-50">
    <div className="shrink-0">{icon}</div>
    <div className="flex-1 ms-3">
      <p className="text-sm text-gray-700 ">{message}</p>
    </div>
    <div className="shrink-0">
      <button
        type="button"
        onClick={onClose}
        className="inline-flex justify-center items-center text-gray-800 opacity-50 hover:opacity-100 focus:outline-none "
        aria-label={actionIconAlt}
      >
        {actionIcon}
      </button>
    </div>
  </div>
);

export default Toast;
