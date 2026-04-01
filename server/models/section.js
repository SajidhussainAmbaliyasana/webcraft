import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
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
})

// prevent duplicate section order in same page
sectionSchema.index(
    { pageId: 1, order: 1 },
    { unique: true }
);

// helpful when loading all visible sections in order
sectionSchema.index(
    { pageId: 1, isDeleted: 1, isVisible: 1, order: 1 }
);

const Section = mongoose.model("Section", sectionSchema);

export default Section
