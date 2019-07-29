import React, { Component } from 'react';
import PropTypes from 'prop-types';

// When on home page, render DataPanel
class DataPanel extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="Panel DataPanel">
        <div className='Panel-Header'> Data Panel </div>
        <div className="row">
          <div className="col">
            Pump Status: 
            <div className="DataStatus">{this.props.pumpStatus}</div>
          </div>
          <div className="col">
            Temp Pool: 
            <div className="DataStatus">{this.props.Tpool}</div>
          </div>
          <div className="col">
            Temp Air: 
            <div className="DataStatus">{this.props.Tair}</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            Temp Heater: 
            <div className="DataStatus">{this.props.Theat}</div>
          </div>
          <div className="col">
            Temp Target: 
            <div className="DataStatus">{this.props.Ttarget}</div>
          </div>
          <div className="col">
            Date: 
            <div className="DataStatus">{this.props.time}</div>

          </div>
        </div>
      </div>
    );
  }
}

DataPanel.propTypes = {
  pumpStatus: PropTypes.number.isRequired,
  Tpool: PropTypes.number.isRequired,
  Tair: PropTypes.number.isRequired,
  Theat: PropTypes.number.isRequired,
  Ttarget: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
};

DataPanel.defaultProps = {
  pumpStatus: null,
  Tpool: null,
  Tair: null,
  Theat: null,
  time: null
};

export default DataPanel;