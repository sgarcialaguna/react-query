import { rest } from "msw";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";

let users = [...Array(2)].map(() => ({
  id: nanoid(),
  fullName: faker.person.fullName(),
  email: faker.internet.exampleEmail(),
  company: faker.company.name(),
}));

export const handlers = [
  rest.get("/users", (req, res, ctx) => {
    return res(ctx.delay(200), ctx.json(users));
  }),
  rest.put("/users", async (req, res, ctx) => {
    const newUser = { id: nanoid(), ...(await req.json()) };
    users.push(newUser);
    return res(ctx.delay(200), ctx.json(newUser));
  }),
  rest.get("/users/:id", (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.delay(500), ctx.json(users.find((b) => b.id === id)));
  }),
  rest.post("/users/:id", async (req, res, ctx) => {
    const newUser = await req.json();
    users = users.map((user) => (user.id === newUser.id ? newUser : user));
    return res(ctx.delay(500), ctx.json(newUser));
  }),
];
