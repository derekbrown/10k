import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNft } from "use-nft"
import { LooksRare, OpenSea } from "./components";

function NFT({contractAddress, name, size, tokenId}) {
  const [ address, setAddress ] = useState(null);
  const { loading, error, nft } = useNft(contractAddress, tokenId)

  useEffect(() => {
    async function getAddress () {
      let provider = new ethers.providers.AlchemyProvider(null, "92FsN3H0jQHXFn3_eNKYXY9IRPiMcnI7");
      await provider.resolveName(`${tokenId}.eth`).then(async result => {
        setAddress(result)
      })
    }
    getAddress();
  }, [tokenId, setAddress])

  if (loading || error) return <></>;
  return (
    <div className="grow-0 shrink-0 flex flex-col aspect-square mr-4 cursor-pointer rounded-lg hover:bg-gray-50 relative shadow-lg">
      <a
        className={`relative`}
        href={`https://opensea.io/assets/${contractAddress}/${tokenId}`}
        rel="noreferrer"
        target="_blank">
        {nft.owner === address && <div className="text-center text-xs py-2 opacity-90 absolute -translate-x-1/2 -translate-y-1/2 transform top-1/2 left-1/2 -mt-4 bg-blue-50 w-4/5 rounded-lg text-gray-800">OWNED BY {tokenId}.eth</div>}
        <img src={nft.image} alt={`${nft.name} Asset`} className="w-full rounded-t-lg aspect-square"/>
        <h4 className="my-2 text-center">{`${name ?? "Token"} #${tokenId}`}</h4>
      </a>
      <div className="mt-2 mb-4 px-2 grid grid-cols-2 gap-2 w-full">
        <LooksRare contractAddress={contractAddress} tokenId={tokenId}/>
        <OpenSea contractAddress={contractAddress} tokenId={tokenId}/>
      </div>
    </div>
  )
}

export default NFT;