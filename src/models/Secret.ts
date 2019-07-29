import mongoose, { Schema, Document, Model, model } from "mongoose";

export interface ISecret extends Document {
    hash: string,
    secretText: string,
    createdAt: Date,
    expiresAt: Date,
    remainingViews: number
}

export const SecretSchema = new Schema({
    hash: { type: String, required: true },
    secretText: { type: String, required: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
    remainingViews: { type: Number, required: true }
});

const Secret = model<ISecret>("Secret", SecretSchema);

export default Secret;