import Website from "../../models/website.js";

export const toggleWebsiteVisibility = async (req, res) => {
    try {
        const { id } = req.params;

        const website = await Website.findById(id);

        if (
            !website ||
            website.isDeleted ||
            website.ownerId.toString() !== req.user.userId
        ) {
            return res.status(404).json({
                success: false,
                message: "Website not found"
            });
        }

        website.visibility =
            website.visibility === "public" ? "private" : "public";

        await website.save();

        return res.status(200).json({
            success: true,
            message: `Website is now ${website.visibility}`,
            visibility: website.visibility
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update visibility",
            error: error.message
        });
    }
};

export default toggleWebsiteVisibility;