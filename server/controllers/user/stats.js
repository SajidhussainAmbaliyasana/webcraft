import User from "../../models/user.js";
import Website from "../../models/website.js";
import Page from "../../models/page.js";

const stats = async (req, res) => {

    try {

        const userId = req.user.userId;

        // User Data
        const user = await User.findOne({
            _id: userId,
            isDeleted: false
        }).select("firstName lastName username");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Total Websites
        const totalWebsites = await Website.countDocuments({
            ownerId: userId,
            isDeleted: false
        });

        // Published Websites
        const publishedWebsites = await Website.countDocuments({
            ownerId: userId,
            isDeleted: false,
            visibility: "public"
        });

        // Get Website IDs
        const websites = await Website.find({
            ownerId: userId,
            isDeleted: false
        }).select("_id");

        const websiteIds = websites.map((website) => website._id);

        // Total Pages
        const totalPages = await Page.countDocuments({
            websiteId: { $in: websiteIds },
            isDeleted: false
        });

        return res.status(200).json({
            success: true,
            data: {
                user,
                totalWebsites,
                totalPages,
                publishedWebsites
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default stats;