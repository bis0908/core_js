/**
 * @fileoverview 3-1-4 콜백 함수 호출 시 그 함수 내부에서의 this
 *
 * @description
 * 콜백 함수에서의 this 동작과 thisArg 매개변수 활용법을 학습합니다.
 * 다양한 콜백 상황에서의 this 처리 방법을 이해합니다.
 *
 * @objectives
 * - 콜백 함수에서의 기본 this 동작 이해
 * - thisArg 매개변수 활용법 마스터
 * - 다양한 상황별 콜백 함수 this 처리법 학습
 *
 * @concept
 * 콜백함수도 함수이므로 기본적으로 전역객체를 참조하지만,
 * 제어권을 받은 함수가 콜백의 this를 지정한 경우 그 대상을 참조
 */

/**
 * @section 콜백 함수의 기본 동작
 * 콜백 함수도 기본적으로 함수이므로 전역객체를 참조
 */

/**
 * @example setTimeout 콜백에서의 this
 * setTimeout의 콜백함수에서 this는 전역객체를 가리킴
 */
setTimeout(function () {
  console.log(
    "setTimeout 콜백의 this:",
    this === global ? "global 객체" : "기타 객체",
  );
}, 100);

/**
 * @example forEach 기본 동작에서의 this
 * thisArg를 지정하지 않으면 전역객체를 참조
 */
var callbackExample = [1, 2, 3];
callbackExample.forEach(function (value, index) {
  if (index < 2) {
    // 출력 제한
    console.log(
      "  index:",
      index,
      "this:",
      this === global ? "global" : "other",
      "value:",
      value,
    );
  }
});

/**
 * @section thisArg 매개변수 활용
 * 많은 배열 메서드들이 두 번째 매개변수로 thisArg를 받아
 * 콜백 함수 내부에서 this로 사용할 객체를 지정할 수 있음
 */

/**
 * @example thisArg 활용 예제 - forEach
 * 두 번째 인자로 thisArg를 전달하여 콜백 내부의 this 지정
 */
var objForCallback = {
  name: "CallbackProcessor",
  multiplier: 10,
  count: 0,
};
[1, 2, 3].forEach(function (value, index) {
  this.count += value * this.multiplier;
  console.log(`  ${this.name} 처리중 - value:`, value, "누적:", this.count);
}, objForCallback); // thisArg로 objForCallback 전달

/**
 * @example map에서 thisArg 활용
 * map 메서드도 thisArg를 지원하여 변환 로직에서 this 사용 가능
 */
var processor = {
  prefix: "[처리됨]",
  suffix: "!",
};

var result = ["사과", "바나나", "오렌지"].map(function (item) {
  return `${this.prefix} ${item}${this.suffix}`;
}, processor);

console.log("map 결과:", result);

/**
 * @example filter에서 thisArg 활용
 * 필터링 조건에서 객체의 메서드나 속성을 활용
 */
var validator = {
  minLength: 3,
  isValid: function (str) {
    return str.length >= this.minLength;
  },
};

var words = ["a", "hello", "hi", "world", "javascript"];
var validWords = words.filter(function (word) {
  return this.isValid(word);
}, validator);

console.log("유효한 단어들:", validWords);

/**
 * @note thisArg를 지원하는 주요 배열 메서드들
 * - forEach(callback[, thisArg])
 * - map(callback[, thisArg])
 * - filter(callback[, thisArg])
 * - find(callback[, thisArg])
 * - every(callback[, thisArg])
 * - some(callback[, thisArg])
 */

/**
 * @note 브라우저 환경에서의 이벤트 핸들러
 * addEventListener에서 this는 이벤트가 발생한 DOM 요소를 가리킴
 * @example button.addEventListener('click', function() { this === button });
 */

/**
 * @section 콜백에서 상위 객체 참조 방법들
 * 콜백 함수에서 상위 스코프의 this에 접근하기 위한 다양한 패턴
 */

var dataManager = {
  name: "DataManager",
  data: [10, 20, 30],

  /**
   * @method self 패턴을 활용한 this 우회
   * 상위 스코프의 this를 변수에 저장하여 콜백에서 사용
   */
  processBySelf: function () {
    console.log("\n방법 1: self 패턴");

    this.data.forEach((item) => {
      console.log(`  ${this.name}이 처리: `, item); // self 변수 사용
    });
  },

  /**
   * @method 화살표 함수를 활용한 lexical this (ES6 참고용)
   * 화살표 함수는 상위 스코프의 this를 자동으로 바인딩
   */
  processByArrow: function () {
    console.log("\n방법 1-1: 화살표 함수 (ES6 참고용)");

    this.data.forEach((item) => {
      console.log(`  ${this.name}이 처리: `, item); // 상위 스코프의 this 자동 바인딩
    });
  },

  /**
   * @method thisArg 매개변수를 활용한 this 지정
   * forEach의 두 번째 인자로 this를 전달
   */
  processByThisArg: function () {
    console.log("\n방법 2: thisArg 활용");
    this.data.forEach(function (item) {
      console.log(`  ${this.name}이 처리:`, item);
    }, this); // thisArg로 this 전달
  },

  /**
   * @method bind를 활용한 this 고정 (미리보기)
   * 콜백 함수에 bind를 사용하여 this를 명시적으로 바인딩
   */
  processByBind: function () {
    console.log("\n방법 3: bind 사용 (미리보기)");
    this.data.forEach(
      function (item) {
        console.log(`  ${this.name}이 처리:`, item);
      }.bind(this),
    ); // bind로 this 고정
  },
};

dataManager.processBySelf();
dataManager.processByArrow();
dataManager.processByThisArg();
dataManager.processByBind();

/**
 * @summary 핵심 포인트
 *
 * 1. 콜백 함수의 기본 this: 전역객체
 * 2. thisArg 매개변수: 콜백 내부 this 지정 가능
 * 3. 상위 객체 참조: self 패턴 또는 thisArg 활용
 * 4. 브라우저 이벤트: this는 이벤트 대상 엘리먼트
 *
 * @solutions 콜백에서 상위 this 접근 방법
 * 1. self 패턴: var self = this (ES5 호환, 가장 일반적)
 * 2. 화살표 함수: () => {} (ES6, lexical this 바인딩)
 * 3. thisArg 활용: method(callback, thisArg) (배열 메서드 지원)
 * 4. bind 사용: callback.bind(this) (명시적 바인딩)
 */
