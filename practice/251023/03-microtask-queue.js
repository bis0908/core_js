/**
 * 03. Microtask Queue
 *
 * 학습 목표:
 * - Microtask Queue가 무엇인지 이해하기
 * - Promise.then()의 실행 시점 파악하기
 * - Microtask와 Task의 우선순위 이해하기
 * - 이벤트 루프에서 Microtask의 역할 이해하기
 */

console.log("=== Microtask Queue 기본 개념 학습 ===\n");

/**
 * Microtask Queue란?
 *
 * Microtask Queue는 Task Queue보다 높은 우선순위를 가진 큐입니다.
 *
 * 주요 Microtask 작업:
 * - Promise.then() / catch() / finally()
 * - queueMicrotask()
 * - MutationObserver
 * - process.nextTick() (Node.js - 더 높은 우선순위)
 *
 * 이벤트 루프의 실행 순서:
 * 1. Call Stack 실행
 * 2. Call Stack이 비면 → Microtask Queue 전체 실행
 * 3. Microtask Queue가 비면 → Task Queue에서 하나 실행
 * 4. 다시 1번으로
 *
 * 핵심: Microtask는 Task보다 항상 먼저 실행됨!
 */

console.log("--- 예제 1: Promise.then()의 기본 동작 ---\n");

console.log("1. 동기 코드 시작");

Promise.resolve().then(() => {
	console.log("3. Promise.then() 실행");
});

console.log("2. 동기 코드 종료");

/**
 * 실행 흐름:
 *
 * [Call Stack]
 * 1. "1. 동기 코드 시작" 출력
 * 2. Promise.resolve() → 즉시 fulfilled 상태
 * 3. .then() 콜백 → Microtask Queue에 추가
 * 4. "2. 동기 코드 종료" 출력
 * 5. Call Stack 비어있음
 *
 * [Microtask Queue]
 * 6. Microtask Queue의 콜백 실행
 * 7. "3. Promise.then() 실행" 출력
 *
 * 핵심: Promise.then()은 동기 코드가 모두 끝난 후 실행됨!
 */

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- 예제 2: Microtask vs Task 우선순위 ---\n");

	console.log("1. 시작");

	setTimeout(() => {
		console.log("5. setTimeout (Task Queue)");
	}, 0);

	Promise.resolve().then(() => {
		console.log("3. Promise.then (Microtask Queue)");
	});

	Promise.resolve().then(() => {
		console.log("4. Promise.then 2 (Microtask Queue)");
	});

	console.log("2. 종료");

	/**
	 * 실행 순서:
	 * 1. "1. 시작" (Call Stack)
	 * 2. "2. 종료" (Call Stack)
	 * 3. "3. Promise.then (Microtask Queue)" - Microtask 우선!
	 * 4. "4. Promise.then 2 (Microtask Queue)" - 모든 Microtask 실행!
	 * 5. "5. setTimeout (Task Queue)" - Microtask 이후에 Task 실행
	 *
	 * 핵심:
	 * - 동기 코드 → Microtask Queue 전체 → Task Queue 하나
	 * - setTimeout(0)보다 Promise.then()이 먼저 실행됨!
	 */
}, 1000);

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- 예제 3: 체이닝된 Microtask ---\n");

	console.log("A");

	Promise.resolve()
		.then(() => {
			console.log("B");
			return Promise.resolve();
		})
		.then(() => {
			console.log("C");
		});

	Promise.resolve().then(() => {
		console.log("D");
	});

	console.log("E");

	/**
	 * 실행 순서: A → E → B → D → C
	 *
	 * 상세 흐름:
	 *
	 * [Call Stack]
	 * 1. "A" 출력
	 * 2. 첫 번째 Promise의 .then() → Microtask Queue에 추가
	 * 3. 두 번째 Promise의 .then() → Microtask Queue에 추가
	 * 4. "E" 출력
	 * 5. Call Stack 비어있음
	 *
	 * [Microtask Queue 처리 - 첫 번째 라운드]
	 * 6. 첫 번째 .then() 실행 → "B" 출력
	 *    - Promise.resolve() 반환 → 두 번째 .then() 대기
	 * 7. 두 번째 Promise의 .then() 실행 → "D" 출력
	 *
	 * [Microtask Queue 처리 - 두 번째 라운드]
	 * 8. 첫 번째 Promise의 두 번째 .then() 실행 → "C" 출력
	 *
	 * 핵심: Promise 체이닝도 각 .then()이 Microtask로 처리됨!
	 */
}, 3000);

