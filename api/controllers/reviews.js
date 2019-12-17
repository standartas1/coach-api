const mongoose = require('mongoose');
const Review = require('../models/review');
const Wod = require('../models/wod');
const User = require('../models/user');

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .select('-__v')
            .populate('user');
        res.status(200).json({
            count: reviews.length,
            reviews: reviews
        });
    } catch {
        res.status(400).json({
            message: 'Error while retrieving reviews data'
        });
    }
};

exports.postReview = async (req, res) => {
    const review = new Review({
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        coach: req.body.coach,
        user: req.userData.userId
    });

    try {
        const result = await review.save();
        await result.populate('user').execPopulate();
        if (
            result.adjustments !== undefined &&
            result.comment !== undefined &&
            result.wod !== undefined
        ) {
            res.status(201).json({
                message: 'Review created successfully',
                createdReview: {
                    _id: result._id,
                    comment: result.comment,
                    coach: result.coach,
                    user: result.user
                }
            });
        }
    } catch {
        res.status(400).json({ message: 'Error while posting new review' });
    }
};

exports.getReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const review = await Review.findById(reviewId).select('-__v');
        if (review !== null) {
            res.status(200).json({ review: review });
        } else {
            throw Error;
        }
    } catch {
        res.status(404).json({
            message: 'No valid entry found for provided ID'
        });
    }
};

exports.updateReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    const props = req.body;

    try {
        const review = await Review.findById(reviewId);
        if (
            (new String(req.userData.userId).valueOf() ===
                new String(review.user).valueOf() &&
                req.userData.userId !== null) ||
            req.userData.role === 'Administrator'
        ) {
            const review = await Review.updateOne(
                { _id: reviewId },
                props
            );
            if (review.n > 0) {
                res.status(200).json({
                    message: 'Review updated successfully',
                    reviewId: reviewId
                });
            } else {
                throw Error;
            }
        } else {
            res.status(401).json({ message: 'Auth failed' });
        }
    } catch {
        res.status(400).json({ message: 'Error while updating review' });
    }
};

exports.deleteReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const review = await Review.findById(reviewId);
        if (
            (new String(req.userData.userId).valueOf() ===
                new String(review.user).valueOf() &&
                req.userData.userId !== null) ||
            req.userData.role === 'Administrator'
        ) {
            const review = await Review.deleteOne({ _id: reviewId });
            if (review.n > 0) {
                res.status(200).json({
                    message: 'Review deleted successfully',
                    reviewId: reviewId
                });
            } else {
                throw Error;
            }
        } else {
            res.status(401).json({ message: 'Auth failed' });
        }
    } catch {
        res.status(400).json({ message: 'Error while deleting review' });
    }
};
