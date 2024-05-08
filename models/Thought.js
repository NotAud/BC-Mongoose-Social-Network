// models/Thought.js
const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.Object,
    ref: "User",
    required: true,
  },
  reactions: [ReactionSchema],
});

const Thought = mongoose.model("Thought", ThoughtSchema);

module.exports = Thought;
