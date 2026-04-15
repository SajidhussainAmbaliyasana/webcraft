import Website from "../../models/website.js";
import Page from "../../models/page.js";
import Component from "../../models/component.js";

const deleteWebsite = async (req, res) => {
    try {
        const { id } = req.params;

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

        const now = new Date();

        const pages = await Page.find({
            websiteId: id,
            isDeleted: false
        })
            .select("_id")
            .lean();

        const pageIds = pages.map(page => page._id);

        if (pageIds.length > 0) {
            await Component.updateMany(
                {
                    pageId: { $in: pageIds },
                    isDeleted: false
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedAt: now
                    }
                }
            );

            await Page.updateMany(
                {
                    websiteId: id,
                    isDeleted: false
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedAt: now,
                        lastSavedAt: now
                    }
                }
            );
        }

        website.isDeleted = true;
        website.deletedAt = now;

        await website.save();

        return res.status(200).json({
            success: true,
            message: "Website and all related pages and components deleted successfully"
        });

    } catch (error) {
        console.error("Delete website error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

export default deleteWebsite;