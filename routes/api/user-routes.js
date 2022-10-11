const router = require('express').Router();
const { User } = require('../../models');

//GET/api/users
router.get('/', (req, res) => {
    //Access our User model and run .findAll() method)
    User.findAll({
        attributes: { exclude: ['password'] }
      })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

    router.get('/:id', (req, res) => {
        User.findOne({
          attributes: { exclude: ['password'] },
          where: {
            id: req.params.id
          },
          include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_url', 'created_at']
            },
            // include the Comment model here:
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'created_at'],
              include: {
                model: Post,
                attributes: ['title']
              }
            },
            {
              model: Post,
              attributes: ['title'],
              through: Vote,
              as: 'voted_posts'
            }
          ]
        })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
//GET/api/users/1
//req.params.id is the same as sql SELECT * FROM users WHERE id = 1


//POST/api/users
router.post('/', (req, res) => {
    //expects {username: 'Learnantino', email: 'lernantino@gmail.com', password: 'password1234''}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

    router.post('/login', (req, res) => {

      // Query operation
      // expects {email: 'lernantino@gmail.com', password: 'password1234'}
      //We queried the User table using the findOne() method
      // for the email entered by the user and assigned it to req.body.email
      User.findOne({
        where: {
          email: req.body.email
        }
        //If the user with that email was not found, a message is sent back as a response to the client. However, if the email was found in the database, the next step will be to verify the user's identity by matching the password from the user and the hashed 
        //password in the database. This will be done in the Promise of the query.
      }).then(dbUserData => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that email address!' });
          return;
        }

    //

    // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password)
        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!'});
          return;
        }

        res.json({ user: dbUserData, message: 'You are now logged in!' });
  });  
});

//PUT/api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      })
        .then(dbUserData => {
          if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });


//DELETE/api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;