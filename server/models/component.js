import mongoose from "mongoose";

const componentSchema = new mongoose.Schema({
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
        required: true,
        index: true
    },

    parentComponentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
        default: null,
        index: true
    },

    type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    order: {
        type: Number,
        required: true,
        min: 1
    },

    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },

    isVisible: {
        type: Boolean,
        default: true
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

componentSchema.index(
    {
        pageId: 1,
        parentComponentId: 1,
        order: 1,
        isDeleted: 1
    },
    { unique: true }
);

componentSchema.index({
    pageId: 1,
    isDeleted: 1,
    isVisible: 1,
    order: 1
});

const Component = mongoose.model("Component", componentSchema);

export default Component;