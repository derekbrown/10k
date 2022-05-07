import React, { useState } from "react";
import { getFloor, getHolders } from "./utilities/analytics";
import AnalyticsItem from "./AnalyticsItem";

function Analytics() {
  const [holders, setHolders] = useState(0);
  const [floorPrice, setFloorPrice] = useState(0);

  const loadHolders = () => {
    async function fetchData() { await getHolders(setHolders); }
    fetchData();
  }

  const loadFloor = () => {
    async function fetchData() { await getFloor(false, setFloorPrice); }
    fetchData();
  }

  loadFloor();
  loadHolders();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 w-full mb-8">
      <AnalyticsItem title={"ENS Floor"} text={`${floorPrice ?? 0}Ξ`} provider={"poprank"}/>
      <AnalyticsItem title={"Holders"} text={`${holders ?? 0}`} provider={"poprank"}/>
      <AnalyticsItem title={"Twitter"} text={"≈12K"} provider={"twitter"}/>
    </div>
  );
}

export default Analytics;