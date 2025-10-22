/**
 * 03. Microtask Queue - 정답
 *
 * 이 파일은 03-microtask-queue.js의 모든 TODO 문제 정답을 포함합니다.
 */

console.log("=== Microtask Queue 정답 ===\n");

/**
 * TODO 1 정답: 실행 순서 예측하기
 */

console.log("--- TODO 1 정답: 실행 순서 예측 ---\n");

console.log("Start");

setTimeout(() => {
	console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
	console.log("Promise 1");
});

setTimeout(() => {
	console.log("Timeout 2");
}, 0);

Promise.resolve().then(() => {
	console.log("Promise 2");
});

console.log("End");

/**
 * 예상 출력 순서:
 * 1. "Start"
 * 2. "End"
 * 3. "Promise 1"
 * 4. "Promise 2"
 * 5. "Timeout 1"
 * 6. "Timeout 2"
 *
 * 상세 흐름:
 *
 * [Call Stack 단계]
 * 1. "Start" 출력
 * 2. setTimeout 1 → Task Queue에 등록
 * 3. Promise 1의 .then() → Microtask Queue에 등록
 * 4. setTimeout 2 → Task Queue에 등록
 * 5. Promise 2의 .then() → Microtask Queue에 등록
 * 6. "End" 출력
 * 7. Call Stack 비어있음
 *
 * [Microtask Queue 처리]
 * 8. Promise 1 콜백 실행 → "Promise 1" 출력
 * 9. Promise 2 콜백 실행 → "Promise 2" 출력
 * 10. Microtask Queue 비어있음
 *
 * [Task Queue 처리]
 * 11. Timeout 1 콜백 실행 → "Timeout 1" 출력
 * 12. Timeout 2 콜백 실행 → "Timeout 2" 출력
 *
 * 핵심: Microtask Queue가 완전히 비워진 후에야 Task Queue 실행!
 */

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * TODO 2 정답: 중첩된 Promise 체이닝 순서 예측
	 */

	console.log("--- TODO 2 정답: 중첩된 Promise 체이닝 ---\n");

	Promise.resolve()
		.then(() => {
			console.log("Then 1");
			Promise.resolve().then(() => {
				console.log("Then 1-1");
			});
		})
		.then(() => {
			console.log("Then 2");
		});

	Promise.resolve().then(() => {
		console.log("Then 3");
	});

	/**
	 * 예상 출력 순서:
	 * 1. "Then 1"
	 * 2. "Then 3"
	 * 3. "Then 1-1"
	 * 4. "Then 2"
	 *
	 * 각 단계별 Microtask Queue 상태:
	 *
	 * [초기 상태 - Call Stack 실행 완료]
	 * Microtask Queue: [첫 번째 Promise의 첫 .then(), 두 번째 Promise의 .then()]
	 *
	 * [Microtask Round 1-1]
	 * 실행: 첫 번째 Promise의 첫 .then()
	 * → "Then 1" 출력
	 * → 내부 Promise.resolve().then() 등록
	 * Microtask Queue: [두 번째 Promise의 .then(), 내부 Promise의 .then()]
	 *
	 * [Microtask Round 1-2]
	 * 실행: 두 번째 Promise의 .then()
	 * → "Then 3" 출력
	 * Microtask Queue: [내부 Promise의 .then()]
	 *
	 * [Microtask Round 1-3]
	 * 실행: 내부 Promise의 .then()
	 * → "Then 1-1" 출력
	 * → 첫 번째 Promise의 두 번째 .then() 등록
	 * Microtask Queue: [첫 번째 Promise의 두 번째 .then()]
	 *
	 * [Microtask Round 1-4]
	 * 실행: 첫 번째 Promise의 두 번째 .then()
	 * → "Then 2" 출력
	 * Microtask Queue: []
	 *
	 * 핵심 포인트:
	 * - Promise 체이닝의 각 .then()은 별도의 Microtask
	 * - 중첩된 Promise도 현재 Microtask 라운드에서 처리
	 * - 등록된 순서대로 FIFO 방식으로 실행
	 */
}, 2000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * TODO 3 정답: queueMicrotask 사용하기
	 */

	console.log("--- TODO 3 정답: queueMicrotask 사용 ---\n");

	console.log("Start");

	queueMicrotask(() => {
		console.log("Microtask 1");
	});

	Promise.resolve().then(() => {
		console.log("Promise 1");
	});

	queueMicrotask(() => {
		console.log("Microtask 2");
	});

	console.log("End");

	/**
	 * 예상 출력 순서:
	 * 1. "Start"
	 * 2. "End"
	 * 3. "Microtask 1"
	 * 4. "Promise 1"
	 * 5. "Microtask 2"
	 *
	 * queueMicrotask와 Promise.then()의 차이점:
	 *
	 * [queueMicrotask]
	 * - Microtask를 직접 등록하는 명시적 API
	 * - Promise 생성 없이 Microtask 등록 가능
	 * - 간단하고 직접적인 방법
	 *
	 * [Promise.then()]
	 * - Promise 객체를 통한 간접적 등록
	 * - Promise의 상태 변화에 따라 등록
	 * - 체이닝, 에러 처리 등 추가 기능 제공
	 *
	 * [우선순위]
	 * - 둘 다 Microtask Queue에 들어감
	 * - 등록된 순서대로 FIFO 방식으로 실행
	 * - 우선순위는 동일 (등록 순서가 실행 순서)
	 *
	 * [실행 흐름]
	 * Call Stack:
	 * 1. "Start" 출력
	 * 2. queueMicrotask 1 → Microtask Queue에 추가
	 * 3. Promise.then() → Microtask Queue에 추가
	 * 4. queueMicrotask 2 → Microtask Queue에 추가
	 * 5. "End" 출력
	 *
	 * Microtask Queue:
	 * [Microtask 1, Promise 1, Microtask 2]
	 * → 순서대로 실행
	 */
}, 5000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * TODO 4 정답: Microtask 체이닝 구현하기
	 */

	console.log("--- TODO 4 정답: Microtask 체이닝 구현 ---\n");

	function task1() {
		return Promise.resolve().then(() => {
			console.log("작업 1 완료");
			return "결과 1";
		});
	}

	function task2(prevResult) {
		return Promise.resolve().then(() => {
			console.log("작업 2 완료, 이전 결과:", prevResult);
			return "결과 2";
		});
	}

	function task3(prevResult) {
		return Promise.resolve().then(() => {
			console.log("작업 3 완료, 이전 결과:", prevResult);
			return "최종 결과";
		});
	}

	// 체이닝으로 연결
	task1()
		.then((result1) => {
			return task2(result1);
		})
		.then((result2) => {
			return task3(result2);
		})
		.then((finalResult) => {
			console.log("모든 작업 완료:", finalResult);
		});

	/**
	 * 실행 흐름:
	 *
	 * [1단계] task1() 호출
	 * → Promise 생성 및 .then() 등록
	 * Microtask Queue: [task1의 .then()]
	 *
	 * [2단계] task1의 .then() 실행
	 * → "작업 1 완료" 출력
	 * → "결과 1" 반환
	 * → 첫 번째 체인의 .then() 등록
	 * Microtask Queue: [첫 번째 .then()]
	 *
	 * [3단계] 첫 번째 .then() 실행
	 * → task2("결과 1") 호출
	 * → task2의 .then() 등록
	 * Microtask Queue: [task2의 .then()]
	 *
	 * [4단계] task2의 .then() 실행
	 * → "작업 2 완료, 이전 결과: 결과 1" 출력
	 * → "결과 2" 반환
	 * → 두 번째 체인의 .then() 등록
	 * Microtask Queue: [두 번째 .then()]
	 *
	 * [5단계] 두 번째 .then() 실행
	 * → task3("결과 2") 호출
	 * → task3의 .then() 등록
	 * Microtask Queue: [task3의 .then()]
	 *
	 * [6단계] task3의 .then() 실행
	 * → "작업 3 완료, 이전 결과: 결과 2" 출력
	 * → "최종 결과" 반환
	 * → 세 번째 체인의 .then() 등록
	 * Microtask Queue: [세 번째 .then()]
	 *
	 * [7단계] 세 번째 .then() 실행
	 * → "모든 작업 완료: 최종 결과" 출력
	 *
	 * 핵심:
	 * - 각 .then()은 별도의 Microtask로 처리
	 * - 체이닝을 통해 순차적 실행 보장
	 * - 이전 결과를 다음 작업에 전달 가능
	 */
}, 8000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * 보너스: Microtask의 무한 루프 주의사항
	 */

	console.log("--- 보너스: Microtask 무한 루프 ---\n");

	console.log("⚠️ 주의: 아래 코드는 주석 처리되어 있습니다");
	console.log("주석을 해제하면 브라우저가 멈출 수 있습니다!\n");

	/**
	 * 위험한 코드 예시 (실행하지 마세요!)
	 *
	 * function infiniteMicrotask() {
	 *   Promise.resolve().then(() => {
	 *     console.log("Microtask 실행");
	 *     infiniteMicrotask(); // 계속해서 Microtask 추가!
	 *   });
	 * }
	 *
	 * infiniteMicrotask();
	 *
	 * 왜 위험한가?
	 * - Microtask가 Microtask를 계속 추가
	 * - Microtask Queue가 절대 비워지지 않음
	 * - Task Queue의 작업이 영원히 실행되지 못함
	 * - UI 렌더링, 이벤트 처리가 중단됨
	 *
	 * 안전한 패턴:
	 */

	let count = 0;
	function safeMicrotask() {
		if (count >= 3) {
			console.log("Microtask 종료");
			return;
		}

		Promise.resolve().then(() => {
			console.log(`안전한 Microtask ${count}`);
			count++;
			safeMicrotask();
		});
	}

	safeMicrotask();

	/**
	 * 중요 규칙:
	 * ✅ Microtask에서 새 Microtask를 생성할 때는 종료 조건 필수
	 * ✅ Task Queue 작업도 실행될 수 있도록 여유 공간 확보
	 * ✅ 무한 루프가 의심되면 디버깅 도구로 확인
	 */
}, 12000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * 핵심 정리
	 *
	 * ✅ Microtask는 Task보다 항상 높은 우선순위
	 * ✅ Promise.then()과 queueMicrotask() 모두 Microtask
	 * ✅ Microtask Queue는 완전히 비워질 때까지 실행
	 * ✅ Microtask가 Microtask를 추가하면 현재 라운드에서 처리
	 * ✅ 무한 Microtask 루프는 UI를 멈출 수 있으므로 주의
	 *
	 * 다음 학습: 04-event-loop-visualization.js
	 */

	console.log("\n=== 03. Microtask Queue 정답 확인 완료! ===\n");
}, 16000);
