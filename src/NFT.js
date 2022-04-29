import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNft } from "use-nft"
import { LOOKSRARE, OPENSEA} from "./assets";

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
        <img src={nft.image} alt={`${nft.name} Asset`} className="rounded-t-lg aspect-square"/>
        <h4 className="my-2 text-center">{`${name ?? "Token"} #${tokenId}`}</h4>
      </a>
      <div className="mt-2 mb-4 px-2 grid grid-cols-2 gap-2 w-full">
        <a
          className="block flex flex-row justify-center items-center text-center px-2 py-1 rounded-full shadow depress text-sm border-4 border-gray-100 hover:border-green-400"
          target="_blank"
          rel="noreferrer"
          href={`https://looksrare.org/collections/${contractAddress}/${tokenId}`}
          >
            <img src={LOOKSRARE} alt="View on LooksRare" className="h-6 w-6 mr-2"/>
            <div>LooksRare</div>
        </a>
        <a
          className="block flex flex-row justify-center items-center text-center px-2 py-1 rounded-full shadow depress text-sm border-4 border-gray-100 hover:border-blue-500"
          target="_blank"
          rel="noreferrer"
          href={`https://opensea.io/assets/${contractAddress}/${tokenId}`}
          >
            <img src={OPENSEA} alt="View on OpenSea" className="h-6 w-6 mr-2"/>
            <div>OpenSea</div>
        </a>
      </div>
    </div>
  )
}

export default NFT;