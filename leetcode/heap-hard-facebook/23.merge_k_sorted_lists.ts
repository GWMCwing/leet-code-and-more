/*
 * @lc app=leetcode id=23 lang=typescript
 *
 * [23] Merge k Sorted Lists
 *
 * https://leetcode.com/problems/merge-k-sorted-lists/description/
 *
 * algorithms
 * Hard (49.03%)
 * Likes:    15697
 * Dislikes: 586
 * Total Accepted:    1.5M
 * Total Submissions: 3.1M
 * Testcase Example:  '[[1,4,5],[1,3,4],[2,6]]'
 *
 * You are given an array of k linked-lists lists, each linked-list is sorted
 * in ascending order.
 *
 * Merge all the linked-lists into one sorted linked-list and return it.
 *
 *
 * Example 1:
 *
 *
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 * Explanation: The linked-lists are:
 * [
 * ⁠ 1->4->5,
 * ⁠ 1->3->4,
 * ⁠ 2->6
 * ]
 * merging them into one sorted list:
 * 1->1->2->3->4->4->5->6
 *
 *
 * Example 2:
 *
 *
 * Input: lists = []
 * Output: []
 *
 *
 * Example 3:
 *
 *
 * Input: lists = [[]]
 * Output: []
 *
 *
 *
 * Constraints:
 *
 *
 * k == lists.length
 * 0 <= k <= 10^4
 * 0 <= lists[i].length <= 500
 * -10^4 <= lists[i][j] <= 10^4
 * lists[i] is sorted in ascending order.
 * The sum of lists[i].length will not exceed 10^4.
 *
 *
 */
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}
// parent: i // 2
// child: i*2 + 1, i*2 + 2
// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function insertHeapArray(heapArray: Array<ListNode>, node: ListNode | null) {
    if (!node) return;
    heapArray.push(node);
    let index = heapArray.length - 1;
    let parentNodeIndex = Math.floor((index - 1) / 2);
    while (heapArray[parentNodeIndex]?.val > node.val) {
        const temp = heapArray[index];
        heapArray[index] = heapArray[parentNodeIndex];
        heapArray[parentNodeIndex] = temp;
        index = parentNodeIndex;
        parentNodeIndex = Math.floor((index - 1) / 2);
    }
}
function removeHeapArray(heapArray: Array<ListNode>): ListNode | null {
    const rt = heapArray.shift();
    if (heapArray.length) {
        heapArray.unshift(heapArray.pop() as ListNode);
        let currentIndex = 0;
        let leftIndex = currentIndex * 2 + 1;
        let rightIndex = leftIndex + 1;
        do {
            if (leftIndex >= heapArray.length) break;
            //
            const childIndex =
                rightIndex < heapArray.length
                    ? heapArray[leftIndex].val > heapArray[rightIndex].val
                        ? rightIndex
                        : leftIndex
                    : leftIndex;
            if (heapArray[currentIndex].val < heapArray[childIndex].val) break;
            //
            const temp = heapArray[currentIndex];
            heapArray[currentIndex] = heapArray[childIndex];
            heapArray[childIndex] = temp;
            //
            currentIndex = childIndex;
            leftIndex = currentIndex * 2 + 1;
            rightIndex = leftIndex + 1;
        } while (true);
    }

    return rt || null;
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const rt: Array<ListNode> = [];
    const heapArray: Array<ListNode> = [];
    // init heap
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] == null) continue;
        insertHeapArray(heapArray, lists[i] as ListNode);
    }
    if (!heapArray.length) return null;
    //
    let node = removeHeapArray(heapArray);
    while (node) {
        rt.push(node);
        insertHeapArray(heapArray, node.next);
        node = removeHeapArray(heapArray);
    }
    for (let i = 1; i < rt.length; i++) {
        rt[i - 1].next = rt[i];
    }
    rt[rt.length - 1].next = null;
    return rt[0];
}
// @lc code=end
