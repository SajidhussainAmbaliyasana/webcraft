import Website from "../../models/website.js";

export const getPublicWebsite = async (req, res) => {
    try {
        const { slug } = req.params;

        const website = await Website.findOne({
            slug: slug.toLowerCase(),
            isDeleted: false,
            visibility: "public"
        })
        .select("_id name logo favicon homePageId")
        .lean();

        if (!website) {
            return res.status(404).json({
                success: false,
                message: "Website not found"
            });
        }

        return res.status(200).json({
            success: true,
            website
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch website",
            error: error.message
        });
    }
};

export default getPublicWebsite;