/**
 * 04. Event Loop 전체 시각화
 *
 * 학습 목표:
 * - Call Stack, Task Queue, Microtask Queue의 통합 동작 이해하기
 * - 복잡한 비동기 코드의 실행 순서 예측하기
 * - 이벤트 루프의 완전한 사이클 파악하기
 * - 실전 패턴의 실행 흐름 마스터하기
 */

console.log("=== Event Loop 전체 시각화 학습 ===\n");

/**
 * Event Loop의 완전한 동작 원리:
 *
 * 1단계: Call Stack 실행
 *   - 동기 코드를 모두 실행
 *   - 함수 호출은 push, 종료는 pop
 *
 * 2단계: Microtask Queue 처리
 *   - Call Stack이 비면 Microtask Queue 확인
 *   - Microtask Queue가 빌 때까지 모든 작업 실행
 *   - Promise.then(), queueMicrotask() 등
 *
 * 3단계: Task Queue 처리
 *   - Microtask Queue가 비면 Task Queue에서 하나만 가져옴
 *   - setTimeout, setInterval 등
 *
 * 4단계: 렌더링 (브라우저)
 *   - 필요시 화면 업데이트
 *
 * 5단계: 1단계로 돌아가서 반복
 *
 * 핵심 규칙:
 * - 동기 코드 → Microtask 전체 → Task 하나 → 반복
 * - Microtask는 Task보다 항상 우선
 * - 각 Task 실행 후 Microtask Queue 재확인
 */

console.log("--- 예제 1: 기본 실행 순서 ---\n");

console.log("1. Sync Start");

setTimeout(() => console.log("4. Task"), 0);
Promise.resolve().then(() => console.log("3. Microtask"));

console.log("2. Sync End");

/**
 * 시각화:
 *
 * [Call Stack]
 * 1. "1. Sync Start" 출력
 * 2. setTimeout 등록 → Task Queue: [Task]
 * 3. Promise.then() 등록 → Microtask Queue: [Microtask]
 * 4. "2. Sync End" 출력
 * 5. Call Stack 비어있음
 *
 * [Microtask Queue 처리]
 * 6. "3. Microtask" 출력
 * 7. Microtask Queue 비어있음
 *
 * [Task Queue 처리]
 * 8. "4. Task" 출력
 */

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- 예제 2: 다중 Promise와 Timer ---\n");

	console.log("A");

	setTimeout(() => console.log("F"), 0);

	Promise.resolve()
		.then(() => console.log("C"))
		.then(() => console.log("D"));

	Promise.resolve().then(() => console.log("E"));

	console.log("B");

	/**
	 * 실행 순서: A → B → C → E → D → F
	 *
	 * 시각화:
	 *
	 * [Call Stack]
	 * "A" 출력
	 * setTimeout → Task Queue: [F]
	 * 첫 Promise의 첫 .then() → Microtask Queue: [C]
	 * 두 번째 Promise의 .then() → Microtask Queue: [C, E]
	 * "B" 출력
	 * Call Stack 비어있음
	 *
	 * [Microtask Round 1]
	 * "C" 출력
	 * → 체이닝된 .then() 등록 → Microtask Queue: [E, D]
	 *
	 * [Microtask Round 2]
	 * "E" 출력
	 * Microtask Queue: [D]
	 *
	 * [Microtask Round 3]
	 * "D" 출력
	 * Microtask Queue 비어있음
	 *
	 * [Task Queue]
	 * "F" 출력
	 */
}, 1000);

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- 예제 3: 복잡한 중첩 패턴 ---\n");

	console.log("1");

	setTimeout(() => {
		console.log("7");
		Promise.resolve().then(() => console.log("8"));
	}, 0);

	Promise.resolve()
		.then(() => {
			console.log("3");
			setTimeout(() => console.log("9"), 0);
		})
		.then(() => console.log("5"));

	Promise.resolve().then(() => console.log("4"));

	console.log("2");

	/**
	 * 실행 순서: 1 → 2 → 3 → 4 → 5 → 7 → 8 → 9
	 *
	 * 왜 이 순서인가?
	 *
	 * [Call Stack]
	 * "1" 출력
	 * setTimeout 1 → Task Queue: [Task-7]
	 * Promise 1의 .then() → Microtask: [Promise-3]
	 * Promise 2의 .then() → Microtask: [Promise-3, Promise-4]
	 * "2" 출력
	 *
	 * [Microtask Round 1-1]
	 * "3" 출력
	 * setTimeout 2 → Task Queue: [Task-7, Task-9]
	 * 체이닝 .then() → Microtask: [Promise-4, Promise-5]
	 *
	 * [Microtask Round 1-2]
	 * "4" 출력
	 * Microtask: [Promise-5]
	 *
	 * [Microtask Round 1-3]
	 * "5" 출력
	 * Microtask 비어있음
	 *
	 * [Task Round 1]
	 * "7" 출력
	 * Promise.then() → Microtask: [Promise-8]
	 *
	 * [Microtask Round 2-1]
	 * "8" 출력
	 * Microtask 비어있음
	 *
	 * [Task Round 2]
	 * "9" 출력
	 */
}, 3000);

