import React, { useState } from "react";
import { ethers } from "ethers";
import { Provider, NETWORKS } from '@web3-ui/core';
import { NftProvider } from "use-nft"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Wrapper from "./Wrapper";

const fetcher = ["ethers", { ethers, provider: new ethers.providers.AlchemyProvider(null, "92FsN3H0jQHXFn3_eNKYXY9IRPiMcnI7") }]

function App() {
  const [ number, setNumber ] = useState(2815);

  const handleChange = (event) => {
    setNumber(event.target.value);
  }

  return (
    <BrowserRouter>
      <NftProvider fetcher={fetcher}>
        <Provider network={NETWORKS.mainnet}>
          <div className="flex flex-col items-center justify-start bg-brand-gradient w-full min-h-screen h-full p-8">
            <nav className="flex flex-row mb-8 justify-between w-full items-center">
              <div className="flex flex-row items-center">
                <h2 className="bebas text-6xl text-white font-bold">10K</h2>
                <input className="md:w-72 lg:w-96 ml-8 p-2 rounded -mt-1" placeholder="Lookup Number" type="text" onChange={handleChange} />
              </div>
            </nav>
            <Switch>
              <Route path="/:num" component={Wrapper}/>
              <Route>
                <Wrapper number={number}/>
              </Route>
            </Switch>
            <h2 className="rounded-full bg-gray-800 py-2 px-8 cursor-pointer fixed bottom-4 text-white text-center text-xs">built with 💗 by <a className="border-b border-white hover:border-transparent cursor-pointer" href="https://twitter.com/derekbrown" rel="noreferrer" target="_blank">2815.eth</a> for <a className="border-b border-white hover:border-transparent cursor-pointer" href="https://discord.gg/467tchug" rel="noreferrer" target="_blank">10KClub</a>. tips welcome 🥳.</h2>
          </div>
        </Provider>
      </NftProvider>
    </BrowserRouter>
  );
}

export default App;
