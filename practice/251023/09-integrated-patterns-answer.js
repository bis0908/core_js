/**
 * 09. 통합 패턴 - 정답
 */

console.log("=== 통합 패턴 정답 ===\n");

console.log("--- TODO 1 정답 ---\n");

async function fetchUser() {
	console.log("A");
	await Promise.resolve();
	return "User";
}

async function fetchPosts() {
	console.log("B");
	await Promise.resolve();
	return "Posts";
}

async function loadData() {
	console.log("C");
	const user = await fetchUser();
	console.log("D:", user);
	const posts = await fetchPosts();
	console.log("E:", posts);
	setTimeout(() => console.log("F"), 0);
}

setTimeout(() => console.log("G"), 0);
loadData();
Promise.resolve().then(() => console.log("H"));

/**
 * 출력: C → A → H → D: User → B → E: Posts → G → F
 */

setTimeout(() => {
	console.log("\n--- TODO 2 정답 ---\n");

	async function riskyOperation() {
		console.log("1");
		await Promise.resolve();
		console.log("2");
		return "Success";
	}

	async function main() {
		console.log("3");
		try {
			const result = await riskyOperation();
			console.log("4:", result);
		} catch (error) {
			console.log("Error");
		}
		console.log("5");
		setTimeout(() => console.log("6"), 0);
	}

	Promise.resolve()
		.then(() => console.log("7"))
		.then(() => console.log("8"));

	main();
	setTimeout(() => console.log("9"), 0);

	/**
	 * 출력: 3 → 1 → 7 → 2 → 8 → 4: Success → 5 → 9 → 6
	 */
}, 3000);

setTimeout(() => {
	console.log("\n--- TODO 3 정답 ---\n");

	async function complexFlow() {
		console.log("A");
		await Promise.resolve();
		console.log("B");

		setTimeout(() => {
			console.log("C");
			Promise.resolve().then(() => console.log("D"));
		}, 0);

		await Promise.resolve();
		console.log("E");

		Promise.resolve()
			.then(() => console.log("F"))
			.then(() => console.log("G"));
	}

	setTimeout(() => {
		console.log("H");
		Promise.resolve().then(() => console.log("I"));
	}, 0);

	complexFlow();

	Promise.resolve()
		.then(() => console.log("J"))
		.then(() => {
			console.log("K");
			setTimeout(() => console.log("L"), 0);
		});

	setTimeout(() => console.log("M"), 0);

	/**
	 * 출력: A → J → B → K → E → F → G → H → I → M → C → D → L
	 */
}, 7000);

setTimeout(() => {
	console.log("\n=== 09. 정답 완료 ===\n");
}, 11000);
