const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const SkillsController = require('../controllers/skills');
const Skill = require('../models/skill');


//GET ALL
router.get('/', SkillsController.skills_get_all);

//POST
router.post('/', checkAuth, SkillsController.skills_post);

//GET ONE
router.get('/:skillId', SkillsController.skills_get_one);

//PATCH(UPDATE)
router.patch('/:skillId', checkAuth, SkillsController.skills_update);

//DELETE
router.delete('/:skillId', checkAuth, SkillsController.skills_delete);

module.exports = router;