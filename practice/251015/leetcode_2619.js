/* 
Write code that enhances all arrays such that you can call the array.last() method on any array and it will return the last element. If there are no elements in the array, it should return -1.

You may assume the array is the output of JSON.parse.

* 모든 배열을 개선하는 코드를 작성하세요. 어떤 배열에든 array.last() 메서드를 호출하면 마지막 요소를 반환하도록 합니다. 배열에 요소가 없으면 -1을 반환해야 합니다.

* 배열은 JSON.parse의 출력 결과라고 가정해도 됩니다.

Example 1:
Input: nums = [null, {}, 3]
Output: 3
Explanation: Calling nums.last() should return the last element: 3.

Example 2:
Input: nums = []
Output: -1
Explanation: Because there are no elements, return -1.

Constraints:
arr is a valid JSON array
0 <= arr.length <= 1000
*/

/**
 * @return {null|boolean|number|string|Array|Object}
 */
Array.prototype.last = function() {
  if (this.length === 0) {
    return -1;
  }

  return this[this.length-1];
};


// const arr = [1, 2, 3];
const arr = [null, {}, 3];
arr.last(); // 3
