const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema (
    {
        conversationId:{
            type: String
        },
        text:{
            type:String
        },
        user:{
            _id:{
                type:Number
            }
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Messages",MessagesSchema);

