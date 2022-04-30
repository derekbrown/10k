import React from "react";
import { OPENSEA } from "../assets";

function OpenSea({contractAddress, tokenId}) {

  if (!contractAddress || !tokenId) return <></>;
  return (
    <a
      className="block flex flex-row w-full justify-center items-center text-center px-2 py-1 rounded-full shadow depress text-sm border-4 border-gray-100 hover:border-blue-500 bg-white font-semibold"
      target="_blank"
      rel="noreferrer"
      href={`https://opensea.io/assets/${contractAddress}/${tokenId}`}
      >
        <img src={OPENSEA} alt="View on OpenSea" className="h-6 w-6 mr-2"/>
        <div>OpenSea</div>
    </a>
  );
}

export default OpenSea;