// import app from "../app";
// import request from "supertest";

// describe("test authControllers", () => {
//   test("test loginController", async () => {
//     const testUser = {
//       email: "annatest@mail.com",
//       password: "12345",
//     };
//     const res = await request(app).post("/api/users/login").send(testUser);
//     expect(res.statusCode).toBe(200);
//     expect(res.body.token).toBeTruthy();
//     expect(res.body.user).toBeTruthy();
//     expect(res.body.user.email).toBeTruthy();
//     expect(res.body.user.subscription).toBeTruthy();
//     expect(typeof res.body.user.email).toBe("string");
//     expect(typeof res.body.user.subscription).toBe("string");
//   });
// });
