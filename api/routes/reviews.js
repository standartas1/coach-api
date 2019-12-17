const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkExisting = require('../middleware/check-existing');
const ReviewsController = require('../controllers/reviews');

//GET ALL
router.get('/', ReviewsController.getAllReviews);  // Any request reaching this route going through the checkAuth middleware and handled by CoachesController.coaches_get_all function

//POST
router.post('/', checkAuth.auth, checkExisting.existingCoach, ReviewsController.postReview);

//GET ONE
router.get('/:reviewId', ReviewsController.getReview);

//PATCH(UPDATE)
router.patch('/:reviewId', checkAuth.auth, ReviewsController.updateReview);

//DELETE
router.delete('/:reviewId', checkAuth.auth, ReviewsController.deleteReview);

module.exports = router;