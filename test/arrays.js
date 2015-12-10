import assert from "assert";
import chai from "chai";
chai.should();
const ts = require("../util/requireUnique")("../dist/src/ts");

describe("Arrays", () => {
    describe("ts.check()", () => {

        it("should not throw an error when parameter is array", () => {
            (() => {
                ts.check({Array: [1, 2]}, {Array: ["1", 2, 3]}, {Array: []});
            }).should.not.throw();
        });

        it("should throw an error String is not an Array", () => {
            (() => {
                ts.check({Array: "1, 2, 3", message: "error"});
            }).should.throw("error");
        });

        it("should throw an error when variable is not defined", () => {
            (() => {
                ts.check({Array: undefined});
            }).should.throw("Variable must be Array");
        });

        it("should not throw an error when parameters in array are of the correct type", () => {
            (() => {
                ts.check({TypedArray: [1, 2, 3], type: ts.types.Number});
            }).should.not.throw();
        });

        // todo: fix TypedArray
        it("should throw an error when parameters in array are not of the correct type", () => {
            (() => {
                ts.check({TypedArray: [1, "2", 3], type: ts.types.Number, message: "error"});
            }).should.throw("error");
        });

    });
});