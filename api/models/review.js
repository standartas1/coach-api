const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{ toJSON: { virtuals: true } });

reviewSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'user'
});

module.exports = mongoose.model('Review', reviewSchema);