/**
 * @fileoverview 3-1-1 전역 공간에서의 this
 *
 * @description
 * 전역 공간에서 this는 전역 객체를 가리킵니다.
 * Node.js와 브라우저 환경에서의 차이점을 학습합니다.
 *
 * @objectives
 * - 전역 공간에서 this가 가리키는 객체 이해
 * - Node.js와 브라우저 환경의 this 차이점 파악
 * - 전역변수와 전역객체 프로퍼티의 관계 이해
 *
 * @environment
 * - Node.js: 전역 this는 module.exports 객체
 * - Browser: 전역 this는 window 객체
 */

// 전역 공간에서의 this 확인

// 전역 공간에서의 this
// Node.js: module.exports 객체, 브라우저: window 객체
console.log("전역 공간에서 this:", this);

/**
 * 전역변수와 전역객체의 관계
 * Node.js: var 선언은 모듈 스코프에 머무름 (전역객체에 추가되지 않음)
 * Browser: var 선언은 window 객체에 프로퍼티로 추가됨
 */
var globalA = 1;
console.log("전역변수 globalA:", globalA);
console.log("모듈 스코프의 this.globalA:", this.globalA); // undefined (Node.js)

/**
 * 환경별 전역객체 접근 방법
 * Node.js: global 객체가 진짜 전역객체 (this와는 별개)
 * Browser: window 객체가 전역객체 (this와 동일)
 */
if (typeof global !== "undefined") {
  // Node.js 환경
  global.globalB = 2;
  console.log("전역객체의 globalB:", global.globalB);
  console.log("global과 this는 다름:", global === this);
} else {
  // 브라우저 환경
  window.globalB = 2;
  console.log("전역객체의 globalB:", window.globalB);
  console.log("window와 this는 동일:", window === this);
}

/**
 * this에 직접 할당한 프로퍼티는 delete 가능
 * var로 선언한 변수는 delete 불가능
 */
this.moduleProperty = 2; // Node.js에서는 모듈 객체에 추가
delete this.moduleProperty;
console.log("delete 시도 후 moduleProperty:", this.moduleProperty); // undefined

// var 선언 변수는 delete 불가능
console.log("var로 선언된 globalA:", globalA); // 여전히 존재

/**
 * 환경별 this 비교 요약
 *
 * | 항목        | Node.js        | Browser         |
 * |-------------|----------------|----------------|
 * | 전역 this   | module.exports | window         |
 * | var 선언    | 모듈 스코프     | window에 추가   |
 * | 전역객체    | global         | window         |
 * | delete 가능 | 직접 할당만     | 직접 할당만     |
 */

/**
 * @summary 핵심 포인트
 *
 * - Node.js: 전역 this ≠ global 객체 (모듈 시스템)
 * - Browser: 전역 this === window 객체
 * - var 선언 변수는 환경에 따라 다르게 처리됨
 * - delete 연산자는 직접 할당한 프로퍼티만 삭제 가능
 *
 * @example
 * // Node.js
 * this !== global
 * var a = 1; // 모듈 스코프
 *
 * // Browser
 * this === window
 * var a = 1; // window.a = 1
 */
