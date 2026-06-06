import User from "../../models/user.js";

const deleteAccount = async (req, res) => {
    try {

        const user = await User.findById(req.user.userId);

        if (!user || user.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.isDeleted = true;
        user.deletedAt = new Date();

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default deleteAccount;