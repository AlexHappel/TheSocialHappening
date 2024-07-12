const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    getThoughts(req, res) {
    Thought.find()
        .then(thoughts => res.json(thoughts))
        .catch(err => res.status(500).json(err));
    },
    getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
        .then(thought => {
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' });
        }
        res.json(thought);
        })
        .catch(err => res.status(500).json(err));
    },
    createThought(req, res) {
    Thought.create(req.body)
        .then(thought => {
        return User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        })
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'Thought created but no user with this username!' });
        }
        res.json('Created the thought!');
        })
        .catch(err => res.status(500).json(err));
    },
    updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true, runValidators: true }
    )
        .then(thought => {
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' });
        }
        res.json(thought);
        })
        .catch(err => res.status(500).json(err));
    },
    deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then(thought => {
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' });
        }
        return User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );
        })
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'Thought deleted but no user with this username!' });
        }
        res.json({ message: 'Thought deleted!' });
        })
        .catch(err => res.status(500).json(err));
    },
    addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
    )
        .then(thought => {
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' });
        }
        res.json(thought);
        })
        .catch(err => res.status(500).json(err));
    },
    removeReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    )
        .then(thought => {
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' });
        }
        res.json(thought);
        })
        .catch(err => res.status(500).json(err));
    },
};