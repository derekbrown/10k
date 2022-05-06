import React, { useEffect, useState } from "react";
import '@rainbow-me/rainbowkit/styles.css';
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';
import ReactGA from "react-ga";
import { Provider, NETWORKS } from '@web3-ui/core';
import { NftProvider } from "use-nft"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Analytics from "./Analytics";
import AppHeader from "./AppHeader";
import Wrapper from "./Wrapper";

const { chains, provider } = configureChains([chain.mainnet],
  [
    apiProvider.alchemy(process.env.ALCHEMY_ID),
    apiProvider.fallback()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const fetcher = ["ethers", { ethers, provider: new ethers.providers.AlchemyProvider(null, process.env.ALCHEMY_ID) }]

ReactGA.initialize("UA-227805767-1");

function App() {
  const [ number, setNumber ] = useState(false);

  const handleChange = (event) => {
    setNumber(event.target.value);
  }

  // Track PageViews
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
      <NftProvider fetcher={fetcher}>
        <Provider network={NETWORKS.mainnet}>
          <div className="flex flex-col items-center justify-start bg-brand-gradient w-full min-h-screen h-full p-8">
            <AppHeader handleChange={handleChange}/>
            <Analytics/>
            <Switch>
              <Route path="/:num" children={({ match }) => (
                <Wrapper match={match} number={number}/>
              )}/>
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
