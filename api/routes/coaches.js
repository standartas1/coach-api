const express = require('express');
const router = express.Router();
const adminCheckAuth = require('../middleware/admin-check-auth');

const coachesController = require('../controllers/coaches');

//GET ALL
router.get('/', coachesController.getAllCoaches);  // Any request reaching this route going through the checkAuth middleware and handled by CoachesController.coaches_get_all function

//POST
router.post('/', adminCheckAuth.auth, coachesController.postCoach);

//GET ONE
router.get('/:coachId', coachesController.getCoach);

//PATCH(UPDATE)
router.patch('/:coachId', adminCheckAuth.auth, coachesController.updateCoach);

//DELETE
router.delete('/:coachId', adminCheckAuth.auth, coachesController.deleteCoach);

module.exports = router;