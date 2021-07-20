const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        active: false
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id, image: user.image, name: user.name, lastname: user.lastname
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        }); //왜 이름만받아올까요 음여기서용?
    });
});

router.get("/myInfo", auth, (req, res) => { //여기서 서버처리부분 만들었고
    const user_name = req.user.name;
    const user_date = req.user.createdAt;

    Subscriber.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, user_name, user_date, subscribeNumber: subscribe.length })
        })

})

module.exports = router;
//