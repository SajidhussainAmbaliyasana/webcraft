import { z, ZodError } from 'zod';
import User from '../../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import loginSchema from '../../validators/user/login.js';


const login = async (req, res) => {
    try {
        const validateData = loginSchema.parse(req.body);

        const { username, password } = validateData;

        //find user
        const user = await User.findOne({
            username: username.toLowerCase(),
            isDeleted: false
        }).select("+password");
  
        //user not found
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password", success: false });
        }

        //check account suspended
        if (user.status === "suspended") {
            return res.status(403).json({ message: "Your account has been suspended", success: false })
        }

        //check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid username or password", success: false });
        }

        user.lastLoginAt = new Date();
        await user.save();

        //generate token
        const token = jwt.sign({
            userId: user._id,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        });

        const refreshToken = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES
            }
        );


        // 8. Store token in cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role,
                status: user.status,
                subscription: user.subscription,
            },
        });
    } catch (error) {
        console.log(error);

        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: error.issues[0].message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export default login;