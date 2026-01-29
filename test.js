const assert = require("node:assert");

const testCases = [
  //   {
  //     args: { s: "PAYPALISHIRING", numRows: 3 },
  //     expected: "PAHNAPLSIIGYIR",
  //   },
  {
    args: { s: "PAYPALISHIRING", numRows: 4 },
    expected: "PINALSIGYAHRPI",
  },
  //   {
  //     args: { s: "AB", numRows: 1 },
  //     expected: "AB",
  //   },
  //   {
  //     args: { s: "A", numRows: 1 },
  //     expected: "A",
  //   },
];

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (s.length <= numRows || numRows === 1) return s;
  let charCnt = 0;
  let i = 0;
  let zigging = false;
  let zigOffset = 0;
  if (numRows > 2) {
    zigOffset = numRows - 2;
  }
  const parts = [];

  while (charCnt < s.length) {
    const offset = zigging ? zigOffset : numRows;
    const sub = s.slice(i, i + offset);
    if (zigging && zigOffset > 0) {
      for (let i = 0; i < zigOffset; i++) {
        console.log({ i, zigOffset });
        let p = "%" + "%".repeat(zigOffset - i - 1) + sub[i] + "%";
        parts.push(p);
      }
    } else {
      parts.push(sub);
    }
    charCnt += sub.length;
    zigging = !zigging;
    i += offset;
  }

  console.log({ parts });

  let final = "";
  // construct
  let index = 0;
  while (index < numRows) {
    for (let l = 0; l < parts.length; l++) {
      final += parts[l][index];
    }
    index++;
  }

  return final.replace(/%/g, "");
};

convert(testCases[0].args.s, testCases[0].args.numRows);

// ===================
testCases.forEach(({ args, expected }, i) => {
  const result = convert(args.s, args.numRows);

  try {
    assert.strictEqual(result, expected);
    console.log(`✅ Test #${i}: Success`);
  } catch (err) {
    console.group(`❌ Test #${i}: FAILED`);
    console.log(`INPUTS:   s: "${args.s}", numRows: ${args.numRows}`);
    console.log(`EXPECTED: "${expected}"`);
    console.log(`ACTUAL:   "${result}"`);
    console.groupEnd();
  }
});
