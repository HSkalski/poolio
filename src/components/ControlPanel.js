import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleSwitch from './ToggleSwitch';



// When on home page, render ControlPanel
class ControlPanel extends Component {

 
  render() {

    return (
      <div className="Panel ControlPanel">
        <div className='Panel-Header'> Control Panel </div>
        Target Temp: <br />
        <ToggleSwitch values={['days', 'weeks', 'months']} selected="days" />
      </div>
    );
  }
}


ControlPanel.propTypes = {

};

export default ControlPanel;