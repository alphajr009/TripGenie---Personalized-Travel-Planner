const express = require("express");
const router = express.Router();
const Review = require("../models/review");


router.post("/review", async (req, res) => {
    const { placeId, name, reviewd, value ,age } = req.body;

    try {
        const newReview = new Review({ placeId, name, reviewd, value ,age});
        const review = await newReview.save();
        res.send('Review Post Successfully');

    } catch (error) {
        return res.status(400).json({ error });
    }
});




router.post("/getreviewbyid", async (req, res) => {


    const placeid = req.body.placeid

    try {
        const review = await Review.find({ placeId: placeid })
        return res.json({ review })
    } catch (error) {
        return res.status(400).json({ message: error })
    }


});






module.exports = router