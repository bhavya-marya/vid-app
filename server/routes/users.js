import express from "express";
import { addToHis, deleteUser, follow, getUser, like, save, unfollow, unlike, unsave, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user 
router.put("/:id", verifyToken, update);

//delete user 
router.delete("/:id", verifyToken, deleteUser);

//get user
router.get("/find/:id", getUser);

//subscribe to a user
router.put("/fol/:id", verifyToken, follow);

//unsubscribe
router.put("/unfol/:id", verifyToken, unfollow);

//add vid to history
router.put("/history/:videoId", verifyToken, addToHis);

//like a video 
router.put("/like/:videoId", verifyToken, like);

// unlike
router.put("/unlike/:videoId", verifyToken, unlike);

//dislike a video
// router.put("/dislike/:videoId", verifyToken, dislike);

//save a video
router.put("/save/:videoId", verifyToken, save);

//unsave a video
router.put("/unsave/:videoId", verifyToken, unsave);
export default router;