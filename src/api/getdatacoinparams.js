const getdatacoinparams = async (name)=>{
  const url = `http://coincap.io/page/${name}`;
  let resp = await fetch(url);
  let data = await resp.json();
  return data;
};
export default getdatacoinparams;
