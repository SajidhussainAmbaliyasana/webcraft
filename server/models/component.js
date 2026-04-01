import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
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
        required: true,
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

// prevent duplicate order inside same section
componentSchema.index(
    { sectionId: 1, order: 1 },
    { unique: true }
);

// helpful when loading visible components in correct order
componentSchema.index(
    { sectionId: 1, isDeleted: 1, isVisible: 1, order: 1 }
);

const Component = mongoose.model("Component", componentSchema);

export default Component;