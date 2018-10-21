import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import InputField from '../render/input';
import CustomSelect from '../render/custom';


const channelForm = (props) => {
    const { handleSubmit, loader, members } = props;
    const btnLoader = loader ? (<i className="fa fa-spinner fa-spin"></i>) : '';
    
    return (
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            type="text"
            component={InputField}
            label="Name"
            autoFocus={true}
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
            suggestions={members.toJS()}
            label="Members"
          />
          <button className="btn btn-info" type="submit" disabled={loader}>{btnLoader}&nbsp;Submit</button>
       </form>
    )
};

channelForm.propTypes = {
    loader: PropTypes.bool,
    members: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'channel',
    destroyOnUnmount: true,
    validate
})(channelForm);