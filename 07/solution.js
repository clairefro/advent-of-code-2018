const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

// -------------------------

const ins = raw.split("\n").map((s) => {
  const [_, a, b] = s.match(/.+?\b(\w)\b.+?\b(\w)\b/);
  return [a, b];
});

const steps = new Set();

for (let i = 0; i < ins.length; i++) {
  steps.add(ins[i][0]);
  steps.add(ins[i][1]);
}

function topoSort(nodes, edges) {
  const neighborMap = {};
  const indegreesMap = {};

  let queue = [];
  const result = [];

  for (const node of nodes) {
    neighborMap[node] = [];
    indegreesMap[node] = 0;
  }

  for (const [a, b] of edges) {
    neighborMap[a].push(b);
    indegreesMap[b] += 1;
  }

  for (const [n, degree] of Object.entries(indegreesMap)) {
    if (degree === 0) queue.push(n);
  }

  while (queue.length > 0) {
    // alphabetize queue
    queue.sort();

    const cur = queue.shift();
    result.push(cur);

    for (const neighbor of neighborMap[cur]) {
      indegreesMap[neighbor] -= 1;
      const nexts = [];
      if (indegreesMap[neighbor] === 0) {
        nexts.push(neighbor);
      }
      nexts.sort();
      // prepend queue with nexts
      queue = [...nexts, ...queue];
    }
  }

  return result;
}

console.log("pt1");
console.log(topoSort([...steps], ins).join(""));

// =====================
const stepReq = {};

for (const step of steps) {
  stepReq[step] = 60 + step.charCodeAt(0) - 64;
}

// const stepReq = Object.fromEntries(
//   [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((char, i) => [char, i + 1]),
// );
// console.log(stepReq);

function work(nodes, edges, maxWorkers) {
  const neighborsMap = {};
  const indegreesMap = {};
  let queue = [];

  let threads = [];
  let availableWorkers = maxWorkers;

  const result = [];
  let elapsed = 0;

  // init maps
  for (const node of nodes) {
    neighborsMap[node] = [];
    indegreesMap[node] = 0;
  }

  // populate maps
  for (const [a, b] of edges) {
    neighborsMap[a].push(b);
    indegreesMap[b] += 1;
  }

  // init queue
  for (const [node, degrees] of Object.entries(indegreesMap)) {
    if (degrees === 0) {
      queue.push(node);
    }
  }

  while (queue.length > 0 || threads.length > 0) {
    // cleanup jobs - skipped first pass
    const finished = threads.filter((t) => t.remaining === 0);
    threads = threads.filter((t) => t.remaining > 0);
    finished.sort((a, b) => a.node.localeCompare(b.node));

    for (const job of finished) {
      availableWorkers += 1;
      result.push(job.node);

      for (const neighbor of neighborsMap[job.node]) {
        indegreesMap[neighbor] -= 1;
        if (indegreesMap[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }

    queue.sort();
    while (availableWorkers > 0 && queue.length > 0) {
      const node = queue.shift();
      threads.push({ node, remaining: stepReq[node] });
      availableWorkers -= 1;
    }

    // tick
    if (threads.length > 0) {
      elapsed += 1;
      for (const t of threads) {
        t.remaining -= 1;
      }
    }
  }
  return {
    elapsed,
    result: result.join(""),
  };
}

console.log("pt2");
console.log(work(steps, ins, 5));
