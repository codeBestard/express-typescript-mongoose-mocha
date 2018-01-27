
import "mocha";
import * as supertest from "supertest";
import * as chai from "chai";
chai.should();

process.env.NODE_ENV = "test";
process.env.PORT = "8080";
