import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema({
    websiteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Website",
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    slug: {
        type: String,
        required: function () {
            return !this.isHomePage;
        },
        trim: true,
        lowercase: true,
        default: ""
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },
    description: {
        type: String,
        default: null,
        trim: true,
        maxlength: 500
    },
    isHomePage: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft",
        index: true
    },
    order: {
        type: Number,
        required: true,
        min: 1
    },
    lastSavedAt: {
        type: Date,
        default: Date.now
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


//prevent dublicate slug in same webiste
pageSchema.index(
    { websiteId: 1, slug: 1 },
    { unique: true }
);

//hold all the page in correct order 
pageSchema.index(
    { websiteId: 1, isDeleted: 1, order: 1 }
);

//ensure only one homepage
pageSchema.index(
    { websiteId: 1, isHomePage: 1 },
    {
        unique: true,
        partialFilterExpression: { isHomePage: true }
    }
);

const Page = mongoose.model("Page", pageSchema);

export default Page;