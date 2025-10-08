/**
 * @fileoverview 3-1-3 함수로서 호출할 때 그 함수 내부에서의 this
 *
 * @description
 * 함수로서 호출할 때의 this와 메서드 내부함수에서의 this 문제를 학습합니다.
 * this 우회 방법들을 익힙니다.
 *
 * @objectives
 * - 함수 호출에서 this가 전역객체를 가리키는 이유
 * - 메서드 내부함수에서의 this 문제점 파악
 * - this 우회 방법들 마스터하기
 *
 * @problem
 * 메서드 내부함수에서 this가 전역객체를 가리켜 상위 객체에 접근 불가
 */

/**
 * @warning 메서드 내부함수에서의 this 문제
 * 메서드 내부에서 선언된 함수도 일반 함수이므로 this가 전역객체를 가리킴
 */
var outerObj = {
  name: "outerObject",
  outer: function () {
    console.log("outer의 this.name:", this.name); // outerObject

    var innerFunc = function () {
      console.log("innerFunc의 this.name:", this.name); // undefined (전역객체!)
    };
    innerFunc();

    /**
     * 같은 함수도 메서드로 호출하면 this가 달라짐
     * 호출 방식에 따라 this가 결정됨
     */
    var innerObj = {
      name: "innerObject",
      innerMethod: innerFunc,
    };
    innerObj.innerMethod(); // this는 innerObj
  },
};
console.log("=================== outerObj.outer() start")
outerObj.outer();
console.log("=================== outerObj.outer() end\n\n")
/**
 * @section this 우회 방법들
 * 내부함수에서 상위 객체에 접근하기 위한 다양한 패턴
 */

// 방법 1: 변수를 활용해서 우회 (self 패턴 - 가장 일반적)
/**
 * @method self 패턴 사용 예제
 * this를 변수에 저장하여 내부함수에서 사용
 */
var objWithSelf = {
  name: "selfObject",
  outer: function () {
    console.log("outer의 this.name:", this.name);
    
    // self 변수에 this를 저장하여 내부함수에서 사용
    var self = this;

    var innerFunc1 = function() {
      console.log("innerFunc1의 self.name:", self.name); // 저장된 변수 사용
    };
    innerFunc1();

    // 더 깊은 중첩에서도 동일하게 작동
    var deepFunc = function() {
      var deeperFunc = function() {
        console.log("깊은 중첩 함수의 self.name:", self.name);
      };
      deeperFunc();
    };
    deepFunc();
  },
};
console.log("=================== objWithSelf.outer() start")
objWithSelf.outer();
console.log("=================== objWithSelf.outer() end\n\n")

// 방법 2: 화살표 함수 활용 (ES6 참고용)
/**
 * @method arrow 함수 패턴 
 * 화살표 함수는 상위 스코프의 this를 그대로 사용 (lexical this)
 * ES5 환경에서는 사용할 수 없으므로 참고용으로만 작성
 */
var objWithArrow = {
  name: "arrowObject",
  outer: function() {
    console.log("outer의 this.name:", this.name);
    
    var innerFunc2 = () => {
      console.log("화살표 함수의 this.name:", this.name); // 상위 스코프의 this를 자동으로 바인딩
    };
    innerFunc2();

    // 화살표 함수 중첩에서도 동일하게 작동
    var deepFunc = () => {
      var deeperFunc = () => {
        console.log("깊은 중첩 화살표 함수의 this.name:", this.name);
      };
      deeperFunc();
    };
    deepFunc();
  }
};
console.log("=================== objWithArrow.outer() start")
objWithArrow.outer();
console.log("=================== objWithArrow.outer() end\n\n")

// 방법 3: call/apply/bind 활용 (미리보기)
/**
 * @method call 메서드 활용
 * 명시적으로 this를 지정하여 내부함수 호출
 */
var objWithCall = {
  name: "callObject",
  outer: function () {
    console.log("outer의 this.name:", this.name);

    var innerFunc3 = function () {
      console.log("call로 바인딩된 this.name:", this.name);
    };

    // call을 사용하여 명시적으로 this 지정
    innerFunc3.call(this); // this를 명시적으로 전달
  },
};
console.log("=================== objWithCall.outer() start")
objWithCall.outer();
console.log("=================== objWithCall.outer() end\n\n")

/**
 * @example 실무에서 흔한 실수 패턴
 * forEach 콜백에서 this가 전역객체를 가리켜 예상과 다른 결과
 */
var commonMistake = {
  data: [1, 2, 3],
  name: "dataProcessor",

  process: function () {
    console.log("처리 시작:", this.name);

    // 잘못된 패턴 - this가 전역객체를 가리킴
    this.data.forEach(function (item) {
      console.log("처리중:", this.name, "item:", item); // this.name은 undefined!
    });

    // 올바른 패턴 1 - self 패턴 사용
    var self = this;
    this.data.forEach(function (item) {
      console.log("self 패턴으로 처리중:", self.name, "item:", item);
    });

    // 올바른 패턴 2 - thisArg 활용
    this.data.forEach(function (item) {
      console.log("thisArg로 처리중:", this.name, "item:", item);
    }, this); // forEach 메서드에 추가적인 arg 참조
  },
};
console.log("=================== commonMistake.process() start")
commonMistake.process();
console.log("=================== commonMistake.process() end\n\n")

