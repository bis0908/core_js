/**
 * @fileoverview 3-1-2 메서드로서 호출할 때 그 메서드 내부에서의 this
 * 
 * @description
 * 메서드로서 호출할 때와 함수로서 호출할 때의 this 차이를 학습합니다.
 * 점 표기법과 대괄호 표기법에서의 this 동작을 이해합니다.
 * 
 * @objectives
 * - 함수 vs 메서드 개념 구분
 * - 메서드 호출에서 this가 결정되는 원리
 * - 점 표기법과 대괄호 표기법에서의 this 동작
 * 
 * @concept 
 * - 함수: 그 자체로 독립적인 기능을 수행
 * - 메서드: 자신을 호출한 대상 객체에 관한 동작을 수행
 */

/**
 * 함수 vs 메서드 개념
 * - 함수: 그 자체로 독립적인 기능을 수행
 * - 메서드: 자신을 호출한 대상 객체에 관한 동작을 수행
 */


// 동일한 함수의 다른 호출 방식 비교
var func = function (x) {
  console.log("함수 호출에서 this:", this === global ? "global" : this, "x:", x);
};

var objWithMethod = {
  method: func,
  name: "objWithMethod"
};

func(1); // 함수로서 호출 - this는 전역객체
objWithMethod.method(2); // 메서드로서 호출 - this는 objWithMethod

/**
 * 메서드 내부에서의 this 예제
 * 점(.) 앞의 객체가 this가 됨
 */
var objWithMethods = {
  name: "outerObject",
  methodA: function () {
    console.log("methodA의 this.name:", this.name);
  },
  inner: {
    name: "innerObject",
    methodB: function () {
      console.log("methodB의 this.name:", this.name);
    },
  },
};

// 다양한 호출 방법에서도 결과는 동일
objWithMethods.methodA(); // this는 objWithMethods
objWithMethods["methodA"](); // this는 objWithMethods (대괄호 표기법)

objWithMethods.inner.methodB(); // this는 objWithMethods.inner
objWithMethods.inner["methodB"](); // this는 objWithMethods.inner
objWithMethods["inner"].methodB(); // this는 objWithMethods.inner
objWithMethods["inner"]["methodB"](); // this는 objWithMethods.inner

/**
 * @rule 호출 주체 판별 원리
 * 점(.) 앞의 객체가 this가 됨
 * 예: obj.method() → this = obj
 */

/**
 * 실전 예제: 메서드 체이닝
 * 모든 메서드에서 this는 calculator를 가리킴
 */
var calculator = {
  value: 0,
  add: function(num) {
    this.value += num;
    console.log("add 후 value:", this.value);
    return this; // 메서드 체이닝을 위한 this 반환
  },
  multiply: function(num) {
    this.value *= num;
    console.log("multiply 후 value:", this.value);
    return this;
  },
  getResult: function() {
    console.log("최종 결과:", this.value);
    return this.value;
  }
};

calculator.add(5).multiply(3).getResult(); // this는 항상 calculator

/**
 * @warning 메서드를 변수에 할당시 this 손실
 * 메서드를 변수에 할당하면 함수로서 호출됨
 */
var methodCopy = objWithMethods.methodA;
objWithMethods.methodA(); // this: objWithMethods
methodCopy(); // this: 전역객체 (함수로서 호출됨!)

/**
 * @summary 핵심 포인트
 * 
 * 1. 메서드 호출: 점(.) 앞의 객체가 this
 * 2. 함수 호출: this는 전역객체
 * 3. 호출 방식이 this를 결정 (함수 자체가 아님)
 * 4. 점 표기법과 대괄호 표기법 모두 동일한 결과
 * 
 * @example
 * obj.method() // this = obj
 * func()       // this = global
 * var fn = obj.method; fn() // this = global (주의!)
 */