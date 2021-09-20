import request from 'supertest'
import app from '../../../../src/index'

describe('userRoutes',  ()  => {

    describe('/users',  () =>  {

        it("Create an user OK", async () => {

            let newUserMock = {
                name: "John",
                lastname:"Doe",
                username: "johndoe",
                password: "johndoe123",
                preferredCurrency: "USD"
            }

            const response = await request(app)
                .post("/users")
                .send(newUserMock)
            expect(response.status).toBe(201)
            expect(response.type).toEqual("application/json")
        })

        it("Required parameters are missing", async () => {

            const response = await request(app)
                .post("/users")
                .send({name: "Jhon"})

            expect(response.status).toBe(400)
            expect(response.body).not.toBeNull()
            expect(response.body).toHaveProperty("message")
            expect(response.body).toEqual({"message": "Missing required parameters!"})

        })


    });

});