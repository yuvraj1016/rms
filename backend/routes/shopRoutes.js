import express from 'express';
import multer from 'multer';
import Shop from '../models/schema/shopSchema.js';
import { Types } from 'mongoose';
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/register', upload.single('shopImage'), async (req, res) => {
    try {
        const {
            shopName,
            ownerId,
            shopNumber,
            address,
            city,
            state,
            zipCode,
            country,
            gstNumber,
        } = req.body;
        if (!shopName || !ownerId || !shopNumber || !address || !city || !state || !zipCode || !country || !gstNumber) {
            return res.status(400).json({ message: "All fields are required", flag: true });
        }

        const newShop = new Shop({
            shopName,
            owner: new Types.ObjectId(ownerId),
            shopNumber,
            address,
            city,
            state,
            zipCode,
            country,
            gstNumber,
            shopImage: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            },
        });

        await newShop.save();
        return res.status(201).json({ message: "Shop Registered", flag: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', flag: true });
    }
});

export default router;
