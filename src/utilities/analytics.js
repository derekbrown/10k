export const getHolders = async (callback) => {
  await fetch(`https://api.poprank.io/collection/owners?slug=ens`)
  .then(async (result) => {
    await result.json().then((res) => {
      callback(res.data);
    });
  });
}

export const getFloor = async (threeDigit, callback) => {
  await fetch(`https://digitclub.herokuapp.com/ens-list?page=1&offset=50&${threeDigit ? "threedigit=true" : ""}`)
  .then(async (result) => {
    await result.json().then((res) => {
      callback(res.floor_price);
    });
  });
}