const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

// -------------------------

const coords = raw
  .split("\n")
  .map((i) => i.replace(/\s+/, "").split(",").map(Number));

function manDist([xa, ya], [xb, yb]) {
  return Math.abs(xb - xa) + Math.abs(yb - ya);
}

// get bounds via linear scan
let lx = Infinity;
let ly = Infinity;
let hx = -Infinity;
let hy = -Infinity;

for (let i = 0; i < coords.length; i++) {
  const x = coords[i][0];
  const y = coords[i][1];
  if (x < lx) lx = x;
  if (x > hx) hx = x;
  if (y < ly) ly = y;
  if (y > hy) hy = y;
}

const dx = hx - lx;
const dy = hy - ly;

const areaCnts = Array(coords.length).fill(0);
const coordsToIgnore = new Set(); // inifinte bounds

for (let y = ly; y <= ly + dy; y++) {
  for (let x = lx; x <= lx + dx; x++) {
    let minDist = Infinity;
    let tieDist;
    let minDistCoordIndex;
    for (let c = 0; c < coords.length; c++) {
      const dist = manDist([x, y], coords[c]);
      if (dist === minDist) tieDist = dist;

      if (dist < minDist) {
        minDist = dist;
        minDistCoordIndex = c;
        tieDist = undefined; // new minDist in town; no ties yet
      }
    }
    // only count this point as 'belonging' to an input coord if minimum dist has no tie
    if (minDist !== tieDist) {
      // and ignore any input coord with a closest member on bounding box (=infinite area) to ignore list
      if (x === lx || x === hx || y === ly || y === hy) {
        coordsToIgnore.add(minDistCoordIndex);
      }
      areaCnts[minDistCoordIndex] += 1;
    }
  }
}

let largestValid = { area: -Infinity, coordIndex: -1 };

areaCnts.forEach((c, i) => {
  if (!coordsToIgnore.has(i) && largestValid.area < c) {
    largestValid = { area: c, coordIndex: i };
  }
});

const coord = coords[largestValid.coordIndex];
console.log("pt1");
console.log({ ...largestValid, coord });

// ==============

let count = 0;
for (let y = ly; y <= ly + dy; y++) {
  for (let x = lx; x <= lx + dx; x++) {
    let sumDist = 0;
    for (let c = 0; c < coords.length; c++) {
      sumDist += manDist([x, y], coords[c]);
    }
    if (sumDist < 10_000) {
      count += 1;
    }
  }
}

console.log("pt2");
console.log(count);
