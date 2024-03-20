const express = require("express");
const router = express.Router();
const Place = require("../models/place");
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



router.post("/addplace", upload.array("images", 7), async (req, res) => {

    const newplace = new Place({
        name: req.body.title,
        category: req.body.category,
        phonenumber: req.body.phone,
        city: req.body.city,
        address: req.body.address,
        googlemaplink: req.body.googlemaplink,
        opentime: req.body.openingtime,
        endtime: req.body.closingtime,
        rating: 0,
        description: req.body.description,
    });

    try {
        const savedPlace = await newplace.save();


        const updatedFiles = req.files.map((file, index) => {
            const oldPath = file.path;
            const newFilename = `${savedPlace._id}-${index}.jpg`;
            const newPath = `uploads/${newFilename}`;
            fs.renameSync(oldPath, newPath);
            return newPath;
        });


        const imageUrls = updatedFiles.map((path) => "/uploads/" + path.split("/").pop());
        savedPlace.images = imageUrls;
        await savedPlace.save();

        return res.send("Place Created Successfully");

    } catch (error) {
        console.log("error in route");
        console.log(newplace);
        return res.status(400).json({ error });
    }
});


router.get("/getallplaces", async (req, res) => {

    try {
        const places = await Place.find({})
        return res.json({ places })
    } catch (error) {
        return res.status(400).json({ message: error })
    }


});


router.patch('/deleteplace', async (req, res) => {

    const { _id } = req.body;

    try {

        const place = await Place.findByIdAndRemove(_id);

        if (!place) return res.status(404).send('Place not found');

        // Delete associated images
        for (let index = 0; index < 7; index++) {
            const imagePath = `uploads/${place._id}-${index}.jpg`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.send('Place deleted successfully');

    } catch (error) {
        console.log(error);
        res.status(400).send('Error deleting Place');
    }

});


router.post("/getplacebyid", async (req, res) => {


    const placeid = req.body.placeid

    try {
        const place = await Place.find({ _id: placeid })
        return res.json({ place })
    } catch (error) {
        return res.status(400).json({ message: error })
    }


});

router.post('/like', async (req, res) => {
    const { placeId, userId } = req.body;

    try {
        const place = await Place.findById(placeId);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        if (place.likedusers.includes(userId)) {
            return res.status(400).json({ error: 'User already liked this place' });
        }
        place.likedusers.push(userId);
        place.likes += 1;
        await place.save();

        return res.status(200).json({ message: 'Place liked successfully' });
    } catch (error) {
        console.error('Error liking place:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/unlike', async (req, res) => {
    const { placeId, userId } = req.body;

    try {
        const place = await Place.findById(placeId);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        if (!place.likedusers.includes(userId)) {
            return res.status(400).json({ error: 'User has not liked this place' });
        }

        place.likedusers = place.likedusers.filter((id) => id !== userId);


        place.likes -= 1;

        await place.save();

        return res.status(200).json({ message: 'Place unliked successfully' });
    } catch (error) {
        console.error('Error unliking place:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/check-like', async (req, res) => {
    const { placeId, userId } = req.body;

    try {
        const place = await Place.findById(placeId);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        const hasLiked = place.likedusers.includes(userId);

        return res.status(200).json({ hasLiked });
    } catch (error) {
        console.error('Error checking if user has liked place:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



router.post("/getdo", async (req, res) => {
    const placeIds = JSON.parse(req.body.do);
    try {
        const places = await Place.find({ _id: { $in: placeIds } });
        return res.json({ places });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


router.post("/geteat", async (req, res) => {
    const placeIds = JSON.parse(req.body.eat);
    try {
        const places = await Place.find({ _id: { $in: placeIds } });
        return res.json({ places });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


router.post("/getstay", async (req, res) => {
    const placeIds = JSON.parse(req.body.stay);
    try {
        const places = await Place.find({ _id: { $in: placeIds } });
        return res.json({ places });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});








module.exports = router