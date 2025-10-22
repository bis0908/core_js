/**
 * 10. 종합 연습 문제 - 정답
 */

console.log("=== 종합 연습 정답 ===\n");

/**
 * 문제 1 정답: 사용자 프로필 로딩
 */
console.log("--- 문제 1 정답 ---\n");

function fetchUserProfile(userId) {
	return new Promise((resolve, reject) => {
		if (userId <= 0) {
			reject(new Error("유효하지 않은 userId"));
			return;
		}

		setTimeout(() => {
			resolve({
				id: userId,
				name: "사용자",
				email: "user@email.com",
			});
		}, 1000);
	});
}

fetchUserProfile(1)
	.then((profile) => {
		console.log("✅ 프로필:", profile);
	})
	.catch((error) => {
		console.error("❌ 에러:", error.message);
	});

setTimeout(() => {
	console.log("\n==================================================\n");
}, 1500);

/**
 * 문제 2 정답: 대시보드 로딩
 */
setTimeout(() => {
	console.log("--- 문제 2 정답 ---\n");

	async function loadDashboard() {
		console.log("대시보드 로딩 시작...");
		const start = Date.now();

		const [user, posts, notifications] = await Promise.all([
			new Promise((resolve) =>
				setTimeout(() => resolve({ name: "홍길동" }), 500),
			),
			new Promise((resolve) =>
				setTimeout(() => resolve([{ title: "글1" }, { title: "글2" }]), 700),
			),
			new Promise((resolve) =>
				setTimeout(() => resolve([{ msg: "알림1" }]), 400),
			),
		]);

		const elapsed = Date.now() - start;

		console.log(`✅ 로딩 완료 (${elapsed}ms)`);
		console.log("  사용자:", user.name);
		console.log("  게시글:", posts.length, "개");
		console.log("  알림:", notifications.length, "개\n");

		return { user, posts, notifications };
	}

	loadDashboard().then(() => {
		console.log("==================================================\n");
	});
}, 2000);

/**
 * 문제 3 정답: 실행 순서 예측
 */
setTimeout(() => {
	console.log("--- 문제 3 정답 ---\n");

	console.log("A");

	Promise.resolve()
		.then(() => console.log("B"))
		.then(() => console.log("C"));

	setTimeout(() => console.log("D"), 0);

	console.log("E");

	setTimeout(() => {
		console.log("\n출력 순서: A → E → B → C → D");
		console.log("\n해설:");
		console.log("1. A, E: 동기 코드 (즉시 실행)");
		console.log("2. B, C: Promise then (마이크로태스크)");
		console.log("3. D: setTimeout (태스크 큐)");
		console.log("→ 동기 → 마이크로태스크 → 태스크 순\n");
		console.log("==================================================\n");
	}, 500);
}, 4500);

/**
 * 문제 4 정답: 데이터 파이프라인
 */
setTimeout(() => {
	console.log("--- 문제 4 정답 ---\n");

	function fetchRawData() {
		console.log("1. 원시 데이터 fetch");
		return Promise.resolve('{"value": 100}');
	}

	function validateData(data) {
		console.log("2. 데이터 검증");
		const parsed = JSON.parse(data);
		if (!parsed.value) {
			return Promise.reject(new Error("유효하지 않은 데이터"));
		}
		return Promise.resolve(parsed);
	}

	function transformData(data) {
		console.log("3. 데이터 변환");
		return Promise.resolve({
			...data,
			transformed: true,
			doubleValue: data.value * 2,
		});
	}

	function saveData(data) {
		console.log("4. 데이터 저장");
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("   저장 완료:", data);
				resolve(data);
			}, 500);
		});
	}

	// 파이프라인 실행
	fetchRawData()
		.then(validateData)
		.then(transformData)
		.then(saveData)
		.then((finalData) => {
			console.log("\n✅ 파이프라인 완료");
			console.log("최종 데이터:", finalData);
			console.log("\n==================================================\n");
		})
		.catch((error) => {
			console.error("❌ 파이프라인 에러:", error.message);
		});
}, 6000);

/**
 * 문제 5 정답: 재시도 + 타임아웃
 */
setTimeout(() => {
	console.log("--- 문제 5 정답 ---\n");

	function withTimeout(promise, ms) {
		return Promise.race([
			promise,
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error(`타임아웃 ${ms}ms`)), ms),
			),
		]);
	}

	async function retry(fn, maxRetries) {
		for (let i = 1; i <= maxRetries; i++) {
			try {
				return await fn();
			} catch (error) {
				if (i === maxRetries) throw error;
				console.log(`  시도 ${i} 실패, 재시도...`);
				await new Promise((resolve) => setTimeout(resolve, 300));
			}
		}
	}

	async function fetchWithRetryAndTimeout(url, timeout, maxRetries) {
		return retry(() => {
			const fetchPromise = new Promise((resolve) => {
				// 랜덤 지연 (성공률 50%)
				const delay = Math.random() * 2000;
				setTimeout(() => resolve(`데이터: ${url}`), delay);
			});
			return withTimeout(fetchPromise, timeout);
		}, maxRetries);
	}

	// 테스트
	fetchWithRetryAndTimeout("/api/data", 1000, 3)
		.then((data) => {
			console.log("\n✅ 성공:", data);
			console.log("\n==================================================\n");
		})
		.catch((error) => {
			console.error("\n❌ 실패:", error.message);
			console.log("\n==================================================\n");
		});
}, 9000);

/**
 * 문제 6 정답: Promise Pool
 */
setTimeout(() => {
	console.log("--- 문제 6 정답 ---\n");

	class PromisePool {
		constructor(concurrency) {
			this.concurrency = concurrency;
			this.running = 0;
			this.queue = [];
		}

		add(promiseFn) {
			return new Promise((resolve, reject) => {
				this.queue.push({ promiseFn, resolve, reject });
				this.run();
			});
		}

		async run() {
			while (this.running < this.concurrency && this.queue.length > 0) {
				const { promiseFn, resolve, reject } = this.queue.shift();
				this.running++;

				try {
					const result = await promiseFn();
					resolve(result);
				} catch (error) {
					reject(error);
				} finally {
					this.running--;
					this.run();
				}
			}
		}
	}

	// 테스트
	const pool = new PromisePool(2); // 동시 2개만

	function createTask(id) {
		return () =>
			new Promise((resolve) => {
				console.log(`  작업${id} 시작`);
				setTimeout(() => {
					console.log(`  작업${id} 완료`);
					resolve(`결과${id}`);
				}, 1000);
			});
	}

	Promise.all([
		pool.add(createTask(1)),
		pool.add(createTask(2)),
		pool.add(createTask(3)),
		pool.add(createTask(4)),
	]).then((results) => {
		console.log("\n✅ 모든 작업 완료:", results);
		console.log("→ 동시 2개씩만 실행됨\n");
		console.log("==================================================\n");
		console.log("\n🎉 모든 연습 문제 완료!");
		console.log("\n내일은 이벤트 루프를 정복합시다!\n");
	});
}, 12000);
