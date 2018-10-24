const User = (Schema) => ({
    name: { type: String },
    email: { type: String },
    password: { type: String }
});
module.exports = User; 