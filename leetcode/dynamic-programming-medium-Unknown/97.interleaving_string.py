#
# @lc app=leetcode id=97 lang=python3
#
# [97] Interleaving String
#
# https://leetcode.com/problems/interleaving-string/description/
#
# algorithms
# Medium (37.30%)
# Likes:    6352
# Dislikes: 388
# Total Accepted:    375.8K
# Total Submissions: 1M
# Testcase Example:  '"aabcc"\n"dbbca"\n"aadbbcbcac"'
#
# Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of
# s1 and s2.
# 
# An interleaving of two strings s and t is a configuration where s and t are
# divided into n and m substrings respectively, such that:
# 
# 
# s = s1 + s2 + ... + sn
# t = t1 + t2 + ... + tm
# |n - m| <= 1
# The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 +
# t3 + s3 + ...
# 
# 
# Note: a + b is the concatenation of strings a and b.
# 
# 
# Example 1:
# 
# 
# Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
# Output: true
# Explanation: One way to obtain s3 is:
# Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
# Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" =
# "aadbbcbcac".
# Since s3 can be obtained by interleaving s1 and s2, we return true.
# 
# 
# Example 2:
# 
# 
# Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
# Output: false
# Explanation: Notice how it is impossible to interleave s2 with any other
# string to obtain s3.
# 
# 
# Example 3:
# 
# 
# Input: s1 = "", s2 = "", s3 = ""
# Output: true
# 
# 
# 
# Constraints:
# 
# 
# 0 <= s1.length, s2.length <= 100
# 0 <= s3.length <= 200
# s1, s2, and s3 consist of lowercase English letters.
# 
# 
# 
# Follow up: Could you solve it using only O(s2.length) additional memory
# space?
# 
#

# @lc code=start
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if(m + n != len(s3)):
            return False
        dp = [[False] * (n+1) for _ in range(m+1)]
        dp[0][0] = True
        
        for i in range(1, m + 1):
            dp[i][0] = dp[i-1][0] and s1[i-1] == s3[i-1]
        for j in range(1, n + 1):
            dp[0][j] = dp[0][j-1] and s2[j-1] == s3[j-1]
        
        for i in range(1,m+1):
            for j in range(1,n+1):
                dp[i][j] = (dp[i-1][j] and s1[i-1] == s3[i + j -1]) or (dp[i][j-1] and s2[j-1] == s3[i + j - 1])
        
        return dp[m][n]
        
        
# @lc code=end

