import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

// When on home page, render GraphPanel
class GraphPanel extends Component {

  constructor(props){
    super(props);
    this.state={
      dataArray: this.props.arrData,
      numData: 50
    };
    
  }

  componentDidMount() {
    this.updateArray();
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      dataArray: nextProps.arrData.slice(nextProps.arrData.length - this.state.numData, nextProps.arrData.length),
    });
  }

  updateArray = () => {
    this.setState({
      dataArray: this.props.arrData.slice(this.props.arrData.length - this.state.numData, this.props.arrData.length),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.refs.num_points.value == ''){
      this.setState({
        numData: 50,
      }, () => this.updateArray() );
    }
    else{
      this.setState({
        numData: this.refs.num_points.value,
      }, () => this.updateArray() );
    }
      //this.updateArray();
    // this.setState({
    //   dataArray: this.props.arrData.slice(this.props.arrData.length - this.refs.num_points.value, this.props.arrData.length),
    //   numData: this.refs.num_points.value
    // });
    //const recentData = this.props.arrData.slice(this.props.arrData.length - 25, this.props.arrData.length);

    this.refs.num_points.value = '';

  };

  render() {

    
    

    return (
      <div className='Panel GraphPanel'>
        <div className='Panel-Header'>Graph Panel</div>
        <ResponsiveContainer height="80%" >
          <LineChart
            width={500}
            height={300}
            data={this.state.dataArray}
            //data={recentData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" angle={-10} textAnchor="end" height={60} />
            <YAxis domain={['dataMin-10', 'dataMax+10']} />
            <YAxis yAxisId="1" domain={[0, 1]} hide={true}/>
            <YAxis yAxisId="2" domain={[0, 2]} hide={true}/>
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey="pumpStatus" stroke="#c4c4c4" yAxisId="1" dot={false}/>
            <Line type='monotone' dataKey="toggleStatus" stroke="#b0b0b0" yAxisId="2" dot={false}/>
            <Line type="monotone" dataKey="Tpool" stroke="#8884d8" dot={false}/>
            <Line type="monotone" dataKey="Tair" stroke="#82ca9d" dot={false}/>
            <Line type='monotone' dataKey="Theat" stroke="#ca9d82" dot={false}/>
            <Line type='monotone' dataKey="Ttarget" stroke="#bf4598" dot={false}/>

          </LineChart>
        </ResponsiveContainer>
        <div className="row">
          <div className="col float-right">
            # of points to show:
          </div>
          <div className="col float-left">
              <form onSubmit={this.handleSubmit}>
              <div className="input-group">

                <input type="number"
                  placeholder={this.state.dataArray.length}
                  ref="num_points"
                  className="form-control" />
                <span className="input-group-btn">

                  <button type="submit" className="btn btn-info">Set</button>
                </span>
              </div>
            </form>
          </div>
          <div className="col">
            Total Data Points: {this.props.arrData.length}
          </div>
        </div>
      </div>
    );
  }
}

GraphPanel.propTypes = {
  arrData: PropTypes.array.isRequired,
};

// GraphPanel.defaultProps = {
//   arrData: [],
// };

export default GraphPanel;