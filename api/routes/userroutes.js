const userDb = require('../models/authmodel');
const postDb = require('../models/postmodel');
const friendsDb = require('../models/friendsmodel');

const express = require('express');

const router = express.Router();


router.get('/user/friends', (req, res) => {
  friendsDb
    .getFriends(req.user.id)
    .then(response => {
      if (response.length > 0)
        res.status(200).json({ friends: response });
      else
        res.status(404).json({ message: "No friends found" });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
})

router.post('/user/friends/:friend_id', (req, res) => {
  if (req.user.id == req.params.friends_id) {
    res.status(403).json({ message: "Can Not be Friends with Yourself, Go find some..." })
    return;
  }
  friendsDb.createFriend(req.user.id, req.friends.friends_id)
    .then(response => {
      if (response.exists)
        res.status(400).json({ message: "Already Friends... Find new ones..?" })
      else if (response.bad_user) {
        res.status(400).json({ error: 'User Id is Invalid' })
      }
      else if (response.bad_friend) {
        res.status(400).json({ error: "Friend Id is Invalid" })
      } else {
        res.status(200).json({ message: 'Friendship Created' })
      }
    })
})
router.delete('/user/friends/:friend_id', (req, res) => {
  friendsDb
    .deleteFriend(req.user.id, req.params.friend_id)
    .then(response => {
      if (response === 0)
        res.status(404).json({ message: "Friendship not found" });
      else
        res.status(200).json({ message: "Unfriended" });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
})
router.get('/user', (req, res) => {
  userDb
    .getUserByEmail(req.user.email)
    .then(response => {
      if (response) res.status(200).json({ user: response });
      else res.status(404).json({ message: "User not found" });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
})
router.get("/users", (req, res) => {
  userDb
    .getUsers()
    .then(response => {
      if (response.length > 0) res.status(200).json({ users: response });
      else res.status(404).json({ message: "Not found" });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/user/:id", (req, res) => {
  userDb
    .getUserById(req.params.id)
    .then(response => {
      if (response) res.status(200).json({ user: response });
      else res.status(404).json({ message: "Not found" });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/user/:user_id/posts", (req, res) => {
  postDb.getPostByUserId(req.params.user_id)
    .then(response => {
      if (response) res.status(200).json({ items: response });
      else res.status(404).json({ message: "No items for user found" });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;