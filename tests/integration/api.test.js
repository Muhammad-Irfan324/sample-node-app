const request = require("supertest");
const app = require("../../src/app");

describe("Items CRUD flow", () => {
  let createdId;

  it("creates an item", async () => {
    const res = await request(app)
      .post("/api/items")
      .send({ name: "Integration Item" });
    expect(res.status).toBe(201);
    createdId = res.body.id;
  });

  it("reads the created item", async () => {
    const res = await request(app).get(`/api/items/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Integration Item");
  });

  it("updates the item", async () => {
    const res = await request(app)
      .put(`/api/items/${createdId}`)
      .send({ name: "Updated Item" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated Item");
  });

  it("lists items including the updated one", async () => {
    const res = await request(app).get("/api/items");
    expect(res.status).toBe(200);
    const found = res.body.find((i) => i.id === createdId);
    expect(found.name).toBe("Updated Item");
  });

  it("deletes the item", async () => {
    const res = await request(app).delete(`/api/items/${createdId}`);
    expect(res.status).toBe(204);
  });

  it("confirms the item is gone", async () => {
    const res = await request(app).get(`/api/items/${createdId}`);
    expect(res.status).toBe(404);
  });
});
