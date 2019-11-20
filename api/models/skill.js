const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
});

module.exports = mongoose.model('Skill', skillSchema);