import React from "react";
import { POPRANK } from "../assets";

function PopRank({tokenId}) {

  if (!tokenId) return <></>;
  return (
    <a
      className="block flex flex-row w-full justify-center items-center text-center px-2 py-1 rounded-full shadow depress text-sm border-4 border-gray-100 hover:border-yellow-500 bg-white font-semibold"
      target="_blank"
      rel="noreferrer"
      href={`https://poprank.io/ens/${tokenId}`}
      >
        <img src={POPRANK} alt="View on PopRank" className="h-6 w-6 mr-2"/>
        <div>PopRank</div>
    </a>
  );
}

export default PopRank;