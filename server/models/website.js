import mongoose from 'mongoose';

const websiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true
    },
    logo: {
        type: String,
        default: null
    },
    favicon: {
        type: String,
        default: null
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
        default: null
    },
    themeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theme",
        default: null
    },
    status: {
        type: String,
        enum: ["draft", "active", "archived"],
        default: "draft",
        index: true
    },
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    currentPublishedVersion: {
        type: Number,
        default: 1,
        min: 1
    },
    homePageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
    default: null
    },
    isDeleted: {
        type: Boolean,
        default: false,
        index: true
    },

    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            return ret;
        }
    },
    toObject: {
        transform(doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});


websiteSchema.index({ ownerId: 1, isDeleted: 1 });
websiteSchema.index({ slug: 1, isDeleted: 1 });

const Website = mongoose.model("Website", websiteSchema);

export default Website;