import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleSwitch from './ToggleSwitch';



// When on home page, render ControlPanel
class ControlPanel extends Component {
 
  render() {

    return (
      <div className="Panel ControlPanel">
        <div className='Panel-Header'> Control Panel </div>
        Target Temp: [PLACEHOLDER]<br />
        <ToggleSwitch values={['on', 'off', 'auto']} selected={this.props.functionSelected} handleChange={this.props.functionToggleChange}/>
      </div>
    );
  }
}


ControlPanel.propTypes = {
  functionToggleChange: PropTypes.func.isRequired,
  functionSelected: PropTypes.string.isRequired,
};

ControlPanel.defautProps ={
  functionSelected: 'on',
};

export default ControlPanel;