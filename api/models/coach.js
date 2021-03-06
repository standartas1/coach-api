const mongoose = require('mongoose');

const coachSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    skill: {type: String, require: true},
    name: {type: String, require: true},
    surname: {type: String, require: true},
    experience: {type: String, require: true},
    img: {type: String, require: true}
},
{ toJSON: { virtuals: true}});

coachSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'coach'
});

module.exports = mongoose.model('Coach', coachSchema);