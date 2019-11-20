const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CoachesController = require('../controllers/coaches');

//GET ALL
router.get('/', CoachesController.coaches_get_all);  // Any request reaching this route going through the checkAuth middleware and handled by CoachesController.coaches_get_all function

//POST
router.post('/', checkAuth, CoachesController.coaches_post);

//GET ONE
router.get('/:coachId', CoachesController.coaches_get_one);

//PATCH(UPDATE)
router.patch('/:coachId', checkAuth, CoachesController.coaches_update);

//DELETE
router.delete('/:coachId', checkAuth, CoachesController.coaches_delete);

module.exports = router;