/**
 * @section 클래스에서의 this 문제 (ES6+ 참고용)
 * 클래스 메서드 내부함수에서도 동일한 this 바인딩 문제가 발생
 * 
 * @example ES6 클래스에서의 this 문제
 * ```javascript
 * class DataProcessor {
 *   constructor(name) {
 *     this.name = name;
 *     this.data = [1, 2, 3];
 *   }
 *
 *   processWithProblem() {
 *     console.log('처리 시작:', this.name);
 *     this.data.forEach(function(item) {
 *       console.log('처리중:', this.name); // undefined! (전역객체)
 *     });
 *   }
 *
 *   processWithSelf() {
 *     const self = this; // self 패턴
 *     this.data.forEach(function(item) {
 *       console.log('처리중:', self.name); // 정상 동작
 *     });
 *   }
 *
 *   processWithArrow() {
 *     this.data.forEach((item) => {
 *       console.log('처리중:', this.name); // 화살표 함수로 해결
 *     });
 *   }
 * }
 * 
 * const processor = new DataProcessor('클래스처리기');
 * processor.processWithProblem(); // this.name = undefined
 * processor.processWithSelf();    // this.name = '클래스처리기'
 * processor.processWithArrow();   // this.name = '클래스처리기'
 * ```
 * 
 * @concept 클래스에서의 this 바인딩 문제
 * - ES6 클래스도 내부적으로는 함수이므로 동일한 this 바인딩 규칙 적용
 * - 클래스 메서드 내부함수에서도 this는 전역객체를 가리킴
 * - 생성자 함수든 클래스든 내부함수 this 문제는 동일하게 발생
 */

/**
 * @example ES5 생성자 함수로 클래스 유사 구현
 * ES6 클래스와 동일한 this 바인딩 문제를 실제로 확인해보는 예제
 */
function DataProcessorClass(name) {
  this.name = name;
  this.data = [1, 2, 3];
}

/**
 * @method 문제가 있는 메서드 - 내부함수에서 this 손실
 */
DataProcessorClass.prototype.processWithProblem = function() {
  console.log("처리 시작:", this.name);
  this.data.forEach(function(item) {
    console.log("문제 패턴 - this.name:", this.name, "item:", item); // undefined!
  });
};

/**
 * @method self 패턴으로 해결한 메서드
 */
DataProcessorClass.prototype.processWithSelf = function() {
  console.log("self 패턴 시작:", this.name);
  var self = this; // this를 self 변수에 저장
  this.data.forEach(function(item) {
    console.log("self 패턴 - self.name:", self.name, "item:", item); // 정상!
  });
};

/**
 * @method arrow 패턴으로 해결한 메서드
 */
DataProcessorClass.prototype.processWithArrow = function() {
  console.log("arrow 패턴 시작:", this.name);
  var self = this; // this를 self 변수에 저장
  this.data.forEach((item) => {
    console.log("arrow 패턴 - self.name:", self.name, "item:", item);
  });
};



// 실제 동작 확인
var classLikeProcessor = new DataProcessorClass("클래스처리기");
console.log("--- 문제 상황 ---");
classLikeProcessor.processWithProblem();
console.log("--- 해결 상황 ---");
classLikeProcessor.processWithSelf();
classLikeProcessor.processWithArrow();

/**
 * @note 브라우저 환경의 이벤트 핸들러
 * - DOM 이벤트 핸들러에서 this는 이벤트가 발생한 엘리먼트를 가리킴
 * - 내부 함수에서 상위 객체에 접근하려면 self 패턴 사용 필요
 */

/**
 * @summary 핵심 포인트
 *
 * 1. 함수 호출: this는 항상 전역객체
 * 2. 메서드 내부함수도 함수이므로 this는 전역객체
 * 3. 클래스 메서드 내부함수도 동일한 문제 발생
 * 4. self = this 패턴이 가장 안전하고 일반적
 * 5. 호출 방식에 따라 this가 달라지는 것을 항상 인지
 *
 * @solutions 내부함수 this 우회 방법
 * 1. self 패턴: var self = this (가장 일반적, ES5 호환)
 * 2. thisArg 활용: forEach(callback, thisArg) (배열 메서드 지원시)
 * 3. call 사용: func.call(this) (명시적 this 전달)
 * 4. bind 사용: func.bind(this) (this가 바인딩된 새 함수 생성)
 * 5. 화살표 함수: () => {} (ES6+, lexical this 바인딩)
 *
 * @warning 클래스에서의 주의사항
 * - ES6 클래스도 내부적으로는 함수이므로 동일한 this 바인딩 규칙 적용
 * - 클래스 메서드 내부함수에서도 this는 전역객체를 가리킴
 * - 생성자 함수든 클래스든 내부함수 this 문제는 동일하게 발생
 */
