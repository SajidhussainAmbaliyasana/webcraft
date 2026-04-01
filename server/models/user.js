import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    lastName:{
        type:String,
        required:true,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    username:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true
    },
    phone:{
        type:String,
        required:true,

    },
    profileImage:{
        type:String,
        default:null
    },
    password:{
        type:String,
        required:function(){
            return this.provider === "local";
        },
        select:false
    },
    provider:{
        type:String,
        enum:["local","google"],
        default:"local"
    },
    providerId:{
        type:String,
        default:null
    },
    role:{
        type:String,
        enum:["user","super_admin"],
        default:"user"
    },
    status:{
        type:String,
        enum:["active","pending","suspended"],
        default:"pending",
        index:true
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    lastLoginAt: {
        type: Date
    },
    currentWebsiteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Website",
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

},{
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    },
    toObject: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
})


const User = mongoose.model("user",UserSchema)

export default User