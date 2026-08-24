import test from "node:test";
import assert from "node:assert/strict";

test("incident-triage product contract recognizes lead-only assignment", () => {
  const canAssign = (role, status) => role === "Lead" && status !== "Closed";
  assert.equal(canAssign("Lead", "Investigating"), true);
  assert.equal(canAssign("Analyst", "Investigating"), false);
  assert.equal(canAssign("Lead", "Closed"), false);
});
