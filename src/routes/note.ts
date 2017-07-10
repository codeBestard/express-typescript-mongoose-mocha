import * as express from "express";
import NoteController from "../controllers/note";


function noteRoutes( app: express.Express,
                     noteController: NoteController = NoteController.build() ) {

    app.route("/api/v1/notes")
       .get( async (req: express.Request,
                    res: express.Response,
                    next: express.NextFunction ) =>
             await noteController.getNotes(req, res, next) )

        .post( async (req: express.Request,
                      res: express.Response,
                      next: express.NextFunction ) =>
             await noteController.createNote(req, res, next) );


    app.route("/api/v1/note/:id([a-z\\d]+)")
        .get( async (req: express.Request,
                        res: express.Response,
                        next: express.NextFunction ) =>
             await noteController.findNote(req, res, next) )

        .delete( async (req: express.Request,
                        res: express.Response,
                        next: express.NextFunction ) =>
             await noteController.deleteNote(req, res, next) )

        .put( async (req: express.Request,
                     res: express.Response,
                     next: express.NextFunction ) =>
             await noteController.updateNote(req, res, next) );


}

export default noteRoutes;
