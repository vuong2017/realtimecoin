import React, { Component } from 'react';
import Table from './table/table';
import {connect} from 'react-redux';
class Content extends Component{
  render(){
    return(
    <div id="content" className="content">
      <div className="container">
        <div className="title">
            <h2>Top Tiền Điện Tử Hàng Đầu Được Giao Dịch Hàng Ngày</h2>
        </div>
        <div className="table">
          <div className="row">
            <div className="table-responsive">
                <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
const mapStateToProps = state =>({
  data : state.data
})
export default connect(mapStateToProps)(Content);
