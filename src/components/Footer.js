import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ message }) => {
  return (
    <h4 className="Footer text-center">
      {message}
    </h4>
  );
};

Footer.propTypes = {
  message: PropTypes.string
};

export default Footer;