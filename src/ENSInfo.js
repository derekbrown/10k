import React, { useEffect, useState } from "react";
import _ from "lodash";
import { ethers } from "ethers";
import { TENK_TOKENS } from "./data";
import { Etherscan, EtherXYZ, LooksRare, OpenSea, PopRank } from "./components";

function ENSInfo({number}) {
  const [ address, setAddress ] = useState(null);
  const [ tokenId, setTokenId ] = useState(null);

  useEffect(() => {
    async function getAddress () {
      let provider = new ethers.providers.AlchemyProvider(null, process.env.REACT_APP_ALCHEMY_ID);
      await provider.resolveName(`${number}.eth`).then(async result => {
        setAddress(result)
      })
    }
    getAddress();
  }, [number, setAddress])

  useEffect(() => {
    let tokenEntry = _.find(TENK_TOKENS, ['nnnn', `${number}`]);
    if (!tokenEntry) return;
    setTokenId(tokenEntry.tokenId)
  }, [number, setTokenId])

  return (
    <div className="flex flex-col sm:flex-row sm:grid sm:grid-cols-5 gap-2 items-center justify-start overflow-x-hidden text-left w-full px-4 py-2 bg-blue-50 rounded-lg">
      <Etherscan address={address} type={"address"}/>
      <EtherXYZ number={number}/>
      <LooksRare contractAddress={"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"} tokenId={tokenId}/>
      <OpenSea contractAddress={"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"} tokenId={tokenId}/>
      <PopRank tokenId={tokenId}/>
    </div>
  );
}

export default ENSInfo;