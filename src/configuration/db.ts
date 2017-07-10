import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

(<any>mongoose).Promise = bluebird;

export default class DB {
    static connect ( url: string ) {
        mongoose.connect( url,
                      err => { if (err) {
                          console.log( err );
                      }  } );

    }
}