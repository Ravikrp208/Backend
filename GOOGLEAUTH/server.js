import { config } from "dotenv"
import express from "express"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"


config()    
const app = express()

app.get("/", (req, res) => {
    res.send("Hello World")
})  


app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback" 
}, (accessToken, refreshToken, profile, done) => {
    // Here you would typically find or create a user in your database
    // For this example, we'll just return the profile
    return done(null, profile);
}))

app.get("/auth/google", (req,res) => {
    console.log("with google0")
})




// app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect("/");
// })

    
    






app.listen(3000, () => {
    console.log("Server is running on port 3000")
})