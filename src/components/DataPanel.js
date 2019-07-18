import React, {Component} from 'react';
import PropTypes from 'prop-types';

// When on home page, render DataPanel
class DataPanel extends Component {

  componentDidMount(){
    console.log('DataPanel Mounted');
    this.props.fetchRecentData;
  }
  
  render(){
    return(
      <div className="Panel DataPanel">
        <div className='Panel-Header'>
          Data Panel

        </div>
      </div>
    );
  }
}

DataPanel.propTypes = {
  fetchRecentData: PropTypes.func.isRequired,
};

export default DataPanel;