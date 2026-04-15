import mongoose from "mongoose";
import Page from "../../models/page.js";
import Component from "../../models/component.js";

const deleteComponent = async (req, res) => {
    try {
        const { pageId, componentId } = req.params;

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

        const component = await Component.findOneAndUpdate(
            {
                _id: componentId,
                pageId,
                isDeleted: false
            },
            {
                $set: {
                    isDeleted: true,
                    deletedAt: new Date()
                }
            },
            {
                returnDocument: "after",
                select: "_id"
            }
        ).lean();

        if (!component) {
            return res.status(404).json({
                success: false,
                message: "Component not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Component deleted successfully"
        });

    } catch (error) {
        console.error("Delete component error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

export default deleteComponent;