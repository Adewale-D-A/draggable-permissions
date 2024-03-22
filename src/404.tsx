import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className=" text-5xl font-bold">404</h1>
      <Link
        to="/"
        className=" p-3 px-7 rounded-2xl text-white bg-primary_green-500 hover:bg-primary_blue-500 transition-all"
      >
        Home
      </Link>
    </div>
  );
}

export default PageNotFound;
