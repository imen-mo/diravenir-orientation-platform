import React from "react";

export function Button({ children, onClick, className = "", ...props }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
