/**
 * 04. Event Loop 전체 시각화 - 정답
 */

console.log("=== Event Loop 시각화 정답 ===\n");

/**
 * TODO 1 정답: 기본 실행 순서 예측
 */

console.log("--- TODO 1 정답 ---\n");

console.log("Start");

setTimeout(() => console.log("Timer 1"), 0);

Promise.resolve()
	.then(() => console.log("Promise 1"))
	.then(() => console.log("Promise 2"));

setTimeout(() => console.log("Timer 2"), 0);

console.log("End");

/**
 * 출력 순서:
 * 1. Start
 * 2. End
 * 3. Promise 1
 * 4. Promise 2
 * 5. Timer 1
 * 6. Timer 2
 *
 * Queue 시각화:
 *
 * [Call Stack]
 * "Start" → setTimeout 1 → Promise.then() → setTimeout 2 → "End"
 * Task Queue: [Timer 1, Timer 2]
 * Microtask Queue: [Promise 1]
 *
 * [Microtask Round 1]
 * "Promise 1" → 체이닝 .then() 등록
 * Microtask Queue: [Promise 2]
 *
 * [Microtask Round 2]
 * "Promise 2"
 * Microtask Queue: []
 *
 * [Task Round 1]
 * "Timer 1"
 *
 * [Task Round 2]
 * "Timer 2"
 */

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * TODO 2 정답: 중첩된 Promise
	 */

	console.log("--- TODO 2 정답 ---\n");

	console.log("A");

	Promise.resolve()
		.then(() => {
			console.log("B");
			return Promise.resolve();
		})
		.then(() => {
			console.log("C");
		});

	Promise.resolve()
		.then(() => {
			console.log("D");
		})
		.then(() => {
			console.log("E");
		});

	console.log("F");

	/**
	 * 출력 순서: A → F → B → D → C → E
	 *
	 * 상세 설명:
	 *
	 * [Call Stack]
	 * "A" → 첫 Promise 등록 → 두 번째 Promise 등록 → "F"
	 * Microtask: [Promise1-then1, Promise2-then1]
	 *
	 * [Microtask Round 1]
	 * "B" 출력, Promise.resolve() 반환
	 * Microtask: [Promise2-then1]
	 * (Promise1-then2는 다음 라운드 대기)
	 *
	 * [Microtask Round 2]
	 * "D" 출력
	 * Microtask: [Promise1-then2, Promise2-then2]
	 *
	 * [Microtask Round 3]
	 * "C" 출력
	 * Microtask: [Promise2-then2]
	 *
	 * [Microtask Round 4]
	 * "E" 출력
	 */
}, 2000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * TODO 3 정답: Timer 안의 Promise
	 */

	console.log("--- TODO 3 정답 ---\n");

	setTimeout(() => {
		console.log("Timer 1");
		Promise.resolve().then(() => console.log("Promise in Timer 1"));
	}, 0);

	setTimeout(() => {
		console.log("Timer 2");
		Promise.resolve().then(() => console.log("Promise in Timer 2"));
	}, 0);

	Promise.resolve().then(() => console.log("Promise 1"));

	/**
	 * 출력 순서:
	 * 1. Promise 1
	 * 2. Timer 1
	 * 3. Promise in Timer 1
	 * 4. Timer 2
	 * 5. Promise in Timer 2
	 *
	 * 핵심 원리:
	 *
	 * [초기 Call Stack]
	 * Task Queue: [Timer 1 콜백, Timer 2 콜백]
	 * Microtask Queue: [Promise 1]
	 *
	 * [Microtask]
	 * "Promise 1" 출력
	 *
	 * [Task Round 1 - Timer 1 실행]
	 * "Timer 1" 출력
	 * Microtask Queue: [Promise in Timer 1]
	 * → Microtask 즉시 실행!
	 * "Promise in Timer 1" 출력
	 *
	 * [Task Round 2 - Timer 2 실행]
	 * "Timer 2" 출력
	 * Microtask Queue: [Promise in Timer 2]
	 * → Microtask 즉시 실행!
	 * "Promise in Timer 2" 출력
	 *
	 * 중요: 각 Task 실행 후 Microtask Queue를 확인하고 모두 실행!
	 */
}, 5000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * TODO 4 정답: 복잡한 통합 패턴
	 */

	console.log("--- TODO 4 정답 ---\n");

	console.log("1");

	setTimeout(() => {
		console.log("2");
		Promise.resolve().then(() => {
			console.log("3");
		});
	}, 0);

	Promise.resolve()
		.then(() => {
			console.log("4");
		})
		.then(() => {
			console.log("5");
			setTimeout(() => {
				console.log("6");
			}, 0);
		});

	console.log("7");

	/**
	 * 출력 순서: 1 → 7 → 4 → 5 → 2 → 3 → 6
	 *
	 * 단계별 분석:
	 *
	 * [Call Stack]
	 * "1" → setTimeout 등록 → Promise 등록 → "7"
	 * Task: [Task-2]
	 * Microtask: [Promise-4]
	 *
	 * [Microtask Round 1-1]
	 * "4" → 체이닝 등록
	 * Microtask: [Promise-5]
	 *
	 * [Microtask Round 1-2]
	 * "5" → setTimeout 등록
	 * Task: [Task-2, Task-6]
	 * Microtask: []
	 *
	 * [Task Round 1]
	 * "2" → Promise 등록
	 * Microtask: [Promise-3]
	 * → 즉시 Microtask 실행!
	 * "3"
	 *
	 * [Task Round 2]
	 * "6"
	 */
}, 8000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * TODO 5 정답: 초고난도 종합 문제
	 */

	console.log("--- TODO 5 정답 ---\n");

	console.log("A");

	setTimeout(() => {
		console.log("B");
		Promise.resolve()
			.then(() => console.log("C"))
			.then(() => console.log("D"));
	}, 0);

	Promise.resolve()
		.then(() => {
			console.log("E");
			setTimeout(() => {
				console.log("F");
				Promise.resolve().then(() => console.log("G"));
			}, 0);
		})
		.then(() => console.log("H"));

	setTimeout(() => console.log("I"), 0);

	Promise.resolve().then(() => console.log("J"));

	console.log("K");

	/**
	 * 출력 순서: A → K → E → J → H → B → C → D → I → F → G
	 *
	 * 완전 분석:
	 *
	 * [Call Stack 완료 후]
	 * Task: [Task-B, Task-I]
	 * Microtask: [Promise-E, Promise-J]
	 *
	 * [Microtask Round 1-1]
	 * "E" → setTimeout 등록 → 체이닝 등록
	 * Task: [Task-B, Task-I, Task-F]
	 * Microtask: [Promise-J, Promise-H]
	 *
	 * [Microtask Round 1-2]
	 * "J"
	 * Microtask: [Promise-H]
	 *
	 * [Microtask Round 1-3]
	 * "H"
	 * Microtask: []
	 *
	 * [Task Round 1 - B 실행]
	 * "B" → Promise 체이닝 등록
	 * Microtask: [Promise-C]
	 * → Microtask 실행!
	 * "C" → 체이닝 등록
	 * Microtask: [Promise-D]
	 * "D"
	 *
	 * [Task Round 2 - I 실행]
	 * "I"
	 *
	 * [Task Round 3 - F 실행]
	 * "F" → Promise 등록
	 * Microtask: [Promise-G]
	 * → Microtask 실행!
	 * "G"
	 *
	 * 핵심 포인트:
	 * ✅ 각 Task 실행 후 Microtask 전체 실행
	 * ✅ Promise 체이닝은 각각 별도 Microtask
	 * ✅ Timer 안의 Promise도 즉시 Microtask Queue 처리
	 */
}, 12000);

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("\n=== 04. Event Loop 시각화 정답 완료! ===\n");
}, 16000);
