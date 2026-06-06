import Page from '../../models/page.js';
import Website from '../../models/website.js';
import createPageSchema from '../../validators/page/webpage.js';

const createPage = async (req, res) => {
    try {
        const validatedData = createPageSchema.safeParse(req.body);

        if (!validatedData.success) {
            return res.status(400).json({
                success: false,
                errors: validatedData.error.flatten().fieldErrors
            });
        }

        const {
            websiteId,
            name,
            slug,
            title,
            description,
            isHomePage,
            status
        } = validatedData.data;

        const website = await Website.findOne({
            _id: websiteId,
            isDeleted: false
        });

        if (!website) {
            return res.status(404).json({
                success: false,
                message: "Website not found"
            });
        }

        if (!isHomePage) {
            const normalizedSlug =
                slug.replace(/^\/+/, "").toLowerCase();

            const existingSlug = await Page.findOne({
                websiteId,
                slug: normalizedSlug,
                isDeleted: false
            });

            if (existingSlug) {
                return res.status(409).json({
                    success: false,
                    message: "Slug already exists in this website"
                });
            }
        }

        if (isHomePage) {
            const existingHomePage = await Page.findOne({
                websiteId,
                isHomePage: true,
                isDeleted: false
            });

            if (existingHomePage) {
                return res.status(409).json({
                    success: false,
                    message: "Homepage already exists"
                });
            }
        }

        const page = await Page.create({
            websiteId,
            name,
            slug: isHomePage
                ? ""
                : slug.replace(/^\/+/, "").toLowerCase(),
            title,
            description: description || null,
            isHomePage,
            status
        });

        return res.status(201).json({
            success: true,
            message: "Page created successfully",
            data: page
        });

    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Slug or homepage already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export default createPage;