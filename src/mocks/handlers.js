import { rest } from "msw";
import { nanoid } from "nanoid";

let books = [
  {
    id: nanoid(),
    title: "The Origin of Species",
  },
  {
    id: nanoid(),
    title: "The Holy Bible",
  },
];

export const handlers = [
  rest.get("/books", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(books));
  }),
  rest.get("/books/:id", (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.json(books.find((b) => b.id === id)));
  }),
];
