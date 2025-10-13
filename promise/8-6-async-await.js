/**
 * 8-6. async/await (선택적)
 *
 * ES2017에서 추가된 async/await는 Promise를 더 동기 코드처럼 작성할 수 있게 해줍니다.
 * Promise의 문법적 설탕(Syntactic Sugar)으로, 가독성을 크게 향상시킵니다.
 */

console.log("=== 8-6. async/await ===\n");

console.log("--- 8-6-1. async 함수 기본 ---\n");

/**
 * async 함수
 * - 항상 Promise를 반환
 * - 일반 값을 return하면 자동으로 Promise.resolve()로 래핑
 * - throw하면 Promise.reject()와 동일
 */

async function basicAsync() {
	return "완료!"; // Promise.resolve('완료!')와 동일
}

basicAsync().then((result) => {
	console.log("결과:", result);
	console.log("→ async 함수는 항상 Promise 반환");
	console.log("\n==================================================\n");
});

/**
 * await 키워드
 */
setTimeout(() => {
	console.log("=== await 키워드 ===\n");

	/**
	 * await
	 * - Promise가 resolve될 때까지 기다림
	 * - async 함수 내부에서만 사용 가능
	 * - Promise의 결과값을 직접 반환
	 */

	function delay(ms, value) {
		return new Promise((resolve) => {
			setTimeout(() => resolve(value), ms);
		});
	}

	async function example() {
		console.log("시작");

		const result1 = await delay(500, "첫 번째");
		console.log("결과1:", result1);

		const result2 = await delay(500, "두 번째");
		console.log("결과2:", result2);

		const result3 = await delay(500, "세 번째");
		console.log("결과3:", result3);

		console.log("\n→ await로 비동기를 동기처럼 작성");
		console.log("\n==================================================\n");
	}

	example();
}, 500);

/**
 * 8-6-2. Promise 체이닝 vs async/await 비교
 */
setTimeout(() => {
	console.log("=== Promise 체이닝 vs async/await ===\n");

	function getUser(id) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ id, name: "홍길동" });
			}, 300);
		});
	}

	function getPosts(userId) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([
					{ id: 1, title: "첫 글" },
					{ id: 2, title: "둘째 글" },
				]);
			}, 300);
		});
	}

	function getComments(postId) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([{ id: 1, text: "좋아요" }]);
			}, 300);
		});
	}

	// Promise 체이닝 방식
	console.log("[Promise 체이닝]");
	getUser(1)
		.then((user) => {
			console.log("  1. 사용자:", user.name);
			return getPosts(user.id);
		})
		.then((posts) => {
			console.log("  2. 게시글:", posts.length, "개");
			return getComments(posts[0].id);
		})
		.then((comments) => {
			console.log("  3. 댓글:", comments.length, "개\n");
		});

	// async/await 방식
	setTimeout(async () => {
		console.log("[async/await]");
		const user = await getUser(1);
		console.log("  1. 사용자:", user.name);

		const posts = await getPosts(user.id);
		console.log("  2. 게시글:", posts.length, "개");

		const comments = await getComments(posts[0].id);
		console.log("  3. 댓글:", comments.length, "개");

		console.log("\n→ async/await가 더 읽기 쉬움");
		console.log("\n==================================================\n");
	}, 1500);
}, 2500);

/**
 * 8-6-3. 에러 처리 - try-catch
 */
setTimeout(() => {
	console.log("=== 8-6-3. async/await 에러 처리 ===\n");

	async function fetchDataWithError() {
		try {
			console.log("데이터 요청 중...");

			const data = await new Promise((resolve, reject) => {
				setTimeout(() => {
					reject(new Error("네트워크 오류"));
				}, 500);
			});

			console.log("데이터:", data); // 실행 안 됨
		} catch (error) {
			console.error("❌ 에러 발생:", error.message);
			console.log("→ try-catch로 에러 처리");
		} finally {
			console.log("🏁 정리 작업 (finally)");
		}

		console.log("\n==================================================\n");
	}

	fetchDataWithError();
}, 6500);

/**
 * 여러 단계의 에러 처리
 */
setTimeout(() => {
	console.log("=== 여러 단계 에러 처리 ===\n");

	function step(num, shouldFail = false) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (shouldFail) {
					reject(new Error(`${num}단계 실패`));
				} else {
					console.log(`  ✓ ${num}단계 완료`);
					resolve(`${num}단계 결과`);
				}
			}, 300);
		});
	}

	async function processSteps() {
		try {
			await step(1);
			await step(2, true); // 실패
			await step(3); // 실행 안 됨
		} catch (error) {
			console.error(`\n❌ ${error.message}`);
			console.log("→ 에러 발생 시 이후 단계는 실행 안 됨");
		}

		console.log("\n==================================================\n");
	}

	processSteps();
}, 8500);

/**
 * 8-6-4. 병렬 처리 패턴
 */
setTimeout(() => {
	console.log("=== 8-6-4. 순차 vs 병렬 실행 ===\n");

	function task(id, delay) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(`  ✓ 작업${id} 완료`);
				resolve(`결과${id}`);
			}, delay);
		});
	}

	// ❌ 나쁜 예: 순차 실행 (느림)
	async function sequential() {
		console.log("[순차 실행 - 느림]");
		const start = Date.now();

		const result1 = await task(1, 500);
		const result2 = await task(2, 500);
		const result3 = await task(3, 500);

		const elapsed = Date.now() - start;
		console.log(`\n총 시간: ${elapsed}ms (약 1500ms)`);
		console.log("→ 각 작업을 순서대로 대기\n");
	}

	sequential().then(() => {
		setTimeout(async () => {
			// ✅ 좋은 예: 병렬 실행 (빠름)
			console.log("[병렬 실행 - 빠름]");
			const start = Date.now();

			// Promise를 먼저 생성 (즉시 시작)
			const promise1 = task(1, 500);
			const promise2 = task(2, 500);
			const promise3 = task(3, 500);

			// 그 다음 await
			const result1 = await promise1;
			const result2 = await promise2;
			const result3 = await promise3;

			const elapsed = Date.now() - start;
			console.log(`\n총 시간: ${elapsed}ms (약 500ms)`);
			console.log("→ 모든 작업을 동시에 실행");
			console.log("\n==================================================\n");
		}, 500);
	});
}, 11000);

