import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleSwitch from './ToggleSwitch';



// When on home page, render ControlPanel
class ControlPanel extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.refs.target_temp.value);

    if(this.refs.target_temp.value != 0){
      this.props.addRecord(this.props.toggleStatus,
        this.props.pumpStatus,
        this.props.tempPool,
        this.props.tempAir,
        this.props.tempHeat,
        this.refs.target_temp.value
      );
    }

    this.refs.target_temp.value = '';

  };

  render() {
    //console.log('re-render control panel');
    //console.log(this.props.functionSelected);
    return (
      <div className="Panel ControlPanel">
        <div className='Panel-Header'> Control Panel
        </div>
        <div className="row">
          <div className="col">
            <div>Mode Toggle</div>
            <ToggleSwitch values={['on', 'off', 'auto']} selected={this.props.functionSelected} handleChange={this.props.functionToggleChange} />

          </div>
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">

                <input type="number"
                  placeholder="Set The Target Temp..."
                  ref="target_temp"
                  className="form-control" />
                <span className="input-group-btn">

                  <button type="submit" className="btn btn-info">Submit</button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


ControlPanel.propTypes = {
  functionToggleChange: PropTypes.func.isRequired,
  functionSelected: PropTypes.string.isRequired,
  addRecord: PropTypes.func.isRequired,
  toggleStatus: PropTypes.number.isRequired,
  pumpStatus: PropTypes.number.isRequired,
  tempPool: PropTypes.number.isRequired,
  tempAir: PropTypes.number.isRequired,
  tempHeat: PropTypes.number.isRequired,
  tempTarget: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
};

ControlPanel.defautProps = {
  functionSelected: 'off',

};

export default ControlPanel;