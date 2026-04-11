import useModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {config} from "../config/config.js"


async function function semdTokenResponse(user, res) {
    const token = Jwtsing({
        id: user._id,
    }, config.JWT_SECRET);

}

export const register = async (req, res) => {
    const { email, contact, password, fullname, rol } = req.body;

    try {
        const existingUser = await useModel.findOne({ 
            $or: [
                { email }, 
                { contact }
            ]
        })

        if (existingUser) {
            return res.status(400).json({ message: "Email or contact already exists" });
        }

        const newUser = new useModel({
            email,
            contact,
            password,
            fullname,
        });


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}

