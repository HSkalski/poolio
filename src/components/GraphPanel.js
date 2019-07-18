import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Time 1', PoolT: 80.5, AirT: 82, amt: 2400,
  },
  {
    name: 'Time 2', PoolT: 84, AirT: 89, amt: 2210,
  },
  {
    name: 'Time 3', PoolT: 83, AirT: 75, amt: 2290,
  },
  {
    name: 'Time 4', PoolT: 80, AirT: 77, amt: 2000,
  },
  {
    name: 'Time 5', PoolT: 82, AirT: 85, amt: 2181,
  },
  {
    name: 'Time 6', PoolT: 85, AirT: 89, amt: 2500,
  },
  {
    name: 'Time 7', PoolT: 88, AirT: 90, amt: 2100,
  },
];

// When on home page, render GraphPanel
class GraphPanel extends Component {

  render(){
    return(
      <div className='Panel GraphPanel'>
        <div className='Panel-Header'>Graph Panel</div>
        <ResponsiveContainer height="80%" >
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="PoolT" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="AirT" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      
      </div>
    );
  }
}

GraphPanel.propTypes = {
  
};

export default GraphPanel;