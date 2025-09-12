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
 * @section bind vs call/apply 비교
 */
var funcForBind = function (a, b, c, d) {
  console.log("this:", this, "a:", a, "b:", b, "c:", c, "d:", d);
};

var testObj = { x: 1, name: "테스트객체" };

/** @example 1️⃣ 일반 함수 호출 */
funcForBind(1, 2, 3, 4); // this는 전역객체

/** @example 2️⃣ call 사용 (즉시 실행) */
funcForBind.call(testObj, 1, 2, 3, 4);

/** @example 3️⃣ bind 사용 (새 함수 반환) */
var bindFunc = funcForBind.bind(testObj);
bindFunc(1, 2, 3, 4); // 나중에 실행

/**
 * @section bind의 부분 적용(Partial Application) 기능
 */

/** @example 4️⃣ 부분 적용 예제 */
var bindFunc1 = funcForBind.bind(testObj, 10); // a를 10으로 고정
bindFunc1(20, 30, 40); // b=20, c=30, d=40

var bindFunc2 = funcForBind.bind(testObj, 10, 20); // a=10, b=20으로 고정
bindFunc2(30, 40); // c=30, d=40

/**
 * @section bind된 함수의 name 프로퍼티
 * 원본 함수명: funcForBind
 * bind된 함수명: bound funcForBind
 */
console.log("원본 함수명:", funcForBind.name); // funcForBind
console.log("bind된 함수명:", bindFunc1.name); // bound funcForBind
console.log("bind된 함수명:", bindFunc2.name); // bound funcForBind

/**
 * @section 내부함수에서 bind 사용
 */
var objForBind = {
  name: "외부객체",
  value: 42,
  outer: function () {
    console.log("outer의 this.name:", this.name);

    // 방법 1: call 사용
    var innerFunc1 = function () {
      console.log("innerFunc1의 this.name:", this.name);
      console.log("innerFunc1의 this.value:", this.value);
    };
    innerFunc1.call(this);

    // 방법 2: bind 사용 (더 깔끔)
    var innerFunc2 = function () {
      console.log("innerFunc2의 this.name:", this.name);
      console.log("innerFunc2의 this.value:", this.value);
    }.bind(this);
    innerFunc2();
  },
};

/** @example 5️⃣ 내부함수 this 바인딩 */
objForBind.outer();

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
 * @section setTimeout에서 bind 사용
 */
var timerObject = {
  name: "타이머객체",
  message: "시간이 지났습니다!",

  startTimer: function (delay) {
    console.log(this.name + " 타이머 시작...");

    // bind 없이 사용하면 this가 전역객체
    setTimeout(
      function () {
        console.log("타이머 완료 - " + this.name + ": " + this.message);
      }.bind(this),
      delay,
    );
  },
};

/** @example 8️⃣ setTimeout bind 예제 */
timerObject.startTimer(500);

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
