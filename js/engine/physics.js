import { state } from '../state.js';

export function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function pointInRect(x, y, r) {
  return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
}

export function isWalkable(x, y) {
  const room = state.room;
  let inPoly = room.walkablePolygon && pointInPolygon(x, y, room.walkablePolygon);
  if (inPoly && room.walkableHoles) {
    for (const hole of room.walkableHoles) {
      if (pointInPolygon(x, y, hole)) { inPoly = false; break; }
    }
  }
  if (inPoly) return true;
  if (room.walkableAreas) {
    for (const r of room.walkableAreas) {
      if (pointInRect(x, y, r)) return true;
    }
  }
  return false;
}

export function dist(ax, ay, bx, by) { return Math.hypot(ax - bx, ay - by); }
