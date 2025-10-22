/**
 * 09. 실전 유틸리티 - 정답
 */

console.log("=== 실전 유틸리티 정답 ===\n");

/**
 * TODO 1 정답: withTimeout
 */
console.log("--- TODO 1 정답: withTimeout ---\n");

function withTimeout(promise, ms) {
	const timeoutPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error(`타임아웃 ${ms}ms 초과`));
		}, ms);
	});

	return Promise.race([promise, timeoutPromise]);
}

// 테스트 1: 타임아웃 초과
const slowTask = new Promise((resolve) =>
	setTimeout(() => resolve("완료"), 2000),
);

withTimeout(slowTask, 1000)
	.then((result) => console.log("✅ 성공:", result))
	.catch((error) => {
		console.error("❌ 에러:", error.message);
		console.log("→ 2초 작업이 1초 타임아웃 초과\n");
	});

// 테스트 2: 타임아웃 내 완료
setTimeout(() => {
	const fastTask = new Promise((resolve) =>
		setTimeout(() => resolve("빠른 완료"), 500),
	);

	withTimeout(fastTask, 1000)
		.then((result) => {
			console.log("✅ 성공:", result);
			console.log("→ 0.5초 작업이 1초 내 완료\n");
			console.log("==================================================\n");
		})
		.catch((error) => console.error("❌ 에러:", error.message));
}, 1500);

/**
 * TODO 2 정답: retry
 */
	console.log("--- TODO 2 정답: retry ---\n");

	async function retry(fn, maxAttempts = 3) {
		for (let i = 1; i <= maxAttempts; i++) {
			try {
				console.log(`  시도 ${i}/${maxAttempts}`);
				const result = await fn();
				console.log(`  → ${i}번째 시도에서 성공!`);
				return result;
			} catch (error) {
				if (i === maxAttempts) {
					console.log(`  → ${maxAttempts}번 모두 실패`);
					throw error;
				}
				console.log(`  → ${i}번째 실패, 재시도 중...\n`);
				await new Promise((resolve) => setTimeout(resolve, 500));
			}
		}
	}

	// 테스트 (70% 실패율)
	function unstableTask() {
		return new Promise((resolve, reject) => {
			if (Math.random() > 0.7) {
				resolve("성공!");
			} else {
				reject(new Error("실패"));
			}
		});
	}

	retry(unstableTask, 5)
		.then((result) => {
			console.log("\n✅ 최종 성공:", result);
			console.log("→ 재시도 로직으로 안정성 향상\n");
			console.log("==================================================\n");
		})
		.catch((error) => {
			console.error("\n❌ 최종 실패:", error.message);
			console.log("→ 모든 재시도 소진\n");
			console.log("==================================================\n");
		});

/**
 * TODO 3 정답: sequence
 */
	console.log("--- TODO 3 정답: sequence ---\n");

	async function sequence(tasks) {
		const results = [];
		for (const task of tasks) {
			const result = await task();
			results.push(result);
		}
		return results;
	}

	// 테스트
	function createTask(id, delay) {
		return () =>
			new Promise((resolve) => {
				setTimeout(() => {
					console.log(`  작업${id} 완료 (${delay}ms)`);
					resolve(`결과${id}`);
				}, delay);
			});
	}

	const tasks = [createTask(1, 500), createTask(2, 300), createTask(3, 400)];

	const start = Date.now();
	sequence(tasks).then((results) => {
		const elapsed = Date.now() - start;
		console.log(`\n✅ 모든 결과: [${results.join(", ")}]`);
		console.log(`총 시간: ${elapsed}ms (약 1200ms)`);
		console.log("→ 순차 실행으로 순서 보장\n");
		console.log("==================================================\n");
		console.log("\n다음 학습: node 10-exercises.js\n");
	});
