import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNft } from "use-nft"

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
    <a
      className={`grow-0 shrink-0 flex flex-col block aspect-square mr-4 cursor-pointer depress rounded-lg hover:bg-blue-50 p-4 relative`}
      href={`https://opensea.io/assets/${contractAddress}/${tokenId}`}
      rel="noreferrer"
      target="_blank">
      {nft.owner === address && <div className="text-center text-xs py-2 opacity-90 absolute -translate-x-1/2 -translate-y-1/2 transform top-1/2 left-1/2 -mt-4 bg-blue-50 w-4/5 rounded-lg text-gray-800">OWNED BY {tokenId}.eth</div>}
      <img src={nft.image} alt={`${nft.name} Asset`} className="rounded-lg aspect-square"/>
      <h4 className="my-2 text-center">{`${name ?? "Token"} #${tokenId}`}</h4>
    </a>
  )
}

export default NFT;