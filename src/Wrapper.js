import React from "react";
import Header from "./Header";
import Tokens from "./Tokens";

function Wrapper({number}) {
  return (
    <div className="flex flex-col w-full bg-white rounded-lg p-8">
      <Header number={number}/>
      <Tokens number={number}/>
    </div>
  );
}

export default Wrapper;