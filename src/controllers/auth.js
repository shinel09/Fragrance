import User from "../models/user.js";
import { hashpassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { cloudinary } from "../helpers/cloudinary.config.js";

dotenv.config();

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is taken" });
    }

    const hashedPassword = await hashpassword(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // handle image upload
    if (image) {
      try {
        const imagePath = await cloudinary.uploader.upload(image.path);
        user.image = imagePath.secure_url;
        user.imagePublicId = imagePath.public_id;
      } catch (err) {
        console.log(err);
        return res.json({success: false, message: "Error uploading image", err})
      }
    }

    await user.save();

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Wrong password" });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "User logged in successfully",
      user: {
        name: user.name,
        role: user.role,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const forgotPassword = async(req, res) => {
  try {
    const {email} = req.body

    if(!email) {
      return res.status(400).json({message:'Email is required'})
    }

    // find user by email
    const user = await User.findOne({email})
    if(!user) {
      return res.status(404).json({error: 'User not found'})
    }

    // OTP and send to user


    // generate password reset token
    const resetToken = jwt.sign({userId: user._id}, process.env.jwt_secret, {expiresIn: "30minutes"})


    // send the reset token
    const domain = "www.shinel.com"
    const resetLink = `${domain}/reset/${resetToken}`

    return res.json({message: "password reset token generated successfully", resetToken})



  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "failed to create reset token" });
  }
}

export const resetPassword = async(req, res) => {
  try {
    const {newPassword} = req.body;

    const resetToken = req.headers.authorization

    if(!newPassword) {
      return res.status(400).json({success: false, message:'enter new password'});
    }
    if(!resetToken || !resetToken.startWith('bearer')) {
      return res.status(401).json({success: false, message:'invalid token or no token provided'});
    }


    // get token without the 'bearer'
    const token = resetToken.split(' ')[1]

    // verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedToken){
      return res.status(403).json({success: false, message:'invalid/expired token provided'});
    }
    const userId = decodedToken.userId

    const user = await User.findById(userId);
    if(!user) {
      return res.status(403).json({error: "invalid user"})
    }

    const hashedPassword = await hashpassword(newPassword)

    user.password = hashedPassword

    await user.save()

    res.json({success: true, message: "passwords updated successfully"})


  } catch (err) {
    console.log(err.message);
    return res.status(500).json({success: false, message: "Password reset failed", error: err.message});
  }
}