import Page from "../../models/page.js";

const getWebsitePages = async (req, res) => {
    try {
        const { websiteId } = req.params;

        if (!websiteId) {
            return res.status(400).json({
                success: false,
                message: "Website id is required"
            });
        }

        const pages = await Page.find({
            websiteId,
            isDeleted: false
        })
            .select("-order -deletedAt -isDeleted -updatedAt -__v")
            .sort({ createdAt: 1 })
            .lean();

        return res.status(200).json({
            success: true,
            count: pages.length,
            data: pages
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default getWebsitePages;