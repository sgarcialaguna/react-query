import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { TestApp } from "./App";
import { QueryClient } from "@tanstack/query-core";

test("list one", async () => {
  render(<TestApp testQueryClient={new QueryClient()} />);
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/));
  screen.debug();
});

test("list two", async () => {
  render(<TestApp testQueryClient={new QueryClient()} />);
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/));
  screen.debug();
});
