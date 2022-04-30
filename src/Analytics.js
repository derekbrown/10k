import React, { useState } from "react";
import { BigNumber } from "bignumber.js";
import { getFloor, getHolders } from "./utilities/analytics";
import AnalyticsItem from "./AnalyticsItem";

function Analytics() {
  const [holders, setHolders] = useState(0);
  const [threeFloor, setThreeFloor] = useState(0);
  const [fourFloor, setFourFloor] = useState(0);

  const loadHolders = () => {
    async function fetchData() { await getHolders(setHolders); }
    fetchData();
  }

  const loadThreeDigitFloor = () => {
    async function fetchData() { await getFloor(true, setThreeFloor); }
    fetchData();
  }

  const loadFourDigitFloor = () => {
    async function fetchData() { await getFloor(false, setFourFloor); }
    fetchData();
  }

  const formatNum = (bigNum) => {
    let num = new BigNumber(bigNum)
    let denom = new BigNumber(10).pow(18)
    return num.dividedBy(denom).toNumber()
  }

  loadFourDigitFloor();
  loadHolders();
  loadThreeDigitFloor();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-8">
      <AnalyticsItem title={"1K Floor"} text={`${formatNum(threeFloor) ?? 0}Ξ`} provider={"wipiway"}/>
      <AnalyticsItem title={"10K Floor"} text={`${formatNum(fourFloor) ?? 0}Ξ`} provider={"wipiway"}/>
      <AnalyticsItem title={"Holders"} text={`${holders ?? 0}`} provider={"poprank"}/>
      <AnalyticsItem title={"Twitter"} text={"6135"} provider={"twitter"}/>
    </div>
  );
}

export default Analytics;