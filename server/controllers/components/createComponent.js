import mongoose from "mongoose";
import Page from "../../models/page.js";
import Component from "../../models/component.js";

const createComponent = async (req, res) => {
    try {
        const { pageId } = req.params;
        const { type, order, data = {}, parentComponentId = null } = req.body;

        if (!mongoose.Types.ObjectId.isValid(pageId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid page id"
            });
        }

        if (!type || !order) {
            return res.status(400).json({
                success: false,
                message: "Type and order are required"
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

        if (
            parentComponentId &&
            !mongoose.Types.ObjectId.isValid(parentComponentId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid parent component id"
            });
        }

        const existingComponent = await Component.findOne({
            pageId,
            parentComponentId,
            order,
            isDeleted: false
        });

        if (existingComponent) {
            return res.status(400).json({
                success: false,
                message: "A component with this order already exists"
            });
        }

        const component = await Component.create({
            pageId,
            parentComponentId,
            type,
            order,
            data
        });

        return res.status(201).json({
            success: true,
            message: "Component created successfully",
            component
        });

    } catch (error) {
        console.error("Create component error:", error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Component order already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

export default createComponent;