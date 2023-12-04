import { expect, test } from "vitest";
import { add } from "./add";

test("add adds two numbers", () => {
  expect(add(1, 2)).toBe(3);
});
