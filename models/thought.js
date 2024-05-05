const mongoose = require('mongoose');

const ReactionSchema = require('./reaction');
const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => createdAtVal.toLocaleDateString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
},

{
  // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
  // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
  toJSON: {
    virtuals: true,
  },
  id: false,
}


);

// Create a virtual property `fullName` that gets and sets the user's full name
ThoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  })


const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;