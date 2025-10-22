/**
 * 08. async/await + Event Loop - 정답
 */

console.log("=== async/await Event Loop 정답 ===\n");

console.log("--- TODO 1 정답 ---\n");

async function func1() {
	console.log("1");
	await Promise.resolve();
	console.log("2");
	await Promise.resolve();
	console.log("3");
}

async function func2() {
	console.log("4");
	await Promise.resolve();
	console.log("5");
}

func1();
func2();

/**
 * 출력: 1 → 4 → 2 → 5 → 3
 *
 * [Call Stack]
 * "1" → await (Microtask: [func1-2])
 * "4" → await (Microtask: [func1-2, func2-5])
 *
 * [Microtask 1] "2" → await (Microtask: [func2-5, func1-3])
 * [Microtask 2] "5"
 * [Microtask 3] "3"
 */

setTimeout(() => {
	console.log("\n--- TODO 2 정답 ---\n");

	async function test() {
		console.log("A");
		await Promise.resolve();
		console.log("B");
		setTimeout(() => console.log("C"), 0);
		await Promise.resolve();
		console.log("D");
	}

	setTimeout(() => console.log("E"), 0);
	test();
	Promise.resolve().then(() => console.log("F"));

	/**
	 * 출력: A → F → B → D → E → C
	 */
}, 2000);

setTimeout(() => {
	console.log("\n--- TODO 3 정답 ---\n");

	async function a() {
		console.log("1");
		await Promise.resolve();
		console.log("2");
		setTimeout(() => console.log("3"), 0);
	}

	async function b() {
		console.log("4");
		await Promise.resolve();
		console.log("5");
	}

	setTimeout(() => console.log("6"), 0);
	a();
	Promise.resolve().then(() => console.log("7"));
	b();

	/**
	 * 출력: 1 → 4 → 2 → 7 → 5 → 6 → 3
	 */
}, 5000);

setTimeout(() => {
	console.log("\n=== 08. 정답 완료 ===\n");
}, 8000);
