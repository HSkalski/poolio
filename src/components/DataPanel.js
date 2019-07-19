import React, {Component} from 'react';
import PropTypes from 'prop-types';

// When on home page, render DataPanel
class DataPanel extends Component {

  componentDidMount(){
  }
  
  render(){
    return(
      <div className="Panel DataPanel">
        <div className='Panel-Header'>
          Data Panel<br/>
          Pump Status: {this.props.pumpStatus} <br/>
          Temp Pool:{this.props.Tpool}<br/>
          Temp Air:{this.props.Tair}<br/>
          Temp Heater:{this.props.Theat}
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
  //time: PropTypes.date.isRequired
};

export default DataPanel;