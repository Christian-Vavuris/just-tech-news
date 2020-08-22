

const router = require('express').Router();
const { Post, User } = require('../../models');
// const { UniqueConstraintError } = require('sequelize/types');   Where did this come from??

// get all users
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });



module.exports = router;


// I'm running into another SQL database issue and I'm not sure how to resolve it
