const express = require("express");
const router = express.Router();

const { Comment } = require("../models/Comment");
//=================================
//             SUBscribe
//=================================


router.post("/saveComment", (req, res) => {
    const comment = new Comment(req.body)
    comment.save((err, comment) => {
        console.log(comment)
        if (err) return res.status(400).json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.status(400).json({ success: false, err }) 
                console.log(result)
                res.status(200).json({ success: true, result })
            })
    })
});
router.post("/getComments", (req, res) => {
    Comment.find({ "postid": req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            console.log(comments)
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
});


module.exports = router;