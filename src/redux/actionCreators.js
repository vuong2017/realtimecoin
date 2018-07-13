export function Fetchdatasuccess(data){
  return{
    type:"Fetchdatasuccess",
    data
  };
}
export function Fetchdatafail(error){
  return{
    type:"Fetchdatafail",
    error
  };
}
export function GetParams(params){
  return{
    type:"GetParams",
    params
  };
}
