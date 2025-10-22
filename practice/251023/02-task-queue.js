/**
 * 02. Task Queue (Macrotask Queue)
 *
 * 학습 목표:
 * - Task Queue가 무엇인지 이해하기
 * - setTimeout, setInterval의 동작 원리 파악하기
 * - Call Stack과 Task Queue의 관계 이해하기
 * - 이벤트 루프의 기본 동작 이해하기
 */

console.log("=== Task Queue 기본 개념 학습 ===\n");

/**
 * Task Queue란?
 *
 * Task Queue (또는 Macrotask Queue)는 비동기 작업들이 대기하는 큐입니다.
 *
 * 주요 Task Queue 작업:
 * - setTimeout
 * - setInterval
 * - setImmediate (Node.js)
 * - I/O 작업
 * - UI 렌더링
 *
 * 이벤트 루프의 기본 동작:
 * 1. Call Stack이 비어있는지 확인
 * 2. Call Stack이 비어있으면 Task Queue에서 작업 하나를 가져옴
 * 3. 가져온 작업을 Call Stack에 추가하여 실행
 * 4. 1번으로 돌아가서 반복
 */

console.log("--- 예제 1: setTimeout의 기본 동작 ---\n");

console.log("1. 동기 코드 시작");

setTimeout(() => {
	console.log("3. setTimeout 콜백 실행 (1초 후)");
}, 1000);

console.log("2. 동기 코드 종료");

/**
 * 실행 흐름:
 *
 * [동기 코드 실행 단계]
 * 1. "1. 동기 코드 시작" 출력 (Call Stack)
 * 2. setTimeout 호출 → Web API에 타이머 등록
 * 3. "2. 동기 코드 종료" 출력 (Call Stack)
 * 4. Call Stack 비어있음
 *
 * [타이머 완료 후]
 * 5. 1초 경과 → 콜백이 Task Queue에 추가됨
 * 6. 이벤트 루프가 Task Queue의 콜백을 Call Stack으로 이동
 * 7. "3. setTimeout 콜백 실행" 출력
 */

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- 예제 2: setTimeout(0)의 의미 ---\n");

	console.log("1. 동기 코드 A");

	setTimeout(() => {
		console.log("4. setTimeout(0) 콜백");
	}, 0);

	console.log("2. 동기 코드 B");
	console.log("3. 동기 코드 C");

	/**
	 * setTimeout(0)의 의미:
	 *
	 * - 0ms 후에 실행되는 것이 아님!
	 * - "Call Stack이 비워진 후 가능한 빨리 실행"
	 * - 최소 지연 시간은 약 4ms (브라우저 환경)
	 *
	 * 실행 순서:
	 * 1. 동기 코드 A → Call Stack
	 * 2. setTimeout(0) → Task Queue에 등록
	 * 3. 동기 코드 B → Call Stack
	 * 4. 동기 코드 C → Call Stack
	 * 5. Call Stack 비어있음
	 * 6. 이벤트 루프가 Task Queue의 콜백을 실행
	 * 7. setTimeout(0) 콜백 → Call Stack
	 */
}, 2000);

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- 예제 3: 여러 setTimeout의 실행 순서 ---\n");

	console.log("A");

	setTimeout(() => {
		console.log("D (1000ms)");
	}, 1000);

	setTimeout(() => {
		console.log("C (500ms)");
	}, 500);

	setTimeout(() => {
		console.log("B (0ms)");
	}, 0);

	console.log("E");

	/**
	 * 실행 순서: A → E → B (0ms) → C (500ms) → D (1000ms)
	 *
	 * 이유:
	 * 1. A, E는 동기 코드이므로 즉시 실행
	 * 2. setTimeout들은 각각의 지연시간 후 Task Queue에 추가
	 * 3. 0ms → 500ms → 1000ms 순서로 Task Queue에 도착
	 * 4. 이벤트 루프가 순서대로 실행
	 */
}, 4000);

/**
 * TODO 1: 실행 순서 예측하기
 *
 * 요구사항:
 * 아래 코드의 출력 순서를 예측하세요.
 */

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- TODO 1: 실행 순서 예측 ---\n");

	// console.log("시작");
	//
	// setTimeout(() => {
	//   console.log("타이머 1");
	// }, 0);
	//
	// setTimeout(() => {
	//   console.log("타이머 2");
	// }, 0);
	//
	// console.log("종료");

	// 예상 출력 순서:
	// 1.
	// 2.
	// 3.
	// 4.

	// 이유:
	// (여기에 설명을 작성하세요)

	console.log("(TODO 1을 완성하세요)\n");
	console.log("==================================================\n");
}, 6000);

/**
 * TODO 2: 카운트다운 타이머 만들기
 *
 * 요구사항:
 * - startCountdown(n) 함수를 만드세요
 * - n부터 0까지 1초 간격으로 카운트다운
 * - 0에 도달하면 "발사!" 출력
 * - setTimeout을 사용하여 구현
 */

setTimeout(() => {
	console.log("--- TODO 2: 카운트다운 타이머 ---\n");

	// function startCountdown(n) {
	//   // 힌트: 재귀적으로 setTimeout을 호출하면 됩니다
	//   console.log(n);
	//
	//   if (n === 0) {
	//     console.log("발사! 🚀");
	//     return;
	//   }
	//
	//   // 1초 후에 startCountdown(n - 1) 호출
	//   // 여기에 코드 작성
	// }

	// 테스트 코드
	// console.log("카운트다운 시작:");
	// startCountdown(3);

	console.log("(TODO 2를 완성하세요)\n");
	console.log("==================================================\n");
}, 8000);

/**
 * TODO 3: 순차적 메시지 출력기
 *
 * 요구사항:
 * - printMessages(messages, delay) 함수를 만드세요
 * - messages: 문자열 배열
 * - delay: 각 메시지 사이의 지연 시간(ms)
 * - 배열의 각 메시지를 순서대로 delay만큼 간격을 두고 출력
 */

setTimeout(() => {
	console.log("--- TODO 3: 순차적 메시지 출력기 ---\n");

	// function printMessages(messages, delay) {
	//   // 힌트: messages.forEach와 setTimeout을 조합하되,
	//   // 각 메시지마다 다른 지연 시간을 설정해야 합니다
	//
	//   // 여기에 코드 작성
	// }

	// 테스트 코드
	// const messages = ["첫 번째", "두 번째", "세 번째", "네 번째"];
	// console.log("메시지 출력 시작:");
	// printMessages(messages, 500);

	console.log("(TODO 3을 완성하세요)\n");
	console.log("==================================================\n");
}, 10000);

/**
 * TODO 4: setInterval로 반복 작업 만들기
 *
 * 요구사항:
 * - 0부터 시작해서 1초마다 숫자를 1씩 증가시켜 출력
 * - 5에 도달하면 자동으로 멈춤
 * - setInterval과 clearInterval을 사용
 */

setTimeout(() => {
	console.log("--- TODO 4: setInterval 반복 작업 ---\n");

	// let count = 0;
	//
	// const intervalId = setInterval(() => {
	//   console.log(`카운트: ${count}`);
	//   count++;
	//
	//   // 5에 도달하면 interval 중지
	//   if (count > 5) {
	//     // 여기에 코드 작성
	//     console.log("카운트 종료");
	//   }
	// }, 1000);

	console.log("(TODO 4를 완성하세요)\n");
	console.log("==================================================\n");
}, 12000);

/**
 * 학습 정리
 *
 * ✅ Task Queue는 비동기 작업(setTimeout, setInterval 등)이 대기하는 큐
 * ✅ Call Stack이 비어있을 때만 Task Queue의 작업이 실행됨
 * ✅ setTimeout(0)은 "즉시 실행"이 아니라 "Call Stack이 비워진 후 실행"
 * ✅ 타이머 지연 시간은 "최소 지연 시간"을 의미
 * ✅ 이벤트 루프가 Call Stack과 Task Queue를 연결
 *
 * 다음 학습: 03-microtask-queue.js (Microtask Queue와 우선순위)
 */

setTimeout(() => {
	console.log("\n=== 02. Task Queue 학습 완료! ===");
	console.log("\n정답 확인: 02-task-queue-answer.js");
	console.log("다음 단계: node 03-microtask-queue.js\n");
}, 20000);
