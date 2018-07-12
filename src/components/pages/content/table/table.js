import React , {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client'
var count = 20;
var socket = io.connect("https://coincap.io")
class Table extends Component{
  constructor(props){
    super(props);
    this.state = {
      datashow : this.props.data.slice(0,20)
    }
  }
  componentDidMount() {
    this.socketio();
    this.scrollposts();
  }
  socketio = ()=>{
    var e = this;
    socket.on('trades', function (data) {
          e.state.datashow.map((item,index)=>{
              if(item.short===data.coin){
                var price = e.getClass("price")[index].innerHTML.slice(1);
                if(data.message.msg.price > price ){
                  e.getClass("coin_item")[index].setAttribute("class","coin_item coin_pumb_now");
                  e.getClass("price")[index].innerHTML = `$${data.message.msg.price.toFixed(2)}`;
                  e.getClass("price")[index].style.color = "rgba(108, 168, 46, 1.0)"
                }
                else{
                  e.getClass("coin_item")[index].setAttribute("class","coin_item coin_dump_now");
                  e.getClass("price")[index].innerHTML = `$${data.message.msg.price.toFixed(2)}`;
                  e.getClass("price")[index].style.color = "rgba(206, 92, 92, 1.0)";

                }
                e.getClass("mktcap")[index].innerHTML = `$${e.format_curency(data.message.msg.mktcap.toString())}`;
                e.getClass("vwapData")[index].innerHTML = `$${data.message.msg.vwapData.toFixed(4)}`;
                e.getClass("volume")[index].innerHTML = `$${e.format_curency(data.message.msg.volume.toString())}`;
                e.getClass("cap24hrChange")[index].innerHTML = `${data.message.msg.cap24hrChange.length > 4  ? data.message.msg.cap24hrChange : data.message.msg.cap24hrChange.toFixed(2)}%`;
                // nếu đúng thì hiển thị ra -1,23 sai thì -1,2 dùng toFixed(2) convert thành (-1,20)

                e.Change24hstyle(index,data.message.msg.cap24hrChange);
                setTimeout(()=>e.getClass("coin_item")[index].setAttribute("class","coin_item coin_default"),20);
                return true;
              }
              return false;
          })
          // duyệt qua mảng vào tìm nhưng coin socketio trả về .
          // nếu đúng thì gọi đến mảng class đang chứa coin đó và thực hiện thay đổi
          // ở mỗi td coin đã được tạo 1 class (tên như nhau để tạo thành 1 mảng) và để lấy được vị trí class đó để thay nhờ vào index của mảng
    })
  }
  getClass = (className)=>{
    return document.getElementsByClassName(className);
  }
  Change24hstyle = (index,cap24hrChange)=>{
    var change24h = document.getElementsByClassName("cap24hrChange")[index];
    cap24hrChange > 0 ? change24h.style.color = "rgba(108, 168, 46, 1.0)" : change24h.style.color = "rgba(206, 92, 92, 1.0)";
  } // style cho 24hchange nếu > 0 thì màu xanh ngược lại chữ đỏ
  scrollposts = ()=>{
    window.addEventListener('scroll', (e)=>{
      var scroll = window.scrollY+window.innerHeight;
      // chiều cao của màn hình + cuộn xuống
      //(thường 2 cái này cộng lại sẽ lớn hơn giá trị chiều cao của bài viết được hiện thị trên màn hình )
      var documentheight = document.documentElement.offsetHeight;
      // chiều cao của bài tất cả bài viết được hiển thị trên màn hình
      if(scroll > documentheight-10){
        this.setState({datashow:this.props.data.slice(0,count+=20)})
      }
    });
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
    return(
      <table className="table table-hover">
        <thead>
          <tr  style={{textAlign:'right'}}>
            <th scope="col">#</th>
            <th  style={{textAlign:'left'}} scope="col">Name</th>
            <th scope="col">Market Cap</th>
            <th scope="col">Price</th>
            <th scope="col">24hour VWAP</th>
            <th scope="col">Available Supply</th>
            <th scope="col">24 Hour Volume</th>
            <th scope="col">Change (24h%)	</th>
        </tr>
        </thead>
      <tbody>
      {this.state.datashow.map((item,index)=>{
        return(
          <tr key={index} className="coin_item"  style={{textAlign:'right'}}>
            <th scope="row">{index+1}</th>
            <td>
            <a href={`${item.short}`}>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'  }}>
            <span className={`sprite sprite-${this.format_space(item.long.toLowerCase())} small_coin_logo`}></span>
            <span style={{paddingLeft:10,textAlign:'left'}}>{item.long}</span>
            </div>
            </a>
            </td>
            <td className="mktcap">${this.format_curency(item.mktcap.toString())}</td>
            <td className="price">${item.price.toFixed(2)}</td>
            <td className="vwapData">${item.vwapData.toFixed(4)}</td>
            <td>{this.format_curency(item.supply.toString())}</td>
            <td className="volume" >${this.format_curency(item.volume.toString())}</td>
            <td className="cap24hrChange" style={{color:item.cap24hrChange>0 ? "#009e73" : "#d94040"}} >{item.cap24hrChange.length > 4  ? item.cap24hrChange : item.cap24hrChange.toFixed(2) }%</td>
          </tr>
        );
      })}
      </tbody>
      </table>
    );
  }
}
const mapStateToProps = state =>({
  data : state.data
})
export default  connect(mapStateToProps)(Table);
