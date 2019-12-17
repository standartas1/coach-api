const Skill = require('../models/skill');

exports.existingskill = async (req, res, next) => {
    try { 
        console.log(req.body.skill);
        if (req.body.skill !== undefined) {
            const skill = await skill.findById(req.body.skill);
            if (skill !== null) {
                next();
            } else {
                throw Error;
            }
        } else {
            throw Error;
        }
    } catch (err) {
        return res.status(403).json({
            message: 'No skills exist with given ID'
        });
    }
};