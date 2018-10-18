const validate = (values) => {
    const errors = {};
    if (!values.get('email')) {
        errors.email = 'Please enter a valid email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
        errors.email = 'Invalid email address';
    }
   
    if (!values.get('password')) {
        errors.password = 'Please enter a password';
    }
    return errors
};
export default validate;