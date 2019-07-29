import React, { Component } from 'react';
import PropTypes from 'prop-types';


const titleCase = str =>
  str.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

const ClickableLabel = ({ title, onChange }) =>
  <label className="switch-label" onClick={() => onChange(title)}>
    {titleCase(title)}
  </label>;

ClickableLabel.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const ConcealedRadio = ({ value, selected }) =>
  <input className="switch-radio" type="radio" name="switch" defaultChecked={selected === value} />;

ConcealedRadio.propTypes = {
  value: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired
};

class ToggleSwitch extends Component {
  state = { selected: this.props.selected };

  componentWillReceiveProps(nextProps){
    this.setState({ selected: nextProps.selected});
  }

  handleChange = val => {
    this.setState({ selected: val });
    this.props.handleChange(val);
  };

  selectionStyle = () => {
    return {
      left: `${this.props.values.indexOf(this.state.selected) / 3 * 100}%`,
    };
  };

  render() {
    const { selected } = this.state;
    return (
      <div className="switch">
        {this.props.values.map(val => {
          return (
            <span key={val}>
              <ConcealedRadio value={val} selected={selected} />
              <ClickableLabel title={val} onChange={this.handleChange} />
            </span>
          );
        })}
        <span className="switch-selection" style={this.selectionStyle()} />
      </div>
    );
  }
}

export default ToggleSwitch;

ToggleSwitch.propTypes = {
  values: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};