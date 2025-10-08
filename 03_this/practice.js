/**
 * @fileoverview this 실습 문제 모음
 * 
 * @description
 * 03장에서 학습한 this의 다양한 상황들을 실습을 통해 확인합니다.
 * 각 문제를 통해 this 바인딩 규칙을 체계적으로 복습합니다.
 * 
 * @objectives
 * - 다양한 상황에서 this 값 예측하기
 * - this 바인딩 규칙 실전 적용
 * - 문제 해결 능력 향상
 * - 실무에서 자주 마주치는 this 패턴 익히기
 * 
 * @practice
 * 각 문제를 풀기 전에 this 값을 예측해보세요
 */

/**
 * @instruction 실습 진행 방법
 * 다음 코드들의 this 값을 예측해보세요.
 * 예측해본 후 코드를 실행하여 확인해보세요!
 */

/**
 * @problem 1 - 메서드 vs 함수 호출
 * 동일한 함수를 메서드와 함수로 호출했을 때 this 값 비교
 */
var problemObj1 = {
  a: 1,
  name: "문제1객체",
  b: function () {
    console.log("문제1 결과 - this.name:", this.name, "this.a:", this.a);
  },
};

var problemFunc1 = problemObj1.b;

console.log("다음 두 호출의 결과를 예측해보세요:");
console.log("1) problemObj1.b() → this는 무엇일까요?");
console.log("2) problemFunc1() → this는 무엇일까요?\n");

// 실행 (주석 제거하여 확인)
console.log("실제 실행 결과:");
problemObj1.b(); // 예상: this는 problemObj1, this.name = "문제1객체", this.a = 1
problemFunc1(); // 예상: this는 전역객체, this.name = undefined, this.a = undefined

// ====================================================================
// 문제 2: 내부함수에서의 this
// ====================================================================

console.log("\n=== 문제 2: 내부함수에서의 this ===");
var problemObj2 = {
  a: 1,
  name: "문제2객체",
  b: function() {
    console.log("outer - this.name:", this.name, "this.a:", this.a);
    
    function c() {
      console.log("inner - this.name:", this.name, "this.a:", this.a);
    }
    c();
  },
};

console.log("메서드 내부의 함수에서 this는 무엇일까요?");
console.log("problemObj2.b() 실행 시:");
console.log("- outer function의 this는?");
console.log("- inner function의 this는?\n");

// 실행 (주석 제거하여 확인)
console.log("실제 실행 결과:");
problemObj2.b(); 
// 예상: outer는 problemObj2, inner는 전역객체

// ====================================================================
// 문제 3: call/apply 메서드
// ====================================================================

console.log("\n=== 문제 3: call/apply 메서드 ===");
function testCallApply(x, y, z) {
  console.log("문제3 결과 - this.name:", this.name, "x:", x, "y:", y, "z:", z);
}

var problemObj3 = { name: "문제3객체", value: 100 };

console.log("다음 호출들의 결과를 예측해보세요:");
console.log("1) testCallApply.call(problemObj3, 1, 2, 3)");
console.log("2) testCallApply.apply(problemObj3, [4, 5, 6])");
console.log("3) testCallApply(7, 8, 9)\n");

// 실행 (주석 제거하여 확인)
console.log("실제 실행 결과:");
testCallApply.call(problemObj3, 1, 2, 3);   // 예상: this.name = "문제3객체"
testCallApply.apply(problemObj3, [4, 5, 6]); // 예상: this.name = "문제3객체"
testCallApply(7, 8, 9); // 예상: this.name = undefined (전역객체)

// ====================================================================
// 문제 4: 생성자 함수
// ====================================================================

console.log("\n=== 문제 4: 생성자 함수 ===");
function Person(name, age) {
  console.log("생성자 내부 this:", this);
  this.name = name;
  this.age = age;
  this.introduce = function() {
    console.log("안녕하세요, " + this.name + "입니다. " + this.age + "살이에요.");
  };
}

console.log("다음 호출들의 결과를 예측해보세요:");
console.log("1) var person1 = new Person('김철수', 25)");
console.log("2) var person2 = Person('이영희', 30)");
console.log("3) person1.introduce()");
console.log("4) person2가 존재할까요?\n");

// 실행 (주석 제거하여 확인)
console.log("실제 실행 결과:");
var person1 = new Person("김철수", 25); // 예상: this는 새 객체
console.log("person1:", person1);

// 주의: new 없이 호출하면 this가 전역객체를 가리켜 위험!
// var person2 = Person("이영희", 30); // 전역에 name, age, introduce가 추가됨!
// console.log("person2:", person2); // undefined

person1.introduce(); // 예상: "안녕하세요, 김철수입니다. 25살이에요."

// ====================================================================
// 문제 5: 콜백 함수에서의 this
// ====================================================================

console.log("\n=== 문제 5: 콜백 함수에서의 this ===");
var callbackObj = {
  name: "콜백객체",
  numbers: [1, 2, 3],
  
  method1: function() {
    console.log("method1 - this.name:", this.name);
    this.numbers.forEach(function(num) {
      console.log("forEach 콜백 - this.name:", this.name, "number:", num);
    });
  },
  
  method2: function() {
    console.log("method2 - this.name:", this.name);
    this.numbers.forEach(function(num) {
      console.log("forEach thisArg - this.name:", this.name, "number:", num);
    }, this); // thisArg 사용
  }
};

