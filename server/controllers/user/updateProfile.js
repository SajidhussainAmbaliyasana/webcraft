import User from "../../models/user.js";

const updateProfile = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            username
        } = req.body;

        const userId = req.user.userId;

        const user = await User.findById(userId);

        if (!user || user.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const emailExists = await User.findOne({
            email,
            _id: { $ne: userId },
            isDeleted: false
        });

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const usernameExists = await User.findOne({
            username,
            _id: { $ne: userId },
            isDeleted: false
        });

        if (usernameExists) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        user.username = username;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default updateProfile;