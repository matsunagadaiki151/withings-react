import { useSelector } from "react-redux";
import { RootState } from "../modules/store";

const AuthorizeButton = () => {
  const endpoint = useSelector((state: RootState) => state.env.endpoint);
  return (
    <button className="block mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-lg py-3 px-10 rounded">
      <a href={endpoint}>OAuth2認可を行う</a>
    </button>
  );
};

export default AuthorizeButton;
