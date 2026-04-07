import User from "../../models/user.js";

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      _id: id,
      isDeleted: false,
    })
      .select(
        "_id firstName lastName username email phone role status subscription profileImage lastLoginAt createdAt"
      )
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default getSingleUser;