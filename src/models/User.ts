import {Schema, model} from 'mongoose'

const UserSchema = new Schema ({ 
    name: {type: String, recquired: true},
    email: {type: String, recquired: true, unique: true, lowercase: true},
    password: {type: String, required:true},
    username: {type: String, required:true},
    posts :[{
        type:  Schema.Types.ObjectId,
        ref: "Post"
    }]
})

export default model ('User', UserSchema)

