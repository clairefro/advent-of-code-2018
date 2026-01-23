const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

// -------------------------

/** My first attempt to prevent stack overflow was recusion + trampolining... until I realized stack is optimal */

// function react(p, c = 0) {
//   if (c >= p.length - 1) return p;
//   if (isReactive(p[c], p[c + 1])) {
//     p.splice(c, 2);
//     const nxt = Math.max(0, c - 1);
//     return () => react(p, nxt);
//   }

//   return () => react(p, c + 1);
// }

// // lower/upper case letters a-Z have ascii distance 32
// function isReactive(a, b) {
//   return Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32;
// }

// function trampoline(fn) {
//   return function (...args) {
//     let res = fn(...args);

//     while (typeof res === "function") {
//       res = res();
//     }
//     return res;
//   };
// }

// function run() {
//   const p = raw.split("");
//   console.log(p.length);
//   const trampolinedReact = trampoline(react);
//   const final = trampolinedReact(p);
//   console.log(final.length);
// }

// run();

// ---------

// ========== PT 1 =============

// lower/upper case letters a-Z have ascii distance 32
function isReactive(a, b) {
  return Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32;
}

function react(str) {
  const p = str.split("");
  const stack = [];
  for (let i = 0; i < p.length; i++) {
    if (stack.length === 0 || !isReactive(stack[stack.length - 1], p[i])) {
      stack.push(p[i]);
    } else {
      stack.pop();
    }
  }

  return stack.length;
}

console.log("pt1");
console.log(react(raw));

// ========== PT 2 =============
const lengths = {};

// cycle through alphabet to get lengths of all possible polymer chains
for (let i = 0; i < 26; i++) {
  const base = 65; // "A"
  const cL = String.fromCharCode(base + i);
  const cU = String.fromCharCode(base + i + 32);
  const re = new RegExp(`[${cL}${cU}]`, "g");
  const l = react(raw.replace(re, ""));
  lengths[cL] = l;
}

console.log("pt2");

const ent = Object.entries(lengths);
console.log(ent.sort((a, b) => a[1] - b[1])[0]);
