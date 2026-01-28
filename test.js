// function buildTrie(words) {
//   const trie = {};
//   for (const w of words) {
//     let node = trie;
//     for (const ch of w) {
//       if (!node[ch]) node[ch] = {};
//       node = node[ch];
//     }
//     node.word = w; // mark end of valid word
//   }

//   return trie;
// }

// const ws = ["apple", "ate", "ape", "aabc"];

// console.log(JSON.stringify(buildTrie(ws), null, 2));

function getBitLength(n) {
  if (n === 0) return 1;

  return Math.floor(Math.log2(Math.abs(n))) + 1;
}

console.log(getBitLength(10 ** 9));
