import React from "react";
import { POPRANK, TWITTER_BLUE, WIPIWAY } from "./assets";

function AnalyticsItem({provider, title, text}) {
  return (
    <div className="cursor-pointer bg-white rounded-lg px-8 py-2 border-8 border-gray-200 relative">
      <h2 className="text-xl bebas">{title}</h2>
      <h3 className="text-4xl font-bold ">{text}</h3>
      {provider === "poprank" && <a href="https://poprank.io/ens" target="_blank" rel="noreferrer"><img className="h-6 w-6 bottom-2 right-2 absolute" src={POPRANK} alt="Data provided by poprank"/></a>}
      {provider === "twitter" && <a href="https://twitter.com/10kClubOfficial" target="_blank" rel="noreferrer"><img className="h-8 w-8 bottom-1 right-1 absolute" src={TWITTER_BLUE} alt="Data from Twitter"/></a>}
      {provider === "wipiway" && <a href="https://digitclub.xyz" target="_blank" rel="noreferrer"><img className="h-6 w-6 bottom-2 right-2 absolute" src={WIPIWAY} alt="Data provided by wipiway"/></a>}
    </div>
  );
}

export default AnalyticsItem;