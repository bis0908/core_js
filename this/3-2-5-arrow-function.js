/**
 * @fileoverview 3-2-5 화살표 함수의 예외사항
 * 
 * @description
 * ES6 화살표 함수에서 this가 어떻게 다르게 동작하는지 이해합니다.
 * 화살표 함수의 this 바인딩 특성과 일반 함수와의 차이점을 학습합니다.
 * 
 * @objectives
 * - 화살표 함수의 this 바인딩 원리 이해
 * - 렉시컬 this의 개념과 스코프 체인
 * - call/apply/bind가 적용되지 않는 이유
 * - 언제 화살표 함수를 사용하면 안 되는지 파악
 * 
 * @concept
 * 화살표 함수는 렉시컬 this를 사용하여 상위 스코프의 this를 그대로 활용
 */


// ES5 환경 안내
console.log("⚠️  ES5 환경 안내:");
console.log("현재는 ES5 환경이므로 화살표 함수를 직접 실행할 수 없습니다.");
console.log("ES6+ 환경에서의 동작을 이론적으로 설명하고 시뮬레이션합니다.\n");

// 화살표 함수의 기본 개념
console.log("📖 화살표 함수의 this 바인딩 특성:");
console.log("1. 실행 컨텍스트 생성 시 this 바인딩 과정이 제외됨");
console.log("2. 상위 스코프의 this를 그대로 활용 (렉시컬 this)");
console.log("3. call, apply, bind 메서드로 this 변경 불가");
console.log("4. 생성자 함수로 사용 불가 (new 연산자 사용 시 오류)\n");

// ES5 방식과 ES6 화살표 함수 비교 (시뮬레이션)
console.log("📍 ES5 vs ES6 비교 시뮬레이션:");

// ES5 방식
var objES5 = {
  name: "ES5객체",
  values: [1, 2, 3],

  processES5: function () {
    console.log("\n1️⃣ ES5 방식 (일반 함수):");
    console.log("외부 this.name:", this.name);
    var self = this; // self 패턴 사용

    this.values.forEach(function(value) {
      console.log("  처리:", self.name, "->", value); // self 변수 사용
    });
  },
};

objES5.processES5();

// ES6 화살표 함수 시뮬레이션 (주석으로 표현)
console.log("\n2️⃣ ES6 방식 (화살표 함수 - 실제론 주석):");
console.log("// var objES6 = {");
console.log("//   name: 'ES6객체',");
console.log("//   values: [1, 2, 3],");
console.log("//   processES6: function() {");
console.log("//     console.log('외부 this.name:', this.name);");
console.log("//     this.values.forEach((value) => {");
console.log(
  "//       console.log('처리:', this.name, '->', value); // self 패턴 불필요!",
);
console.log("//     });");
console.log("//   }");
console.log("// };");

// 렉시컬 스코프 시뮬레이션
console.log("\n🔍 렉시컬 this 시뮬레이션:");
var lexicalExample = {
  name: "렉시컬예제",

  // ES5 방식: 내부함수에서 this 문제 발생
  methodES5: function () {
    console.log("\n3️⃣ ES5 내부함수 문제:");
    console.log("메서드 this.name:", this.name);

    function innerFunc() {
      console.log("내부함수 this.name:", this.name); // undefined (전역객체)
    }
    innerFunc();
  },

  // bind로 해결
  methodWithBind: function () {
    console.log("\n4️⃣ bind로 해결:");
    console.log("메서드 this.name:", this.name);

    var innerFunc = function () {
      console.log("바인딩된 내부함수 this.name:", this.name);
    }.bind(this);
    innerFunc();
  },
};

lexicalExample.methodES5();
lexicalExample.methodWithBind();

// ES6 화살표 함수는 이렇게 동작할 것 (주석)
console.log("\n5️⃣ ES6 화살표 함수 동작 (주석):");
console.log("// methodES6: function() {");
console.log("//   console.log('메서드 this.name:', this.name);");
console.log("//   const innerFunc = () => {");
console.log(
  "//     console.log('화살표 함수 this.name:', this.name); // 상위 this 그대로!",
);
console.log("//   };");
console.log("//   innerFunc();");
console.log("// }");

