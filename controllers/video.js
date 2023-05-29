import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
};

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "video not found!"));
        }
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {
                new: true
            });
            res.status(200).json(updatedVideo);
        } else {
            return next(createError(403, "you can only update your video!"));
        }
    } catch (err) {
        next(err);
    }
};

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "video not found!"));
        }
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("the video has been deleted!");
        } else {
            return next(createError(403, "you can only update your video!"));
        }
    } catch (err) {
        next(err);
    }
};

export const getVideo = async (req, res, next) => {

    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};

export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        res.status(200).json("view has been increased");
    } catch (err) {
        next(err);
    }
};

export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const trending = async (req, res, next) => {
    console.time();
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const following = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const followingUsers = user.following;
        const list = await Promise.all(
            followingUsers.map(uId => {
                return Video.find({ userId: uId });
            })
        );
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};

export const getMyVid = async (req, res, next) => {
    try {
        const list = await Video.find({ userId: req.user.id });
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export const history = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const history = user.history;
        const list = await Promise.all(
            history.map(vId => {
                return Video.findById(vId);
            })
        );
        res.status(200).json(list.reverse());
    } catch (err) {
        next(err);
    }
};

export const saved = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const savedVideos = user.saved;
        const list = await Promise.all(
            savedVideos.map(vId => {
                return Video.findById(vId);
            })
        );
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(',');
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};