import { createError } from "../error.js";
import User from '../models/User.js';
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {
                new: true
            });
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "you can only update your account"));
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user has been deleted");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "you can only delete your account"));
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const follow = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $addToSet: { following: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { followers: 1 }
        });
        res.status(200).json("Following!");
    } catch (err) {
        next(err);
    }
};

export const unfollow = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { following: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { followers: -1 }
        });
        res.status(200).json("Unfollowed!");
    } catch (err) {
        next(err);
    }
};

export const addToHis = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { history: req.params.videoId }
        });
        res.status(200).json("Added to history");
    } catch (err) {
        next(err);
    }
};

export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            // $pull: { dislikes: id }
        })
        res.status(200).json("the video has been liked");
    } catch (err) {
        next(err);
    }
};

export const unlike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $pull: { likes: id },
        })
        res.status(200).json("the video has been unliked");
    } catch (err) {
        next(err);
    }
}

// export const dislike = async (req, res, next) => {
//     const id = req.user.id;
//     const videoId = req.params.videoId;
//     try {
//         await Video.findByIdAndUpdate(videoId, {
//             $addToSet: { dislikes: id },
//             $pull: { likes: id }
//         })
//         res.status(200).json("the video has been disliked");
//     } catch (err) {
//         next(err);
//     }
// };

export const save = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await User.findByIdAndUpdate(id, {
            $addToSet: { saved: videoId }
        })
        res.status(200).json("the video has been saved");
    } catch (err) {
        next(err);
    }
};

export const unsave = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await User.findByIdAndUpdate(id, {
            $pull: { saved: videoId }
        })
        res.status(200).json("the video has been removed from saved");
    } catch (err) {
        next(err);
    }
};