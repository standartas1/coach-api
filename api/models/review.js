const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Review', reviewSchema);