console.log("다음 메서드들에서 this는 무엇일까요?");
console.log("1) callbackObj.method1() - forEach 콜백에서 this는?");
console.log("2) callbackObj.method2() - thisArg 사용 시 this는?\n");

// 실행 (주석 제거하여 확인)
console.log("실제 실행 결과:");
console.log("method1 (thisArg 없음):");
callbackObj.method1(); // 콜백에서 this.name = undefined

console.log("\nmethod2 (thisArg 사용):");
callbackObj.method2(); // 콜백에서 this.name = "콜백객체"

// ====================================================================
// 문제 6: bind 메서드
// ====================================================================

console.log("\n=== 문제 6: bind 메서드 ===");
var bindObj = {
  name: "바인드객체",
  value: 42,
  
  method: function(a, b) {
    console.log("bind 테스트 - this.name:", this.name, "this.value:", this.value, "a:", a, "b:", b);
  }
};

var anotherObj = { name: "다른객체", value: 100 };

console.log("다음 bind 사용의 결과를 예측해보세요:");
console.log("1) var boundMethod = bindObj.method.bind(anotherObj)");
console.log("2) boundMethod(1, 2)");
console.log("3) var partialBound = bindObj.method.bind(anotherObj, 10)");
console.log("4) partialBound(20)\n");

// 실행 (주석 제거하여 확인)
console.log("실제 실행 결과:");
var boundMethod = bindObj.method.bind(anotherObj);
boundMethod(1, 2); // 예상: this.name = "다른객체", this.value = 100

var partialBound = bindObj.method.bind(anotherObj, 10);
partialBound(20); // 예상: this.name = "다른객체", a = 10, b = 20

// ====================================================================
// 문제 7: this 바인딩 우선순위
// ====================================================================

console.log("\n=== 문제 7: this 바인딩 우선순위 ===");
var priorityObj1 = {
  name: "객체1",
  foo: function(something) {
    this.a = something;
    console.log("this.name:", this.name, "this.a:", this.a);
  },
};

var priorityObj2 = { name: "객체2" };

function PriorityFunc(something) {
  this.a = something;
  this.name = "생성자함수";
  console.log("생성자 내부 - this.name:", this.name, "this.a:", this.a);
}

console.log("다음 우선순위들을 예측해보세요:");
console.log("1) priorityObj1.foo(1) - 암시적 바인딩");
console.log("2) priorityObj1.foo.call(priorityObj2, 2) - 명시적 vs 암시적");
console.log("3) var boundFoo = priorityObj1.foo.bind(priorityObj2)");
console.log("4) new boundFoo(3) - new vs bind\n");

// 실행 (주석 제거하여 확인)
console.log("실제 실행 결과:");
priorityObj1.foo(1); // 암시적 바인딩: this = priorityObj1

priorityObj1.foo.call(priorityObj2, 2); // 명시적이 암시적보다 우선: this = priorityObj2

var boundFoo = priorityObj1.foo.bind(priorityObj2);
boundFoo.call({ name: "임시객체" }, 3); // bind된 this는 변경 불가: this = priorityObj2

console.log("\nnew 바인딩 우선순위 테스트:");
var newInstance = new PriorityFunc(4); // new가 가장 높은 우선순위
console.log("newInstance:", newInstance);

// ====================================================================
// 문제 8: 실무 시나리오
// ====================================================================

console.log("\n=== 문제 8: 실무 시나리오 ===");
var realWorldObj = {
  name: "실무객체",
  data: [1, 2, 3, 4, 5],
  
  // 문제: 이 메서드에서 this 사용에 문제가 있을까요?
  processData: function() {
    console.log("데이터 처리 시작:", this.name);
    
    // 방법 1: 문제 있는 코드
    setTimeout(function() {
      console.log("타이머 완료 - this.name:", this.name); // this가 뭘까요?
    }, 100);
    
    // 방법 2: bind로 해결
    setTimeout(function() {
      console.log("바인딩된 타이머 - this.name:", this.name);
    }.bind(this), 200);
    
    // 방법 3: self 패턴으로 해결
    var self = this;
    setTimeout(function() {
      console.log("self 패턴 타이머 - self.name:", self.name);
    }, 300);
  }
};

console.log("실무에서 자주 마주치는 this 문제:");
console.log("setTimeout 콜백에서 this는 무엇일까요?");
console.log("어떤 해결 방법들이 있을까요?\n");

// 실행
console.log("실제 실행 결과:");
realWorldObj.processData();

// 결과 대기
setTimeout(function() {
  console.log("\n" + "=".repeat(60));
  console.log("🎉 모든 실습 문제 완료!");
  console.log("=".repeat(60));
  
  console.log("\n💡 실습 핵심 정리:");
  console.log("1. 메서드 호출: this는 점(.) 앞의 객체");
  console.log("2. 함수 호출: this는 전역객체");
  console.log("3. 생성자 호출: this는 새로 생성되는 인스턴스");
  console.log("4. call/apply: this를 명시적으로 지정");
  console.log("5. bind: this가 고정된 새 함수 반환");
  console.log("6. 콜백 함수: 기본적으로 전역객체, thisArg로 변경 가능");
  console.log("7. 우선순위: new > 명시적 > 암시적 > 기본\n");
  
  console.log("✅ this 마스터 되셨습니다! 🚀");
}, 500);

console.log("\n⏳ 비동기 결과들을 기다리는 중...\n");