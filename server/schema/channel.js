const Channel = (Schema) => ({
    name: { type: String, required: true },
    purpose: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    creationTime: { type: Date, default: Date.now },
    members: [ { type: Schema.Types.ObjectId, ref: 'user', required: true } ]
});
module.exports = Channel; 