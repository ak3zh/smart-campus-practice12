import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateBooking } from '../src/domain/availability';
import { SAMPLE_ROOMS as rooms } from '../src/data/rooms';
import { SAMPLE_BOOKINGS as bookings } from '../src/data/bookings';

const NOW = 8 * 60; // fixed simulated current time 08:00
const hm = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
const room = (id: string) => rooms.find((r) => r.id === id)!;
const check = (id: string, start: string, dur: number) =>
  evaluateBooking(room(id), hm(start), hm(start) + dur, NOW, bookings);

test('T1 valid free interval -> available', () => {
  assert.equal(check('r1', '10:30', 60).status, 'available');
});
test('T2 overlap -> unavailable', () => {
  const d = check('r1', '09:30', 60);
  assert.equal(d.status, 'unavailable');
  assert.match(JSON.stringify(d), /overlaps/);
});
test('T3 blocked room -> unavailable', () => {
  const d = check('r3', '10:30', 60);
  assert.equal(d.status, 'unavailable');
  assert.match(JSON.stringify(d), /blocked/);
});
test('T4 duration 0 -> validation error', () => {
  const d = check('r1', '10:30', 0);
  assert.equal(d.status, 'unavailable');
  assert.match(JSON.stringify(d), /later than the start/);
});
test('T5 duration 121 -> validation error', () => {
  const d = check('r1', '13:30', 121);
  assert.equal(d.status, 'unavailable');
  assert.match(JSON.stringify(d), /120-minute maximum/);
});
test('T6 past start -> validation error', () => {
  const d = check('r1', '07:30', 60);
  assert.equal(d.status, 'unavailable');
  assert.match(JSON.stringify(d), /after the current time/);
});
test('T7 adjacent non-overlapping -> available', () => {
  assert.equal(check('r1', '10:00', 60).status, 'available');
});
test('T8 bookings unchanged after checks', () => {
  const before = JSON.stringify(bookings);
  check('r1', '10:30', 60); check('r1', '09:30', 60); check('r3', '10:30', 60);
  assert.equal(JSON.stringify(bookings), before);
  assert.equal(bookings.length, 5);
});
