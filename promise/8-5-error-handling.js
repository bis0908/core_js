/**
 * 8-5. 에러 처리 패턴과 주의사항
 *
 * Promise를 실무에서 사용할 때의 에러 처리 베스트 프랙티스와
 * 흔히 발생하는 안티 패턴들을 다룹니다.
 */

console.log("=== 8-5. 에러 처리 패턴 ===\n");

console.log("--- 8-5-1. 에러 처리 베스트 프랙티스 ---\n");

/**
 * 1. 항상 catch() 추가하기
 */
console.log("✅ 좋은 예: catch() 추가\n");

function fetchGoodData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error("네트워크 오류"));
		}, 300);
	});
}

fetchGoodData()
	.then((data) => {
		console.log("데이터:", data);
	})
	.catch((error) => {
		console.error("❌ 에러 처리:", error.message);
		console.log("→ catch()로 에러를 잡아 처리함");
		console.log("\n==================================================\n");
	});

/**
 * 2. 체이닝 끝에 catch() 배치
 */
setTimeout(() => {
	console.log("=== 체이닝에서 에러 처리 ===\n");

	function step1() {
		return Promise.resolve("1단계 완료");
	}

	function step2() {
		return Promise.reject(new Error("2단계 실패!"));
	}

	function step3() {
		return Promise.resolve("3단계 완료");
	}

	step1()
		.then((result) => {
			console.log("✓", result);
			return step2();
		})
		.then((result) => {
			console.log("✓", result); // 실행 안 됨
			return step3();
		})
		.then((result) => {
			console.log("✓", result); // 실행 안 됨
		})
		.catch((error) => {
			console.error("\n❌ 체이닝 중 에러 발생:", error.message);
			console.log("→ 어느 단계에서 에러가 나도 여기서 처리");
			console.log("\n==================================================\n");
		});
}, 1000);

/**
 * 3. 특정 에러만 처리하기
 */
setTimeout(() => {
	console.log("=== 특정 에러 선택적 처리 ===\n");

	class NetworkError extends Error {
		constructor(message) {
			super(message);
			this.name = "NetworkError";
		}
	}

	class ValidationError extends Error {
		constructor(message) {
			super(message);
			this.name = "ValidationError";
		}
	}

	function fetchData() {
		return Promise.reject(new NetworkError("연결 실패"));
	}

	fetchData()
		.catch((error) => {
			if (error.name === "NetworkError") {
				console.log("🔄 네트워크 에러 감지 - 재시도 중...");
				return "캐시된 데이터"; // 에러 복구
			}
			throw error; // 다른 에러는 재전파
		})
		.then((data) => {
			console.log("✅ 데이터:", data);
			console.log("→ NetworkError는 복구되어 계속 진행");
		})
		.catch((error) => {
			console.error("❌ 복구 불가능한 에러:", error.message);
		});

	setTimeout(() => {
		console.log("\n==================================================\n");
	}, 500);
}, 2500);

/**
 * 8-5-2. Promise 내부 에러는 자동으로 catch됨
 */
setTimeout(() => {
	console.log("=== Promise 내부 동기 에러 처리 ===\n");

	// Promise 생성자 내부의 동기 에러
	new Promise((resolve, reject) => {
		throw new Error("동기 에러!"); // 자동으로 reject()와 동일
	}).catch((error) => {
		console.log("❌ 동기 에러 잡힘:", error.message);
		console.log("→ Promise 내부의 throw는 자동으로 reject됨\n");
	});

	// then() 콜백 내부의 에러
	Promise.resolve(1)
		.then((num) => {
			throw new Error("then 내부 에러!");
		})
		.catch((error) => {
			console.log("❌ then 에러 잡힘:", error.message);
			console.log("→ then 콜백의 throw도 자동으로 catch됨");
			console.log("\n==================================================\n");
		});
}, 4000);

/**
 * 비동기 콜백 내부는 try-catch 필요
 */
setTimeout(() => {
	console.log("=== 비동기 콜백 에러 처리 ===\n");

	// ❌ 나쁜 예: setTimeout 내부 에러는 잡히지 않음
	console.log("❌ 나쁜 예:\n");

	new Promise((resolve, reject) => {
		setTimeout(() => {
			// 이 에러는 Promise가 잡을 수 없음!
			// throw new Error('비동기 에러'); // UnhandledRejection 발생
			console.log("(주석 처리된 throw는 잡을 수 없음)");
		}, 100);
	});

	// ✅ 좋은 예: 명시적 reject 호출
	setTimeout(() => {
		console.log("\n✅ 좋은 예:\n");

		new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					const data = JSON.parse("잘못된 JSON");
					resolve(data);
				} catch (error) {
					reject(error); // 명시적으로 reject
				}
			}, 100);
		}).catch((error) => {
			console.log("❌ 에러 잡힘:", error.message);
			console.log("→ 비동기 콜백에서는 명시적 reject 필요");
			console.log("\n==================================================\n");
		});
	}, 500);
}, 5500);

/**
 * 8-5-3. 중첩된 Promise 피하기
 */
