import { Schema, model, Document, Model } from "mongoose";
import * as validate from "mongoose-validator";
import { tagModel, ITagModel } from "./tagModel";

interface INoteModel {
    noteTitle: string,
    noteText: string,
    priority: string,
    tags: ITagModel[]
}

const noteValidator = [
    validate(
        {
            validator: "matches",
            arguments: /^[a-zA-Z\-\d]+$/i
        }),
    validate(
        {
            validator: "isLength",
            arguments: [ 3, 10 ],
            message: "{PATH} should be between {ARGS[0]} and {ARGS[1]} characters"
        } )
];

const noteSchema = new Schema({
    noteTitle: { type: String, required: true, validate: noteValidator },
    noteText:  { type: String, required: true },
    priority:  { type: String, enum: ["High", "Medium", "Low"] },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag",
        index: true
    }]
}, {
    timestamps: true
});

let noteModel = model("Note", noteSchema);


export { noteModel, INoteModel };



