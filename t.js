// core = repeating chars
function expandPalindromeFromCore(s, lo, hi) {
  // safety
  if (hi >= s.length || s[lo] !== s[hi]) return "";

  let l = lo;
  let h = hi;

  // PEEK NEXT
  while (l - 1 >= 0 && h + 1 < s.length && s[l - 1] === s[h + 1]) {
    l--;
    h++;
  }
  const sub = s.slice(l, h + 1);

  return sub;
}

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length === 1 || s.length === 0) return s;
  let longest = s[0];

  for (let i = 0; i < s.length; i++) {
    let hi = i;
    // PEEK NEXT FOR REPEATS
    while (hi + 1 < s.length && s[hi + 1] === s[i]) {
      hi++;
    }
    const sub = expandPalindromeFromCore(s, i, hi);
    if (sub.length > longest.length) longest = sub;
    //skip to next non-repeating char - i++ happens immediately after this
    i = hi;
  }

  return longest;
};

console.log(longestPalindrome("abbttabbad"));
