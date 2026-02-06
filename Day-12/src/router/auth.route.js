const express = require ('express')
const userModel = require ("../Models/user.model")

const authRouter =express.Router

authRouter.post("/resister", async (req, res)=>{
    const {email, name , password} =req.body

    const user =await userModel.create({
        email, password, name
    })
    res.status(201).json({
      message:"user registered"
    })
})