import React from "react";
import ENSHeader from "./ENSHeader";
import Tokens from "./Tokens";

function Wrapper({ number, match }) {
  return (
    <div className="flex flex-col w-full bg-white rounded-lg p-8 border-8 border-gray-200">
      <ENSHeader number={number ? number : (match && match.params && match.params.num ? match.params.num : 2815)}/>
      <Tokens number={number ? number : (match && match.params && match.params.num ? match.params.num : 2815)}/>
    </div>
  );
}

export default Wrapper;