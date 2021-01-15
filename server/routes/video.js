const express = require("express");
const router = express.Router();
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const { Video } = require("../models/Video");
const { response } = require("express");
//=================================
//             Video
//=================================

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb)=>{
        const ext = path.extname(file.originalname)
        if(ext !== ".mp4"){
            return cb(res.status(400).end('only mp4 is allowed'), false)
        }
        cb(null, true)
    }
});

const uplaod = multer({ storage: storage }).single("file")

router.post("/uploadfiles", (req, res) => {
  // 비디오 저장
  uplaod(req, res, err=>{
      if(err) {
          return res.json({ success: false, err })
        }
        return res.json({ success: true, url: req.file.path, fileName: req.file.fileName })
  })
});

router.post("/videoUpload", (req, res) => {
  // 비디오 정보 저장
    const video = new Video(req.body);
    console.log(video)
    video.save((err, doc)=>{
        if(err) return res.json({success: false, err})
        res.status(200).json({success:true, doc})
    })
});


router.post("/getVideoDetail", (req, res)=>{
    // 비디오정보를 db에서 가져와 보낸다.

    Video.findOne({"_id": req.body.videoId})
    .populate("writer")
    .exec((err, videoDetail)=>{
      if(err) return res.status(400).send(err);
      return res.status(200).json({success:true, videoDetail})
    })
})

router.get("/getVideos", (req, res)=>{
    // 비디오정보를 db에서 가져와 보낸다.

    Video.find()
    .populate('writer')
    .exec((err, videos)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, videos})
    })
})


router.post("/thumbnail", (req, res) => {
  // 섬네일 생성 및 비디오 러닝타임 가져오기
  let thumbsFilePath = "";
  let fileDuration = "";

   // 비디오 전체 정보 추출
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  //썸네일 생성, 비디오 길이 추출
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        url: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 1,
      folder: "uploads/thumbnails",
      size: "320x200",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

module.exports = router;
