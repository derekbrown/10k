import React from "react";
import NFT from './NFT';
import { supportedTokens } from './supportedTokenList';

function Tokens({number}) {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 h-full w-full font-semibold">
      {supportedTokens && supportedTokens.length > 0 && supportedTokens.map(item =>
        <NFT
          contractAddress={item.contractAddress}
          key={item.contractAddress}
          name={item.name}
          size={54}
          tokenId={number}
        />
      )}
    </div>
  );
}

export default Tokens;