// call/apply/bind가 무시되는 특성 시뮬레이션
console.log("\n🚫 call/apply/bind 무시 특성:");
console.log("ES6 환경에서 화살표 함수는 call/apply/bind를 무시합니다.");

// ES5로 화살표 함수 유사 동작 구현
var arrowLikeSimulator = {
  createArrowLike: function(fn, context) {
    // 화살표 함수처럼 this가 고정된 함수 반환
    return function() { 
      return fn.apply(context, arguments); 
    };
  },
};

var originalContext = { name: "원본컨텍스트" };
var anotherContext = { name: "다른컨텍스트" };

var testFunction = function () {
  console.log("시뮬레이션된 화살표 함수 this.name:", this.name);
};

console.log("\n6️⃣ 화살표 함수 시뮬레이션:");
var arrowLike = arrowLikeSimulator.createArrowLike(
  testFunction,
  originalContext,
);
arrowLike(); // "원본컨텍스트" 출력

console.log("call로 this 변경 시도:");
arrowLike.call(anotherContext); // 여전히 "원본컨텍스트" 출력 (무시됨)

// 화살표 함수를 사용하면 안 되는 경우들
console.log("\n❌ 화살표 함수를 사용하면 안 되는 경우들:");
console.log("1. 객체의 메서드로 사용");
console.log("2. 생성자 함수로 사용");
console.log("3. 이벤트 핸들러에서 이벤트 대상에 접근해야 할 때");
console.log("4. prototype에 메서드 추가할 때");

// 잘못된 사용 예제 (주석으로만)
console.log("\n7️⃣ 잘못된 화살표 함수 사용 예제 (주석):");
console.log("// 잘못됨: 객체 메서드");
console.log("// var obj = {");
console.log("//   name: '객체',");
console.log("//   getName: () => {");
console.log("//     return this.name; // this가 전역객체를 가리킴!");
console.log("//   }");
console.log("// };");

console.log("\n// 잘못됨: 생성자 함수");
console.log("// var Person = (name) => {");
console.log("//   this.name = name; // TypeError 발생!");
console.log("// };");

console.log("\n// 잘못됨: prototype 메서드");
console.log("// Array.prototype.customMap = (callback) => {");
console.log("//   // this가 Array.prototype이 아님!");
console.log("// };");

// 올바른 화살표 함수 사용 사례
console.log("\n✅ 올바른 화살표 함수 사용 사례 (주석):");
console.log("// 1. 콜백 함수");
console.log("// [1,2,3].map(x => x * 2);");
console.log("// ");
console.log("// 2. 메서드 내부의 헬퍼 함수");
console.log("// processData: function() {");
console.log("//   const helper = (data) => {");
console.log("//     return this.transform(data); // 상위 this 사용");
console.log("//   };");
console.log("// }");

// 실무 권장사항
console.log("\n💼 실무 권장사항:");
console.log("1. 콜백 함수: 화살표 함수 사용 권장");
console.log("2. 객체 메서드: 일반 function 사용");
console.log("3. 생성자 함수: 일반 function 사용");
console.log("4. this 컨텍스트가 중요한 경우: 일반 function");
console.log("5. 단순한 변환 함수: 화살표 함수 사용\n");

// 핵심 포인트
console.log("💡 핵심 포인트:");
console.log("1. 화살표 함수: 렉시컬 this (상위 스코프 this 사용)");
console.log("2. 일반 함수: 호출 방식에 따라 this 결정");
console.log("3. call/apply/bind가 화살표 함수에 적용되지 않음");
console.log("4. 적절한 상황에서만 화살표 함수 사용");
console.log("5. ES5에서는 bind나 self 패턴으로 유사한 효과\n");

console.log("✅ 3-2-5 화살표 함수의 예외사항 학습 완료!\n");
