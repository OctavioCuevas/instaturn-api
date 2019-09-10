const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    type : {
        type: Number,
        required: true
    },
    password: {
        type: String,
        default: 0
    },
    email: {
        type: String,
        default: 0
    },
    address : {
        type: String,
        required: true
    },
    active : {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
