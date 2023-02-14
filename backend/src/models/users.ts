import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const schemaOptions = {
    timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' },
};
const schema = new Schema({
    uid: { type: String, required: true },
    username: { type: String, required: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
    roles: { type: Array, default: ['USER'] },
    language: { type: String, default: "en" },
    accessToken: { type: String, required: true },
    isActive: { type: Boolean, default: false },
}, schemaOptions);

schema.set('toJSON', { virtuals: true });

const UsersModel = mongoose.model('users', schema);
export default UsersModel;