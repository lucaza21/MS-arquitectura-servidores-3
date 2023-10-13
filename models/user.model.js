const mongoose  = require("mongoose");

const schema = new mongoose.Schema({
    id: {
        type: String 
    },
    /* createdAt: Date,
    updatedAt: Date, */
    name: { 
        type: String, 
        required: [true, "Name required"] 
    },
    email: { 
        type: String, 
        required: [true, "Email required"],
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    password: { 
        type: String, 
        required: [true, "Password required"] 
    }, 
    bio: { 
        type: String, 
    },
    active:{
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) =>{
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const User = mongoose.model("User", schema);
module.exports = User;