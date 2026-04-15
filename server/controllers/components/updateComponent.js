import mongoose from "mongoose";
import Page from "../../models/page.js";
import Component from "../../models/component.js";

const updateComponent = async (req, res) => {
    try {
        const { pageId, componentId } = req.params;
        const { data, isVisible } = req.body;

        if (!mongoose.Types.ObjectId.isValid(pageId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid page id"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(componentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid component id"
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

        const existingComponent = await Component.findOne({
            _id: componentId,
            pageId,
            isDeleted: false
        }).select("_id");

        if (!existingComponent) {
            return res.status(404).json({
                success: false,
                message: "Component not found"
            });
        }

        const updateData = {};

        if (data !== undefined) {
            updateData.data = data;
        }

        if (typeof isVisible === "boolean") {
            updateData.isVisible = isVisible;
        }

        const component = await Component.findOneAndUpdate(
            {
                _id: componentId,
                pageId,
                isDeleted: false
            },
            {
                $set: updateData
            },
            {
                new: true,
                select: "_id pageId data isVisible"
            }
        ).lean();

        return res.status(200).json({
            success: true,
            message: "Component updated successfully",
            component
        });

    } catch (error) {
        console.error("Update component error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

export default updateComponent;