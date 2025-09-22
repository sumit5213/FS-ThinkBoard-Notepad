import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note",
        }
    ],

    // notes: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: "Note",
    //     default: []
    // }


    // name: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true })

const User = mongoose.model("user", userSchema)

export default User;