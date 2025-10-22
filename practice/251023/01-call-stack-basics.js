/**
 * 01. Call Stack 기본 개념
 *
 * 학습 목표:
 * - Call Stack이 무엇인지 이해하기
 * - 함수 호출 순서와 실행 컨텍스트 이해하기
 * - 동기 코드의 실행 흐름 파악하기
 */

console.log("=== Call Stack 기본 개념 학습 ===\n");

/**
 * Call Stack이란?
 *
 * Call Stack은 자바스크립트 엔진이 함수 호출을 추적하는 자료구조입니다.
 * - LIFO (Last In, First Out) 구조
 * - 함수가 호출되면 스택에 push
 * - 함수가 종료되면 스택에서 pop
 * - 스택이 비어있을 때만 이벤트 루프가 Queue에서 작업을 가져옴
 *
 * 기본 동작:
 * 1. 전역 컨텍스트가 Call Stack에 들어감
 * 2. 함수 호출 시 해당 함수의 실행 컨텍스트가 스택에 push
 * 3. 함수 종료 시 스택에서 pop
 * 4. 모든 함수가 종료되면 전역 컨텍스트만 남음
 */

console.log("--- 예제 1: 간단한 Call Stack 동작 ---\n");

function first() {
	console.log("2. first() 함수 실행");
	second();
	console.log("5. first() 함수 종료 직전");
}

function second() {
	console.log("3. second() 함수 실행");
	third();
	console.log("4. second() 함수 종료 직전");
}

function third() {
	console.log("4-1. third() 함수 실행 및 즉시 종료");
}

console.log("1. 전역 컨텍스트 시작");
first();
console.log("6. 전역 컨텍스트로 돌아옴");

/**
 * Call Stack 시각화:
 *
 * [1] 전역 컨텍스트 시작
 * Stack: [Global]
 *
 * [2] first() 호출
 * Stack: [Global, first]
 *
 * [3] second() 호출
 * Stack: [Global, first, second]
 *
 * [4] third() 호출
 * Stack: [Global, first, second, third]
 *
 * [4-1] third() 종료
 * Stack: [Global, first, second]
 *
 * [5] second() 종료
 * Stack: [Global, first]
 *
 * [6] first() 종료
 * Stack: [Global]
 */

console.log("\n==================================================\n");

console.log("--- 예제 2: 재귀 함수와 Call Stack ---\n");

function countdown(n) {
	console.log(`카운트다운: ${n}`);

	if (n === 0) {
		console.log("발사! 🚀");
		return;
	}

	countdown(n - 1);
}

countdown(3);

/**
 * 재귀 함수 Call Stack 시각화:
 *
 * countdown(3) 호출
 * Stack: [Global, countdown(3)]
 *
 * countdown(2) 호출
 * Stack: [Global, countdown(3), countdown(2)]
 *
 * countdown(1) 호출
 * Stack: [Global, countdown(3), countdown(2), countdown(1)]
 *
 * countdown(0) 호출
 * Stack: [Global, countdown(3), countdown(2), countdown(1), countdown(0)]
 *
 * countdown(0) 종료 (return)
 * Stack: [Global, countdown(3), countdown(2), countdown(1)]
 *
 * ... 순차적으로 pop
 * Stack: [Global]
 */

console.log("\n==================================================\n");

/**
 * TODO 1: Call Stack 순서 예측하기
 *
 * 요구사항:
 * 아래 코드의 실행 순서를 예측하고, 각 단계에서 Call Stack의 상태를 주석으로 작성하세요.
 */

console.log("--- TODO 1: Call Stack 순서 예측 ---\n");

// function funcA() {
//   console.log("A 시작");
//   funcB();
//   console.log("A 종료");
// }

// function funcB() {
//   console.log("B 시작");
//   funcC();
//   console.log("B 종료");
// }

// function funcC() {
//   console.log("C 실행");
// }

// console.log("전역 시작");
// funcA();
// console.log("전역 종료");

// 예상 출력 순서:
// 1.
// 2.
// 3.
// 4.
// 5.
// 6.
// 7.

// 각 단계별 Call Stack 상태:
// (여기에 주석으로 작성하세요)

console.log("(TODO 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 2: 간단한 계산 함수 체인
 *
 * 요구사항:
 * - multiply(a, b): 두 수를 곱하는 함수
 * - add(a, b): 두 수를 더하는 함수
 * - calculate(): multiply(3, 4)의 결과에 5를 더한 값을 반환하는 함수
 * - 각 함수에서 console.log로 호출 시점을 표시하세요
 */

console.log("--- TODO 2: 계산 함수 체인 ---\n");

// function multiply(a, b) {
//   console.log(`multiply(${a}, ${b}) 호출`);
//   // 여기에 코드 작성
// }

// function add(a, b) {
//   console.log(`add(${a}, ${b}) 호출`);
//   // 여기에 코드 작성
// }

// function calculate() {
//   console.log("calculate() 시작");
//   // multiply(3, 4)의 결과에 5를 더하기
//   // 여기에 코드 작성
// }

// console.log("계산 시작");
// const result = calculate();
// console.log(`최종 결과: ${result}`);
// console.log("계산 종료");

console.log("(TODO 2를 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 3: 재귀 함수로 팩토리얼 구현
 *
 * 요구사항:
 * - factorial(n): n! 을 계산하는 재귀 함수
 * - n이 0 또는 1이면 1을 반환
 * - 그 외에는 n * factorial(n-1)을 반환
 * - 각 호출마다 현재 n 값을 console.log로 출력
 */

console.log("--- TODO 3: 팩토리얼 재귀 함수 ---\n");

// function factorial(n) {
//   console.log(`factorial(${n}) 호출`);
//   // 여기에 코드 작성
// }

// console.log("5! 계산 시작");
// const result = factorial(5);
// console.log(`5! = ${result}`);

// Call Stack 최대 깊이는?
// (여기에 답을 적으세요)

console.log("(TODO 3을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 4: Call Stack 오버플로우 이해하기
 *
 * 요구사항:
 * - 무한 재귀를 발생시키는 함수를 만들고 실행해보세요
 * - 어떤 에러가 발생하는지 관찰하세요
 * - (주의: 이 코드는 에러를 발생시킵니다!)
 */

console.log("--- TODO 4: Stack Overflow 체험 ---\n");

// function infiniteRecursion() {
//   // 무한 재귀 코드 작성
// }

// 주석을 해제하여 실행해보세요 (에러 발생 주의!)
// infiniteRecursion();

// 어떤 에러가 발생했나요?
// (여기에 답을 적으세요)

console.log("(TODO 4는 주의해서 테스트하세요)\n");
console.log("==================================================\n");

/**
 * 학습 정리
 *
 * ✅ Call Stack은 함수 호출을 추적하는 LIFO 구조
 * ✅ 함수 호출 시 push, 종료 시 pop
 * ✅ 재귀 함수는 Call Stack에 여러 실행 컨텍스트를 쌓음
 * ✅ Stack이 비어있을 때만 이벤트 루프가 Queue 작업 처리
 * ✅ 너무 깊은 재귀는 Stack Overflow 발생
 *
 * 다음 학습: 02-task-queue.js (Task Queue와 비동기 실행)
 */

console.log("\n=== 01. Call Stack 기본 학습 완료! ===");
console.log("\n정답 확인: 01-call-stack-basics-answer.js");
console.log("다음 단계: node 02-task-queue.js\n");
