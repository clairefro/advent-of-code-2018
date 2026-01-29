/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length === 0) return true;
  if (s.length % 2 !== 0) return false;

  const BRACKETS = { ")": "(", "]": "[", "}": "{" };

  const stackO = [];

  for (const c of s) {
    if (BRACKETS[c]) {
      // return early if close with no open
      if (stackO.length === 0 || stackO[stackO.length - 1] !== BRACKETS[c]) {
        return false;
      } else {
        stackO.pop();
      }
    } else {
      stackO.push(c);
    }
  }

  if (stackO.length !== 0) return false;
  return true;
};

console.log(isValid("{{{{}}}}"));
