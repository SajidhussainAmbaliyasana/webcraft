import mongoose from "mongoose";
import Page from "../../models/page.js";
import Component from "../../models/component.js";

const getComponents = async (req, res) => {
    try {
        const { pageId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(pageId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid page id"
            });
        }

        const page = await Page.findOne({
            _id: pageId,
            isDeleted: false
        }).select("_id");

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        const components = await Component.find({
            pageId,
            isDeleted: false,
            parentComponentId: null
        }).select("-deletedAt -createdAt -updatedAt -__v")
            .sort({ order: 1 })
            .lean();

        return res.status(200).json({
            success: true,
            components
        });

    } catch (error) {
        console.error("Get components error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

export default getComponents;