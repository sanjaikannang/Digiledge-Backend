import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/authModel.js"

//  sign up 
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user using the User model
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Create a JWT token for the new user
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "10h" }
        );

        // Return the new user and token in the response
        res.status(201).json({ result: newUser, token });
    } catch (error) {
        console.error(error);

        // Log the specific error message to the console
        res.status(500).json({ message: error.message || "Something went wrong." });
    }
};
    
    //  login 
    export const login = async (req, res) => {
      const { email, password } = req.body;
      try {
        const existinguser = await User.findOne({ email });
        if (!existinguser) {
          return res.status(404).json({ message: "User don't Exist." });
        }
        const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
        if (!isPasswordCrt) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
          { email: existinguser.email, id: existinguser._id },
          process.env.JWT_SECRET,
          { expiresIn: "10h" }
        );
        res.status(200).json({ result: existinguser, token });
      } catch (error) {
        res.status(500).json("Something went worng...");
      }
    };