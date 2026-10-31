import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler } from "../lib/contact-handler.ts";

const valid = { name: "Test Visitor", email: "visitor@example.com", inquiry: "Project inquiry", message: "I would like to discuss a software engineering project.", website: "", submissionId: "test-submission-123456" };
const config = { apiKey: "test-key", from: "Portfolio <sender@example.com>", to: "owner@example.com" };
function request(body = valid, headers = {}) { return new Request("http://localhost:3000/api/contact", { method: "POST", headers: { "Content-Type": "application/json", Origin: "http://localhost:3000", ...headers }, body: JSON.stringify(body) }); }
const neverSend = async () => { throw new Error("Unexpected email attempt"); };

test("valid inquiry goes only to the owner with visitor reply-to and idempotency", async () => {
  let sent;
  const handler = createContactHandler({ settings: () => config, send: async (url, options) => { sent = { url, ...options }; return Response.json({ id: "mock-email-id" }); } });
  const response = await handler(request({ ...valid, to: "attacker@example.com", from: "attacker@example.com" }));
  assert.equal(response.status, 200);
  const payload = JSON.parse(sent.body);
  assert.deepEqual(payload.to, [config.to]); assert.equal(payload.reply_to, valid.email); assert.equal(payload.from, config.from);
  assert.equal(payload.subject, "Portfolio inquiry: Project inquiry"); assert.ok(payload.text.includes(valid.message));
  assert.match(sent.headers["Idempotency-Key"], /^contact-test-submission/);
  assert.ok(!(await response.text()).includes(config.apiKey));
});

test("invalid fields are rejected without sending", async () => {
  const handler = createContactHandler({ settings: () => config, send: neverSend });
  const response = await handler(request({ ...valid, name: "A\r\nB", email: "broken", inquiry: "unknown", message: "short" }));
  assert.equal(response.status, 400); assert.deepEqual(Object.keys((await response.json()).errors).sort(), ["email", "inquiry", "message", "name"]);
});

test("origin, malformed JSON and large messages are rejected", async () => {
  const handler = createContactHandler({ settings: () => config, send: neverSend });
  assert.equal((await handler(request(valid, { Origin: "https://elsewhere.example" }))).status, 403);
  assert.equal((await handler(new Request("http://localhost:3000/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" }))).status, 400);
  assert.equal((await handler(request({ ...valid, message: "x".repeat(17_000) }))).status, 413);
});

test("missing credentials fail honestly", async () => {
  const handler = createContactHandler({ settings: () => ({ to: config.to }), send: neverSend });
  assert.equal((await handler(request())).status, 503);
});

test("visitor-facing host works when Next normalizes the internal hostname", async () => {
  const handler = createContactHandler({ settings: () => ({ to: config.to }), send: neverSend });
  const response = await handler(request(valid, { Host: "127.0.0.1:3000", Origin: "http://127.0.0.1:3000" }));
  assert.equal(response.status, 503); // configuration failure, not an incorrect origin rejection
});

test("provider rejection and network errors never report success", async () => {
  const rejection = createContactHandler({ settings: () => config, send: async () => Response.json({ message: "Provider error" }, { status: 403 }) });
  const offline = createContactHandler({ settings: () => config, send: async () => { throw new Error("Offline"); } });
  assert.equal((await rejection(request())).status, 502); assert.equal((await offline(request())).status, 502);
});

test("honeypot avoids delivery and repeated requests are limited", async () => {
  const trap = createContactHandler({ settings: () => config, send: neverSend });
  assert.equal((await trap(request({ ...valid, website: "https://spam.example" }))).status, 200);
  const handler = createContactHandler({ settings: () => config, send: async () => Response.json({ id: "mock" }) });
  for (let i = 0; i < 5; i++) assert.equal((await handler(request())).status, 200);
  assert.equal((await handler(request())).status, 429);
});
