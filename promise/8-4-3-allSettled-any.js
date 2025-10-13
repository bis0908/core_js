/**
 * 8-4-3. Promise.allSettled() & Promise.any()
 *
 * ES2020과 ES2021에서 추가된 Promise 정적 메서드들입니다.
 * - allSettled: 모든 Promise의 결과를 수집 (성공/실패 무관)
 * - any: 가장 먼저 성공하는 Promise의 결과 반환
 */

console.log("=== 8-4-3. Promise.allSettled() ===\n");

console.log("--- allSettled 기본 사용법 ---\n");

/**
 * Promise.allSettled([promise1, promise2, ...])
 * - 모든 Promise가 완료(settled)될 때까지 대기
 * - 성공/실패 여부와 무관하게 모든 결과 반환
 * - 각 결과는 { status, value/reason } 형태
 */

const promise1 = Promise.resolve("성공1");
const promise2 = Promise.reject(new Error("실패2"));
const promise3 = Promise.resolve("성공3");

console.log("3개의 Promise 실행 (하나는 실패 예정)...\n");

Promise.allSettled([promise1, promise2, promise3]).then((results) => {
	console.log("✅ 모든 Promise 완료!\n");
	results.forEach((result, index) => {
		if (result.status === "fulfilled") {
			console.log(`  [${index}] 성공:`, result.value);
		} else {
			console.log(`  [${index}] 실패:`, result.reason.message);
		}
	});
	console.log("\n→ 실패한 Promise도 결과에 포함됨");
	console.log("→ Promise.all()과 달리 중간에 중단되지 않음");
	console.log("\n==================================================\n");
});

/**
 * Promise.all() vs Promise.allSettled() 비교
 */
setTimeout(() => {
	console.log("=== Promise.all() vs Promise.allSettled() ===\n");

	function task(id, shouldFail, delay) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (shouldFail) {
					console.log(`  ✗ 작업${id} 실패`);
					reject(new Error(`작업${id} 실패`));
				} else {
					console.log(`  ✓ 작업${id} 성공`);
					resolve(`작업${id} 결과`);
				}
			}, delay);
		});
	}

	const tasks = [
		task(1, false, 300),
		task(2, true, 500), // 실패
		task(3, false, 700),
	];

	console.log("[Promise.all() - 하나라도 실패하면 즉시 실패]\n");

	Promise.all(tasks)
		.then((results) => {
			console.log("✅ 모두 성공:", results);
		})
		.catch((error) => {
			console.error("❌ 실패:", error.message);
			console.log("→ 첫 번째 실패에서 즉시 중단\n");

			setTimeout(() => {
				console.log("[Promise.allSettled() - 모든 결과 수집]\n");

				Promise.allSettled(tasks).then((results) => {
					console.log("\n✅ 모든 결과:");
					results.forEach((result, i) => {
						console.log(
							`  [${i}] ${result.status}:`,
							result.status === "fulfilled" ? result.value : result.reason.message,
						);
					});
					console.log("\n→ 성공/실패 무관하게 모든 결과 수집");
					console.log("\n==================================================\n");
				});
			}, 1000);
		});
}, 1500);

/**
 * 실전 예제: 여러 API 호출 결과 수집
 */
setTimeout(() => {
	console.log("=== 실전: 여러 API 호출 결과 종합 ===\n");

	function fetchData(endpoint, shouldFail, delay) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (shouldFail) {
					console.log(`  ✗ ${endpoint} 실패`);
					reject(new Error(`${endpoint} 오류`));
				} else {
					console.log(`  ✓ ${endpoint} 성공`);
					resolve({ endpoint, data: `${endpoint} 데이터` });
				}
			}, delay);
		});
	}

	console.log("여러 마이크로서비스 동시 호출...\n");

	const requests = [
		fetchData("/api/users", false, 300),
		fetchData("/api/posts", true, 500), // 실패
		fetchData("/api/comments", false, 400),
		fetchData("/api/likes", true, 600), // 실패
	];

	Promise.allSettled(requests).then((results) => {
		console.log("\n📊 API 호출 결과 종합:\n");

		const succeeded = results.filter((r) => r.status === "fulfilled");
		const failed = results.filter((r) => r.status === "rejected");

		console.log(`✅ 성공: ${succeeded.length}개`);
		succeeded.forEach((r) => {
			console.log(`   - ${r.value.endpoint}`);
		});

		console.log(`\n❌ 실패: ${failed.length}개`);
		failed.forEach((r) => {
			console.log(`   - ${r.reason.message}`);
		});

		console.log("\n→ 부분 성공을 허용하는 시나리오에 유용");
		console.log("→ 성공한 데이터만으로도 페이지 렌더링 가능");
		console.log("\n==================================================\n");
	});
}, 5000);

