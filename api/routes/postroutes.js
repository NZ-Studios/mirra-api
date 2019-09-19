const postDb = require('../models/postmodel');
const commentsDb = require('../models/commentsmodel');
const imagesDb = require('../models/imagepostmodel');
const express = require('express');

const router = express.Router();

//#region POSTS

//create POST
router.post('/post', (req, res) => {
    postDb.createpost(req.body)
        .then(response => {
            res.status(200).json({ id: response });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})
//read POST
router.get('/post/:id', (req, res) => {
    postDb.getPostById(req.params.id)
        .then(response => {
            if (response)
                res.status(200).json({ item: response }); //   GOOD RESPONSE
            else {
                res.status(404).json({ message: "Post Not Fount" }); //   BAD RESPONSE
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message }) //DATA ERROR ....  Data isnt being sent in the right format 
        })
})
//update POST
router.put('/post/:id', (req, res) => {
    postDb.updatePost(req.params.id, req.body)
        .then(response => {
            res.status(200).json({ id: response });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
})
//delete POST
router.delete('/post/:id', (req, res) => {
    postDb.deletePost(req.params.id)
        .then(response => {
            res.status(200).json({ message: `DELETED :: id ${req.params.id}` });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
})

//#endregion

//#region COMMENTS

//create COMMENT 
router.post('/post/comment', (req, res) => {
    commentsDb.createComment(req.body)
        .then(response => {
            res.status(200).json({ id: response });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})
//read COMMENT 
router.get('/post/:item_id/comment', (req, res) => {
    commentsDb.getCommenttByItemId(req.params.item_id)
        .then(response => {
            if (response)
                res.status(200).json({ comments: response });
            else
                res.status(404).json({ message: "No Comments for this Post found" });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
})
router.get('/post/comment/:id', (req, res) => {
    commentsDb.getCommentById(req.params.id)
        .then(response => {
            if (response)
                res.status(200).json({ comment: response });
            else
                res.status(404).json({ message: "Post Not Found" });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})
//update COMMENT
router.put('/post/comment/:id', (req, res) => {
    commentsDb.updateComment(req.params.id, req.body)
        .then(response => {
            res.status(200).json({ id: response });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})
//delete COMMENT
router.delete('/post/comment/:id', (req, res)=>{
    commentsDb.de(req.params.id)
        .then(response => {
            res.status(200).json({ message: `DELETED :: id ${req.params.id}` });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
})
//#endregion

//#region IMAGES
//create Image 
router.post('/post/image', (req, res) => {
    imagesDb.createComment(req.body)
        .then(response => {
            res.status(200).json({ id: response });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})
//read COMMENT 
router.get('/post/:item_id/image', (req, res) => {
    imagesDb.getCommenttByItemId(req.params.item_id)
        .then(response => {
            if (response)
                res.status(200).json({ comments: response });
            else
                res.status(404).json({ message: "No Comments for this Post found" });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
})
router.get('/post/image/:id', (req, res) => {
    imagesDb.getCommentById(req.params.id)
        .then(response => {
            if (response)
                res.status(200).json({ comment: response });
            else
                res.status(404).json({ message: "Image Not Found" });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})
//update COMMENT
router.put('/post/image/:id', (req, res) => {
    imagesDb.updateComment(req.params.id, req.body)
        .then(response => {
            res.status(200).json({ id: response });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})
//delete COMMENT
router.delete('/post/image/:id', (req, res)=>{
    imagesDb.de(req.params.id)
        .then(response => {
            res.status(200).json({ message: `DELETED :: id ${req.params.id}` });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
})
//#endregion
module.exports = router;