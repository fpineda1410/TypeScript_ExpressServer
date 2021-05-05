"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, recquired: true },
    email: { type: String, recquired: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    posts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Post"
        }]
});
exports.default = mongoose_1.model('User', UserSchema);
