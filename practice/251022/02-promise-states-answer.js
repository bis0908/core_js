/**
 * 02. Promise의 3가지 상태 - 정답
 */

console.log("=== Promise의 3가지 상태 정답 ===\n");

console.log("--- 예제 복습: 상태 전환 시각화 ---\n");

function createPromiseWithState(willSucceed, delay) {
	return new Promise((resolve, reject) => {
		console.log("📍 상태: Pending (대기 중)");

		setTimeout(() => {
			if (willSucceed) {
				console.log("📍 상태: Pending → Fulfilled (성공)");
				resolve("성공 데이터");
			} else {
				console.log("📍 상태: Pending → Rejected (실패)");
				reject(new Error("실패 원인"));
			}
		}, delay);
	});
}

console.log("[성공 케이스]");
createPromiseWithState(true, 1000)
	.then((result) => {
		console.log("✅ then() 실행:", result);
	})
	.catch((error) => {
		console.error("❌ catch() 실행:", error.message);
	})
	.finally(() => {
		console.log("🏁 finally() 실행 (항상)\n");
	});

setTimeout(() => {
	console.log("==================================================\n");
}, 1500);

/**
 * TODO 1 정답: 상태 전환 추적 함수
 */

	console.log("--- TODO 1 정답 ---\n");

	function fetchDataWithTracking(url, shouldSucceed, delay) {
		return new Promise((resolve, reject) => {
			console.log(`데이터 로딩 시작: ${url}`);

			setTimeout(() => {
				if (shouldSucceed) {
					console.log(`데이터 로딩 성공: ${url}`);
					resolve({ url, data: "응답 데이터" });
				} else {
					console.log(`데이터 로딩 실패: ${url}`);
					reject(new Error("네트워크 오류"));
				}
			}, delay);
		});
	}

	console.log("테스트 1: 성공 케이스");
	fetchDataWithTracking("/api/users", true, 1000)
		.then((result) => {
			console.log("✅ 응답:", result);
		})
		.catch((error) => {
			console.error("❌ 에러:", error.message);
		})
		.finally(() => {
			console.log("🏁 요청 종료\n");
			console.log("==================================================\n");
		});

/**
 * TODO 2 정답: 상태 불변성 실험
 */

	console.log("--- TODO 2 정답 ---\n");

	const immutableStatePromise = new Promise((resolve, reject) => {
		resolve("첫 번째 성공"); // 이것만 유효
		resolve("두 번째 성공"); // 무시됨
		reject(new Error("거부 시도")); // 무시됨
	});

	immutableStatePromise
		.then((result) => {
			console.log("✅ 결과:", result);
			console.log("→ '첫 번째 성공'만 출력됩니다");
			console.log("→ 첫 번째 resolve() 호출 후 상태가 고정됨");
			console.log("→ 이후의 resolve/reject 호출은 모두 무시됨\n");
		})
		.catch((error) => {
			console.error("❌ 에러:", error.message);
		});

	setTimeout(() => {
		console.log("==================================================\n");
	}, 500);

/**
 * TODO 3 정답: 조건부 상태 전환
 */

	console.log("--- TODO 3 정답 ---\n");

	function processNumber(num) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (num > 10) {
					resolve(`큰 수: ${num}`);
				} else if (num > 0) {
					resolve(`작은 수: ${num}`);
				} else if (num === 0) {
					reject(new Error("0은 처리할 수 없습니다"));
				} else {
					reject(new Error("음수는 처리할 수 없습니다"));
				}
			}, 500);
		});
	}

	const testNumbers = [15, 5, 0, -3];

	console.log("여러 숫자 테스트:\n");

	testNumbers.forEach((num) => {
		processNumber(num)
			.then((result) => console.log(`✅ ${num}:`, result))
			.catch((error) => console.error(`❌ ${num}:`, error.message));
	});

	setTimeout(() => {
		console.log("\n==================================================\n");
	}, 1000);

/**
 * TODO 4 정답: 실행 순서 예측
 */

	console.log("--- TODO 4 정답 ---\n");

	console.log("실행 결과:\n");

	console.log("1. 시작");

	const promise = new Promise((resolve) => {
		console.log("2. Promise 생성자");
		resolve("3. resolve 호출");
	});

	console.log("4. Promise 생성 완료");

	promise.then((result) => {
		console.log("5. then 콜백:", result);
	});

	console.log("6. 코드 끝");

	setTimeout(() => {
		console.log("\n\n출력 순서 설명:");
		console.log("1. 시작 (동기)");
		console.log("2. Promise 생성자 (동기)");
		console.log("4. Promise 생성 완료 (동기)");
		console.log("6. 코드 끝 (동기)");
		console.log("5. then 콜백 (비동기 - 마이크로태스크 큐)\n");

		console.log("핵심 포인트:");
		console.log("- Promise 생성자는 동기적으로 즉시 실행");
		console.log("- resolve() 호출도 동기적");
		console.log("- then() 콜백은 비동기 (마이크로태스크 큐)");
		console.log("- 모든 동기 코드 실행 후 then() 콜백 실행\n");

		console.log("==================================================\n");
	}, 500);

/**
 * 추가 학습: Pending 상태가 계속 유지되는 경우
 */

setTimeout(() => {
	console.log("--- 보너스: 영원한 Pending ---\n");

	const neverSettledPromise = new Promise((resolve, reject) => {
		console.log("이 Promise는 resolve/reject를 호출하지 않습니다");
		// resolve도 reject도 호출하지 않음
	});

	console.log("→ 이 Promise는 영원히 Pending 상태로 남습니다");
	console.log("→ then/catch 콜백이 절대 실행되지 않습니다");
	console.log("→ 실무에서는 이런 상황을 피해야 합니다!\n");

	neverSettledPromise.then(() => {
		console.log("이 메시지는 절대 출력되지 않음");
	});

	setTimeout(() => {
		console.log("5초가 지났지만 then은 여전히 실행 안 됨\n");
		console.log("==================================================\n");
		console.log("\n다음 학습: node 03-then-catch-finally.js\n");
	}, 5000);
}, 11000);
