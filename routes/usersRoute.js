const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Place = require("../models/place");



router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists." });
        }

        const newUser = new User({ email, password });
        const user = await newUser.save();
        res.send('User Registered Successfully');
    } catch (error) {
        return res.status(400).json({ error });
    }
});



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            if (user.password === password) {
                const temp = {
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    _id: user._id,
                };
                res.send(temp);
            } else {
                return res.status(400).json({ message: 'Password incorrect' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});


router.get("/getallusers", async (req, res) => {

    try {
        const users = await User.find({})
        res.send({ users });
    } catch (error) {
        return res.status(400).json({ error });
    }

});


router.patch('/changeadmin', async (req, res) => {

    const { _id, isAdmin } = req.body;

    try {

        const user = await User.findById(_id);
        user.isAdmin = true;
        await user.save();
        res.send('Admin Status updated successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send('Error updating Admin Status');
    }

});


router.post("/getuserbyid", async (req, res) => {

    const userid = req.body.userid

    try {
        const user = await User.find({ _id: userid })
        res.send(user)

    } catch (error) {
        return res.status(400).json({ error })

    }
});


router.patch("/updateuser", async (req, res) => {
    const { _id, name, city, gender, phone, birthday, address, preferences } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.name = name;
        user.hometown = city;
        user.gender = gender;
        user.phonenumber = phone;
        user.birthday = new Date(birthday);
        user.address = address;
        user.favhotles = preferences;
        if (Array.isArray(preferences) && preferences.length > 0) {
            user.favhotles = preferences;
        }


        await user.save();
        return res.json({ message: 'User details updated successfully' });
    } catch (error) {
        return res.status(400).json({ error });
    }
});


router.post('/save', async (req, res) => {
    const { placeId, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.favlocations.includes(placeId)) {
            return res.status(400).json({ error: 'User already Saved this place' });
        }

        user.favlocations.push(placeId);
        await user.save();

        return res.status(200).json({ message: 'Place saved successfully' });
    } catch (error) {
        console.error('Error saving place:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/unsave', async (req, res) => {
    const { placeId, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.favlocations.includes(placeId)) {
            return res.status(400).json({ error: 'User has not saved this place' });
        }

        user.favlocations = user.favlocations.filter((id) => id.toString() !== placeId.toString());

        await user.save();

        return res.status(200).json({ message: 'Place unsaved successfully' });
    } catch (error) {
        console.error('Error unsaving place:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/check-save', async (req, res) => {
    const { placeId, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hasSaved = user.favlocations.includes(placeId);

        return res.status(200).json({ hasSaved });
    } catch (error) {
        console.error('Error checking if user has saved place:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



router.get("/getfavlocations", async (req, res) => {
    const userId = req.query.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const favoriteLocationIds = user.favlocations;

        const favoriteLocations = await Place.find({ _id: { $in: favoriteLocationIds } });

        return res.status(200).json({ favoriteLocations });
    } catch (error) {
        console.error("Error fetching favorite locations:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});





module.exports = router