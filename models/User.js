
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    },
    email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    },
    ],
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    ],
});

const User = model('User', userSchema);

module.exports = User;
