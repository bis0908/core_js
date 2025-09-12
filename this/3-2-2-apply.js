/**
 * @fileoverview 3-2-2 apply 메서드
 * 
 * @description
 * Function.prototype.apply를 사용하여 this를 명시적으로 바인딩하는 방법을 학습합니다.
 * apply와 call의 차이점과 배열 인수 처리 방식을 이해합니다.
 * 
 * @objectives
 * - apply 메서드의 기본 문법과 동작 원리
 * - call과 apply의 차이점 명확히 구분
 * - 배열 인수를 다루는 상황에서의 apply 활용
 * 
 * @concept
 * apply는 call과 동일하지만 인수를 배열 형태로 전달하는 것이 차이점
 */

console.log("=== 3-2-2 apply 메서드 ===\n");

// 학습 목표
console.log("🎯 학습 목표:");
console.log("1. apply 메서드의 기본 문법과 동작 원리");
console.log("2. call과 apply의 차이점 명확히 구분");
console.log("3. 배열 인수를 다루는 상황에서의 apply 활용\n");

// apply 메서드 기본 문법
console.log("📖 apply 메서드 기본 문법:");
console.log("함수.apply(thisArg, [arg1, arg2, ...])");
console.log("- thisArg: this로 바인딩할 객체");
console.log("- [arg1, arg2, ...]: 함수에 전달할 인수들의 배열\n");

// call vs apply 비교
console.log("📍 call vs apply 비교:");
var funcForApply = function (a, b, c) {
  console.log("this:", this, "a:", a, "b:", b, "c:", c);
};

var testObj = { x: 1 };

console.log("1️⃣ call 사용 (개별 인수):");
funcForApply.call(testObj, 4, 5, 6); 

console.log("\n2️⃣ apply 사용 (배열 인수):");
funcForApply.apply(testObj, [4, 5, 6]); // 결과는 동일, 인수 전달 방식만 다름

// 메서드에서 apply 사용
console.log("\n📍 메서드에서 apply 사용:");
var objForApply = {
  a: 1,
  name: "원본객체",
  method: function (x, y, z) {
    console.log("this.name:", this.name, "인수들:", x, y, z);
    return x + y + z;
  },
};

var anotherObj = { 
  a: 4, 
  name: "다른객체" 
};

console.log("3️⃣ 원래 메서드 호출:");
var result1 = objForApply.method(2, 3, 4);

console.log("\n4️⃣ apply로 this 변경:");
var result2 = objForApply.method.apply(anotherObj, [5, 6, 7]);

// 배열을 인수로 받는 함수에서 apply의 장점
console.log("\n🔢 배열 인수 처리에서 apply의 장점:");

// Math.max/min에서 apply 활용
var numbers = [10, 20, 3, 16, 45];

console.log("5️⃣ Math.max에서 apply 활용:");
console.log("배열:", numbers);

// 직접 배열을 전달하면 NaN
console.log("Math.max(numbers):", Math.max(numbers)); // NaN

// apply를 사용하면 배열을 개별 인수로 전개
console.log("Math.max.apply(null, numbers):", Math.max.apply(null, numbers)); // 45
console.log("Math.min.apply(null, numbers):", Math.min.apply(null, numbers)); // 3

// 다른 예제: 배열의 최대값/최소값 찾기
console.log("\n6️⃣ 다양한 배열에서 최대/최소값:");
var scores = [88, 92, 76, 95, 89];
var temperatures = [-5, 2, 8, -2, 12, 0];

console.log("점수들:", scores);
console.log("최고 점수:", Math.max.apply(null, scores));
console.log("최저 점수:", Math.min.apply(null, scores));

console.log("온도들:", temperatures);
console.log("최고 온도:", Math.max.apply(null, temperatures));
console.log("최저 온도:", Math.min.apply(null, temperatures));

// Array.prototype 메서드와 apply
console.log("\n📋 Array.prototype 메서드와 apply:");

// 배열 합치기
console.log("7️⃣ 배열 합치기:");
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = [7, 8, 9];

// push.apply로 배열 확장
console.log("원본 arr1:", arr1);
Array.prototype.push.apply(arr1, arr2);
console.log("arr2 추가 후 arr1:", arr1);
Array.prototype.push.apply(arr1, arr3);
console.log("arr3 추가 후 arr1:", arr1);

// 함수 인수 처리에서 apply 활용
console.log("\n⚙️  함수 인수 처리에서 apply 활용:");
function processArgs(operation) {
  // arguments는 첫 번째 인수 제외하고 나머지를 배열로 변환
  var args = Array.prototype.slice.call(arguments, 1);
  
  console.log("작업:", operation);
  console.log("인수들:", args);
  
  if (operation === "sum") {
    return args.reduce(function(sum, num) { return sum + num; }, 0);
  } else if (operation === "max") {
    return Math.max.apply(null, args);
  } else if (operation === "min") {
    return Math.min.apply(null, args);
  }
}

console.log("8️⃣ 동적 인수 처리:");
console.log("합계:", processArgs("sum", 1, 2, 3, 4, 5));
console.log("최대값:", processArgs("max", 10, 25, 3, 47, 12));
console.log("최소값:", processArgs("min", 15, 8, 23, 4, 19));

// apply를 활용한 데코레이터 패턴
console.log("\n🎨 apply를 활용한 데코레이터 패턴:");
var logger = {
  log: function(func, args) {
    console.log("함수 실행 전 - 함수명:", func.name, "인수:", args);
    var result = func.apply(this, args);
    console.log("함수 실행 후 - 결과:", result);
    return result;
  }
};

var calculator = {
  multiply: function(a, b) {
    return a * b;
  },
  divide: function(a, b) {
    return a / b;
  }
};

console.log("9️⃣ 로깅 데코레이터:");
logger.log.call(calculator, calculator.multiply, [6, 7]);
logger.log.call(calculator, calculator.divide, [15, 3]);

// 핵심 포인트
console.log("\n💡 핵심 포인트:");
console.log("1. apply는 call과 동일하지만 인수를 배열로 전달");
console.log("2. 배열을 개별 인수로 전개할 때 매우 유용");
console.log("3. Math.max/min과 같이 가변 인수를 받는 함수에 적합");
console.log("4. Array.prototype 메서드 활용 시 강력한 도구");
console.log("5. ES6의 스프레드 연산자(...)와 유사한 역할\n");

console.log("✅ 3-2-2 apply 메서드 학습 완료!\n");