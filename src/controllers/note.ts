import * as express from "express";
import httpStatus from "../utils/httpStatus";
import { INoteService } from "../services/INoteService";
import { NoteService } from "../services/notesService";

class NoteController {

    constructor (private noteService: INoteService = NoteService.build()) {
    }

    async getNotes(req: express.Request, res: express.Response, next: express.NextFunction ) {
        try {
            let result = await this.noteService.findAll();
            res.status( httpStatus.OK).json( result );
        } catch (ex) {
            // console.log( ex );
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json( { message: ex.message } );
        }
    }

    async findNote(req: express.Request, res: express.Response, next: express.NextFunction ) {
        try {
            let result = await this.noteService.findById( req.params.id );
            let status = result ? httpStatus.OK : httpStatus.NO_CONTENT;
            res.status( status ).json( result );
        } catch (ex) {
            // console.log( ex );
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json( { message: ex.message } );
        }
    }

    async createNote(req: express.Request, res: express.Response, next: express.NextFunction ) {
        try {
            let result = await this.noteService.save( req.body );
            res.status( httpStatus.CREATED ).json( result );
        } catch (ex) {
            // console.log( ex );
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json( { message: ex.message } );
        }
    }

    async deleteNote(req: express.Request, res: express.Response, next: express.NextFunction ) {
        try {
            await this.noteService.delete( req.params.id );
            res.status( httpStatus.ACCEPTED ).end();
        } catch (ex) {
            // console.log( ex );
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json( { message: ex.message } );
        }
    }

    async updateNote(req: express.Request, res: express.Response, next: express.NextFunction ) {
        try {
            req.body.id = req.params.id;
            let result = await this.noteService.update( req.body );
            res.status( httpStatus.OK ).json( result );
        } catch (ex) {
            // console.log( ex );
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json( { message: ex.message } );
        }
    }

    static build() {
        return new NoteController();
    }
}

export default NoteController;