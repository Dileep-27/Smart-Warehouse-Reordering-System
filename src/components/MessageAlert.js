import React from "react";

const MessageAlert = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div
            className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-md relative mb-6"
            role="alert"
        >
            <span className="block sm:inline">{message}</span>
            <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
                onClick={onClose}
            >
                <svg
                    className="fill-current h-6 w-6 text-blue-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.697l-2.651 2.652a1.2 1.2 0 1 1-1.697-1.697L8.303 10 5.651 7.348a1.2 1.2 0 0 1 1.697-1.697L10 8.303l2.651-2.652a1.2 1.2 0 0 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
            </span>
        </div>
    );
};

export default MessageAlert; 