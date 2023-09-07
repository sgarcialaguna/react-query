import { rest } from "msw";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";

let users = [...Array(2)].map(() => ({
  id: nanoid(),
  fullName: faker.person.fullName(),
  email: faker.internet.exampleEmail(),
  company: faker.company.name(),
}));
// let people = [
//   {
//     id: faker.string.nanoid(),
//     fullName: faker.person.name(),
//     company: faker.company.name(),
//   },
//   {
//     id: nanoid(),
//     title: "King James Bible",
//     author: "Various",
//     published: "1769",
//   },
// ];

export const handlers = [
  rest.get("/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
  rest.get("/users/:id", (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.json(users.find((b) => b.id === id)));
  }),
];
