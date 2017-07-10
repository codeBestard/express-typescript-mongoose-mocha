import { Note } from "../models/note";
// import { ITag } from "../models/tagModel";

export interface INoteService {
    findAll(): Promise<Note[]>;
    findById( id ): Promise<Note | null>;
    save( noteObj: Note ): Promise<Note>;
    update( noteObj: Note ): Promise<Note | null>;
    delete ( id ): void;
}