/**
 * Promise.any() - 가장 먼저 성공하는 Promise
 */
setTimeout(() => {
	console.log("=== Promise.any() (ES2021) ===\n");

	console.log("--- any 기본 사용법 ---\n");

	/**
	 * Promise.any([promise1, promise2, ...])
	 * - 가장 먼저 fulfilled되는 Promise의 결과 반환
	 * - 모든 Promise가 실패해야 실패 (AggregateError)
	 * - race와 유사하지만 실패를 무시함
	 */

	const fail1 = Promise.reject(new Error("실패1"));
	const fail2 = Promise.reject(new Error("실패2"));
	const success = new Promise((resolve) => {
		setTimeout(() => {
			console.log("  ✓ 성공 작업 완료");
			resolve("성공!");
		}, 500);
	});

	console.log("실패2개, 성공1개 실행...\n");

	Promise.any([fail1, fail2, success])
		.then((result) => {
			console.log("✅ 첫 성공 결과:", result);
			console.log("→ 실패는 무시하고 첫 성공만 반환");
			console.log("\n==================================================\n");
		})
		.catch((error) => {
			console.error("❌ 모두 실패:", error);
		});
}, 8500);

/**
 * Promise.any() - 모두 실패하는 경우
 */
setTimeout(() => {
	console.log("=== Promise.any() - 모두 실패 ===\n");

	const fail1 = Promise.reject(new Error("에러1"));
	const fail2 = Promise.reject(new Error("에러2"));
	const fail3 = Promise.reject(new Error("에러3"));

	console.log("모두 실패하는 Promise 3개 실행...\n");

	Promise.any([fail1, fail2, fail3])
		.then((result) => {
			console.log("✅ 성공:", result);
		})
		.catch((error) => {
			console.error("❌ AggregateError 발생");
			console.error("   메시지:", error.message);
			console.log("\n   개별 에러들:");
			error.errors.forEach((err, i) => {
				console.log(`   [${i}] ${err.message}`);
			});
			console.log("\n→ 모든 Promise가 실패해야 reject됨");
			console.log("\n==================================================\n");
		});
}, 10000);

/**
 * 실전: 여러 백업 서버 시도
 */
setTimeout(() => {
	console.log("=== 실전: 여러 백업 서버 시도 ===\n");

	function tryServer(name, shouldFail, delay) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (shouldFail) {
					console.log(`  ✗ ${name} 접속 실패`);
					reject(new Error(`${name} 다운`));
				} else {
					console.log(`  ✓ ${name} 접속 성공`);
					resolve({ server: name, data: "서버 데이터" });
				}
			}, delay);
		});
	}

	console.log("주 서버 + 백업 서버들에 동시 시도...\n");

	Promise.any([
		tryServer("주 서버", true, 300), // 실패
		tryServer("백업1", true, 500), // 실패
		tryServer("백업2", false, 700), // 성공
		tryServer("백업3", false, 900), // 성공 (무시됨)
	])
		.then((result) => {
			console.log(`\n✅ 연결 성공: ${result.server}`);
			console.log("데이터:", result.data);
			console.log("→ 여러 서버 중 하나만 성공하면 됨");
			console.log("→ 높은 가용성(High Availability) 구현");
			console.log("\n==================================================\n");
		})
		.catch((error) => {
			console.error("❌ 모든 서버 다운:", error.message);
		});
}, 11500);

/**
 * 4가지 메서드 비교 정리
 */
setTimeout(() => {
	console.log("=== 4가지 Promise 메서드 비교 ===\n");

	console.log("📌 Promise.all()");
	console.log("   - 모든 Promise 성공 시 성공");
	console.log("   - 하나라도 실패하면 즉시 실패");
	console.log("   - 결과: 배열 (입력 순서대로)");
	console.log("   - 용도: 모든 작업이 필수일 때\n");

	console.log("📌 Promise.race()");
	console.log("   - 가장 빠른 Promise 결과 반환");
	console.log("   - 성공/실패 상관없이 첫 완료");
	console.log("   - 결과: 단일 값");
	console.log("   - 용도: 타임아웃, 가장 빠른 응답 선택\n");

	console.log("📌 Promise.allSettled() [ES2020]");
	console.log("   - 모든 Promise 완료까지 대기");
	console.log("   - 성공/실패 무관하게 모든 결과");
	console.log("   - 결과: { status, value/reason } 배열");
	console.log("   - 용도: 부분 성공 허용, 결과 종합\n");

	console.log("📌 Promise.any() [ES2021]");
	console.log("   - 가장 빠른 성공 Promise 반환");
	console.log("   - 실패는 무시, 모두 실패 시 AggregateError");
	console.log("   - 결과: 단일 값");
	console.log("   - 용도: 여러 대안 중 하나 성공하면 됨");

	console.log("\n==================================================");
}, 14500);
