import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

// When on home page, render GraphPanel
class GraphPanel extends Component {

  componentDidMount(){
  }
  
  render(){
    return(
      <div className='Panel GraphPanel'>
        <div className='Panel-Header'>Graph Panel</div>
        <ResponsiveContainer height="80%" >
          <LineChart
            width={500}
            height={300}
            data={this.props.arrData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time"/>
            <YAxis  domain={['dataMin-10','dataMax+10']}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Tpool" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Tair" stroke="#82ca9d" />
            <Line type='monotone' dataKey="Theat" stroke="#ca9d82" />
          </LineChart>
        </ResponsiveContainer>
      
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