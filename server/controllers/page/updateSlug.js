import mongoose from "mongoose";
import { z } from "zod";
import Page from "../../models/page.js";

const updatePageSlug = async (req, res) => {
    try {
        const { pageId } = req.params;
        const { slug } = req.body;

        if (!mongoose.Types.ObjectId.isValid(pageId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid page id"
            });
        }

        const validatedSlug = z
            .string()
            .trim()
            .min(1, "Slug is required")
            .max(100, "Slug cannot exceed 100 characters")
            .safeParse(slug);

        if (!validatedSlug.success) {
            return res.status(400).json({
                success: false,
                errors: validatedSlug.error.flatten().fieldErrors
            });
        }

        const page = await Page.findOne({
            _id: pageId,
            isDeleted: false
        }).select("websiteId isHomePage");

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        if (page.isHomePage) {
            return res.status(400).json({
                success: false,
                message: "Homepage slug cannot be updated"
            });
        }

        const normalizedSlug = validatedSlug.data.toLowerCase();

        const existingSlug = await Page.findOne({
            websiteId: page.websiteId,
            slug: normalizedSlug,
            isDeleted: false,
            _id: { $ne: pageId }
        });

        if (existingSlug) {
            return res.status(409).json({
                success: false,
                message: "Slug already exists in this website"
            });
        }

        const updatedPage = await Page.findOneAndUpdate(
            {
                _id: pageId,
                isDeleted: false
            },
            {
                $set: {
                    slug: normalizedSlug,
                    lastSavedAt: new Date()
                }
            },
            {
                new: true,
                lean: true,
                projection: {
                    order: 0,
                    deletedAt: 0,
                    isDeleted: 0,
                    updatedAt: 0,
                    __v: 0
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Slug updated successfully",
            data: updatedPage
        });

    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Slug already exists in this website"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default updatePageSlug;