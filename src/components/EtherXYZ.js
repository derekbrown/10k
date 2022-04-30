import React from "react";
import { ENS_CIRCLE } from "../assets";

function EtherXYZ({number}) {

  if (!number) return <></>;
  return (
    <a
      className="block flex flex-row w-full justify-center items-center text-center px-2 py-1 rounded-full shadow depress text-sm border-4 border-gray-100 hover:border-purple bg-white font-semibold"
      target="_blank"
      rel="noreferrer"
      href={`https://${number}.eth.xyz`}
      >
        <img src={ENS_CIRCLE} alt="View on eth.xyz" className="h-6 w-6 mr-2"/>
        <div>eth.xyz</div>
    </a>
  );
}

export default EtherXYZ;