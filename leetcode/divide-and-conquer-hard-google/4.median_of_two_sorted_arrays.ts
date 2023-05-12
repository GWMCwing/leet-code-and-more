/*
 * @lc app=leetcode id=4 lang=typescript
 *
 * [4] Median of Two Sorted Arrays
 *
 * https://leetcode.com/problems/median-of-two-sorted-arrays/description/
 *
 * algorithms
 * Hard (36.03%)
 * Likes:    22442
 * Dislikes: 2523
 * Total Accepted:    1.8M
 * Total Submissions: 5.1M
 * Testcase Example:  '[1,3]\n[2]'
 *
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return
 * the median of the two sorted arrays.
 *
 * The overall run time complexity should be O(log (m+n)).
 *
 *
 * Example 1:
 *
 *
 * Input: nums1 = [1,3], nums2 = [2]
 * Output: 2.00000
 * Explanation: merged array = [1,2,3] and median is 2.
 *
 *
 * Example 2:
 *
 *
 * Input: nums1 = [1,2], nums2 = [3,4]
 * Output: 2.50000
 * Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 *
 *
 *
 * Constraints:
 *
 *
 * nums1.length == m
 * nums2.length == n
 * 0 <= m <= 1000
 * 0 <= n <= 1000
 * 1 <= m + n <= 2000
 * -10^6 <= nums1[i], nums2[i] <= 10^6
 *
 *
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums1.length == 0) {
        if (nums2.length % 2) return nums2[Math.floor(nums2.length / 2)];
        return (nums2[nums2.length / 2 - 1] + nums2[nums2.length / 2]) / 2;
    } else if (nums2.length == 0) {
        if (nums1.length % 2) return nums1[Math.floor(nums1.length / 2)];
        return (nums1[nums1.length / 2 - 1] + nums1[nums1.length / 2]) / 2;
    }
    const n1Len1 = nums1.length == 1;
    const n1Len2 = nums1.length == 2;
    const n2Len1 = nums2.length == 1;
    const n2Len2 = nums2.length == 2;
    if (n1Len1 && n2Len1) {
        return (nums1[0] + nums2[0]) / 2;
    }
    if (n1Len1 && n2Len2) {
        const n1 = nums1[0];
        const n2 = nums2[0];
        const n3 = nums2[1];
        return n1 > n2 ? (n1 > n3 ? n3 : n1) : n2;
    }
    if (n1Len2 && n2Len1) {
        const n1 = nums1[0];
        const n2 = nums1[1];
        const n3 = nums2[0];
        return n3 > n1 ? (n3 > n2 ? n2 : n3) : n1;
    }
    if (n1Len2 && n2Len2) {
        const n1 = nums1[0];
        const n2 = nums1[1];
        const n3 = nums2[0];
        const n4 = nums2[1];
        return n1 < n3
            ? n2 > n4
                ? (n3 + n4) / 2
                : (n3 + n2) / 2
            : n2 >= n4
            ? (n1 + n4) / 2
            : (n1 + n2) / 2;
    }
    const nums1MedianIndex = Math.floor(nums1.length / 2);
    const nums2MedianIndex = Math.floor(nums2.length / 2);
    if (nums1[nums1MedianIndex] <= nums2[nums2MedianIndex]) {
        return findMedianSortedArrays(
            nums1.slice(nums1MedianIndex + 1),
            nums2.slice(0, nums2MedianIndex)
        );
    }
    return findMedianSortedArrays(
        nums1.slice(0, nums1MedianIndex),
        nums2.slice(nums2MedianIndex + 1)
    );
}
// @lc code=end
