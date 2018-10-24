const Message = (Schema) => ({
    from: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    to: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    time :  { type: Date, required: true }, 
    type: { type: String },
    status: {
        type: Map,
        of: Number
    }
});
module.exports = Message; 

/*
Status mode
-----------
Deliver   read = flag
1         1    = 3
1         0    = 2
0         0    = 0

Type = channel or private
*/