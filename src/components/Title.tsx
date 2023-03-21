import React from "react";

type TitleProp = {
  children: React.ReactNode;
};

const Title = (props: TitleProp) => {
  return (
    <header className="text-3xl text-gray-600 font-title font-bold text-center my-10 py-2">
      {props.children}
    </header>
  );
};

export default Title;
