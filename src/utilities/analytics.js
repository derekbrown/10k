export const getHolders = async (callback) => {
  await fetch(`https://api.poprank.io/collection/owners?slug=ens`)
  .then(async (result) => {
    await result.json().then((res) => {
      callback(res.data);
    });
  });
}

export const getFloor = async (threeDigit, callback) => {
  await fetch(`https://api.poprank.io/collection?slug=ens`)
  .then(async (result) => {
    await result.json().then((res) => {
      console.log(res.data);
      callback(res.data ? res.data.floorPrice : "0");
    });
  });
}