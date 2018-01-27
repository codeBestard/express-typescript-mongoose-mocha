import "mocha";
import { expect } from "chai";
import * as mongoose from "mongoose";
import server from "../../src/server";
import * as supertest from "supertest";
const agent = supertest.agent( server );

import { Note } from "../../src/models/note";
import { noteModel } from "../../src/models/noteModel";
import { tagModel } from "../../src/models/tagModel";
import { newNotes, newTags } from "../seed";

// skipping until needed
describe.skip( "Intergration Test with SuperTest Should", function () {

    before( "clear data", function ( done ) {
        let promises = <any>[];
        for ( let i in mongoose.connection.collections ) {
           promises.push( mongoose.connection.collections[ i ].remove( function (err) { } ) );
        }
        Promise.all(promises)
                .then(() => done());
    } );

    before( "seed data", function ( done ) {
        let newTags = newNotes.reduce(( out, n ) => out = [ ...out, ...n.tags ], <any>[] );
        tagModel.insertMany( newTags, ( err, results ) => results )
                .then( tags => {
                    let { noteTitle, noteText, priority } = newNotes[ 0 ];
                    noteModel.insertMany( [ { noteTitle, noteText, priority, tags: tags }],
                                          ( err, docs ) =>  done() );
        } );
    } );



    describe( "CRUD Test shouold", function () {

        it( "get welcome message, GET /api", function ( done ) {
            agent.get( "/api" )
                .expect( reponse => {
                    reponse.text.should.equal( "Welcome to notekeeper API" );
                } )
                .expect( 200, done );
        } );

        it( "create new note, POST /api/v1/notes", function ( done ) {
            const newNote = {
                noteTitle: "test123",
                noteText: "today's task is....",
                priority: "High",
                tags: [ { name: "work" }, { name: "daily" }]
            };

            agent.post( "/api/v1/notes" )
                .send( newNote )
                .expect( response => {
                    response.body.should.have.property( "priority" );
                    response.body.priority.should.equal( "High" );
                } )
                .expect( 201, done );
        } );

        it( "get all notes, GET /api/v1/notes", function ( done ) {

            agent.get( "/api/v1/notes" )
                .expect( response => {
                    expect(response.body).be.instanceof(Array);
                    response.body.length.should.above(0);
                    response.body[0].noteTitle.should.equal("test123");
                } )
                .expect( 200, done );
        } );

        it( "update note, PUT /api/v1/note/:id", function ( done ) {
            let id: string = "";

            agent.post( "/api/v1/notes" )
                .send(newNotes[0])
                .expect(response => id = response.body._id)
                .then(() => {
                    const updateObj = { noteTitle: "test005",
                                        noteText: "today's task is 25",
                                        priority: "Medium",
                                        tags: [{name: "work"}, {name: "travel"}
                                    ]};
                    // console.log(id);
                    agent.put( `/api/v1/note/${id}` )
                        .send(updateObj)
                        .expect("Content-Type", /json/)
                        .expect( response => {
                            response.body._id.should.equal(id);
                            response.body.priority.should.equal("Medium");
                            response.body.noteTitle.should.equal("test005");
                            response.body.tags[1].name.should.equal("travel");
                        } )
                        .expect( 200, done );
                });

        } );

        it( "delete note, DELETE /api/v1/note/:id", function ( done ) {
            let id: string = "";

            agent.post( "/api/v1/notes" )
                .send(newNotes[0])
                .expect(response => id = response.body._id)
                .then(() => {
                    // console.log(id);
                    agent.delete( `/api/v1/note/${id}` )
                         .expect( 202, done );
                });

        } );

        it( "find note by id, GET /api/v1/note/:id", function ( done ) {
            let id: string = "";

            agent.post( "/api/v1/notes" )
                .send(newNotes[0])
                .expect(response => id = response.body._id)
                .then(() => {
                     // console.log(id);
                     agent.get( `/api/v1/note/${id}` )
                          .expect( response => {

                              response.body._id.should.equal(id);
                              response.body.noteTitle.should.equal("test123");
                          } )
                          .expect( 200, done );
                });

        } );

    } );

});