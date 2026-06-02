import Website from "../../models/website.js";
import Page from "../../models/page.js";
import Component from "../../models/component.js";

export const getPublicWebsite = async (req, res) => {
    try {
        const { subdomain, pageSlug } = req.params;

        const website = await Website.findOne({
            slug: subdomain.toLowerCase(),
            isDeleted: false,
            visibility: "public"
        })
            .select("name slug logo favicon homePageId")
            .lean();

        if (!website) {
            return res.status(404).json({
                success: false,
                message: "Website not found"
            });
        }

        let page;

        // Homepage
        if (!pageSlug) {

            if (website.homePageId) {
                page = await Page.findOne({
                    _id: website.homePageId,
                    isDeleted: false
                })
                    .select("name slug title description isHomePage")
                    .lean();
            }

            if (!page) {
                page = await Page.findOne({
                    websiteId: website._id,
                    isHomePage: true,
                    isDeleted: false
                })
                    .select("name slug title description isHomePage")
                    .lean();
            }

            if (!page) {
                page = await Page.findOne({
                    websiteId: website._id,
                    isDeleted: false
                })
                    .select("name slug title description isHomePage")
                    .sort({ order: 1 })
                    .lean();
            }

        } else {

            page = await Page.findOne({
                websiteId: website._id,
                slug: pageSlug.toLowerCase(),
                isDeleted: false
            })
                .select("name slug title description isHomePage")
                .lean();
        }

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        const components = await Component.find({
            pageId: page._id,
            isDeleted: false,
            isVisible: true
        })
            .select("type order data")
            .sort({ order: 1 })
            .lean();

        return res.status(200).json({
            success: true,
            website,
            page,
            components
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