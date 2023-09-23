import { rest } from "msw";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker/locale/en";

let users = [...Array(2)].map((_, index) => ({
  id: index + 1,
  fullName: faker.person.fullName(),
  email: faker.internet.exampleEmail(),
  company: faker.company.name(),
}));

const INFINITE_USERS_LENGTH = 50;
let infiniteUsers = [];

export const handlers = [
  rest.get("/users", (req, res, ctx) => {
    return res(ctx.delay(200), ctx.json(users));
  }),
  rest.get("/infinite_users", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page")) || 1;
    if (infiniteUsers.length < page * 10 && page * 10 < INFINITE_USERS_LENGTH) {
      infiniteUsers = [
        ...infiniteUsers,
        ...[...Array(10)].map(() => ({
          id: nanoid(),
          fullName: faker.person.fullName(),
          email: faker.internet.exampleEmail(),
          company: faker.company.name(),
        })),
      ];
    }
    return res(
      ctx.delay(200),
      ctx.json({
        count: INFINITE_USERS_LENGTH,
        next:
          page * 10 < INFINITE_USERS_LENGTH
            ? `/infinite_users?page=${page + 1}`
            : null,
        previous: page > 1 ? `/infinite_users?page=${page - 1}` : null,
        results: infiniteUsers.slice((page - 1) * 10, page * 10),
      })
    );
  }),
  rest.delete("/delete_first_user", (req, res, ctx) => {
    infiniteUsers = infiniteUsers.slice(1);
    return res(ctx.delay(200), ctx.status(204));
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
