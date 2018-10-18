import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ input, label, type, meta: { touched, error }}) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
          <input {...input} type={type} className="form-control" placeholder={label} />
          {touched && (error && <small className="form-text text-danger">{error}</small>) }
        </div>
  </div>
);

InputField.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired
};

export default InputField;