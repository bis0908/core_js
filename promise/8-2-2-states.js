/**
 * 8-2-2. Promise의 3가지 상태
 *
 * Promise는 다음 3가지 상태(state) 중 하나를 가집니다:
 * 1. Pending (대기): 초기 상태, 아직 완료되지 않음
 * 2. Fulfilled (이행): 작업이 성공적으로 완료됨
 * 3. Rejected (거부): 작업이 실패함
 */

console.log("=== 8-2-2. Promise의 3가지 상태 ===\n");

console.log("--- 1. Pending (대기) 상태 ---");

/**
 * Pending 상태의 Promise
 * resolve나 reject가 호출되지 않으면 계속 pending 상태 유지
 */
const pendingPromise = new Promise((resolve, reject) => {
	console.log("Promise 생성됨 (pending 상태)");
	// resolve/reject 호출 안 함 → 영원히 pending
});

console.log("→ 아직 resolve/reject가 호출되지 않음");
console.log("→ 이 Promise는 영원히 pending 상태로 남음\n");

console.log("==================================================\n");

/**
 * 2. Fulfilled (이행) 상태
 */
setTimeout(() => {
	console.log("--- 2. Fulfilled (이행) 상태 ---\n");

	const fulfilledPromise = new Promise((resolve, reject) => {
		console.log("비동기 작업 시작...");

		setTimeout(() => {
			resolve("작업 성공!"); // pending → fulfilled
		}, 500);
	});

	console.log("Promise 생성 (pending)");

	fulfilledPromise.then((result) => {
		console.log("\n✅ Promise가 fulfilled 상태로 전환됨");
		console.log("결과값:", result);
		console.log("\n==================================================\n");
	});
}, 500);

/**
 * 3. Rejected (거부) 상태
 */
setTimeout(() => {
	console.log("--- 3. Rejected (거부) 상태 ---\n");

	const rejectedPromise = new Promise((resolve, reject) => {
		console.log("작업 시도 중...");

		setTimeout(() => {
			reject(new Error("작업 실패!")); // pending → rejected
		}, 500);
	});

	console.log("Promise 생성 (pending)");

	rejectedPromise.catch((error) => {
		console.log("\n❌ Promise가 rejected 상태로 전환됨");
		console.log("에러:", error.message);
		console.log("\n==================================================\n");
	});
}, 2000);

/**
 * 상태 전환 시각화
 */
setTimeout(() => {
	console.log("=== Promise 상태 전환 흐름 ===\n");

	function visualizeState(delay, willSuccess) {
		return new Promise((resolve, reject) => {
			console.log("📍 상태: Pending (대기 중)");

			setTimeout(() => {
				if (willSuccess) {
					console.log("📍 상태: Pending → Fulfilled (성공)");
					resolve("성공 데이터");
				} else {
					console.log("📍 상태: Pending → Rejected (실패)");
					reject(new Error("실패 원인"));
				}
			}, delay);
		});
	}

	// 성공 케이스
	console.log("[케이스 1: 성공]");
	visualizeState(500, true)
		.then((result) => {
			console.log("✅ then() 실행:", result);
		})
		.catch((error) => {
			console.error("❌ catch() 실행:", error.message);
		})
		.finally(() => {
			console.log("🏁 finally() 실행 (항상)");
			console.log();
		});

	// 실패 케이스
	setTimeout(() => {
		console.log("[케이스 2: 실패]");
		visualizeState(500, false)
			.then((result) => {
				console.log("✅ then() 실행:", result);
			})
			.catch((error) => {
				console.error("❌ catch() 실행:", error.message);
			})
			.finally(() => {
				console.log("🏁 finally() 실행 (항상)");
				console.log("\n==================================================\n");
			});
	}, 1000);
}, 4000);

/**
 * 상태가 한 번 결정되면 변경되지 않음 (불변성)
 */
setTimeout(() => {
	console.log("=== Promise 상태의 불변성 ===\n");

	const settledPromise = new Promise((resolve, reject) => {
		console.log("1. Promise 생성 (pending)");

		resolve("첫 번째 resolve"); // pending → fulfilled

		// 이미 fulfilled 상태이므로 아래는 모두 무시됨
		resolve("두 번째 resolve"); // 무시됨
		reject("reject 호출"); // 무시됨
		resolve("세 번째 resolve"); // 무시됨
	});

	settledPromise
		.then((result) => {
			console.log("2. fulfilled 상태로 전환");
			console.log("   결과:", result);
			console.log("\n→ 한 번 settled(fulfilled/rejected)되면");
			console.log("   이후의 모든 resolve/reject 호출은 무시됨");
		})
		.catch((error) => {
			console.log("이 catch는 실행되지 않음");
		});

	console.log("\n==================================================\n");
}, 7500);

/**
 * 실전 예제: HTTP 요청 상태 관리
 */
setTimeout(() => {
	console.log("=== 실전 예제: HTTP 요청 시뮬레이션 ===\n");

	function fetchData(url, shouldSucceed) {
		return new Promise((resolve, reject) => {
			console.log(`📡 요청 시작: ${url}`);
			console.log("   상태: Pending\n");

			// 네트워크 요청 시뮬레이션
			setTimeout(() => {
				if (shouldSucceed) {
					console.log("📡 응답 수신 성공");
					console.log("   상태: Pending → Fulfilled");
					resolve({
						status: 200,
						data: { message: "데이터 로드 성공" },
					});
				} else {
					console.log("📡 응답 수신 실패");
					console.log("   상태: Pending → Rejected");
					reject({
						status: 500,
						error: "서버 에러",
					});
				}
			}, 800);
		});
	}

	// 성공 요청
	console.log("[성공 케이스]");
	fetchData("/api/users", true)
		.then((response) => {
			console.log("✅ 처리 완료:", response.data.message);
			console.log();
		})
		.catch((error) => {
			console.error("❌ 에러:", error.error);
		});

	// 실패 요청
	setTimeout(() => {
		console.log("[실패 케이스]");
		fetchData("/api/posts", false)
			.then((response) => {
				console.log("✅ 처리 완료:", response.data.message);
			})
			.catch((error) => {
				console.error("❌ 에러 발생:", error.error);
				console.log("\n==================================================\n");
			});
	}, 1500);
}, 8500);

/**
 * 상태 전환 정리
 */
setTimeout(() => {
	console.log("=== Promise 상태 전환 정리 ===\n");
	console.log("초기 상태:");
	console.log("  Pending (대기)");
	console.log("  ↓");
	console.log("전환 가능 상태:");
	console.log("  ├─ Fulfilled (이행) ← resolve() 호출 시");
	console.log("  └─ Rejected (거부)  ← reject() 호출 시");
	console.log("\n특징:");
	console.log("• Pending → Fulfilled 또는 Pending → Rejected만 가능");
	console.log("• Fulfilled ↔ Rejected 전환 불가능");
	console.log("• 한 번 settled(fulfilled/rejected)되면 영구적");
	console.log("• 상태는 Promise 내부에만 존재 (외부에서 변경 불가)");
	console.log("\n==================================================");
}, 12000);
