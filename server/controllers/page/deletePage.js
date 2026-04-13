import mongoose from "mongoose";
import Page from "../../models/page.js";
import Section from "../../models/section.js";
import Component from "../../models/component.js";

const deletePage = async (req, res) => {
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
        }).select("isHomePage");

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        if (page.isHomePage) {
            return res.status(400).json({
                success: false,
                message: "Homepage cannot be deleted"
            });
        }

        const sections = await Section.find({
            pageId,
            isDeleted: false
        })
            .select("_id")
            .lean();

        const sectionIds = sections.map(section => section._id);

        if (sectionIds.length > 0) {
            await Component.updateMany(
                {
                    sectionId: { $in: sectionIds },
                    isDeleted: false
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedAt: new Date()
                    }
                }
            );
        }

        await Section.updateMany(
            {
                pageId,
                isDeleted: false
            },
            {
                $set: {
                    isDeleted: true,
                    deletedAt: new Date()
                }
            }
        );

        await Page.findOneAndUpdate(
            {
                _id: pageId,
                isDeleted: false
            },
            {
                $set: {
                    isDeleted: true,
                    deletedAt: new Date(),
                    lastSavedAt: new Date()
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Page and related sections/components deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default deletePage;