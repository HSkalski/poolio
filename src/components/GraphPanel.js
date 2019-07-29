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
      dataArray: this.props.arrData
    };
  }

  componentDidMount() {
    this.setState({
      dataArray: this.props.arrData
    });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.refs.num_points.value);

    this.setState({
      dataArray: this.props.arrData.slice(this.props.arrData.length - this.refs.num_points.value, this.props.arrData.length)
    });
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
            <YAxis yAxisId="1" domain={[0, 1]} />
            <YAxis yAxisId="2" domain={[0, 2]} />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey="pumpStatus" stroke="#c4c4c4" yAxisId="1" />
            <Line type='monotone' dataKey="toggleStatus" stroke="#b0b0b0" yAxisId="2" />
            <Line type="monotone" dataKey="Tpool" stroke="#8884d8" />
            <Line type="monotone" dataKey="Tair" stroke="#82ca9d" />
            <Line type='monotone' dataKey="Theat" stroke="#ca9d82" />
            <Line type='monotone' dataKey="Ttarget" stroke="#bf4598" />

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