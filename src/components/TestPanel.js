import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as logic from '../logic';

// When on home page, render TestPanel
class TestPanel extends Component {

  handleSubmit = (event) => {
    // event.preventDefault();
    // if(this.refs.newNameInput.value != ''){
    //   this.props.addName(this.refs.newNameInput.value, this.props._id);
    // }
    // this.refs.newNameInput.value = '';
    event.preventDefault();
    
    const pump_status = logic.pumpLogic(this.refs.toggle_status.value,this.refs.temp_pool.value,this.refs.temp_heat.value);
    const targetTemp = this.props.targetTemp;
    this.props.addRecord(this.refs.toggle_status.value,
                         pump_status, 
                         this.refs.temp_pool.value, 
                         this.refs.temp_air.value, 
                         this.refs.temp_heat.value,
                         targetTemp);
    this.refs.toggle_status.value='';
    this.refs.temp_pool.value='';
    this.refs.temp_air.value='';
    this.refs.temp_heat.value='';
  };
  
  handleClick = (event) => {

    event.preventDefault();
    let data = logic.fakeData(); 
    //console.log(data);
    //console.log(this.props.getToggleStatus());
    let pump_status = logic.pumpLogic(this.props.getToggleStatus(), data.pool_temp, data.pump_temp);
    //console.log(pump_status);
    // console.log(
    //   this.props.getToggleStatus,
    //   pump_status,
    //   data.air_temp,
    //   data.pump_temp
    // );
    this.props.addRecord(
      this.props.getToggleStatus(),
      pump_status,
      data.pool_temp,
      data.air_temp,
      data.pump_temp,
      this.props.targetTemp
    );

  }

  render(){
    return(

      <div className="Panel TestPanel">
        <div className='Panel-Header'>
          Test Panel
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">

              <input type="number"
                placeholder="Toggle Status (0=off, 1=on, 2=auto)..."
                ref="toggle_status"
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
          <button type="button" className="btn btn-info" onClick={this.handleClick}>Generate Fake Data</button>
        </div>
      </div>

    );
  }
  
}

TestPanel.propTypes = {
  addRecord: PropTypes.func.isRequired,
  getToggleStatus: PropTypes.func.isRequired,
  targetTemp: PropTypes.number.isRequired,
};

export default TestPanel;