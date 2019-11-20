const Skill = require("../models/skill");
var mongoose = require('mongoose');

exports.skills_get_all = (req, res, next) => {
    Skill.find()
      .select("name _id")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          skills: docs.map(doc => {
            return {
              name: doc.name,
              _id: doc._id
            //   request: {
            //     type: "GET",
            //     url: "http://localhost:3000/skills/" + doc._id
            //   }
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

 exports.skills_post = (req, res, next) => {
    const skill = new Skill({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name
    });
    skill
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Skill created successfully",
          createdSkill: {
            name: result.name,
            _id: result._id
            // request: {
            //   type: "GET",
            //   url: "http://localhost:3000/products/" + result._id
            // }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

// exports.skills_get_one = async (req, res) => {
//     try {
//         const skillId = req.params.skillId;
//         const skill = await Skill.findById(skillId).select('-__v');
//         res.status(200).json({ skill: skill });
//     } catch {
//         res.status(404).json({
//             message: 'No valid entry found for provided ID'
//         });
//     }
// };

exports.skills_get_one = (req, res, next) => {
    const id = req.params.skillId;
    Skill.findById(id)
      .select("name _id")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            skill: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/skills"
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };
  

exports.skills_update = (req, res, next) => {
    const id = req.params.skillId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Skill.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Skill updated",
            request: {
                type: 'GET',
                url: 'http://localhost:3000/skills/' + id
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

// exports.skills_update = async (req, res) => {
//     try {
//         const skillId = req.params.skillId;
//         const props = req.body;
//         await Skill.updateOne({ _id: skillId }, props);
//         res.status(200).json({
//             message: 'Skill updated successfully',
//             skillId: skillId
//         });
//     } catch {
//         res.status(404).json({
//             message: 'No valid entry found for provided ID'
//         });
//     }
// };

exports.skills_delete = (req, res, next) => {
    const id = req.params.skillId;
    Skill.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Skill deleted",
            request: {
                type: 'POST',
                url: 'http://localhost:3000/skills',
                body: { name: 'String', price: 'Number'}
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

// exports.skills_delete = async (req, res) => {
//     try {
//         let skillId = req.params.skillId;
//         const skill = await Skill.deleteOne({ _id: skillId });
//         console.log(skill);
//         if (skill.n > 0) {
//             Response.deleteMany({ skill: skillId })
//                 .exec()
//                 .then(responses => {
//                     if (responses.n > 0) {
//                         res.status(200).json({
//                             message: 'Skill deleted successfully',
//                             responsesId: skillId
//                         });
//                     } else {
//                         res.status(200).json({
//                             message: 'Skill deleted successfully',
//                             responsesId: skillId
//                         });
//                     }
//                 });
//         } else {
//             throw Error;
//         }
//     } catch {
//         res.status(400).json({ error: 'Error while deleting a skill' });
//     }
// };