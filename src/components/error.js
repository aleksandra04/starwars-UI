import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/error.scss';

export const Error = ({ message }) => (
  <div className="error">
    <p className="error__text">
      {message}
    </p>
    <Link to="/" className="error__link">
        Go to Home
    </Link>
  </div>
);

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: 'Error occured',
};