/* 

LeetCode 2695: Array Wrapper (배열 래퍼)

문제 설명:

JavaScript에서 ArrayWrapper라는 새로운 클래스를 작성하세요. 이 클래스는 단 하나의 인자, 즉 정수 배열(array of integers)을 생성자의 입력으로 받습니다.

ArrayWrapper 클래스는 다음 두 가지 기능을 제공해야 합니다.

1. 덧셈 (Addition)

ArrayWrapper 객체 두 개를 더하는 연산(예: a + b)이 수행될 때, 결과는 두 배열에 있는 모든 요소의 합(sum)이 되어야 합니다.

2. 문자열 변환 (String Conversion)

String(arrWrapper)와 같이 ArrayWrapper 객체를 문자열로 변환할 때, 결과는 배열의 요소들을 감싸는 대괄호([])를 포함하는 문자열이 되어야 합니다. 이는 JSON.stringify(arrWrapper.nums)와 유사하지만, 모든 요소 사이에는 쉼표가 있어야 합니다.

예를 들어, nums = [1, 2, 3]이라면, 문자열 변환 결과는 "[1,2,3]"이어야 합니다.

예시 1:

입력: 
nums1 = [1,2], nums2 = [3,4]
출력: 10

설명:
const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
obj1 + obj2 // (1 + 2) + (3 + 4) = 10

예시 2:

입력: 
nums = [23,98,42,70]
출력: "[23,98,42,70]"

설명:
const obj = new ArrayWrapper([23,98,42,70]);
String(obj) // "[23,98,42,70]"

예시 3:

입력: 
nums = []
출력: "[]"

설명:
const obj = new ArrayWrapper([]);
String(obj) // "[]"

제약 조건:
0 <= nums.length <= 1000
0 <= nums[i] <= 1000

문제 해결을 위한 핵심 개념:

이 문제를 해결하기 위해서는 **JavaScript의 객체 형 변환(Type Coercion)**에 사용되는 특수한 메서드들을 구현해야 합니다.

덧셈 연산자 처리: 객체가 덧셈(+) 연산에서 숫자로 사용될 때 호출되는 메서드는 [Symbol.toPrimitive] 또는 valueOf() 입니다. 이 메서드를 구현하여 배열 요소의 합을 반환해야 합니다.

문자열 변환 처리: 객체가 문자열로 변환될 때(예: String(obj)) 호출되는 메서드는 toString() 입니다. 이 메서드를 구현하여 요구하는 형식의 문자열을 반환해야 합니다.
*/

/**
 * @param {number[]} nums
 * @return {void}
 */
var ArrayWrapper = function(nums) {
  this.nums = nums;
};

/**
 * @return {number}
 */
ArrayWrapper.prototype.valueOf = function() {
  // 요소값을 쭉 나열해서 
  // 더하면 될까?
  return this.nums.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
}

/**
 * @return {string}
 */
ArrayWrapper.prototype.toString = function() {
  return `[${[...this.nums]}]`;
}


const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
obj1 + obj2; // 10
String(obj1); // "[1,2]"
String(obj2); // "[3,4]"
