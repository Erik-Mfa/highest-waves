import React from 'react';
import PropTypes from 'prop-types';

const UserRegisterError = ({ message }) => {
  return (
    <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
      <span className="font-medium">Registration Failed:</span> {message}
    </div>
  );
};

UserRegisterError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default UserRegisterError;
