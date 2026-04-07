import User from "../../models/user.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({
            isDeleted: false
        })
            .select(
                "_id firstName lastName username email phone role status subscription createdAt"
            )
            .lean();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default getAllUsers;