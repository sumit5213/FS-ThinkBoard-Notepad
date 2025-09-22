import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication Invalid: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user object (minus password) to the request
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication Invalid: Token is not valid" });
    }
};


// export function verifyToken(req, res, next){
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id: userId }
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// }

// export async function verifyToken(req, res, next) {
//   if (!req.headers.authorization) {
//       return next(error(401, "You are not authenticated!"));
//   }
//   const token = req.headers.authorization.split(" ")[1];
//   if (!token) return next(createError(401, "You are not authenticated!"));
//   const decode = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = decode;
//   return next();
// }




// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// export const verifyToken = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     if (!req.user) return res.status(401).json({ message: "User not found" });
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
