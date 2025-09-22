import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/userModel.js"

export async function userRegisteration(req, res, next) {
  try {
    const { email, password } = req.body;
    if( !email || !password) res.json({message:"Every field required"})
    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) return next(res.status(409).json({ message: "email already exists" }))
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    const user = await User.create({
      email, password: hashPassword
    })

    const token = jwt.sign({id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(201).json({ user, token });


  } catch (error) {
    console.log(error)
  }
}

export async function userLogin(req, res) {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({ email })

    if (!user) return res.status(400).json({ message: "User not found" })
    
    const isMatched =  await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: "1d" })

    const userResponse = {
      _id: user._id,
      email: user.email,
  };
  
    return res.status(201).json({ user: userResponse, token });
  } catch (error) {
    console.log(error)
  }
}


// export async function getNotes(req, res, next) {
//   try {
//     // req.user.id comes from your auth middleware (after signup/login + JWT)
//     const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: notes.length,
//       notes,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error: Unable to fetch notes",
//       error: error.message,
//     });
//   }
// }