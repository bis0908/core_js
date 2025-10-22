/**
 * 02. Task Queue (Macrotask Queue) - 정답
 *
 * 이 파일은 02-task-queue.js의 모든 TODO 문제 정답을 포함합니다.
 */

console.log("=== Task Queue 정답 ===\n");

/**
 * TODO 1 정답: 실행 순서 예측하기
 */

console.log("--- TODO 1 정답: 실행 순서 예측 ---\n");

console.log("시작");

setTimeout(() => {
	console.log("타이머 1");
}, 0);

setTimeout(() => {
	console.log("타이머 2");
}, 0);

console.log("종료");

/**
 * 예상 출력 순서:
 * 1. "시작"
 * 2. "종료"
 * 3. "타이머 1"
 * 4. "타이머 2"
 *
 * 이유:
 *
 * [동기 코드 실행]
 * 1. "시작" 출력 → Call Stack에서 즉시 실행
 * 2. setTimeout 1 → Task Queue에 등록
 * 3. setTimeout 2 → Task Queue에 등록
 * 4. "종료" 출력 → Call Stack에서 즉시 실행
 * 5. Call Stack 비어있음
 *
 * [비동기 코드 실행]
 * 6. 이벤트 루프가 Task Queue 확인
 * 7. "타이머 1" 콜백 실행
 * 8. "타이머 2" 콜백 실행
 *
 * 핵심: setTimeout(0)도 동기 코드보다 늦게 실행됨!
 */

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * TODO 2 정답: 카운트다운 타이머 만들기
	 */

	console.log("--- TODO 2 정답: 카운트다운 타이머 ---\n");

	function startCountdown(n) {
		console.log(n);

		if (n === 0) {
			console.log("발사! 🚀");
			return;
		}

		// 1초 후에 다음 카운트다운 호출 (재귀)
		setTimeout(() => {
			startCountdown(n - 1);
		}, 1000);
	}

	console.log("카운트다운 시작:");
	startCountdown(3);

	/**
	 * 실행 흐름:
	 *
	 * [0초] startCountdown(3) 호출
	 *   → "3" 출력
	 *   → 1초 후 실행할 콜백을 Task Queue에 등록
	 *
	 * [1초] 콜백 실행 → startCountdown(2) 호출
	 *   → "2" 출력
	 *   → 1초 후 실행할 콜백을 Task Queue에 등록
	 *
	 * [2초] 콜백 실행 → startCountdown(1) 호출
	 *   → "1" 출력
	 *   → 1초 후 실행할 콜백을 Task Queue에 등록
	 *
	 * [3초] 콜백 실행 → startCountdown(0) 호출
	 *   → "0" 출력
	 *   → "발사! 🚀" 출력
	 *   → return (종료)
	 *
	 * 주의: 재귀적으로 setTimeout을 호출하므로
	 * Call Stack Overflow가 발생하지 않습니다!
	 */
}, 2000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * TODO 3 정답: 순차적 메시지 출력기
	 */

	console.log("--- TODO 3 정답: 순차적 메시지 출력기 ---\n");

	function printMessages(messages, delay) {
		messages.forEach((message, index) => {
			setTimeout(() => {
				console.log(`${index + 1}. ${message}`);
			}, delay * index);
		});
	}

	const messages = ["첫 번째", "두 번째", "세 번째", "네 번째"];
	console.log("메시지 출력 시작:");
	printMessages(messages, 500);

	/**
	 * 실행 흐름:
	 *
	 * [즉시] "메시지 출력 시작:" 출력
	 * [즉시] forEach가 동기적으로 실행되며 4개의 setTimeout 등록
	 *   - setTimeout(..., 0)    → 첫 번째 메시지
	 *   - setTimeout(..., 500)  → 두 번째 메시지
	 *   - setTimeout(..., 1000) → 세 번째 메시지
	 *   - setTimeout(..., 1500) → 네 번째 메시지
	 *
	 * [0ms]    "1. 첫 번째" 출력
	 * [500ms]  "2. 두 번째" 출력
	 * [1000ms] "3. 세 번째" 출력
	 * [1500ms] "4. 네 번째" 출력
	 *
	 * 핵심 포인트:
	 * - forEach는 동기적으로 실행되어 4개의 타이머를 한 번에 등록
	 * - 각 타이머는 delay * index 시간 후에 Task Queue에 추가됨
	 * - 지연 시간이 다르므로 순차적으로 출력됨
	 */
}, 8000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * TODO 4 정답: setInterval로 반복 작업 만들기
	 */

	console.log("--- TODO 4 정답: setInterval 반복 작업 ---\n");

	let count = 0;

	const intervalId = setInterval(() => {
		console.log(`카운트: ${count}`);
		count++;

		// 5에 도달하면 interval 중지
		if (count > 5) {
			clearInterval(intervalId);
			console.log("카운트 종료");
		}
	}, 1000);

	/**
	 * setInterval vs setTimeout 재귀:
	 *
	 * [setInterval]
	 * - 일정 간격으로 자동 반복
	 * - clearInterval로 중지해야 함
	 * - 간격이 정확하지 않을 수 있음 (이전 실행이 오래 걸리면)
	 *
	 * [setTimeout 재귀]
	 * - 이전 실행이 완료된 후 다음 타이머 시작
	 * - 더 정확한 간격 제어 가능
	 * - 명시적으로 중지하지 않아도 됨
	 *
	 * 실행 흐름:
	 * [0초]  카운트: 0
	 * [1초]  카운트: 1
	 * [2초]  카운트: 2
	 * [3초]  카운트: 3
	 * [4초]  카운트: 4
	 * [5초]  카운트: 5
	 * [6초]  count가 6이 되어 clearInterval 호출 → "카운트 종료"
	 */
}, 12000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * 보너스: setTimeout vs setInterval 비교
	 */

	console.log("--- 보너스: setTimeout vs setInterval ---\n");

	// setTimeout 재귀 방식
	console.log("[setTimeout 재귀]");
	let count1 = 0;

	function repeatWithTimeout() {
		console.log(`setTimeout: ${count1}`);
		count1++;

		if (count1 < 3) {
			setTimeout(repeatWithTimeout, 1000);
		}
	}

	repeatWithTimeout();

	// setInterval 방식
	setTimeout(() => {
		console.log("\n[setInterval]");
		let count2 = 0;

		const intervalId = setInterval(() => {
			console.log(`setInterval: ${count2}`);
			count2++;

			if (count2 >= 3) {
				clearInterval(intervalId);
			}
		}, 1000);
	}, 4000);

	/**
	 * 차이점:
	 *
	 * [setTimeout 재귀]
	 * - 이전 작업 완료 후 → 타이머 시작 → 대기 → 다음 작업
	 * - 작업 시간이 길어도 일정한 간격 유지 가능
	 * - 더 안전하고 예측 가능
	 *
	 * [setInterval]
	 * - 타이머 시작 → 작업 실행 → 타이머 시작 → 작업 실행
	 * - 작업 시간이 간격보다 길면 연속 실행될 수 있음
	 * - 간단하지만 주의 필요
	 */
}, 20000);

setTimeout(() => {
	console.log("\n==================================================\n");

	/**
	 * 핵심 정리
	 *
	 * ✅ Task Queue는 비동기 작업이 대기하는 FIFO 큐
	 * ✅ setTimeout(0)도 동기 코드 이후에 실행됨
	 * ✅ 타이머는 최소 지연 시간을 보장 (정확한 시간 아님)
	 * ✅ setInterval은 clearInterval로 반드시 정리
	 * ✅ setTimeout 재귀가 setInterval보다 안전한 경우 많음
	 *
	 * 다음 학습: 03-microtask-queue.js
	 */

	console.log("\n=== 02. Task Queue 정답 확인 완료! ===\n");
}, 30000);
