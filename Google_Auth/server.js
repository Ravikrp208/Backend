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


}, (_, profile,done) => {
    console.log(null, profile);

}))

app.get("/auth/google",
    //  (req,res) => {
    // console.log("with google");
    passport.authenticate("google", { scope: ["profile","email"] })
)


app.get("/auth/google/callback"),
    passport.authenticate("google", {  
        session: false, 
        failureRedirect: "/" }),
        (req, res) => {
        console.log(req.user );
        res.redirect("google authentication successful")
    }
    
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})