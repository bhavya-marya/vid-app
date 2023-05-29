import express from "express";
import { addVideo, addView, deleteVideo, following, getByTag, getMyVid, getVideo, history, random, saved, search, trending, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);

//update video
router.put("/:id", verifyToken, updateVideo);

//delete a video
router.delete("/:id", verifyToken, deleteVideo);

//get videos
router.get("/find/:id", getVideo);

//views
router.put("/view/:id", addView);

//trending videos 
router.get("/trending", trending);

//random vidoes
router.get("/random", random);

//following vidoes
router.get("/fol", verifyToken, following);

//get own videos
router.get("/myvids", verifyToken, getMyVid);

//history
router.get("/history", verifyToken, history);

//saved videos
router.get("/saved", verifyToken, saved);

//get by tags
router.get("/tags", getByTag);

//get by title
router.get("/search", search);
export default router;