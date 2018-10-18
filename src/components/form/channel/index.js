import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import InputField from '../render/input';
import CustomSelect from '../render/custom';


const channelForm = props => {
    const { handleSubmit, loader } = props;
    const btnLoader = loader ? (<i className="fa fa-spinner fa-spin"></i>) : '';

    const members = [ { id: 3, name: "Bananas" },
                      { id: 4, name: "Mangos" },
                      { id: 5, name: "Lemons" },
                      { id: 6, name: "Apricots" }
                    ];
      
    return (
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            type="text"
            component={InputField}
            label="Name"
          />
          <Field
            name="purpose"
            type="text"
            component={InputField}
            label="Purpose"
          />
          <Field
            name="members"
            component={CustomSelect}
            suggestions={members}
            label="Members"
          />
          <button className="btn btn-info" type="submit" disabled={loader}>{btnLoader}&nbsp;Submit</button>
       </form>
    )
};

channelForm.propTypes = {
    loader: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'channel',
    validate
})(channelForm);