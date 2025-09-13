/**
 * @fileoverview 3-2-4 bind 메서드
 *
 * @description
 * Function.prototype.bind를 사용하여 this를 미리 바인딩하는 방법을 학습합니다.
 * bind와 call/apply의 차이점과 다양한 활용 패턴을 이해합니다.
 *
 * @objectives
 * - bind 메서드의 동작 원리와 call/apply와의 차이점
 * - 부분 적용 함수(Partial Application) 구현
 * - 이벤트 핸들러와 콜백에서의 bind 활용
 * - bind된 함수의 특성과 name 프로퍼티
 *
 * @concept
 * bind는 this를 미리 고정한 새로운 함수를 반환하며 즉시 실행되지 않음
 */

// bind 메서드 기본 문법
/**
 * @syntax 함수.bind(thisArg[, arg1[, arg2[, ...]]])
 * @param {Object} thisArg - this로 바인딩할 객체
 * @param {*} arg1, arg2, ... - 미리 지정할 인수들 (선택적)
 * @returns {Function} 새로운 함수 (즉시 실행되지 않음!)
 */

/**
 * @section bind vs call/apply 비교 (문서 3-25 기반)
 */
var func = function (a, b, c) {
  console.log(this, a, b, c);
};

/** @example 3-25 ⭐ 기본 bind 메서드 사용법 */
func(1, 2, 3); // Window{ ... } 1 2 3
func.call({ x: 1 }, 4, 5, 6); // { x: 1 } 4 5 6

// bind는 새로운 함수를 반환 (즉시 실행되지 않음)
var bindFunc1 = func.bind({ x: 1 });
bindFunc1(5, 6, 7, 8); // { x: 1 } 5 6 7 8

// 부분 적용 함수 만들기
var bindFunc2 = func.bind({ x: 1 }, 4, 5);
bindFunc2(6, 7); // { x: 1 } 4 5 6 7
bindFunc2(8, 9); // { x: 1 } 4 5 8 9

/**
 * @section bind의 부분 적용(Partial Application) 기능
 */

/** @example 4️⃣ 부분 적용 예제 */
var bindFunc1 = funcForBind.bind(testObj, 10); // a를 10으로 고정
bindFunc1(20, 30, 40); // b=20, c=30, d=40

var bindFunc2 = funcForBind.bind(testObj, 10, 20); // a=10, b=20으로 고정
bindFunc2(30, 40); // c=30, d=40

/**
 * @section bind된 함수의 name 프로퍼티 (문서 3-26 기반)
 */
/** @example 3-26 ⭐ bind된 함수의 name 프로퍼티 */
console.log("원본 함수명:", func.name); // func
console.log("bind된 함수명:", bindFunc1.name); // bound func

/**
 * @section 내부함수에서 bind 사용 (문서 3-27 기반)
 */
/** @example 3-27 ⭐ call 방식과 bind 방식 비교 */
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };
    innerFunc.call(this);
  },
};
obj.outer();

var objWithBind = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    }.bind(this);
    innerFunc();
  },
};
objWithBind.outer();

/**
 * @section 콜백 함수에서 bind 사용
 */
var callbackObject = {
  name: "콜백처리기",
  data: [1, 2, 3, 4, 5],
  multiplier: 10,

  /**
   * @method processWithProblem - 문제가 있는 방법
   * @example 6️⃣ 문제가 있는 콜백
   */
  processWithProblem: function () {
    this.data.forEach(function (item) {
      // this가 전역객체를 가리킴!
      console.log("처리 실패 - this.name:", this.name, "item:", item);
    });
  },

  /**
   * @method processWithBind - bind로 해결
   * @example 7️⃣ bind로 해결된 콜백
   */
  processWithBind: function () {
    this.data.forEach(
      function (item) {
        console.log(
          "처리 성공 - " + this.name + "이(가) 처리:",
          item * this.multiplier,
        );
      }.bind(this),
    );
  },
};

