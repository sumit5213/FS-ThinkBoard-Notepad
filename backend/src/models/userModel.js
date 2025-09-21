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
        required: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    // notes: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Note",
    //         // default: []
    //     }
    // ],

    notes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "noteModel",
        default: []
    }


    // name: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true })

const User = mongoose.model("user", userSchema)

export default User;