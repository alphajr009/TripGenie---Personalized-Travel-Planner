const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post("/createtrip", upload.single("image"), async (req, res) => {
    console.log("Received file:", req.file);
    const { userid, tripname, doselectedplace, eatselectedplace, stayselectedplace, tripdays, tripbudget, tripnote } = req.body;

    try {
        const plan = {
            userid: userid,
            tripname: tripname,
            do: doselectedplace,
            eat: eatselectedplace,
            stay: stayselectedplace,
            tripnote: tripnote,
            tripdays: tripdays,
            tripbudget: tripbudget,
        };

        const newTrip = new Trip(plan);

        if (req.file) {
            const imagePath = req.file.path;
            const newFilename = `${newTrip._id}.jpg`;
            const newPath = `uploads/${newFilename}`;
            fs.renameSync(imagePath, newPath);
            newTrip.image = `/uploads/${newFilename}`;
        }

        const savedTrip = await newTrip.save();

        console.log(savedTrip);
        res.status(201).json(savedTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/getalltrips", async (req, res) => {
    const userId = req.query.userId;

    try {
        const trips = await Trip.find({ userid: userId });

        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: "No trips found for the given userId." });
        }

        res.status(200).json(trips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post('/deletetrip', async (req, res) => {

    const { _id } = req.body;

    try {

        const trip = await Trip.findByIdAndRemove(_id);

        if (!trip) return res.status(404).send('Trip not found');

        const imagePath = `uploads/${trip._id}.jpg`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.send('Trip deleted successfully');

    } catch (error) {
        console.log(error);
        res.status(400).send('Error deleting Place');
    }

});


router.post("/gettripbyid", async (req, res) => {


    const tripid = req.body.tripid

    try {
        const trip = await Trip.find({ _id: tripid })

        return res.json({ trip })
    } catch (error) {
        return res.status(400).json({ message: error })
    }


});







module.exports = router