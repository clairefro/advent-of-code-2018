const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

// -------------------------

// 2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
// A----------------------------------
//     B----------- C-----------
//                      D-----

const nums = raw.split(/\s+/).map(Number);

// 1. read header
// 2. read children (read())
//

class Node {
  children = [];
  meta = [];

  constructor() {
    this.children = [];
    this.meta = [];
  }
}
function parse(nums) {
  const numChildren = nums.shift();
  const numMeta = nums.shift();

  const node = new Node();

  for (let i = 0; i < numChildren; i++) {
    node.children.push(parse(nums));
  }

  for (let i = 0; i < numMeta; i++) {
    node.meta.push(nums.shift());
  }
  return node;
}

const n = parse(nums);

function totalMetadataSum(node) {
  const currentNodeSum = node.meta.reduce((a, b) => a + b, 0);

  const childrenSum = node.children.reduce((a, child) => {
    return a + totalMetadataSum(child);
  }, 0);

  return currentNodeSum + childrenSum;
}

console.log("PT 1");
console.log(totalMetadataSum(n));
