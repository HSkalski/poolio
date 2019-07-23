import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as logic from '../logic';

// When on home page, render ManualPanel
class ManualPanel extends Component {

  handleSubmit = (event) => {
    // event.preventDefault();
    // if(this.refs.newNameInput.value != ''){
    //   this.props.addName(this.refs.newNameInput.value, this.props._id);
    // }
    // this.refs.newNameInput.value = '';
    event.preventDefault();
    
    const pump_status = this.props.pumpLogic(this.refs.toggle_status.value,this.refs.temp_pool.value,this.refs.temp_heat.value);

    this.props.addRecord(this.refs.toggle_status.value,
                         pump_status, 
                         this.refs.temp_pool.value, 
                         this.refs.temp_air.value, 
                         this.refs.temp_heat.value);
    this.refs.toggle_status.value='';
    this.refs.temp_pool.value='';
    this.refs.temp_air.value='';
    this.refs.temp_heat.value='';
  };

  handleClick = (event) => {

    event.preventDefault();
    let data = logic.fakeData(); 
    console.log(data);
    console.log(this.props.getToggleStatus());
    let pump_status = logic.pumpLogic(this.props.getToggleStatus(), data.temp_pool, data.temp_heat);
    console.log(pump_status);
    // this.props.addRecord(
    //   this.props.getToggleStatus,
    //   pump_status,
    //   data.temp_air,
    //   data.temp_heat
    // );

  }

  render(){
    return(

      <div className="Panel ManualPanel">
        <div className='Panel-Header'>
          Manual Panel
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
          <button type="button" onClick={this.handleClick}>Generate Fake Data</button>
        </div>
      </div>

    );
  }
  
}

ManualPanel.propTypes = {
  addRecord: PropTypes.func.isRequired,
  getToggleStatus: PropTypes.func.isRequired,
};

export default ManualPanel;