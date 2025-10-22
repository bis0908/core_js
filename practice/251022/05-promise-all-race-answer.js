/**
 * 05. Promise.all() & race() - 정답
 */

console.log("=== Promise.all() & race() 정답 ===\n");

Promise.all([
	Promise.resolve(3),
	new Promise((resolve) => setTimeout(() => resolve(30), 500)),
	Promise.resolve(300),
]).then((results) => {
	console.log("예제: all() 결과:", results);
	console.log("\n==================================================\n");
});

/**
 * TODO 1 정답
 */
	console.log("--- TODO 1 정답 ---\n");

	function fetchUser() {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("  ✓ 사용자 로드 (500ms)");
				resolve({ id: 1, name: "홍길동" });
			}, 500);
		});
	}

	function fetchPosts() {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("  ✓ 게시글 로드 (700ms)");
				resolve([
					{ id: 1, title: "글1" },
					{ id: 2, title: "글2" },
				]);
			}, 700);
		});
	}

	function fetchComments() {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("  ✓ 댓글 로드 (400ms)");
				resolve([{ id: 1, text: "댓글" }]);
			}, 400);
		});
	}

	const start = Date.now();
	Promise.all([fetchUser(), fetchPosts(), fetchComments()]).then(
		([user, posts, comments]) => {
			const elapsed = Date.now() - start;
			console.log(`\n✅ 모두 완료! (${elapsed}ms)`);
			console.log("사용자:", user.name);
			console.log("게시글:", posts.length, "개");
			console.log("댓글:", comments.length, "개");
			console.log("→ 가장 느린 700ms 기준\n");
			console.log("==================================================\n");
		},
	);

/**
 * TODO 2 정답
 */
	console.log("--- TODO 2 정답 ---\n");

	Promise.all([
		Promise.resolve("성공1"),
		Promise.reject(new Error("실패!")),
		Promise.resolve("성공2"),
	])
		.then((results) => console.log("✅ 성공:", results))
		.catch((error) => {
			console.error("❌ 실패:", error.message);
			console.log("→ 하나라도 실패하면 전체 실패\n");
			console.log("==================================================\n");
		});

/**
 * TODO 3 정답
 */
	console.log("--- TODO 3 정답 ---\n");

	function timeout(ms) {
		return new Promise((resolve, reject) => {
			setTimeout(() => reject(new Error(`타임아웃 ${ms}ms`)), ms);
		});
	}

	function fetchData() {
		return new Promise((resolve) => {
			setTimeout(() => resolve("데이터"), 2000);
		});
	}

	console.log("2초 작업 vs 1초 타임아웃...\n");

	Promise.race([fetchData(), timeout(1000)])
		.then((data) => console.log("✅ 성공:", data))
		.catch((error) => {
			console.error("❌ 에러:", error.message);
			console.log("→ 타임아웃이 더 빨라서 실패\n");
			console.log("==================================================\n");
		});

/**
 * TODO 4 정답
 */
	console.log("--- TODO 4 정답 ---\n");

	function fetchFromServer(name, delay) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(`  ${name} 응답 완료 (${delay}ms)`);
				resolve({ server: name, data: "응답" });
			}, delay);
		});
	}

	const servers = [
		fetchFromServer("서버A", 500),
		fetchFromServer("서버B", 300),
		fetchFromServer("서버C", 700),
	];

	Promise.race(servers).then((result) => {
		console.log(`\n✅ 선택: ${result.server}`);
		console.log("→ 가장 빠른 서버B(300ms) 선택\n");
		console.log("==================================================\n");
		console.log("\n다음 학습: node 06-allSettled-any.js\n");
	});
