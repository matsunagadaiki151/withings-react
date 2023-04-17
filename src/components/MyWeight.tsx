import React from "react";

const MyWeight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p className="font-body text-2xl text-center text-gray-600 my-3 py-2">
      {children}
    </p>
  );
};

export default MyWeight;
