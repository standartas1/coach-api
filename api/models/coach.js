const mongoose = require('mongoose');

const coachSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    skill: {type: mongoose.Schema.Types.ObjectId, ref: 'Skill'},
    name: {type: String, require: true},
    surname: {type: String, require: true},
    number: {type: String, require: true},
    email: {type: String, require: true},
    experience: {type: String, require: true}
});

module.exports = mongoose.model('Coach', coachSchema);