import express from "express";
import User from "../models/schema/userSchema.js";
const router = express.Router();

router.post("/signin", async (req, res, next) => {
    try{
        const body = {
            username: req.body.uName,
            password: req.body.uPass
        }
        console.log(body);
        const user = await User.findOne(body);
        if (user) {
            res.status(201).json({ message: "User authenticated", User: user });
        } else {
            res.status(201).json({ flag: true });
        }
    }catch(err){
        next(err);
        console.log(err);
    }
});
router.post("/signup", async (req, res, next) => {
    try{
        const body = {
            username: req.body.Username,
            password: req.body.Password,
            name:req.body.Name,
            role:req.body.Role,
            email:req.body.Email
        }
        const existingUser = await User.findOne({ email: req.body.Email });
        const existingUser2 = await User.findOne({ username: req.body.Username });
        if (existingUser || existingUser2) {
            res.status(201).json({ flag: true });
        } else {
            const user = new User(body);
            try {
                await user.save();
                res.status(201).json({ message: 'Student Created' });
            } catch (err) {
                console.log(err);
                next(err);
            }
        }
    }catch(err){
        next(err);
        console.log(err);
    }
});

export default router;