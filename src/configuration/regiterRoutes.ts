import * as express from "express";
import homeRoutes from "../routes//home";
import noteRoutes from "../routes/note";
import userRoutes from "../routes/user";

export default function registerRoutes( app: express.Express ) {
    homeRoutes( app );
    noteRoutes( app );
    userRoutes( app  );
}