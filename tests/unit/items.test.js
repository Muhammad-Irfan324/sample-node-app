const request = require("supertest");
const app = require("../../src/app");

describe("Items API", () => {
  describe("GET /api/items", () => {
    it("returns an empty array initially", async () => {
      const res = await request(app).get("/api/items");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("POST /api/items", () => {
    it("creates an item", async () => {
      const res = await request(app)
        .post("/api/items")
        .send({ name: "Test Item" });
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Test Item");
      expect(res.body).toHaveProperty("id");
    });

    it("returns 400 when name is missing", async () => {
      const res = await request(app)
        .post("/api/items")
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("name is required");
    });
  });

  describe("GET /api/items/:id", () => {
    it("returns 404 for non-existent item", async () => {
      const res = await request(app).get("/api/items/9999");
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/items/:id", () => {
    it("returns 404 for non-existent item", async () => {
      const res = await request(app)
        .put("/api/items/9999")
        .send({ name: "Updated" });
      expect(res.status).toBe(404);
    });

    it("returns 400 when name is missing", async () => {
      const created = await request(app)
        .post("/api/items")
        .send({ name: "Temp" });
      const res = await request(app)
        .put(`/api/items/${created.body.id}`)
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("name is required");
    });
  });

  describe("DELETE /api/items/:id", () => {
    it("returns 404 for non-existent item", async () => {
      const res = await request(app).delete("/api/items/9999");
      expect(res.status).toBe(404);
    });
  });
});
