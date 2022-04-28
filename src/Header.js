import React from "react";
import ENSInfo from "./ENSInfo";

function Header({number}) {

  return (
    <div className="flex flex-row w-full">
      <h2 className="text-6xl font-bold bebas mr-8">{number}.eth</h2>
      <ENSInfo number={number}/>
    </div>
  );
}

export default Header;