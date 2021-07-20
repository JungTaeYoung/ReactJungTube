const express = require("express");
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");
const { User } = require("../models/User");
//=================================
//             SUBscribe
//=================================


router.post("/subscribeNumber", (req, res) => {
  // 비디오 저장
  console.log('userTo', req.body.userTo )
  Subscriber.find({ 'userTo': req.body.userTo })
    .exec((err, subscribe) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, subscribeNumber: subscribe.length })
    })
});

router.post("/subscribeInfo", (req, res) => {
  Subscriber.find({ userFrom: req.body.userFrom })
    .exec((err, subscribeInfo) => {
      if (err) return res.status(400).send(err);

      let subscribedUser = [];
      subscribeInfo.map((subscribe, i) => {
        subscribedUser.push(subscribe.userTo)
      })
      console.log(req.body.userFrom)
      User.find({ _id: { $in: subscribedUser } })

        .exec((err, users) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, users })
        })

    })




});

router.post("/subscribed", (req, res) => {
  // 비디오 저장
  Subscriber.find({ 'userTo': req.body.userTo, "userFrom": req.body.userFrom })
    .exec((err, subscribe) => {
      if (err) return res.status(400).send(err);

      return res.status(200).json({ success: true, subscribed: subscribe.length !== 0 ? true : false })
    })
});

router.post("/unSubscribe", (req, res) => {
  // 구독 취소
  Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true, doc })

    })
});

router.post("/subscribe", (req, res) => {
  // 구독 하기
  const subscribe = new Subscriber(req.body)
  subscribe.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    res.status(200).json({ success: true })
  })
});


module.exports = router;
