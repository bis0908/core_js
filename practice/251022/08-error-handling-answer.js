/**
 * 08. 에러 처리 - 정답
 */

console.log("=== 에러 처리 정답 ===\n");

Promise.reject(new Error("문제 발생"))
	.then((data) => console.log("성공:", data))
	.catch((error) => {
		console.error("❌ 예제:", error.message);
		console.log("\n==================================================\n");
	});

/**
 * TODO 1 정답
 */
	console.log("--- TODO 1 정답 ---\n");

	function step1() {
		return Promise.resolve("1단계");
	}
	function step2() {
		return Promise.reject(new Error("2단계 실패"));
	}
	function step3() {
		return Promise.resolve("3단계");
	}

	step1()
		.then((r) => {
			console.log(r);
			return step2();
		})
		.then((r) => {
			console.log(r); // 실행 안 됨
			return step3();
		})
		.then((r) => {
			console.log(r); // 실행 안 됨
		})
		.catch((error) => {
			console.error("❌ 에러 포착:", error.message);
			console.log("→ 어느 단계에서든 이 catch로 이동\n");
			console.log("==================================================\n");
		});

/**
 * TODO 2 정답
 */
	console.log("--- TODO 2 정답 ---\n");

	Promise.reject("네트워크 에러")
		.catch((error) => {
			console.log("에러 감지:", error);
			console.log("→ 캐시에서 데이터 로드");
			return "캐시 데이터"; // 에러 복구!
		})
		.then((data) => {
			console.log("✅ 데이터 사용:", data);
			console.log("→ 에러 상태에서 벗어남\n");
			console.log("==================================================\n");
		});

/**
 * TODO 3 정답
 */
	console.log("--- TODO 3 정답 ---\n");

	async function process() {
		try {
			console.log("1단계");
			await Promise.resolve();

			console.log("2단계");
			throw new Error("2단계 에러!");

			console.log("3단계"); // 실행 안 됨
		} catch (error) {
			console.error("❌ 에러:", error.message);
			console.log("→ try-catch로 에러 처리\n");
		}
	}

	process().then(() => {
		console.log("==================================================\n");
		console.log("\n다음 학습: node 09-practical-patterns.js\n");
	});
