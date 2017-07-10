import { Schema, model } from "mongoose";
import * as validate from "mongoose-validator";

interface ITagModel {
    name: string;
}

const nameValidator = [
    validate({
                validator: "matches",
                arguments: /^[a-zA-Z\-\d]+$/i
            }),
    validate({
                validator: "isLength",
                arguments: [ 3, 10 ],
                message: "Name should be between {ARGS[0]} and {ARGS[1]} characters"
            } )
];


const tagModelSchema = new Schema( {
    name: {
        type: String,
        required: true,
        unique: true,
        validate: nameValidator
    }
},
{
    timestamps: true
} );

const tagModel = model("Tag", tagModelSchema) ;

export { tagModel, ITagModel };