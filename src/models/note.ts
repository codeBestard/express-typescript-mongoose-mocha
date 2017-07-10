import { Tag } from "./tag";

export class Note {
    noteTitle: string;
    noteText:  string;
    priority:  "High" | "Medium" | "Low";
    tags:      Tag[];
    id?:       any;
}