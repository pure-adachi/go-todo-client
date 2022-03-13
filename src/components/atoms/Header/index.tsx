import React from "react";
import { useSampleQuery } from "../../../requester/query";

const Header = () => {
  const {
    loading,
    data: { message },
  } = useSampleQuery();

  return (
    <header className="p-3 bg-red-500 text-white">
      <div className="flex items-center">
        <div className="text-3xl">TODO APP</div>
        <div className="ml-5 text-xl">{loading ? "Loading ..." : message}</div>
      </div>
    </header>
  );
};

export default Header;
