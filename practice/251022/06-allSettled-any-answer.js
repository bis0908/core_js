/**
 * 06. allSettled & any - 정답
 */

console.log("=== allSettled & any 정답 ===\n");

Promise.allSettled([
	Promise.resolve("성공1"),
	Promise.reject(new Error("실패2")),
	Promise.resolve("성공3"),
]).then((results) => {
	console.log("예제: allSettled 결과:\n");
	results.forEach((result, i) => {
		if (result.status === "fulfilled") {
			console.log(`  [${i}] 성공:`, result.value);
		} else {
			console.log(`  [${i}] 실패:`, result.reason.message);
		}
	});
	console.log("\n==================================================\n");
});

/**
 * TODO 1 정답
 */
	console.log("--- TODO 1 정답 ---\n");

	function fetchUsers() {
		return Promise.resolve({ data: "사용자 목록" });
	}

	function fetchPosts() {
		return Promise.reject(new Error("서버 오류"));
	}

	function fetchComments() {
		return Promise.resolve({ data: "댓글 목록" });
	}

	Promise.allSettled([fetchUsers(), fetchPosts(), fetchComments()]).then(
		(results) => {
			const succeeded = results.filter((r) => r.status === "fulfilled");
			const failed = results.filter((r) => r.status === "rejected");

			console.log(`✅ 성공: ${succeeded.length}개`);
			succeeded.forEach((r) => console.log("  -", r.value.data));

			console.log(`\n❌ 실패: ${failed.length}개`);
			failed.forEach((r) => console.log("  -", r.reason.message));

			console.log("\n→ 부분 성공으로도 페이지 렌더링 가능\n");
			console.log("==================================================\n");
		},
	);

/**
 * TODO 2 정답
 */
	console.log("--- TODO 2 정답 ---\n");

	function tryServer(name, willSucceed, delay) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log(`  시도: ${name}`);
				if (willSucceed) {
					resolve({ server: name, data: "데이터" });
				} else {
					reject(new Error(`${name} 실패`));
				}
			}, delay);
		});
	}

	Promise.any([
		tryServer("주서버", false, 200),
		tryServer("백업1", false, 400),
		tryServer("백업2", true, 600),
	])
		.then((result) => {
			console.log(`\n✅ 연결 성공: ${result.server}`);
			console.log("→ 높은 가용성 달성\n");
			console.log("==================================================\n");
		})
		.catch((error) => console.error("❌ 모두 실패"));

/**
 * TODO 3 정답: 4가지 메서드 비교
 */
	console.log("--- TODO 3 정답: 메서드 비교 ---\n");

	console.log("Promise.all():");
	console.log("  - 조건: 모두 성공해야 성공");
	console.log("  - 결과: 배열 [결과1, 결과2, ...]");
	console.log("  - 용도: 모든 작업이 필수\n");

	console.log("Promise.race():");
	console.log("  - 조건: 가장 빠른 하나");
	console.log("  - 결과: 단일 값 (성공/실패)");
	console.log("  - 용도: 타임아웃, 가장 빠른 응답\n");

	console.log("Promise.allSettled():");
	console.log("  - 조건: 모두 완료까지 대기");
	console.log("  - 결과: {status, value/reason} 배열");
	console.log("  - 용도: 부분 성공 허용\n");

	console.log("Promise.any():");
	console.log("  - 조건: 첫 번째 성공");
	console.log("  - 결과: 단일 값 (성공만)");
	console.log("  - 용도: 여러 대안, 높은 가용성\n");

	console.log("==================================================\n");
	console.log("\n다음 학습: node 07-async-await.js\n");
