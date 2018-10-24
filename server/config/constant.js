const constant = {
    PORT: 3000,
    JWT_TOKEN: 'eyJhbGciOiJSUzI1NiIsInR5cCI',
    SALT_ROUNDS: 10,
    TOKEN_VALIDITTY: (60 * 60 * 24),
    MONGO_URL: 'mongodb://database:27017/chat-app',
    SESSION_LESS_ACTION: ['signup', 'login'],
    BROADCAST_ACTIONS: ['message']
}

module.exports = constant;