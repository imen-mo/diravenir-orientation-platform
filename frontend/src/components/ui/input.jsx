// src/components/ui/input.jsx
import React from "react";

export function Input({ type = "text", placeholder = "", className = "", ...props }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
            {...props}
        />
    );
}
