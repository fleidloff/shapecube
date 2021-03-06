import assert from "assert";
import chai from "chai";
chai.should();
const shapecube = require("../util/requireUnique")("../dist/shapecube");

describe("Custom Type", () => {
    describe("shapecube.check()", () => {

        var newType = shapecube.createType("newType", {a: shapecube.types.Number, b: shapecube.types.Number}, "newType consists of only numbers");

        it("should throw an error when custom type is not matched", () => {
            (() => {
                const a = {a: 1, b: "2"};
                shapecube.check({newType: a});
            }).should.throw("newType consists of only numbers");
        });

        it("should not throw an error when custom type is matched", () => {
            (() => {
                const a = {a: 1, b: 2};
                shapecube.check({newType: a});
            }).should.not.throw();
        });

        it("should not throw an error when custom type is defined with strings", () => {
            shapecube.createType("stringType", {a: "Number", b: "Number"});
            (() => {
                const a = {a: 1, b: 2};
                shapecube.check({stringType: a});
            }).should.not.throw();
        });

        it("should throw an error when custom type is named message", () => {
            (() => {
                shapecube.createType("message", {a: shapecube.types.Number, b: shapecube.types.Number}, "message is reserved");
                const a = {a: 1, b: 2};
                shapecube.check({newType: a});
            }).should.throw(`type "message" cannot be created because the name is reserved.`);
        });

        it("should not throw an error when custom type is named type", () => {
            (() => {
                shapecube.createType("type", {a: shapecube.types.Number, b: shapecube.types.Number}, "type is reserved");
                const a = {a: 1, b: 2};
                shapecube.check({newType: a});
            }).should.not.throw();
        });


        it("should throw an error when custom type consists of unknown types while creating the type", () => {
            (() => {
                shapecube.createType("unknown", {a: "foo"});
            }).should.throw("type is unknown");
        });

        it("should not throw an error when custom type is complex", () => {
            (() => {
                var newType = shapecube.createType("complex", {a: {b: "Number", c: "Number"}});
                shapecube.check({complex: {
                    a: {
                        b: 1,
                        c: 1
                    }
                }});
            }).should.not.throw();
        });

        it("should throw an error when custom type is complex and check is invalid", () => {
            (() => {
                var newType = shapecube.createType("complexInvalid", {a: {b: "Number", c: "Number"}}, "complex invalid");
                shapecube.check({complexInvalid: {
                    a: {
                        b: 1,
                        c: "1"
                    }
                }});
            }).should.throw("complex invalid");
        });

    });
});
