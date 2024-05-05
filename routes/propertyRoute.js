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



router.post("/addproperty", upload.array("images", 7), async (req, res) => {

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
        isPublic: false,
    
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

router.get("/getallproperty", async (req, res) => {

    try {
        const places = await Place.find({})
        return res.json({ places })
    } catch (error) {
        return res.status(400).json({ message: error })
    }


});


router.patch('/deleteproperty', async (req, res) => {

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

        res.send('Property deleted successfully');

    } catch (error) {
        console.log(error);
        res.status(400).send('Error deleting Property');
    }

});



module.exports = router;       