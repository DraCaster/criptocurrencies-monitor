import jwt from "jsonwebtoken";

describe("jwtUtils", () => {

    test("Generate JWT OK",  () => {

        let userID = "6146c14294ee369529133d68"
        let username = "JaneDoe"

        const payload = { userID, username };

        const options = {
            expiresIn: "1d",
            jwtid: userID,
            algorithm: "HS256"
        };

        const secretWord = "shhhh"

        let token = jwt.sign(payload,secretWord , options)
        expect(typeof token)
            .toBe("string")

    })


})