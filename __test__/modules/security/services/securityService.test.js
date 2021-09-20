import {connect, clearDatabase,closeDatabase} from "../../../utils/mongo-handler"
import {authUser} from "../../../../src/modules/security/services/securityService"
import {createUser} from "../../../../src/modules/user/services/userService";

describe("securityService", () => {

    let dataMock = {
        name: "Jane",
        lastname:"Doe",
        username: "root",
        password: "JaneDoe123",
        preferredCurrency: "ARS"
    }

    beforeAll(async () => {
        await connect()
        await createUser(dataMock.name, dataMock.lastname, dataMock.username, dataMock.password, dataMock.preferredCurrency)
    },2000);

    afterAll(async  () => {
        await clearDatabase();
        await closeDatabase();
    },2000)

    test("Login OK", async () => {

        let user = {username: "root", password: "JaneDoe123"}
        await expect(authUser(user.username, user.password))
            .resolves.toHaveProperty('token')
    }, 2000)


    test("LoginFail", async () => {
        let user = {username: "root", password: "JaneDoe122"}
        await expect(authUser(user.username, user.password))
            .rejects.toMatch("Bad credentials")

    },2000)

    test("LoginUserDoesntExist", async () => {
        let user = {username: "iamlegend", password: "iamlegend321"}

        await expect(authUser(user.username, user.password))
            .rejects.toMatch("Bad credentials")

    },2000)

})

