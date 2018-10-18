export const email = {
    rules: {
        isEmail: true,
        isEmpty: (values, value) => !!value
    },
    error: 'This is not a valid email',
    errors: {
        isEmail: 'You have to use a valid email address',
        isEmpty: 'Email can not be empty'
    }
};

export const password = {
    rules: {
        isEmpty: (values, value) => !!value
    },
    error: 'This is not a valid password',
    errors: {
        isEmpty: 'Password can not be empty'
    }
};