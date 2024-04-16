import { Schema, model } from "mongoose";
import User from "./userSchema.js";

// Define the schema for shop registration
const shopSchema = new Schema({
    shopName: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref:User,
        required: true
    },
    shopNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    gstNumber: {
        type: String,
        required: true,
        unique:true
    },
    shopImage: {
        data: Buffer,
        contentType: String,
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

// Create a model using the schema
const Shop = model("Shop", shopSchema);

export default Shop;
