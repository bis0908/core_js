/**
 * 8-4-2. Promise.race() - 경쟁 처리
 *
 * 여러 Promise 중 가장 먼저 완료(fulfilled 또는 rejected)되는
 * Promise의 결과를 반환합니다.
 */

console.log("=== 8-4-2. Promise.race() ===\n");

console.log("--- 기본 사용법 ---\n");

/**
 * Promise.race([promise1, promise2, ...])
 * - 가장 먼저 settled(완료)되는 Promise의 결과 반환
 * - 성공이든 실패든 가장 빠른 것이 선택됨
 * - 나머지 Promise는 계속 실행되지만 결과는 무시됨
 */

const slow = new Promise((resolve) => {
	setTimeout(() => {
		console.log("  느린 작업 완료 (1000ms)");
		resolve("느림");
	}, 1000);
});

const fast = new Promise((resolve) => {
	setTimeout(() => {
		console.log("  빠른 작업 완료 (300ms)");
		resolve("빠름");
	}, 300);
});

console.log("2개의 Promise 경쟁 시작...\n");

Promise.race([slow, fast]).then((result) => {
	console.log("\n✅ 가장 빠른 결과:", result);
	console.log("→ 300ms에 완료된 작업이 선택됨");
	console.log("\n==================================================\n");
});

/**
 * 실패도 경쟁에 포함
 */
setTimeout(() => {
	console.log("=== 실패도 경쟁에 포함 ===\n");

	const successSlow = new Promise((resolve) => {
		setTimeout(() => {
			console.log("  성공 작업 완료 (800ms)");
			resolve("성공!");
		}, 800);
	});

	const failFast = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("  실패 작업 완료 (300ms)");
			reject(new Error("빠른 실패!"));
		}, 300);
	});

	console.log("성공(느림) vs 실패(빠름) 경쟁...\n");

	Promise.race([successSlow, failFast])
		.then((result) => {
			console.log("✅ 성공:", result);
		})
		.catch((error) => {
			console.error("\n❌ 실패가 더 빨랐음:", error.message);
			console.log("→ 실패가 먼저 완료되면 catch로 이동");
			console.log("\n==================================================\n");
		});
}, 2000);

/**
 * 실전 예제: 타임아웃 구현
 */
setTimeout(() => {
	console.log("=== 실전 예제: 타임아웃 구현 ===\n");

	function timeout(ms) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject(new Error(`타임아웃: ${ms}ms 초과`));
			}, ms);
		});
	}

	function fetchData(delay) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve("데이터 로드 완료");
			}, delay);
		});
	}

	// 케이스 1: 성공 (타임아웃 이전에 완료)
	console.log("[케이스 1: 3초 안에 완료 (성공)]");
	Promise.race([fetchData(1000), timeout(3000)])
		.then((result) => {
			console.log("✅", result);
		})
		.catch((error) => {
			console.error("❌", error.message);
		});

	// 케이스 2: 타임아웃 (시간 초과)
	setTimeout(() => {
		console.log("\n[케이스 2: 3초 안에 완료 실패 (타임아웃)]");
		Promise.race([fetchData(5000), timeout(3000)])
			.then((result) => {
				console.log("✅", result);
			})
			.catch((error) => {
				console.error("❌", error.message);
				console.log("→ 실무에서 API 호출 타임아웃 구현에 유용");
				console.log("\n==================================================\n");
			});
	}, 2000);
}, 4500);

/**
 * 여러 서버 중 가장 빠른 응답 선택
 */
setTimeout(() => {
	console.log("=== 여러 서버 중 가장 빠른 응답 선택 ===\n");

	function fetchFromServer(server, delay) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(`  ✓ ${server} 응답 완료 (${delay}ms)`);
				resolve({ server, data: "응답 데이터" });
			}, delay);
		});
	}

	const servers = [
		fetchFromServer("서버A (한국)", 500),
		fetchFromServer("서버B (미국)", 800),
		fetchFromServer("서버C (유럽)", 1200),
	];

	console.log("3개 서버에 동시 요청...\n");

	Promise.race(servers).then((result) => {
		console.log(`\n✅ 가장 빠른 응답: ${result.server}`);
		console.log("데이터:", result.data);
		console.log("→ 사용자에게 가장 빠른 서버의 데이터 제공");
		console.log("→ 나머지 서버 응답은 무시됨");
		console.log("\n==================================================\n");
	});
}, 10000);

