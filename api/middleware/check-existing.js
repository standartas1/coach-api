const Coach = require('../models/coach');

exports.existingCoach = async (req, res, next) => {
    try { 
        //checking with heroku
        console.log(req.body.coach);
        if (req.body.coach !== undefined) {
            const coach = await Coach.findById(req.body.coach);
            if (coach !== null) {
                next();
            } else {
                throw Error;
            }
        } else {
            throw Error;
        }
    } catch (err) {
        return res.status(403).json({
            message: 'No coaches exist with given ID'
        });
    }
};