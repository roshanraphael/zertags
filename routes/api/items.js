const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const User = require("../../models/User");
const Item = require("../../models/Item");

router.get("/", (req, res) => {
    const email = req.query.email;
    // res.status(200).json({message: email});
    if (!email || email === undefined) return res.status(500);
    // Item
    //     .find({email})
    //     .exec((err, items) => {
    //         if (err) () => console.log(err);
    //         console.log("The items are: ", items);
    //         return res.status(200).send(items);
    //     })
    User.findOne({ email }).exec(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500);
        }
        console.log(result);
        return res.status(200).send(result);
    });
    // return res.status(200).send(user);
    // user.populate('items').exec((err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500);
    //     } else {
    //         return res.status(200).send(result);
    //     }
    // })
    // }).catch(err => {
    //     console.log(err);
    //     return res.status(500);
    // })
});

router.post("/", (req, res) => {
    const email = req.body.email;
    const name = req.body.itemName;
    const description = req.body.description;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ error: 'Email not found' });
        }
        const newItem = new Item({
            name,
            description
        });
        User.findOneAndUpdate(
            { email },
            { $push: { items: newItem } },
            (err, success) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Sucess",success)
                    return res.status(200).send(success.items)
                }
            }
        )
    })
})

module.exports = router;