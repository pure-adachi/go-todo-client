import React from "react";
import { useRequest } from "../../../requester";

interface ResponseType {
  message: string;
}

const Header = () => {
  const { loading, data } = useRequest<ResponseType>("/api/sample");

  return (
    <header className="p-3 bg-red-500 text-white">
      <div className="flex items-center">
        <div className="text-3xl">TODO APP</div>
        <div className="ml-5 text-xl">
          {loading ? "Loading ..." : data?.message}
        </div>
      </div>
    </header>
  );
};

export default Header;
