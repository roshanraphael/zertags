const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const User = require("../../models/User");
const Item = require("../../models/Item");
const Notif = require("../../models/Notif");

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

router.get("/:id", (req, res) => {
    const email = req.query.email;
    // const { id, userId } = req.params;
    // console.log(id, userId);
    User.findOne({ email }).then(user => {
        if (!user) return res.status(404);
        const item = user.items.filter(x => x._id == id);
        console.log(user.items);
        console.log(item);
        if (item.length == 0) {
            res.status(404);
        } else {
            return res.status(200).send(item[0]);
        }
    });
    // exec(function (err, result) {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500);
    //     }
    //     console.log(result);
    // const item = result.items.filter(x => x._id === id);
    // console.log(item);
    // if (item.length == 0) {
    //     res.status(404);
    // } else {
    //     return res.status(200).send(item[0]);
    // }
    return res.status(500);
});


router.get("/:id/:userId", (req, res) => {
    // const email = req.query.email;

    const { id, userId } = req.params;
    console.log(id, userId);
    User.findById(userId).then(user => {
        if (!user) return res.status(404);
        const item = user.items.filter(x => x._id == id);
        console.log(user.items);
        console.log(item);
        if (item.length == 0) {
            res.status(404);
        } else {
            return res.status(200).send(item[0]);
        }
    });
    // exec(function (err, result) {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500);
    //     }
    //     console.log(result);
    // const item = result.items.filter(x => x._id === id);
    // console.log(item);
    // if (item.length == 0) {
    //     res.status(404);
    // } else {
    //     return res.status(200).send(item[0]);
    // }
    return res.status(500);
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
                    console.log("Sucess", success)
                    return res.status(200).send(success.items)
                }
            }
        )
    })
})


router.post("/notif/:itemId/:userId", (req, res) => {
    const { longitude, latitude, message} = req.body;
    const { itemId, userId } = req.params;
    const newNotif = new Notif({
        user: userId,
        item: itemId,
        longitude,
        latitude,
        message
    });
    newNotif.save().then(notif => res.json(notif)).catch(err => console.log(err));
});

// router.get("/notif/:userId", (req, res) => {
//     console.log(req.params)
//     const { userId }  = req.params;
//     console.log("fdfd", userId);
//     Notif.find({
//         user: userId
//     }).then(notifs => {
//         // console.log(notifs);
//         res.status(200).send({message: 'success'});
//     }).catch(err => {
//         res.status(500).send(err);
//     })
//     // return res.status(200);
// })

router.get("/notifs", (req, res) => {
    Notif.find().exec( (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500);
        }
        console.log('Notifications:', result);
    })
})

module.exports = router;