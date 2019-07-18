import React, { Component } from 'react';
import PropTypes from 'prop-types';

// When on home page, render ManualPanel
class ManualPanel extends Component {

  handleSubmit = (event) => {
    // event.preventDefault();
    // if(this.refs.newNameInput.value != ''){
    //   this.props.addName(this.refs.newNameInput.value, this.props._id);
    // }
    // this.refs.newNameInput.value = '';
    event.preventDefault();

    this.props.addRecord(this.refs.pump_status.value, 
                         this.refs.temp_pool.value, 
                         this.refs.temp_air.value, 
                         this.refs.temp_heat.value);

    this.refs.pump_status.value='';
    this.refs.temp_pool.value='';
    this.refs.temp_air.value='';
    this.refs.temp_heat.value='';
  };

  render(){
    return(

      <div className="Panel ManualPanel">
        <div className='Panel-Header'>
          Manual Panel
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input type="number"
                placeholder="Pump Status (1 or 0)..."
                ref="pump_status"
                className="form-control" />
              
              <input type="number"
                placeholder="Pool Temp..."
                ref="temp_pool"
                className="form-control" />
              
              <input type="number"
                placeholder="Air Temp..."
                ref="temp_air"
                className="form-control" />
              
              <input type="number"
                placeholder="Pump Water Temp..."
                ref="temp_heat"
                className="form-control" />
              <span className="input-group-btn">
              
                <button type="submit" className="btn btn-info">Submit</button>
              </span>
            </div>
          </form>
        </div>
      </div>

    );
  }
  
}

ManualPanel.propTypes = {
  addRecord: PropTypes.func.isRequired,
};

export default ManualPanel;