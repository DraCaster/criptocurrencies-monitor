import request from 'supertest'
import app from '../../../../src/index'
import {createUser} from "../../../../src/modules/user/services/userService";
import {clearDatabase, closeDatabase, connect} from "../../../utils/mongo-handler";

describe("securityRoutes", () => {

    describe('/auth', () => {

        let userMock = {
            name: "Jane",
            lastname:"Doe",
            username: "janedoe",
            password: "JaneDoe123",
            preferredCurrency: "ARS"
        }

        beforeAll(async () => {
            await connect()
            await createUser(userMock.name, userMock.lastname, userMock.username, userMock.password, userMock.preferredCurrency)
        });

        afterAll(async  () => {
            await clearDatabase();
            await closeDatabase();
        })

        it("User auth OK", async () => {

            let userMockup = {username: "janedoe", password: "JaneDoe123"}

            const response = await request(app)
                .post("/auth")
                .send({
                    username: userMockup.username,
                    password: userMockup.password
                })
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("token")

        })

        it("Username o password invalid", async () => {

            let userMockup = {username: "janedoe", password: "iamlegend"}

            const response = await request(app)
                .post("/auth")
                .send({
                    username: userMockup.username,
                    password: userMockup.password
                })
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("message")

        })

    });

})