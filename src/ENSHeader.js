import React from "react";
import ENSInfo from "./ENSInfo";

function ENSHeader({number}) {

  return (
    <div className="flex flex-col sm:flex-row w-full">
      <h2 className="text-6xl font-bold bebas mr-8 mb-4 sm:mb-0">{number}.eth</h2>
      <ENSInfo number={number}/>
    </div>
  );
}

export default ENSHeader;