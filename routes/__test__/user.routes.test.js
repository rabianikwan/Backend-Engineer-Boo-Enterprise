const app = require("../../app");
const supertest = require("supertest");
const User = require("../../models/user.model");


test("GET USERS /v1/users", async () => {
    let id= 1;
    let name= 'A Martinez';
    let description = 'Adolph Larrue Martinez III.';
    let mbti = 'ISFJ';
    let enneagram = '9w3';
    let variant = 'sp/so';
    let tritype = 725;
    let socionics = 'SEE';
    let sloan = 'RCOEN';
    let psyche = 'FEVL';
    let image = 'https://soulverse.boo.world/images/1.png';
    const postUser = new User({
        id: id,
        name: name,
        description: description,
        mbti: mbti,
        enneagram: enneagram,
        variant: variant,
        tritype: tritype,
        socionics: socionics,
        sloan: sloan,
        psyche: psyche,
        image: image
    })
    postUser.save();
    await supertest(app).get("/v1/users")
        .expect(200)
        .then((response) => {
            expect(response.body).toMatchObject({"message": "success get users"})
            expect(response.body).toHaveProperty("data")
            expect(response.body.data[0]).toMatchObject({
                id: id,
                name: name,
                description: description,
                mbti: mbti,
                enneagram: enneagram,
                variant: variant,
                tritype: tritype,
                socionics: socionics,
                sloan: sloan,
                psyche: psyche,
                image: image
            })
        })
});

test("CREATE USER /v1/users", async () => {
    let name = 'Albert Einsten';
    let description = 'Albert Einstein';
    let mbti = 'INTJ';
    let enneagram = '5w4';
    let variant = 'sp/so';
    let tritype = 725;
    let socionics = 'SEE';
    let sloan = 'RCOEN';
    let psyche = 'FEVL';
    // send json to v1/users
    await supertest(app).post("/v1/users")
        .send({
            name: name,
            description: description,
            mbti: mbti,
            enneagram: enneagram,
            variant: variant,
            tritype: tritype,
            socionics: socionics,
            sloan: sloan,
            psyche: psyche
        })
        .expect(201)
        .then((response) => {
            expect(response.body).toMatchObject({"message": "success create user"});
            expect(response.body).toHaveProperty("data");
            expect(response.body.data).toMatchObject({
                name: name,
                description: description,
                mbti: mbti,
                enneagram: enneagram,
                variant: variant,
                tritype: tritype,
                socionics: socionics,
                sloan: sloan,
                psyche: psyche
            })
        })
})


test("INCOMPLETE BODY /v1/users", async () => {
    let description = 'Adolph Larrue Martinez III.';
    let mbti = 'ISFJ';
    let enneagram = '9w3';
    let variant = 'sp/so';
    let tritype = 725;
    let socionics = 'SEE';
    let sloan = 'RCOEN';
    let psyche = 'FEVL';
    // send json to v1/users
    await supertest(app).post("/v1/users")
        .send({
            description: description,
            mbti: mbti,
            enneagram: enneagram,
            variant: variant,
            tritype: tritype,
            socionics: socionics,
            sloan: sloan,
            psyche: psyche
        })
        .expect(400)
        .then((response) => {
            expect(response.body).toMatchObject({"error": "bad request: item(s) is missing"});
            expect(response.body).toMatchObject( {"status": "BAD_REQUEST"});
        })
})

test("PROFIL GET RENDER /:id", async () => {
    await supertest(app).get("/1")
        .expect("Content-type",/html/)
        .expect(200)
        .then((response) => {
            expect(response.text).toContain("Adolph Larrue Martinez III.")
            expect(response.text).toContain("ISFJ")
            expect(response.text).toContain("9w3")
            expect(response.text).toContain("sp/so")
            expect(response.text).toContain("725")
            expect(response.text).toContain("SEE")
            expect(response.text).toContain("RCOEN")
            expect(response.text).toContain("FEVL")
            expect(response.text).toContain("https://soulverse.boo.world/images/1.png")

        })
})
test("PROFIL NOT RENDER /:id", async () => {
    await supertest(app).get("/4")
        .expect("Content-type",/html/)
        .expect(404)
        .then((response) => {
            expect(response.text).toContain("user not found")
        })
})