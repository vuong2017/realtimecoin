import React , {Component} from 'react';
import Navbar from '../../navbar/navbar';
import getdatacoinparams from '../../../../api/getdatacoinparams';
import './detailcoin.css';
import {connect} from 'react-redux';
import io from 'socket.io-client'
class DetailCoin extends Component{
  constructor(props){
    super(props);
    this.state = {
      dataparams : null
    };
    this.socket = io.connect("https://coincap.io")
  }
  componentDidMount(){
    this.Fetchdatacoinparams();
    this.socketio();
  }
  socketio = ()=>{
      var e = this;
      this.socket.on('trades', function (data) {
        if(data.message.coin === e.props.match.params.coin){
          return document.getElementById("price").innerHTML = `$${e.duyetqua(data.message.msg.price.toString()) === 0 ? data.message.msg.price.toFixed(4) : data.message.msg.price.toFixed(2)}`;
        } // so sach params coin === coin gui ve thi thuc hien thay doi
      });
  }
  duyetqua = (text)=>{
    var price = text.split(".");
    var so = null;
    price.map((i,v)=>{
      if(Number(i)===0){
        return so = Number(i);
      }
      return i;
    })
    return so;
  } // duyệt qua số đầu tiên bằng 0 thì toFixed(4) khác 0 thì toFixed(2)
  Fetchdatacoinparams = async ()=>{
    try {
      await  getdatacoinparams(this.props.match.params.coin)
        .then((data)=>this.setState({dataparams:data}))
        .catch((error)=>console.log(error));
    } catch (e) {
      console.error(e);
    }
    console.log("data",this.state.dataparams);
  }
  format_curency = (mktcap)=>{
    var array = mktcap.split(".");
    var newmktcap = "";
    array.map((item,index)=>{
      if(index===0){
        return newmktcap = item;
      }
      return item
    }) // thực hiên xoa dấu chấm để convert sáng số tiền mà không bị có dấu chấm
    return newmktcap = newmktcap.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    // convert sang số tiền  có dấu phẩy
  }
  format_space = (text)=>{
    var textstring = "";
    var a = text.split(" ");
    a.map((item,index)=>{
      return textstring += item ;
    })
    return textstring;
  } // tách chuỗi thành môt mảng các phần tử
  // xong thực hiện map qua từng phần tử để có  thể gộp thành 1 chuỗi duy nhất (dfsdf sdfsdfsdf);
  render(){
    const {dataparams} = this.state;
    if(dataparams===null){
      return null;
    }
    return(
      <div>
        <Navbar />
        <div className="row">
          <div className="col-sm-12 titlecoin">
            <h2>Thông tin coin <span className="short">{this.props.match.params.coin}</span></h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 detailcoin">
            <div className="col-sm-4 offset-sm-1 rankcoin_name">
              <div className="rankcoin">

                  <span className="rankcoin_number">{dataparams.rank}</span>
                  <img src={"/icon/badge.png"} alt={"picturecoin"} className="rankcoinImg" />
              </div>
              <div className="name">
                <span className={`sprite sprite-${this.format_space(dataparams.display_name.toLowerCase())}`}></span>
                <span className="name_coin">{dataparams.display_name} ({dataparams.id})</span>
              </div>
            </div>
            <div className="col-sm-6 pricecoin_infoother">
              <div className="pricecoin">
                <span id="price">${dataparams.price}</span>
                <span style={{color:dataparams.cap24hrChange>0 ? 'green' : "red"}}> ({dataparams.cap24hrChange}%)</span>
              </div>
              <div className="infoother">
                <table className="table responsive edit-table">
                  <thead>
                    <tr>
                      <th>Market Cap</th>
                      <th>24 Hour Volume</th>
                      <th>Available Supply</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${this.format_curency(dataparams.market_cap.toString())}</td>
                      <td>${this.format_curency(dataparams.volume.toString())}</td>
                      <td>{this.format_curency(dataparams.supply.toString())}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(DetailCoin);
