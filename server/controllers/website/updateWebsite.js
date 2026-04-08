import Website from "../../models/website.js";

export const updateWebsite = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, description, logo, favicon } = req.body;

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

        // Check if new slug already exists
        if (slug && slug.toLowerCase() !== website.slug) {
            const existingWebsite = await Website.findOne({
                slug: slug.toLowerCase(),
                isDeleted: false,
                _id: { $ne: id }
            });

            if (existingWebsite) {
                return res.status(400).json({
                    success: false,
                    message: "Slug already exists"
                });
            }

            website.slug = slug.toLowerCase();
        }

        if (name !== undefined) website.name = name;
        if (description !== undefined) website.description = description;
        if (logo !== undefined) website.logo = logo;
        if (favicon !== undefined) website.favicon = favicon;

        await website.save();

        return res.status(200).json({
            success: true,
            message: "Website updated successfully",
            website: {
                _id: website._id,
                name: website.name,
                slug: website.slug,
                description: website.description,
                logo: website.logo,
                favicon: website.favicon,
                visibility: website.visibility,
                homePageId: website.homePageId,
                updatedAt: website.updatedAt
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update website",
            error: error.message
        });
    }
};

export default updateWebsite;