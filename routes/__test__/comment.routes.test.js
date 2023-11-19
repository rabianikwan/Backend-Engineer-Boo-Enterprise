const app = require("../../app");
const supertest = require("supertest");
const Comment = require("../../models/comment.model");
const Post = require("../../models/post.model");
const { CommentCreate, Pollings } = require("../../models/entity/comment.entity");

test("CREATE COMMENT FAIL NO CREDENTIALS v1/comments", async () => {
    const comment = new CommentCreate("title", "description", new Pollings("INTJ", "Virgo", ""), "post_id", "author_id")
    await supertest(app)
        .post("/v1/comments")
        .send(comment)
        .expect(400)
})

test("CREATE COMMENT v1/comments", async () => {
    const comment = new CommentCreate("title", "description", new Pollings("", "", ""))
    await supertest(app)

        .post("/v1/comments")
        .set("Cookie", ['profile=12345667', 'post=123'])
        .send(comment)
        .expect(201)
        .then((response) => {
            expect(response.body).toMatchObject({"message": "success create comment"});
            expect(response.body).toHaveProperty("data");
            expect(response.body.data).toMatchObject({
                title: "title",
                description: "description",
                post_id: "123",
                author_id: "12345667"
            })
        })
})

test("CREATE MBTI POLLINGS v1/comments", async () => {
    const comment = new CommentCreate("title", "description", new Pollings("INTJ", "", ""))
    await supertest(app)

        .post("/v1/comments")
        .set("Cookie", ['profile=12345667', 'post=123'])
        .send(comment)
        .expect(201)
        .then((response) => {
            expect(response.body).toMatchObject({"message": "success create comment"});
            expect(response.body).toHaveProperty("data");
            expect(response.body.data).toMatchObject({
                title: "title",
                description: "description",
                post_id: "123",
                author_id: "12345667",
                pollings: {
                    "mbti": "INTJ",
                    "zodiac": "",
                    "enneagram": ""
                }
            })
        })
})
test("RECENT COMMENT v1/comments", async () => {
    await supertest(app)
        .get("/v1/comments")
        .expect(200)
        .then((response) => {
            expect(response.body).toMatchObject({"message": "success get comments"});
            expect(response.body).toHaveProperty("data");
            expect(Date.parse(response.body.data[0].created_at)).toBeGreaterThan(Date.parse(response.body.data[1].created_at))
        })
})

test("CREATE ZODIAC POLLINGS v1/comments", async () => {
    const comment = new CommentCreate("title", "description", new Pollings("INTJ", "Cancer", ""))
    await supertest(app)

        .post("/v1/comments")
        .set("Cookie", ['profile=12345667', 'post=123'])
        .send(comment)
        .expect(201)
        .then((response) => {
            expect(response.body).toMatchObject({"message": "success create comment"});
            expect(response.body).toHaveProperty("data");
            expect(response.body.data).toMatchObject({
                title: "title",
                description: "description",
                post_id: "123",
                author_id: "12345667",
                pollings: {
                    "mbti": "INTJ",
                    "zodiac": "Cancer",
                    "enneagram": ""
                }
            })
        })
})
test("RECENT COMMENT v1/comments", async () => {
    await supertest(app)
        .get("/v1/comments")
        .expect(200)
        .then((response) => {
            expect(response.body).toMatchObject({"message": "success get comments"});
            expect(response.body).toHaveProperty("data");
            expect(Date.parse(response.body.data[0].created_at)).toBeGreaterThan(Date.parse(response.body.data[1].created_at))
        })
})

test("CREATE ZODIAC POLLINGS v1/comments", async () => {
    const comment = new CommentCreate("title", "description", new Pollings("INTJ", "Cancer", "5w4"))
    await supertest(app)

        .post("/v1/comments")
        .set("Cookie", ['profile=12345667', 'post=123'])
        .send(comment)
        .expect(201)
        .then((response) => {
            expect(response.body).toMatchObject({"message": "success create comment"});
            expect(response.body).toHaveProperty("data");
            expect(response.body.data).toMatchObject({
                title: "title",
                description: "description",
                post_id: "123",
                author_id: "12345667",
                pollings: {
                    "mbti": "INTJ",
                    "zodiac": "Cancer",
                    "enneagram": "5w4"
                }
            })
        })
})

test("WRONG POLLING MBTI v1/comments", async () => {
    const comment = new CommentCreate("title", "description", new Pollings("ABC", "", ""))
    await supertest(app)

        .post("/v1/comments")
        .set("Cookie", ['profile=12345667', 'post=123'])
        .send(comment)
        .expect(400)
        .then((response) => {
            expect(response.body).toMatchObject({"error": "bad request: invalid mbti"});
            expect(response.body).toMatchObject( {"status": "BAD_REQUEST"});
        })
})

test("WRONG POLLING Zodiac v1/comments", async () => {
    const comment = new CommentCreate("title", "description", new Pollings("INTP", "CAD", ""))
    await supertest(app)

        .post("/v1/comments")
        .set("Cookie", ['profile=12345667', 'post=123'])
        .send(comment)
        // expect Error: mbti is not in the list
        .expect(400)
        .then((response) => {
            expect(response.body).toMatchObject({"error": "bad request: invalid zodiac"});
            expect(response.body).toMatchObject( {"status": "BAD_REQUEST"});
        })
})

test("WRONG POLLING ENNEAGRAM v1/comments", async () => {
    const comment = new CommentCreate("title", "description", new Pollings("INTP", "Virgo", "5w"))
    await supertest(app)
        .post("/v1/comments")
        .set("Cookie", ['profile=12345667', 'post=123'])
        .send(comment)
        // expect Error: mbti is not in the list
        .expect(400)
        .then((response) => {
            expect(response.body).toMatchObject({"error": "bad request: invalid enneagram"});
            expect(response.body).toMatchObject( {"status": "BAD_REQUEST"});
        })
})

test("RECENT COMMENT v1/comments", async () => {
    await supertest(app)
        .get("/v1/comments")
        .expect(200)
        .then((response) => {
            expect(response.body).toMatchObject({"message": "success get comments"});
            expect(response.body).toHaveProperty("data");
            expect(Date.parse(response.body.data[0].created_at)).toBeGreaterThan(Date.parse(response.body.data[1].created_at))
        })
})

test("MOST LIKED COMMENT v1/comments/bests", async () => {
    await supertest(app)
        .get("/v1/comments?sort=likes")
        .expect(200)
        .then((response) => {
            expect(response.body).toMatchObject({"message": "success get comments"});
            expect(response.body).toHaveProperty("data");
            expect(response.body.data[0].likes).toBeGreaterThan(response.body.data[1].likes)
        })
})
