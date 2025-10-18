import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/userModel.js"

export async function userRegisteration(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) res.json({ message: "Every field required" })
    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) return next(res.status(409).json({ message: "email already exists" }))
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    const user = await User.create({
      email, password: hashPassword
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(201).json({ user, token });


  } catch (error) {
    console.log(error)
  }
}

export async function userLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })

    if (!user) return res.status(400).json({ message: "User not found" })

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    const userResponse = {
      _id: user._id,
      email: user.email,
    };

    return res.status(201).json({ user: userResponse, token });
  } catch (error) {
    console.log(error)
  }
}

export async function loginAndSignup(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

    } else {
      if (password.length < 4) {
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters' });
      }

      user = new User({
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
    }
    const payload = {
      user: {
        id: user.id, // Mongoose uses 'id' as a virtual getter for '_id'
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};