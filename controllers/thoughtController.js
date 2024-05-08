// controllers/thoughtController.js
const Thought = require("../models/Thought");
const User = require("../models/User");

// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate("user", "username");
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single thought by ID
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate(
      "user",
      "username"
    );
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new thought
const createThought = async (req, res) => {
  try {
    const { thoughtText, userId } = req.body;
    const newThought = new Thought({ thoughtText, user: userId });
    const savedThought = await newThought.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: savedThought._id } },
      { new: true }
    );

    res.status(201).json(savedThought);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a thought by ID
const updateThought = async (req, res) => {
  try {
    const { thoughtText } = req.body;
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { thoughtText },
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(
      req.params.thoughtId
    );
    if (!deletedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    res.json({ message: "Thought deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
  try {
    const { reactionBody, username } = req.body;
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
