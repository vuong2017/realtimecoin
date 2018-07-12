const url = "http://coincap.io/front";
const getdatacoin = async ()=>{
  let resp = await fetch(url);
  let data = await resp.json();
  return data;
};
export default getdatacoin;
