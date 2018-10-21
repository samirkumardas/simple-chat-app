const validate = (values) => {
    const errors = {};
    
    if (!values.get('name')) {
        errors.name = 'Please channel name';
    }
    
    return errors
};
export default validate;