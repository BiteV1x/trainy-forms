import React from "react";

export default function ButtonType({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-100 px-3 py-1 rounded text-sm hover:bg-gray-500 transition-all duration-300 cursor-pointer"
    >
      {children}
    </button>
  );
}
