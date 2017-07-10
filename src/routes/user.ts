import * as express from "express";
import UserController from "../controllers/user";

// type options = { app: express.Express, userController?: UserController };

function userRoute( app: express.Express,
                     userController = UserController.build() ) {
    /* GET users listing. */
    app.route("/api/v1/users")
       .get( userController.getUsers );

}

export default userRoute;
