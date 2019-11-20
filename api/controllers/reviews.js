const Review = require("../models/review");
const Coach = require("../models/coach");
const Skill = require("../models/skill");
var mongoose = require('mongoose');

exports.reviews_get_all = (req, res, next) => {
    Review.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(error => {
        res.status(500).json({
            error : error
        });
    });
}

exports.reviews_post = (req, res, next) => {
    Coach.findById(req.body.coachId)
      .then(coach => {
        if (!coach) {
          return res.status(404).json({
            message: "Coach not found"
          });
        }
        const review = new Review({
          _id: mongoose.Types.ObjectId(),
          comment: req.body.comment,
          skill: req.body.skillId,
          coach: req.body.coachId,
          user: req.body.userId
        });
        return review.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Review stored",
          createdReview: {
              _id: result._id,
              date: result.date,
              comment: result.comment,
              skill: result.skill,
              coach: result.coach,
              user: result.user
          }
          // request: {
          //   type: "GET",
          //   url: "http://localhost:3000/reviews/" + result._id
          // }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  
  exports.reviews_get_one = (req, res, next) => {
    Review.findById(req.params.reviewId)
      .exec()
      .then(review => {
        if (!review) {
          return res.status(404).json({
            message: "Review not found"
          });
        }
        res.status(200).json({
          review: review
          // request: {
          //   type: "GET",
          //   url: "http://localhost:3000/reviews"
          // }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

  exports.reviews_update = (req, res, next) => {
    const id = req.params.reviewId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Review.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Review updated"
            // request: {
            //     type: 'GET',
            //     url: 'http://localhost:3000/coaches/' + id
            // }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    });
}
  
  exports.reviews_delete = (req, res, next) => {
    Review.remove({ _id: req.params.reviewId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Review deleted"
          // request: {
          //   type: "POST",
          //   url: "http://localhost:3000/reviews",
          //   body: {coachId: 'ID', date: 'String', comment: 'String'}
          // }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };