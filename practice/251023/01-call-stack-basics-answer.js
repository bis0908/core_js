/**
 * 01. Call Stack 기본 개념 - 정답
 *
 * 이 파일은 01-call-stack-basics.js의 모든 TODO 문제 정답을 포함합니다.
 */

console.log("=== Call Stack 기본 개념 정답 ===\n");

/**
 * TODO 1 정답: Call Stack 순서 예측하기
 */

console.log("--- TODO 1 정답: Call Stack 순서 예측 ---\n");

function funcA() {
	console.log("A 시작");
	funcB();
	console.log("A 종료");
}

function funcB() {
	console.log("B 시작");
	funcC();
	console.log("B 종료");
}

function funcC() {
	console.log("C 실행");
}

console.log("전역 시작");
funcA();
console.log("전역 종료");

/**
 * 예상 출력 순서:
 * 1. "전역 시작"
 * 2. "A 시작"
 * 3. "B 시작"
 * 4. "C 실행"
 * 5. "B 종료"
 * 6. "A 종료"
 * 7. "전역 종료"
 *
 * 각 단계별 Call Stack 상태:
 *
 * [1] "전역 시작" 출력
 * Stack: [Global]
 *
 * [2] funcA() 호출 → "A 시작" 출력
 * Stack: [Global, funcA]
 *
 * [3] funcB() 호출 → "B 시작" 출력
 * Stack: [Global, funcA, funcB]
 *
 * [4] funcC() 호출 → "C 실행" 출력
 * Stack: [Global, funcA, funcB, funcC]
 *
 * [4-1] funcC() 종료
 * Stack: [Global, funcA, funcB]
 *
 * [5] "B 종료" 출력 → funcB() 종료
 * Stack: [Global, funcA]
 *
 * [6] "A 종료" 출력 → funcA() 종료
 * Stack: [Global]
 *
 * [7] "전역 종료" 출력
 * Stack: [Global]
 */

console.log("\n==================================================\n");

/**
 * TODO 2 정답: 간단한 계산 함수 체인
 */

console.log("--- TODO 2 정답: 계산 함수 체인 ---\n");

function multiply(a, b) {
	console.log(`multiply(${a}, ${b}) 호출`);
	return a * b;
}

function add(a, b) {
	console.log(`add(${a}, ${b}) 호출`);
	return a + b;
}

function calculate() {
	console.log("calculate() 시작");
	const multiplyResult = multiply(3, 4); // 12
	const finalResult = add(multiplyResult, 5); // 17
	console.log("calculate() 종료");
	return finalResult;
}

console.log("계산 시작");
const result = calculate();
console.log(`최종 결과: ${result}`);
console.log("계산 종료");

/**
 * 실행 순서:
 * 1. "계산 시작"
 * 2. "calculate() 시작"
 * 3. "multiply(3, 4) 호출"
 * 4. "add(12, 5) 호출"
 * 5. "calculate() 종료"
 * 6. "최종 결과: 17"
 * 7. "계산 종료"
 *
 * Call Stack 변화:
 * [1-2] Stack: [Global, calculate]
 * [3] Stack: [Global, calculate, multiply]
 * [3-1] multiply 종료 → Stack: [Global, calculate]
 * [4] Stack: [Global, calculate, add]
 * [4-1] add 종료 → Stack: [Global, calculate]
 * [5] calculate 종료 → Stack: [Global]
 */

console.log("\n==================================================\n");

/**
 * TODO 3 정답: 재귀 함수로 팩토리얼 구현
 */

console.log("--- TODO 3 정답: 팩토리얼 재귀 함수 ---\n");

function factorial(n) {
	console.log(`factorial(${n}) 호출`);

	// 기저 조건 (base case)
	if (n === 0 || n === 1) {
		console.log(`→ factorial(${n}) 반환: 1`);
		return 1;
	}

	// 재귀 호출
	const result = n * factorial(n - 1);
	console.log(`→ factorial(${n}) 반환: ${result}`);
	return result;
}

console.log("5! 계산 시작");
const factorialResult = factorial(5);
console.log(`5! = ${factorialResult}`);

/**
 * Call Stack 최대 깊이: 6
 * (Global → factorial(5) → factorial(4) → factorial(3) → factorial(2) → factorial(1))
 *
 * 실행 순서:
 * 1. factorial(5) 호출
 * 2. factorial(4) 호출
 * 3. factorial(3) 호출
 * 4. factorial(2) 호출
 * 5. factorial(1) 호출 → 1 반환
 * 6. factorial(2) → 2 * 1 = 2 반환
 * 7. factorial(3) → 3 * 2 = 6 반환
 * 8. factorial(4) → 4 * 6 = 24 반환
 * 9. factorial(5) → 5 * 24 = 120 반환
 *
 * Call Stack 시각화:
 *
 * [최대 깊이]
 * Stack: [Global, factorial(5), factorial(4), factorial(3), factorial(2), factorial(1)]
 *
 * [반환 시작]
 * factorial(1) 반환 후
 * Stack: [Global, factorial(5), factorial(4), factorial(3), factorial(2)]
 *
 * factorial(2) 반환 후
 * Stack: [Global, factorial(5), factorial(4), factorial(3)]
 *
 * ... 순차적으로 pop되며 최종 결과 계산
 */

console.log("\n==================================================\n");

/**
 * TODO 4 정답: Call Stack 오버플로우 이해하기
 */

console.log("--- TODO 4 정답: Stack Overflow 체험 ---\n");

function infiniteRecursion(count = 0) {
	if (count < 5) {
		// 처음 5번만 출력
		console.log(`재귀 호출 횟수: ${count}`);
	}
	infiniteRecursion(count + 1); // 무한 재귀
}

/**
 * 주석을 해제하면 다음 에러가 발생합니다:
 *
 * RangeError: Maximum call stack size exceeded
 *
 * 이는 Call Stack이 허용하는 최대 크기를 초과했다는 의미입니다.
 * 브라우저나 Node.js 환경마다 스택 크기 제한이 다르지만,
 * 일반적으로 수천~수만 번의 재귀 호출 후 발생합니다.
 *
 * 무한 재귀를 방지하려면:
 * 1. 기저 조건(base case)를 반드시 포함
 * 2. 재귀 호출 시 기저 조건으로 수렴하도록 설계
 * 3. 깊이 제한을 두거나 반복문으로 대체 고려
 */

console.log("(안전을 위해 주석 처리된 상태입니다)");
console.log("주석을 해제하여 실행하면 'RangeError: Maximum call stack size exceeded' 발생");

// 안전한 테스트를 원한다면 아래처럼 깊이 제한을 두세요
function safeRecursion(n, limit = 10000) {
	if (n >= limit) {
		console.log(`\n재귀 깊이 제한(${limit})에 도달했습니다.`);
		return;
	}
	safeRecursion(n + 1, limit);
}

console.log("\n안전한 재귀 테스트 (깊이 제한 100):");
safeRecursion(0, 100);

console.log("\n==================================================\n");

/**
 * 핵심 정리
 *
 * ✅ Call Stack은 함수 호출을 LIFO 방식으로 관리
 * ✅ 함수 호출 시마다 실행 컨텍스트가 스택에 push
 * ✅ 함수 종료 시 스택에서 pop
 * ✅ 재귀 함수는 각 호출마다 새로운 실행 컨텍스트 생성
 * ✅ 너무 깊은 재귀는 Stack Overflow 발생
 * ✅ 기저 조건(base case)은 재귀 함수의 필수 요소
 *
 * 다음 학습: 02-task-queue.js
 */

console.log("\n=== 01. Call Stack 정답 확인 완료! ===\n");