/**
 * TODO 1: 실행 순서 예측하기
 *
 * 요구사항:
 * 아래 코드의 출력 순서를 예측하세요.
 */

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- TODO 1: 실행 순서 예측 ---\n");

	// console.log("Start");
	//
	// setTimeout(() => {
	//   console.log("Timeout 1");
	// }, 0);
	//
	// Promise.resolve().then(() => {
	//   console.log("Promise 1");
	// });
	//
	// setTimeout(() => {
	//   console.log("Timeout 2");
	// }, 0);
	//
	// Promise.resolve().then(() => {
	//   console.log("Promise 2");
	// });
	//
	// console.log("End");

	// 예상 출력 순서:
	// 1.
	// 2.
	// 3.
	// 4.
	// 5.
	// 6.

	// 이유:
	// (여기에 Call Stack, Microtask Queue, Task Queue 흐름을 작성하세요)

	console.log("(TODO 1을 완성하세요)\n");
	console.log("==================================================\n");
}, 5000);

/**
 * TODO 2: 중첩된 Promise 체이닝 순서 예측
 *
 * 요구사항:
 * 아래 코드의 출력 순서를 예측하고 설명하세요.
 */

setTimeout(() => {
	console.log("--- TODO 2: 중첩된 Promise 체이닝 ---\n");

	// Promise.resolve()
	//   .then(() => {
	//     console.log("Then 1");
	//     Promise.resolve().then(() => {
	//       console.log("Then 1-1");
	//     });
	//   })
	//   .then(() => {
	//     console.log("Then 2");
	//   });
	//
	// Promise.resolve().then(() => {
	//   console.log("Then 3");
	// });

	// 예상 출력 순서:
	// 1.
	// 2.
	// 3.
	// 4.

	// 각 단계별 Microtask Queue 상태:
	// (여기에 설명을 작성하세요)

	console.log("(TODO 2를 완성하세요)\n");
	console.log("==================================================\n");
}, 7000);

/**
 * TODO 3: queueMicrotask 사용하기
 *
 * 요구사항:
 * - queueMicrotask()를 사용하여 Microtask를 직접 등록하세요
 * - Promise.then()과 queueMicrotask()의 실행 순서를 비교하세요
 */

setTimeout(() => {
	console.log("--- TODO 3: queueMicrotask 사용 ---\n");

	// console.log("Start");
	//
	// queueMicrotask(() => {
	//   console.log("Microtask 1");
	// });
	//
	// Promise.resolve().then(() => {
	//   console.log("Promise 1");
	// });
	//
	// queueMicrotask(() => {
	//   console.log("Microtask 2");
	// });
	//
	// console.log("End");

	// 예상 출력 순서:
	// 1.
	// 2.
	// 3.
	// 4.
	// 5.

	// queueMicrotask와 Promise.then()의 차이점:
	// (여기에 설명을 작성하세요)

	console.log("(TODO 3을 완성하세요)\n");
	console.log("==================================================\n");
}, 9000);

/**
 * TODO 4: Microtask 체이닝 구현하기
 *
 * 요구사항:
 * - 3개의 비동기 작업을 순차적으로 실행하는 함수를 만드세요
 * - 각 작업은 Promise를 반환하고 메시지를 출력합니다
 * - .then() 체이닝을 사용하세요
 */

setTimeout(() => {
	console.log("--- TODO 4: Microtask 체이닝 구현 ---\n");

	// function task1() {
	//   return Promise.resolve().then(() => {
	//     console.log("작업 1 완료");
	//     return "결과 1";
	//   });
	// }

	// function task2(prevResult) {
	//   return Promise.resolve().then(() => {
	//     console.log("작업 2 완료, 이전 결과:", prevResult);
	//     return "결과 2";
	//   });
	// }

	// function task3(prevResult) {
	//   return Promise.resolve().then(() => {
	//     console.log("작업 3 완료, 이전 결과:", prevResult);
	//     return "최종 결과";
	//   });
	// }

	// 체이닝으로 연결하세요
	// task1()
	//   .then(result1 => {
	//     // 여기에 코드 작성
	//   })
	//   .then(result2 => {
	//     // 여기에 코드 작성
	//   })
	//   .then(finalResult => {
	//     console.log("모든 작업 완료:", finalResult);
	//   });

	console.log("(TODO 4를 완성하세요)\n");
	console.log("==================================================\n");
}, 11000);

/**
 * 학습 정리
 *
 * ✅ Microtask Queue는 Task Queue보다 높은 우선순위
 * ✅ Promise.then()은 Microtask Queue에 추가됨
 * ✅ Call Stack 비면 → Microtask 전체 실행 → Task 하나 실행
 * ✅ Microtask가 Microtask를 추가하면 현재 라운드에서 모두 실행
 * ✅ setTimeout(0)보다 Promise.then()이 항상 먼저 실행
 *
 * 다음 학습: 04-event-loop-visualization.js (전체 흐름 시각화)
 */

setTimeout(() => {
	console.log("\n=== 03. Microtask Queue 학습 완료! ===");
	console.log("\n정답 확인: 03-microtask-queue-answer.js");
	console.log("다음 단계: node 04-event-loop-visualization.js\n");
}, 15000);
