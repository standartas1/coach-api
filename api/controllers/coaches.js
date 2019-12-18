const mongoose = require('mongoose');
const Coach = require('../models/coach');
const Review = require('../models/review');

exports.getAllCoaches = async (req, res) => {
    try {
        const coaches = await Coach.find()
            .select('-__v')
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user'
                }
            });

        res.status(200).json({
            count: coaches.length,
            coaches: coaches
        });
    } catch {
        res.status(400).json({ message: 'Error while retrieving coaches data' });
    }
};

// exports.getAllCoaches = async (req, res) => {
//     try {
//         const coaches = await Coach.find().select('-__v');

//         res.status(200).json({
//             count: coaches.length,
//             coaches: coaches
//         });
//     } catch {
//         res.status(400).json({ message: 'Error while retrieving coaches data' });
//     }
// };

exports.postCoach = async (req, res) => {
    try {
        const coach = new Coach({
            _id: new mongoose.Types.ObjectId(),
            skill: req.body.skill,
            name: req.body.name,
            surname: req.body.surname,
            experience: req.body.experience,
            img: req.body.img
        });

        const result = await coach.save();
        await result.populate('reviews').execPopulate();
        res.status(201).json({
            message: 'Coach created successfully',
            createdCoach: {
                _id: result._id,
                skill: result.skill,
                name: result.name,
                surname: result.surname,
                experience: result.experience,
                img: result.img,
                reviews: result.reviews
            }
        });
    } catch {
        res.status(400).json({ error: 'Error while posting a new coach' });
    }
};

exports.getCoach = async (req, res) => {
    try {
        const coachId = req.params.coachId;
        const coach = await Coach.findById(coachId)
            .select('-__v')
            .populate('reviews');
        res.status(200).json({ coach: coach });
    } catch {
        res.status(404).json({
            message: 'No valid entry found for provided ID'
        });
    }
};

exports.updateCoach = async (req, res) => {
    try {
        const coachId = req.params.coachId;
        const props = req.body;
        await Coach.updateOne({ _id: coachId }, props);
        res.status(200).json({
            message: 'Coach updated successfully',
            coachId: coachId
        });
    } catch {
        res.status(404).json({
            message: 'No valid entry found for provided ID'
        });
    }
};

exports.deleteCoach = async (req, res) => {
    try {
        let coachId = req.params.coachId;
        const coach = await Coach.deleteOne({ _id: coachId });
        if (coach.n > 0) {
            Review.deleteMany({ coach: coachId })
                .exec()
                .then(reviews => {
                    if (reviews.n > 0) {
                        res.status(200).json({
                            message: 'Coach deleted successfully',
                            reviewsId: coachId
                        });
                    } else {
                        res.status(200).json({
                            message: 'Coach deleted successfully',
                            reviewsId: coachId
                        });
                    }
                });
        } else {
            throw Error;
        }
    } catch {
        res.status(400).json({ error: 'Error while deleting a coach' });
    }
};
