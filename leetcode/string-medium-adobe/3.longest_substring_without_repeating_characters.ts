/*
 * @lc app=leetcode id=3 lang=typescript
 *
 * [3] Longest Substring Without Repeating Characters
 *
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (33.82%)
 * Likes:    32590
 * Dislikes: 1423
 * Total Accepted:    4.3M
 * Total Submissions: 12.8M
 * Testcase Example:  '"abcabcbb"'
 *
 * Given a string s, find the length of the longest substring without repeating
 * characters.
 *
 *
 * Example 1:
 *
 *
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 *
 *
 * Example 2:
 *
 *
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 *
 *
 * Example 3:
 *
 *
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * Notice that the answer must be a substring, "pwke" is a subsequence and not
 * a substring.
 *
 *
 *
 * Constraints:
 *
 *
 * 0 <= s.length <= 5 * 10^4
 * s consists of English letters, digits, symbols and spaces.
 *
 *
 */

// @lc code=start
function lengthOfLongestSubstring(s: string): number {
    const charMap: Map<string, number> = new Map();
    let startIndex = 0;
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        const targetChar: string = s[i];
        if (charMap.has(targetChar)) {
            if (i - startIndex > maxLen) {
                maxLen = i - startIndex;
            }
            let newStartIndex = (charMap.get(targetChar) as number) + 1;
            if (newStartIndex > startIndex) {
                startIndex = newStartIndex;
            }
        }
        charMap.set(targetChar, i);
    }
    if (s.length - startIndex > maxLen) {
        maxLen = s.length - startIndex;
    }

    return maxLen;
}
// @lc code=end
