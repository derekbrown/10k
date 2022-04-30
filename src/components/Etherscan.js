import React from "react";
import { ETHERSCAN } from "../assets";

function Etherscan({address, type}) {
  return (
    <a
      className="block flex flex-row w-full justify-center items-center text-center px-2 py-1 rounded-full shadow depress text-sm border-4 border-gray-100 hover:border-blue-900 bg-white font-semibold"
      target="_blank"
      rel="noreferrer"
      href={`https://etherscan.io/${type}/${address}`}
      >
        <img src={ETHERSCAN} alt="View on Etherscan" className="h-6 w-6 mr-2"/>
        <div>Etherscan</div>
    </a>
  );
}

export default Etherscan;