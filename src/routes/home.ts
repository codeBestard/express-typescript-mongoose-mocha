import * as express from "express";

function homeRoutes( app ) {

    app.route("/api")
       .get( function(req, res, next) {
            res.send("Welcome to notekeeper API");
        });
}

export default homeRoutes;
