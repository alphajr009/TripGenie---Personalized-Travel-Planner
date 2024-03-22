const express = require("express");
const router = express.Router();
const Seller = require("../models/seller");
const Otp = require("../models/otp");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingSelelr = await Seller.findOne({ email });
    if (existingSelelr) {
      return res
        .status(400)
        .json({ error: "Seller with this email already exists." });
    }

    const newSeller = new Seller({ email, password });
    const seller = await newSeller.save();
    res.send("Seller Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email: email });

    if (seller) {
      if (seller.password === password) {
        const temp = {
          name: seller.name,
          email: seller.email,
          isAdmin: seller.isAdmin,
          isSetup: seller.isSetup,
          isSeller: seller.isSeller,
          _id: seller._id,
        };
        res.send(temp);
      } else {
        return res.status(400).json({ message: "Password incorrect" });
      }
    } else {
      return res.status(404).json({ message: "Seller not found" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallsellers", async (req, res) => {
  try {
    const sellers = await Seller.find({});
    res.send({ sellers });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getsellerbyid", async (req, res) => {
  const sellerid = req.body.sellerid;

  try {
    const seller = await Seller.find({ _id: sellerid });
    res.send(seller);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.patch("/updateseller", async (req, res) => {
  const { _id, name, gender, phone, birthday, address } = req.body;

  try {
    const seller = await Seller.findById(_id);
    if (!seller) return res.status(404).json({ message: "User not found" });
    seller.name = name;
    seller.gender = gender;
    seller.phonenumber = phone;
    seller.birthday = new Date(birthday);
    seller.address = address;

    await seller.save();
    return res.json({ message: "Seller details updated successfully" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/changepasswordOtp", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.password = newPassword;
    await seller.save();

    await Otp.deleteOne({ email });

    res.send("Password changed successfully");
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).send("Failed to change password");
  }
});

module.exports = router;
