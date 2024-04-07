import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

const itemSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        color: String,
        category: String,
        features: [String]
    }
});

const postSchema = new Schema({
    posterId: {
        type: String,
        ref: 'UserSchema',
        default : null
    },
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        default : null
    }, 
    clothingItemsInImage: {
        color: String,
        category: String,
        features: [String]
    }, 
    actualItemLinks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemSchema',
        default : null
    }
});


const UserSchema = mongoose.models.UserSchema || mongoose.model('UserSchema', userSchema);
const ItemSchema = mongoose.models.ItemSchema || mongoose.model('ItemSchema', itemSchema);
const PostSchema = mongoose.models.PostSchema || mongoose.model('PostSchema', postSchema);

export { UserSchema, ItemSchema, PostSchema };