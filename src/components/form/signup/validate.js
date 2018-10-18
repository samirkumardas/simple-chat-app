const validate = (values) => {
    const errors = {};
    
    if (!values.get('name')) {
        errors.name = 'Please enter your name';
    }

    if (!values.get('email')) {
        errors.email = 'Please enter your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
        errors.email = 'Invalid email address';
    }
   
    if (!values.get('password')) {
        errors.password = 'Please enter a password';
    } else if (values.get('password').length < 6) {
        errors.password = 'Must be at least 6 chars long'
    }

    if (!values.get('repassword')) {
        errors.repassword = 'Please enter confirm password';
    } else if (values.get('repassword') != values.get('password')) {
        errors.repassword = 'Both passwords should be same.'
    }

    return errors
};
export default validate;