setTimeout(() => {
	console.log("=== 8-5-3. Promise 중첩 안티패턴 ===\n");

	function getData(id) {
		return Promise.resolve(`데이터${id}`);
	}

	console.log("❌ 나쁜 예: Promise 중첩\n");
	console.log("(코드 예시)");
	console.log("getData(1).then(data1 => {");
	console.log("  getData(2).then(data2 => {");
	console.log("    // 콜백 헬과 비슷...");
	console.log("  });");
	console.log("});\n");

	console.log("✅ 좋은 예: 평탄한 체이닝\n");

	getData(1)
		.then((data1) => {
			console.log("  -", data1);
			return getData(2); // Promise 반환
		})
		.then((data2) => {
			console.log("  -", data2);
			return getData(3);
		})
		.then((data3) => {
			console.log("  -", data3);
			console.log("\n→ 평탄한 구조로 가독성 향상");
			console.log("\n==================================================\n");
		});
}, 7500);

/**
 * 8-5-4. 값 반환 누락 주의
 */
setTimeout(() => {
	console.log("=== 8-5-4. 반환값 누락 주의 ===\n");

	console.log("❌ 나쁜 예: return 누락\n");

	Promise.resolve(10)
		.then((num) => {
			console.log("  입력:", num);
			num + 5; // return 누락!
		})
		.then((result) => {
			console.log("  결과:", result); // undefined
			console.log("  → return을 빼먹어서 undefined 전달\n");
		});

	setTimeout(() => {
		console.log("✅ 좋은 예: 명시적 return\n");

		Promise.resolve(10)
			.then((num) => {
				console.log("  입력:", num);
				return num + 5; // 명시적 반환
			})
			.then((result) => {
				console.log("  결과:", result); // 15
				console.log("  → 올바른 값 전달");
				console.log("\n==================================================\n");
			});
	}, 500);
}, 9000);

/**
 * 8-5-5. Promise 안티 패턴들
 */
setTimeout(() => {
	console.log("=== 8-5-5. 흔한 안티 패턴 ===\n");

	// 1. 불필요한 Promise 래핑
	console.log("❌ 안티패턴 1: 불필요한 래핑\n");
	console.log("function fetchData() {");
	console.log("  return new Promise((resolve, reject) => {");
	console.log("    fetch('/api').then(resolve).catch(reject);");
	console.log("  });");
	console.log("}");
	console.log("\n✅ 개선: fetch는 이미 Promise 반환");
	console.log("function fetchData() {");
	console.log("  return fetch('/api');");
	console.log("}\n");

	// 2. catch 없이 then만 사용
	console.log("❌ 안티패턴 2: catch 누락");
	console.log("fetchData().then(data => console.log(data));");
	console.log("// 에러 발생 시 처리 불가!\n");

	console.log("✅ 개선: 항상 catch 추가");
	console.log("fetchData()");
	console.log("  .then(data => console.log(data))");
	console.log("  .catch(error => console.error(error));\n");

	// 3. forEach와 Promise 혼용
	console.log("❌ 안티패턴 3: forEach와 Promise");
	console.log("[1,2,3].forEach(id => {");
	console.log("  fetchData(id); // Promise가 기다려지지 않음");
	console.log("});\n");

	console.log("✅ 개선: Promise.all 사용");
	console.log("const promises = [1,2,3].map(id => fetchData(id));");
	console.log("Promise.all(promises).then(results => {...});\n");

	console.log("==================================================\n");
}, 11000);

/**
 * 실전 패턴: 재시도 로직
 */
setTimeout(() => {
	console.log("=== 실전 패턴: 재시도 로직 ===\n");

	function fetchWithRetry(url, maxRetries = 3) {
		return new Promise((resolve, reject) => {
			let attempt = 0;

			function tryFetch() {
				attempt++;
				console.log(`  시도 ${attempt}/${maxRetries}...`);

				// 가상의 fetch (80% 실패율로 시뮬레이션)
				const willSucceed = Math.random() > 0.8;

				setTimeout(() => {
					if (willSucceed) {
						console.log(`  ✓ ${attempt}번째 시도에서 성공!`);
						resolve(`데이터: ${url}`);
					} else {
						console.log(`  ✗ ${attempt}번째 시도 실패`);

						if (attempt < maxRetries) {
							console.log("  → 재시도 중...\n");
							setTimeout(tryFetch, 500); // 0.5초 후 재시도
						} else {
							reject(new Error(`${maxRetries}번 시도 후 실패`));
						}
					}
				}, 300);
			}

			tryFetch();
		});
	}

	fetchWithRetry("/api/data")
		.then((data) => {
			console.log("\n✅ 최종 성공:", data);
			console.log("→ 재시도 로직으로 안정성 향상");
		})
		.catch((error) => {
			console.error("\n❌ 최종 실패:", error.message);
			console.log("→ 최대 재시도 횟수 초과");
		})
		.finally(() => {
			console.log("\n==================================================\n");
		});
}, 13000);

/**
 * 에러 처리 정리
 */
setTimeout(() => {
	console.log("=== 에러 처리 체크리스트 ===\n");
	console.log("✅ 모든 Promise에 catch() 추가");
	console.log("✅ 체이닝 끝에 통합 에러 처리");
	console.log("✅ 특정 에러는 선택적 복구");
	console.log("✅ 비동기 콜백에서는 명시적 reject");
	console.log("✅ 중첩 대신 평탄한 체이닝");
	console.log("✅ then에서 값 반환 확인");
	console.log("✅ 불필요한 Promise 래핑 피하기");
	console.log("✅ forEach 대신 Promise.all 사용");
	console.log("\n==================================================");
}, 18000);
