import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function ENSInfo({number}) {
  const [ address, setAddress ] = useState(null);

  useEffect(() => {
    async function getAddress () {
      let provider = new ethers.providers.AlchemyProvider(null, "92FsN3H0jQHXFn3_eNKYXY9IRPiMcnI7");
      await provider.resolveName(`${number}.eth`).then(async result => {
        setAddress(result)
      })
    }
    getAddress();
  }, [number, setAddress])

  return (
    <div className="flex items-center justify-start overflow-x-hidden text-left w-full px-4 py-2 bg-blue-50 rounded-lg">
      <strong>Address:</strong> <a className="ml-2 border-b border-gray-900 text-gray-800 hover:border-transparent truncate" rel="noreferrer" target="_blank" href={`https://etherscan.io/address/${address}`}>{address}</a>
    </div>
  );
}

export default ENSInfo;