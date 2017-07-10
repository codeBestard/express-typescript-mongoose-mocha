import { Document } from "mongoose";
import { noteModel, INoteModel } from "../models/noteModel";
import { tagModel, ITagModel } from "../models/tagModel";
import { Note } from "../models/note";
import { Tag } from "../models/tag";
import { INoteService } from "./INoteService";

class NoteService implements INoteService {

    async findAll(): Promise<Note[]>  {
        let docs = await noteModel.find().exec();
        let results = docs.map(d => this.BuildNote(d));
        return <Note[]> results;
    }

    BuildNote(noteDoc: Document): Note {
        const obj = Object.assign({}, noteDoc.toObject());
        return <Note> obj;
    }

    async findById ( id ): Promise<Note | null> {
        let doc = await noteModel.findById(id).exec();
        let result = doc ? this.BuildNote(doc) : null;
        return result;
    }

    async save ( noteObject: Note ): Promise<Note> {

        let tags = await Promise.all (noteObject.tags.map(async t => {
             let tag = await tagModel.findOneAndUpdate({name: t.name},
                                                        t,
                                                       { upsert: true,
                                                         new: true,
                                                         setDefaultsOnInsert: true
                                                   }).exec();
             return tag;
        }));

        let { noteTitle, noteText, priority } = noteObject;
        let doc = new noteModel({
            noteTitle,
            noteText,
            priority,
            tags: tags
        });

        doc = await doc.save();
        let result = this.BuildNote(doc);
        return result;
    }

    async update( noteObject: Note): Promise<Note | null> {


        let tags = await Promise.all( noteObject.tags.map(async t => {
            let tag = await tagModel.findOneAndUpdate({name: t.name},
                                                        t,
                                                       { upsert: true,
                                                         new: true,
                                                         setDefaultsOnInsert: true
                                                   }).exec();
            return tag;
        } ));

        let query = { _id: noteObject.id };
        delete noteObject["_id"];
        let { noteTitle, noteText, priority } = noteObject;
        let doc = await noteModel.findByIdAndUpdate(query, {
            noteTitle,
            noteText,
            priority,
            tags: tags
        }, {
            new: true
        }).populate("tags").exec();

        let result = doc ? this.BuildNote(doc) : null;
        return result;
    }

    async delete ( id ) {
        await noteModel.findByIdAndRemove(id, err => {}).exec();
    }

    static build() {
        return new NoteService();
    }
}

export { NoteService };