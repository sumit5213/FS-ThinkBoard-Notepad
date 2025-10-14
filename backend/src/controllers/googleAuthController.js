import passport from "passport"
import jwt from "jsonwebtoken"

export const googleLogin = passport.authenticate("google", {
    scope: ['profile', 'email']
})

// this approach for the validation is best for storing the session

// export const googleCallback = (req, res, next) => {
//     passport.authenticate("google", {
//         failureRedirect: "/login"
//     },  
//     (err, user) => {
//         if (err) return next(err)
//         if (!user) return res.redirect("/login")

//         req.logIn(user, (err) => {
//             if (err) return next(err)
//             return res.redirect("/dashboard")
//         })
//     })(req, res, next)
// }


export const googleCallback = (req, res, next) => {                     // jwt approach for the google login
    passport.authenticate("google", {
        session: false,
        failureRedirect: "http://localhost:5173/login"
    },
        (err, user) => {
            if (err) return next(err)
            if (!user) return res.redirect("http://localhost:5173/login")

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "1h" })
            console.log(token)
            // return res.status(201).json({ user, token });
            return res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
        })(req, res, next)
}

export function logout(req, res, next) {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect("/")
    })
}