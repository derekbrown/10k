import React from "react";
import Header from "./Header";
import Tokens from "./Tokens";

function Wrapper({ number, match }) {
  return (
    <div className="flex flex-col w-full bg-white rounded-lg p-8">
      <Header number={match && match.params && match.params.num ? match.params.num : number}/>
      <Tokens number={match && match.params && match.params.num ? match.params.num : number}/>
    </div>
  );
}

export default Wrapper;