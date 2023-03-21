import React from "react";

const AuthorizeButton = () => {
  return (
    <button className="block mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-lg py-3 px-10 rounded">
      OAuth2認可を行う
    </button>
  );
};

export default AuthorizeButton;
