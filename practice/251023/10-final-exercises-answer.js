/**
 * 10. 최종 종합 연습 문제 - 정답
 */

console.log("=== 최종 종합 연습 문제 정답 ===\n");

/**
 * 문제 1 정답
 */

console.log("--- 문제 1 정답 ---\n");

console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

/**
 * 출력: A → D → C → B
 */

setTimeout(() => {
	console.log("\n--- 문제 2 정답 ---\n");

	Promise.resolve()
		.then(() => console.log("A"))
		.then(() => console.log("B"));

	Promise.resolve().then(() => console.log("C"));

	console.log("D");

	/**
	 * 출력: D → A → C → B
	 */
}, 1000);

setTimeout(() => {
	console.log("\n--- 문제 3 정답 ---\n");

	setTimeout(() => {
		console.log("A");
		Promise.resolve().then(() => console.log("B"));
	}, 0);

	setTimeout(() => console.log("C"), 0);
	Promise.resolve().then(() => console.log("D"));

	/**
	 * 출력: D → A → B → C
	 */
}, 2000);

setTimeout(() => {
	console.log("\n--- 문제 4 정답 ---\n");

	async function test() {
		console.log("A");
		await Promise.resolve();
		console.log("B");
	}

	test();
	Promise.resolve().then(() => console.log("C"));
	console.log("D");

	/**
	 * 출력: A → D → B → C
	 */
}, 3000);

setTimeout(() => {
	console.log("\n--- 문제 5 정답 ---\n");

	console.log("1");

	setTimeout(() => {
		console.log("2");
		Promise.resolve().then(() => console.log("3"));
	}, 0);

	Promise.resolve()
		.then(() => {
			console.log("4");
			setTimeout(() => console.log("5"), 0);
		})
		.then(() => console.log("6"));

	console.log("7");

	/**
	 * 출력: 1 → 7 → 4 → 6 → 2 → 3 → 5
	 */
}, 4000);

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("✅ 문제 1~5 정답 확인 완료!\n");
	console.log("💡 나머지 문제 6~15는:");
	console.log("   - 04-event-loop-visualization.js");
	console.log("   - 06-promise-timer-mix.js");
	console.log("   - 07-execution-order-advanced.js");
	console.log("   - 09-integrated-patterns.js");
	console.log("   에서 다룬 패턴들을 복습하세요!\n");
	console.log("==================================================\n");
}, 6000);

setTimeout(() => {
	console.log("\n🎯 Event Loop 마스터 달성 기준:\n");
	console.log("✅ 문제 1~5: 100% 정답");
	console.log("✅ 복잡한 패턴(문제 6~10): 80% 이상 정답");
	console.log("✅ 초고난도(문제 11~15): 60% 이상 정답");
	console.log("\n📚 추가 학습이 필요하다면:");
	console.log("   → 01번부터 순서대로 다시 학습");
	console.log("   → 각 정답 파일의 상세 설명 정독");
	console.log("   → 시각화 도구 활용 (JavaScript Visualizer)");
	console.log("\n💪 멘토링 대비 완료! 자신감을 가지세요!\n");
}, 8000);

setTimeout(() => {
	console.log("=== 10. 최종 종합 문제 정답 완료 ===\n");
	console.log("🔥 모든 학습을 완료했습니다!");
	console.log("🚀 이제 멘토링에서 자신있게 답변하세요!\n");
}, 10000);
