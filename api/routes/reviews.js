const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const Coach = require("../models/coach");
const Skill = require("../models/skill");
const Review = require("../models/review");

const ReviewsController = require('../controllers/reviews');

//GET ALL
router.get('/', ReviewsController.reviews_get_all);  // Any request reaching this route going through the checkAuth middleware and handled by CoachesController.coaches_get_all function

//POST
router.post('/', checkAuth, ReviewsController.reviews_post);

//GET ONE
router.get('/:reviewId', ReviewsController.reviews_get_one);

//PATCH(UPDATE)
router.patch('/:reviewId', checkAuth, ReviewsController.reviews_update);

//DELETE
router.delete('/:reviewId', ReviewsController.reviews_delete);

module.exports = router;