/**
 * Promise.all과 async/await 조합
 */
setTimeout(() => {
	console.log("=== Promise.all과 async/await ===\n");

	function fetchData(id, delay) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(`  ✓ 데이터${id} 로드`);
				resolve(`데이터${id}`);
			}, delay);
		});
	}

	async function fetchAllData() {
		console.log("병렬 데이터 로딩 시작...\n");
		const start = Date.now();

		// Promise.all과 함께 사용
		const [data1, data2, data3] = await Promise.all([
			fetchData(1, 300),
			fetchData(2, 500),
			fetchData(3, 400),
		]);

		const elapsed = Date.now() - start;
		console.log(`\n총 시간: ${elapsed}ms (약 500ms)`);
		console.log("결과:", [data1, data2, data3]);
		console.log("\n→ Promise.all과 구조 분해로 깔끔한 병렬 처리");
		console.log("\n==================================================\n");
	}

	fetchAllData();
}, 15000);

/**
 * 실전 예제: 순차/병렬 혼합
 */
setTimeout(() => {
	console.log("=== 실전: 순차/병렬 혼합 패턴 ===\n");

	async function complexFlow() {
		try {
			// 1단계: 사용자 인증 (순차 - 필수)
			console.log("1. 사용자 인증 중...");
			await new Promise((resolve) => setTimeout(resolve, 300));
			console.log("   ✓ 인증 완료\n");

			// 2단계: 여러 데이터 병렬 로딩
			console.log("2. 데이터 병렬 로딩 중...");
			const [userData, postsData, settingsData] = await Promise.all([
				new Promise((resolve) =>
					setTimeout(() => resolve({ name: "홍길동" }), 300),
				),
				new Promise((resolve) =>
					setTimeout(() => resolve([{ title: "글1" }]), 400),
				),
				new Promise((resolve) =>
					setTimeout(() => resolve({ theme: "dark" }), 200),
				),
			]);
			console.log("   ✓ 모든 데이터 로드 완료\n");

			// 3단계: 데이터 처리 (순차)
			console.log("3. 데이터 처리 중...");
			await new Promise((resolve) => setTimeout(resolve, 300));
			console.log("   ✓ 처리 완료");

			console.log("\n✅ 전체 프로세스 완료");
			console.log("→ 필수 순차 + 독립 병렬 조합으로 최적화");
		} catch (error) {
			console.error("❌ 에러:", error.message);
		}

		console.log("\n==================================================\n");
	}

	complexFlow();
}, 17000);

/**
 * async/await 주의사항
 */
setTimeout(() => {
	console.log("=== async/await 주의사항 ===\n");

	console.log("1. await는 async 함수 내부에서만 사용");
	console.log("   → 최상위 레벨에서는 사용 불가 (모듈 제외)\n");

	console.log("2. 순차 실행 주의");
	console.log("   ❌ const a = await taskA(); const b = await taskB();");
	console.log("   ✅ const [a, b] = await Promise.all([taskA(), taskB()]);\n");

	console.log("3. forEach와 async/await");
	console.log("   ❌ [1,2,3].forEach(async id => await fetch(id));");
	console.log("   ✅ await Promise.all([1,2,3].map(id => fetch(id)));\n");

	console.log("4. try-catch로 에러 처리 필수");
	console.log("   → catch 없으면 UnhandledPromiseRejection\n");

	console.log("5. Promise 체이닝과 혼용 가능");
	console.log("   → 상황에 따라 적절한 방식 선택");

	console.log("\n==================================================\n");
}, 19000);

/**
 * 실전 패턴: 재시도 로직
 */
setTimeout(() => {
	console.log("=== 실전: async/await 재시도 로직 ===\n");

	async function fetchWithRetry(url, maxRetries = 3) {
		for (let i = 1; i <= maxRetries; i++) {
			try {
				console.log(`  시도 ${i}/${maxRetries}...`);

				// 가상 fetch (70% 성공률)
				const success = Math.random() > 0.3;
				await new Promise((resolve, reject) => {
					setTimeout(() => {
						if (success) resolve();
						else reject(new Error("네트워크 오류"));
					}, 300);
				});

				console.log(`  ✓ ${i}번째 시도에서 성공!\n`);
				return `데이터: ${url}`;
			} catch (error) {
				console.log(`  ✗ ${i}번째 시도 실패`);

				if (i === maxRetries) {
					throw new Error(`${maxRetries}번 시도 후 실패`);
				}

				console.log("  → 재시도 중...\n");
				await new Promise((resolve) => setTimeout(resolve, 500));
			}
		}
	}

	(async () => {
		try {
			const result = await fetchWithRetry("/api/data");
			console.log("✅ 최종 성공:", result);
		} catch (error) {
			console.error("❌ 최종 실패:", error.message);
		}

		console.log("\n→ async/await로 재시도 로직 구현이 간단");
		console.log("\n==================================================");
	})();
}, 21000);
