import passport from "passport"


export const googleLogin = passport.authenticate("google", {
    scope: ['profile', 'email']
})

export const googleCallback = (req, res, next) => {
    passport.authenticate("google", {
        failureRedirect: "/login"
    }, (err, user) => {
        if (err) return next(err)
        if (!user) return res.redirect("/login")

        req.logIn(user, (err) => {
            if (err) return next(err)
            return res.redirect("/dashboard")
        })
    })(req, res, next)
}

export function logout(req, res, next)  {
    req.logout((err)=>{
        if(err) return next(err)
        res.redirect("/")
    })
}