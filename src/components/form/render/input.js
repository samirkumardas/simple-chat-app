import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ input, label, type, autoFocus, meta: { touched, error }}) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
          <input {...input} type={type} className="form-control" autoFocus={autoFocus} placeholder={label} />
          {touched && (error && <small className="form-text text-danger">{error}</small>) }
        </div>
  </div>
);

InputField.defaultPros = {
   autoFocus: false
};

InputField.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autoFocus: PropTypes.bool,
    meta: PropTypes.object.isRequired
};

export default InputField;