// callbackObject.processWithProblem(); // this 문제 발생
callbackObject.processWithBind(); // bind로 해결

/**
 * @section setTimeout에서 bind 사용 (문서 3-28 기반)
 */
/** @example 3-28 ⭐ setTimeout에서 this 바인딩 비교 */
var timerObj = {
  logThis: function () {
    console.log(this);
  },
  logThisLater1: function () {
    setTimeout(this.logThis, 500);
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 1000);
  },
};
timerObj.logThisLater1(); // Window { ... }
timerObj.logThisLater2(); // obj { logThis: f, ... }

/**
 * @section 이벤트 핸들러 bind (브라우저 환경 시뮬레이션)
 */
var buttonHandler = {
  name: "버튼핸들러",
  clickCount: 0,

  handleClick: function (event) {
    this.clickCount++;
    console.log(this.name + " 클릭됨! 총 " + this.clickCount + "회");
  },

  /**
   * 브라우저에서 사용할 때:
   * element.addEventListener('click', this.handleClick.bind(this));
   */
};

/**
 * @example 브라우저에서 이벤트 핸들러 bind 사용법
 * element.addEventListener('click', handler.handleClick.bind(handler));
 */

/**
 * @section 화살표 함수와 bind 비교 (문서 3-29 참고)
 */
/** @example 3-29 ⭐ 화살표 함수는 bind가 필요 없음 */
var objWithArrow = {
  outer: function () {
    console.log(this); // (1) { outer: f }
    var innerFunc = () => {
      console.log(this); // (2) { outer: f }
    };
    innerFunc();
  },
};
objWithArrow.outer();

// bind 체이닝
console.log("\n🔗 bind 체이닝:");
var chainObj1 = { name: "첫번째", value: 10 };
var chainObj2 = { name: "두번째", value: 20 };

var chainFunc = function (a, b) {
  console.log(
    "this.name:",
    this.name,
    "this.value:",
    this.value,
    "a:",
    a,
    "b:",
    b,
  );
};

console.log("9️⃣ bind 체이닝 예제:");
var boundOnce = chainFunc.bind(chainObj1, 100);
var boundTwice = boundOnce.bind(chainObj2, 200); // 두 번째 bind는 무시됨!

boundOnce(1); // chainObj1에 바인딩됨
boundTwice(2); // 여전히 chainObj1에 바인딩됨 (중요!)

// 실무 활용: 메서드 추출
console.log("\n💼 실무 활용: 메서드 추출:");
var calculator = {
  name: "계산기",
  add: function (a, b) {
    console.log(this.name + "에서 계산: " + a + " + " + b + " = " + (a + b));
    return a + b;
  },
  multiply: function (a, b) {
    console.log(this.name + "에서 계산: " + a + " × " + b + " = " + a * b);
    return a * b;
  },
};

console.log("🔟 메서드 추출과 bind:");
// 메서드를 변수에 할당하면 this가 손실됨
var add = calculator.add;
// add(5, 3); // this.name이 undefined

// bind로 this를 보존
var boundAdd = calculator.add.bind(calculator);
boundAdd(5, 3); // 정상 동작

// 배열의 함수들에 bind 적용
var operations = [
  calculator.add.bind(calculator),
  calculator.multiply.bind(calculator),
];

console.log("배열에서 바인딩된 메서드 사용:");
operations[0](4, 6); // add
operations[1](3, 7); // multiply

// 핵심 포인트
console.log("\n💡 핵심 포인트:");
console.log("1. bind는 새 함수를 반환 (call/apply는 즉시 실행)");
console.log("2. this와 일부 인수를 미리 고정 가능 (부분 적용)");
console.log("3. 한 번 bind된 함수는 다시 bind 불가");
console.log("4. 콜백과 이벤트 핸들러에서 this 보존에 유용");
console.log("5. name 프로퍼티에 'bound' 접두사 추가\n");

console.log("✅ 3-2-4 bind 메서드 학습 완료!\n");
