import React from 'react'
import PropTypes from 'prop-types'

const UserRegisterError = ({ message }) => {
  return (
    <div
      className="mb-4 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span className="font-medium">Registration Failed:</span> {message}
    </div>
  )
}

UserRegisterError.propTypes = {
  message: PropTypes.string.isRequired
}

export default UserRegisterError
