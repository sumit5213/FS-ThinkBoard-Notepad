import mongoose from "mongoose"

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
        // required: true,
        required: function(){ return !this.googleId; }
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
    //     }
    // ],
}, { timestamps: true })

const User = mongoose.model("user", userSchema)

export default User;