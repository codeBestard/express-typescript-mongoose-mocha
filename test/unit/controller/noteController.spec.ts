import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import NoteController from "../../../src/controllers/note";
import { INoteService } from "../../../src/services/INoteService";
import { Note } from "../../../src/models/note";
import { newNotes } from "../../seed";



let mockNoteService: INoteService = {
    findAll (): Promise<Note[]> { return Promise.resolve(<Note[]>newNotes); },
    findById(id): Promise<Note> { return Promise.resolve(<Note>newNotes[0]); },
    save(obj): Promise<Note>    { return Promise.resolve(<Note>newNotes[0]); },
    update(obj): Promise<Note>  { return Promise.resolve(<Note>newNotes[0]); },
    delete(id): void            {  }
};


describe("Note controller", function() {

    it("Should get all notes", async function() {
        let res = { status (stat) { return this; },
                    json  (result) {
                        expect(result).to.be.instanceof(Array);
                        (<Note>result[0]).noteTitle.should.equal("test123");
                    }
        };

        let findAllSpy       = sinon.spy(mockNoteService, "findAll");
        const noteController = new NoteController(mockNoteService);

        await noteController.getNotes(<any>{}, <any>res, <any>{});

        findAllSpy.calledOnce.should.be.true;
        findAllSpy.restore();
    });

    it("Should return http status 500 when error occurs on getting all notes", async function() {
        let res = { status (stat) {
                        stat.should.be.equal(500);
                        return this; },
                    json () { }
        };

        let findAllStub      = sinon.stub(mockNoteService, "findAll")
                                    .throws("something failed");
        const noteController = new NoteController(mockNoteService);

        await noteController.getNotes(<any>{}, <any>res, <any>{});

        findAllStub.calledOnce.should.be.true;
        findAllStub.restore();
    });

    it("Should find a note", async function() {
        let req = { params: { id: "000ABC" }};
        let res = { status (stat) { return this; },
                    json  (result) {
                        (<Note>result).noteTitle.should.equal("test123");
                    }
        };

        let findByIdSpy      = sinon.spy(mockNoteService, "findById");
        const noteController = new NoteController(mockNoteService);

        await noteController.findNote(<any>req, <any>res, <any>{});

        findByIdSpy.calledOnce.should.be.true;
        findByIdSpy.firstCall.args[0].should.equal("000ABC");
        findByIdSpy.restore();
    });

    it("Should save a note", async function() {
        let req = { body: newNotes[0] };
        let res = { status (stat) { return this; },
                    json  (result) {
                        (<Note>result).noteTitle.should.equal("test123");
                    }
        };

        let saveSpy          = sinon.spy(mockNoteService, "save");
        const noteController = new NoteController(mockNoteService);

        await noteController.createNote(<any>req, <any>res, <any>{});

        saveSpy.calledOnce.should.be.true;
        saveSpy.firstCall.args[0].noteTitle.should.equal("test123");
        saveSpy.restore();
    });

    it("Should save a note", async function() {
        let req = { params: { id: "000ABC" } , body: newNotes[0] };
        let res = { status (stat) { return this; },
                    json  (result) {
                        (<Note>result).noteTitle.should.equal("test123");
                    }
        };

        let updateSpy        = sinon.spy(mockNoteService, "update");
        const noteController = new NoteController(mockNoteService);

        await noteController.updateNote(<any>req, <any>res, <any>{});

        updateSpy.calledOnce.should.be.true;
        updateSpy.firstCall.args[0].noteTitle.should.equal("test123");
        updateSpy.restore();
    });



    it("Should delete a note", async function() {
        let req = { params: { id: "000ABC" }};
        let res = { status (stat) { stat.should.be.equal(202);
                                     return this; },
                    json  (result) {},
                    end   () {}
        };

        let deleteSpy        = sinon.spy(mockNoteService, "delete");
        const noteController = new NoteController(mockNoteService);

        await noteController.deleteNote(<any>req, <any>res, <any>{});

        deleteSpy.calledOnce.should.be.true;
        deleteSpy.firstCall.args[0].should.equal("000ABC");
        deleteSpy.restore();
    });

});