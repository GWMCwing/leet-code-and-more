/*
 * @lc app=leetcode id=25 lang=typescript
 *
 * [25] Reverse Nodes in k-Group
 *
 * https://leetcode.com/problems/reverse-nodes-in-k-group/description/
 *
 * algorithms
 * Hard (54.49%)
 * Likes:    10590
 * Dislikes: 564
 * Total Accepted:    666.8K
 * Total Submissions: 1.2M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * Given the head of a linked list, reverse the nodes of the list k at a time,
 * and return the modified list.
 *
 * k is a positive integer and is less than or equal to the length of the
 * linked list. If the number of nodes is not a multiple of k then left-out
 * nodes, in the end, should remain as it is.
 *
 * You may not alter the values in the list's nodes, only nodes themselves may
 * be changed.
 *
 *
 * Example 1:
 *
 *
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [2,1,4,3,5]
 *
 *
 * Example 2:
 *
 *
 * Input: head = [1,2,3,4,5], k = 3
 * Output: [3,2,1,4,5]
 *
 *
 *
 * Constraints:
 *
 *
 * The number of nodes in the list is n.
 * 1 <= k <= n <= 5000
 * 0 <= Node.val <= 1000
 *
 *
 *
 * Follow-up: Can you solve the problem in O(1) extra memory space?
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

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    // loop to get the number of batches
    if (!head) return null;
    let tempHead: ListNode | null = head;
    let total = 0;
    while (tempHead) {
        total += 1;
        tempHead = tempHead.next;
    }
    //
    tempHead = head;
    let nextNode = tempHead?.next;
    const batches = Math.floor(total / k);
    let startNode = head;
    let nextStartNode = head.next;
    let endNode = head;
    let nextBatchStart: ListNode | null = head;
    for (let i = 1; i < k; i++) {
        endNode = endNode.next as ListNode;
    }
    nextBatchStart = endNode.next;
    let endNodeAfter = nextBatchStart;
    for (let i = 0; i < batches; i++) {
        //
        for (let j = 0; j < k / 2; j++) {
            // point first node to next batch
            const tempStartNode = startNode;
            startNode.next = endNodeAfter;
            // point last node to previous

            const previousNode = nextStartNode;
            for(let z = 1; z < (k - j); z+=2){

            }
            endNode.next = 
        }
    }
}
// @lc code=end
