import registerSchema from "../../validators/user/register.js";
import User from "../../models/user.js";
import bcrypt from 'bcryptjs'
import { ZodError } from 'zod'
import jwt from "jsonwebtoken";


const register = async (req, res) => {
    try {
        const validatedData = registerSchema.parse(req.body);

        const {
            firstName,
            lastName,
            username,
            email,
            phone,
            password,
        } = validatedData;

        // 2. Check existing email or username
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ],
            isDeleted: false
        }).lean();

        if (existingUser) {
            if (existingUser.email === email.toLowerCase()) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 4. Create user
        const user = await User.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: username.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES
            }
        );

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

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // 5. Return safe response
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role,
                status: user.status,
                subscription: user.subscription
            }
        });



    } catch (error) {
     if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: error.issues[0].message
            });
        }
        res.status(500).json({ success: false, message: `Internal Server Error ${error}` })
    }
}

export default register;