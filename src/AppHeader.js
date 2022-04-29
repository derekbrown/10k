import React from "react";
import { DISCORD, TWITTER } from "./assets";

function AppHeader({handleChange, number}) {

  return (
    <nav className="flex flex-row mb-8 justify-between w-full items-center">
      <div className="flex flex-row items-center">
        <h2 className="bebas text-6xl text-white font-bold">10K</h2>
        <input className="md:w-72 lg:w-96 ml-8 p-2 rounded -mt-1" placeholder="Lookup Number" type="text" onChange={handleChange}/>
      </div>
      <div className="flex flex-row items-center">
        <a href="https://twitter.com/10kClubOfficial" target="_blank" rel="noreferrer"><img src={TWITTER} className="h-8 w-8 mx-4" alt="Visit 10KClub on Twitter"/></a>
        <a href="https://discord.com/invite/tNsMQngU" target="_blank" rel="noreferrer"><img src={DISCORD} className="h-8 w-8 mx-4 mt-0.5" alt="Visit 10KClub Discord"/></a>
      </div>
    </nav>
  );
}

export default AppHeader;