/**
 * TODO 1: 기본 실행 순서 예측 (난이도: ⭐⭐)
 */

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- TODO 1: 기본 실행 순서 예측 ---\n");

	// console.log("Start");
	//
	// setTimeout(() => console.log("Timer 1"), 0);
	//
	// Promise.resolve()
	//   .then(() => console.log("Promise 1"))
	//   .then(() => console.log("Promise 2"));
	//
	// setTimeout(() => console.log("Timer 2"), 0);
	//
	// console.log("End");

	// 예상 출력 순서 (1~6):
	// 1.
	// 2.
	// 3.
	// 4.
	// 5.
	// 6.

	// 각 단계별 Queue 상태를 시각화하세요:
	// (여기에 작성)

	console.log("(TODO 1을 완성하세요)\n");
	console.log("==================================================\n");
}, 6000);

/**
 * TODO 2: 중첩된 Promise 예측 (난이도: ⭐⭐⭐)
 */

setTimeout(() => {
	console.log("--- TODO 2: 중첩된 Promise ---\n");

	// console.log("A");
	//
	// Promise.resolve()
	//   .then(() => {
	//     console.log("B");
	//     return Promise.resolve();
	//   })
	//   .then(() => {
	//     console.log("C");
	//   });
	//
	// Promise.resolve()
	//   .then(() => {
	//     console.log("D");
	//   })
	//   .then(() => {
	//     console.log("E");
	//   });
	//
	// console.log("F");

	// 예상 출력 순서:
	// 1.
	// 2.
	// 3.
	// 4.
	// 5.
	// 6.

	console.log("(TODO 2를 완성하세요)\n");
	console.log("==================================================\n");
}, 8000);

/**
 * TODO 3: Timer 안의 Promise (난이도: ⭐⭐⭐)
 */

setTimeout(() => {
	console.log("--- TODO 3: Timer 안의 Promise ---\n");

	// setTimeout(() => {
	//   console.log("Timer 1");
	//   Promise.resolve().then(() => console.log("Promise in Timer 1"));
	// }, 0);
	//
	// setTimeout(() => {
	//   console.log("Timer 2");
	//   Promise.resolve().then(() => console.log("Promise in Timer 2"));
	// }, 0);
	//
	// Promise.resolve().then(() => console.log("Promise 1"));

	// 예상 출력 순서:
	// 1.
	// 2.
	// 3.
	// 4.
	// 5.

	// 왜 이 순서인가요?
	// (각 Task 실행 후 Microtask Queue를 확인하는 과정을 설명하세요)

	console.log("(TODO 3을 완성하세요)\n");
	console.log("==================================================\n");
}, 10000);

/**
 * TODO 4: 복잡한 통합 패턴 (난이도: ⭐⭐⭐⭐)
 */

setTimeout(() => {
	console.log("--- TODO 4: 복잡한 통합 패턴 ---\n");

	// console.log("1");
	//
	// setTimeout(() => {
	//   console.log("2");
	//   Promise.resolve().then(() => {
	//     console.log("3");
	//   });
	// }, 0);
	//
	// Promise.resolve()
	//   .then(() => {
	//     console.log("4");
	//   })
	//   .then(() => {
	//     console.log("5");
	//     setTimeout(() => {
	//       console.log("6");
	//     }, 0);
	//   });
	//
	// console.log("7");

	// 예상 출력 순서:
	// 1.
	// 2.
	// 3.
	// 4.
	// 5.
	// 6.
	// 7.

	// Call Stack / Microtask / Task의 변화를 단계별로 작성하세요

	console.log("(TODO 4를 완성하세요)\n");
	console.log("==================================================\n");
}, 12000);

/**
 * TODO 5: 초고난도 종합 문제 (난이도: ⭐⭐⭐⭐⭐)
 */

setTimeout(() => {
	console.log("--- TODO 5: 초고난도 종합 문제 ---\n");

	// console.log("A");
	//
	// setTimeout(() => {
	//   console.log("B");
	//   Promise.resolve()
	//     .then(() => console.log("C"))
	//     .then(() => console.log("D"));
	// }, 0);
	//
	// Promise.resolve()
	//   .then(() => {
	//     console.log("E");
	//     setTimeout(() => {
	//       console.log("F");
	//       Promise.resolve().then(() => console.log("G"));
	//     }, 0);
	//   })
	//   .then(() => console.log("H"));
	//
	// setTimeout(() => console.log("I"), 0);
	//
	// Promise.resolve().then(() => console.log("J"));
	//
	// console.log("K");

	// 예상 출력 순서 (A~K):
	// 1.
	// 2.
	// 3.
	// 4.
	// 5.
	// 6.
	// 7.
	// 8.
	// 9.
	// 10.
	// 11.

	// 이 문제를 풀 수 있다면 Event Loop 마스터!
	// 각 단계를 상세히 설명하세요

	console.log("(TODO 5를 완성하세요)\n");
	console.log("==================================================\n");
}, 14000);

/**
 * 학습 정리
 *
 * ✅ 이벤트 루프: Call Stack → Microtask Queue → Task Queue 순환
 * ✅ 각 Task 실행 후 Microtask Queue 재확인
 * ✅ Microtask는 현재 라운드에서 모두 실행
 * ✅ Promise 체이닝도 각각 별도의 Microtask
 * ✅ Timer 안의 Promise도 Microtask Queue 규칙 준수
 *
 * 다음 학습: 05-nested-timers.js (중첩된 타이머 패턴)
 */

setTimeout(() => {
	console.log("\n=== 04. Event Loop 시각화 학습 완료! ===");
	console.log("\n정답 확인: 04-event-loop-visualization-answer.js");
	console.log("다음 단계: node 05-nested-timers.js\n");
}, 20000);
