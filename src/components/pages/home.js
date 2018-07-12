import React, { Component } from 'react';
import Navbar from './navbar/navbar';
import Content from './content/content';
import {connect} from 'react-redux';
import getdatacoin from '../../api/getdatacoin';
import {Fetchdatasuccess,Fetchdatafail} from '../../redux/actionCreators';
class Home extends Component{
  // constructor(props) {
  // super(props);
  // }
  componentWillMount(){
    this.Fetchdata();
  }
  Fetchdata = async ()=>{
    try {
      document.body.style.background =  "rgb(232, 231, 227) url('text-animation-1s-562x100px.gif') no-repeat fixed center";
      await getdatacoin()
      .then((data)=>this.props.Fetchdatasuccess(data)) // get data success , isLoading: true
      .catch((error)=>this.props.Fetchdatafail(error)); // get data error , isLoading: true
      document.body.style.background = "unset";
    } catch (e) {
      console.log(e);
    }
  } // start app , fecth data
  // sử dụng async await để hàm thực hiện theo tuần tự , để có thể lấy dữ liệu thêm vào state để render
  render(){
    return(
      <div id="wrapper" style={{display : this.props.isLoading ? "block" : "none"}} >
        {this.props.isLoading ? <Navbar />  : null }
        {this.props.isLoading ? <Content />  : null }
      </div>
    );
  }
}
const mapStateToProps = state =>({
  isLoading:state.isLoading,
  data : state.data
});

export default connect(mapStateToProps,{Fetchdatasuccess,Fetchdatafail})(Home);
