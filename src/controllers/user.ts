import * as express from "express";



class UsersController {

    async getUsers(req: express.Request, res: express.Response, next: express.NextFunction ) {
        try {
            let result = await new Promise(resolve => resolve({users: [{name: "test"}]}) );
            res.json(result);
        } catch (ex) {
            console.log( ex );
            res.status(500).json( { message: ex.message } );
        }
    }


    static build() {
        return new UsersController();
    }
}

export default UsersController;