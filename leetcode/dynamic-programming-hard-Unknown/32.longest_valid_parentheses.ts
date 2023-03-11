/*
 * @lc app=leetcode id=32 lang=typescript
 *
 * [32] Longest Valid Parentheses
 *
 * https://leetcode.com/problems/longest-valid-parentheses/description/
 *
 * algorithms
 * Hard (32.79%)
 * Likes:    10588
 * Dislikes: 337
 * Total Accepted:    602.1K
 * Total Submissions: 1.8M
 * Testcase Example:  '"(()"'
 *
 * Given a string containing just the characters '(' and ')', return the length
 * of the longest valid (well-formed) parentheses substring.
 *
 *
 * Example 1:
 *
 *
 * Input: s = "(()"
 * Output: 2
 * Explanation: The longest valid parentheses substring is "()".
 *
 *
 * Example 2:
 *
 *
 * Input: s = ")()())"
 * Output: 4
 * Explanation: The longest valid parentheses substring is "()()".
 *
 *
 * Example 3:
 *
 *
 * Input: s = ""
 * Output: 0
 *
 *
 *
 * Constraints:
 *
 *
 * 0 <= s.length <= 3 * 10^4
 * s[i] is '(', or ')'.
 *
 *
 */

// @lc code=start
function longestValidParentheses(s: string): number {
    if (s.length == 0) return 0;
    const charStack: number[] = []; // '(' = 0 ')' = 1
    const lenStack: number[] = [0]; // stack length of the local substring, new ele every time a '(' pushed
    const differenceStack: number[] = [];
    // difference between two lenStack element,
    // new ele every time a len is pushed
    // if completed one -1 from differenceStack[-1] if differenceStack[-1] = 0
    //  merge lenStack[-1] and lenStack[-2] by adding

    for (let i = 0; i < s.length; i++) {
        if (s[i] == ')') {
            // ')'
            if (charStack.length > 0 && charStack[charStack.length - 1] == 0) {
                charStack.pop();
                lenStack[lenStack.length - 1] += 2;
                differenceStack[differenceStack.length - 1] -= 1;
                if (differenceStack[differenceStack.length - 1] == 0) {
                    differenceStack.pop();
                    const len = lenStack.pop() as number;
                    lenStack[lenStack.length - 1] += len;
                }
            } else {
                charStack.push(1);
                lenStack.push(0);
                differenceStack.push(-1);
            }
        } else {
            // '('
            charStack.push(0);
            lenStack.push(0);
            differenceStack.push(1);
        }
    }

    return Math.max(...lenStack);
}
// @lc code=end
