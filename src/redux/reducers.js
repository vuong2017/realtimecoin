// 1 khoi tao 1 state gan gia tri ban dau
var defaultState = {
  data :[],
  isLoading:false,
  error:null
}

const Reducers = (state=defaultState,action)=>{
  switch (action.type) {
    case "Fetchdatasuccess": return {...state,isLoading:true,data:action.data,datashow:action.datashow};
    case "Fetchdatafail": return {...state,error:action.error};
    default:
      return state;
  }
}
export default Reducers;
