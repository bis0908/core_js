/**
 * 5-3-4. 커링 함수 (Currying)
 *
 * 커링은 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수들의 체인으로 만드는 것입니다.
 * 부분 적용 함수와 달리, 커링은 한 번에 하나의 인자만 전달하는 것을 원칙으로 합니다.
 *
 * 중간 과정에서 생성된 함수를 저장해두었다가 재사용할 수 있다는 장점이 있습니다.
 * 함수형 프로그래밍에서 자주 사용되는 패턴입니다.
 */

console.log("=== 5-3-4. 커링 함수 ===");

var curry3 = function(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    };
  };
};

// Math.max를 커링하여 첫 번째 인자를 10으로 고정
var getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8)); // 10 (10과 8 중 큰 값)
console.log(getMaxWith10(25)); // 25 (10과 25 중 큰 값)

// Math.min을 커링하여 첫 번째 인자를 10으로 고정
var getMinWith10 = curry3(Math.min)(10);
console.log(getMinWith10(8)); // 8 (10과 8 중 작은 값)
console.log(getMinWith10(25)); // 10 (10과 25 중 작은 값)

console.log("=========================");