/**
 * 빈 배열 처리 (주의!)
 */
setTimeout(() => {
	console.log("=== 빈 배열 처리 (주의!) ===\n");

	// Promise.race([])는 영원히 pending 상태!
	const emptyRace = Promise.race([]);
	console.log("Promise.race([]) 호출...");
	console.log("→ 경쟁할 Promise가 없어 영원히 pending 상태");
	console.log("→ then/catch 콜백이 절대 실행되지 않음");

	// 타임아웃과 함께 사용하여 확인
	setTimeout(() => {
		console.log("\n5초 경과... emptyRace는 여전히 pending");
		console.log("⚠️  실무에서는 빈 배열 전달에 주의!");
		console.log("\n==================================================\n");
	}, 5000);
}, 13000);

/**
 * 실전 패턴: 캐시 vs 네트워크
 */
setTimeout(() => {
	console.log("=== 실전 패턴: 캐시 vs 네트워크 ===\n");

	function fetchFromCache() {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("  ✓ 캐시에서 데이터 로드 (50ms)");
				resolve({ source: "캐시", data: "캐시된 데이터", fresh: false });
			}, 50);
		});
	}

	function fetchFromNetwork() {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("  ✓ 네트워크에서 데이터 로드 (500ms)");
				resolve({ source: "네트워크", data: "최신 데이터", fresh: true });
			}, 500);
		});
	}

	console.log("캐시와 네트워크 동시 요청...\n");

	Promise.race([fetchFromCache(), fetchFromNetwork()]).then((result) => {
		console.log(`\n✅ 선택된 소스: ${result.source}`);
		console.log("데이터:", result.data);
		console.log("최신 여부:", result.fresh);
		console.log("\n→ 빠른 캐시 데이터를 먼저 표시");
		console.log("→ 필요시 네트워크 데이터로 나중에 업데이트 가능");
		console.log("\n==================================================\n");
	});
}, 19000);

/**
 * Promise.race() vs Promise.all() 비교
 */
setTimeout(() => {
	console.log("=== Promise.race() vs Promise.all() ===\n");

	function task(id, delay) {
		return new Promise((resolve) => {
			setTimeout(() => {
				const result = `작업${id} 완료`;
				console.log("  ✓", result);
				resolve(result);
			}, delay);
		});
	}

	const tasks = [task(1, 300), task(2, 500), task(3, 700)];

	console.log("[Promise.race()]\n");
	Promise.race(tasks).then((result) => {
		console.log("\n✅ race 결과:", result);
		console.log("→ 가장 빠른 작업 하나만 반환\n");

		console.log("[Promise.all()]\n");
		Promise.all(tasks).then((results) => {
			console.log("\n✅ all 결과:", results);
			console.log("→ 모든 작업의 결과를 배열로 반환");
			console.log("\n정리:");
			console.log("• race: 가장 빠른 하나");
			console.log("• all: 모든 결과를 기다림");
			console.log("\n==================================================\n");
		});
	});
}, 21000);

/**
 * 실전 패턴: 첫 번째 성공 응답
 */
setTimeout(() => {
	console.log("=== 첫 번째 성공 응답 찾기 ===\n");

	function unstableAPI(id, shouldFail, delay) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (shouldFail) {
					console.log(`  ✗ API${id} 실패`);
					reject(new Error(`API${id} 실패`));
				} else {
					console.log(`  ✓ API${id} 성공`);
					resolve(`API${id} 데이터`);
				}
			}, delay);
		});
	}

	console.log("불안정한 여러 API 동시 호출...\n");

	Promise.race([
		unstableAPI(1, true, 200), // 실패
		unstableAPI(2, false, 500), // 성공
		unstableAPI(3, true, 300), // 실패
	])
		.then((result) => {
			console.log("\n✅ 첫 성공 응답:", result);
		})
		.catch((error) => {
			console.error("\n❌ 첫 응답이 실패:", error.message);
			console.log("→ 가장 빠른 응답이 실패면 즉시 reject");
			console.log("→ 모든 실패를 무시하고 성공만 원하면 Promise.any() 사용");
			console.log("\n==================================================");
		});
}, 25000);
