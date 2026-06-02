import Website from "../../models/website.js";
import Page from "../../models/page.js";

export const createWebsite = async (req, res) => {
    try {
        const { name, slug, description, logo, favicon, visibility } = req.body;

        if (!name || !slug || !description) {
            return res.status(400).json({
                success: false,
                message: "Name, slug and description are required"
            });
        }

        const existingWebsite = await Website.findOne({
            slug: slug.toLowerCase(),
            isDeleted: false
        });

        if (existingWebsite) {
            return res.status(400).json({
                success: false,
                message: "Slug already exists"
            });
        }

        const website = await Website.create({
            name,
            slug: slug.toLowerCase(),
            description,
            logo: logo || null,
            favicon: favicon || null,
            visibility: visibility || "private",
            ownerId: req.user.userId
        });

        // Create default home page
        const homePage = await Page.create({
            websiteId: website._id,
            name: "Home",
            title: "Home",
            slug: "",
            description: "",
            isHomePage: true,
            status: "draft"
        });

        // Link homepage to website
        website.homepageId = homePage._id;
        await website.save();

        return res.status(201).json({
            success: true,
            message: "Website created successfully",
            website: {
                _id: website._id,
                name: website.name,
                slug: website.slug,
                description: website.description,
                logo: website.logo,
                homePageId: website.homepageId,
                status: website.status,
                visibility: website.visibility,
                createdAt: website.createdAt
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create website",
            error: error.message
        });
    }
};

export default createWebsite;