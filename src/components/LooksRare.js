import React from "react";
import { LOOKSRARE } from "../assets";

function LooksRare({contractAddress, tokenId}) {
  return (
    <a
      className="block flex flex-row w-full justify-center items-center text-center px-2 py-1 rounded-full shadow depress text-sm border-4 border-gray-100 hover:border-green-400 bg-white font-semibold"
      target="_blank"
      rel="noreferrer"
      href={`https://looksrare.org/collections/${contractAddress}/${tokenId}`}
      >
        <img src={LOOKSRARE} alt="View on LooksRare" className="h-6 w-6 mr-2"/>
        <div>LooksRare</div>
    </a>
  );
}

export default LooksRare;