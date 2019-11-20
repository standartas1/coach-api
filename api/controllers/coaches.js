const Coach = require("../models/coach");
const Skill = require("../models/skill");
var mongoose = require('mongoose');

exports.coaches_get_all = (req, res, next) => {
    Coach.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(error => {
        res.status(500).json({
            error : error
        });
    });
}

exports.coaches_post = (req, res, next) => {
    Skill.findById(req.body.skillId)
        .then(skill => {
            if(!skill) {
                return res.status(404).json({
                    message: 'Skill not found'
                });
            }
    const coach = new Coach({
        _id: mongoose.Types.ObjectId(),
        skill: req.body.skillId,
        name: req.body.name,
        surname: req.body.surname,
        number: req.body.number,
        email: req.body.email,
        experience: req.body.experience
    });
    return coach
        .save()
    })
    .then(result => {
    console.log(result);
    res.status(201).json({
        message: "Coach stored",
        createdCoach: {
            _id: result._id,
            skill: result.skill,
            name: result.name,
            surname: result.surname,
            number: result.number,
            email: result.email,
            experience: result.experience
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000/coaches' + result._id
            }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
}

exports.coaches_get_one = (req, res, next) => {
    Coach.findById(req.params.coachId)
        .exec()
        .then(coach => {
            if(!coach){
                return res.status(404).json({
                    message: 'Coach not found'
                });
            }
            res.status(200).json({
                coach: coach,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/coaches'
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });    
}

exports.coaches_update = (req, res, next) => {
    const id = req.params.coachId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Coach.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Coach updated",
            request: {
                type: 'GET',
                url: 'http://localhost:3000/coaches/' + id
            }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    });
}

exports.coaches_delete = (req, res, next) => {
    Coach.remove({_id: req.params.coachId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Coach deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/coaches',
                    body: {skillId: 'ID', name: 'String', surname: 'String', number: 'String', email: 'String', experience: "String"}
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });   
}