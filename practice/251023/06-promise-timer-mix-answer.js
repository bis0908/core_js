/**
 * 06. Promise + Timer 복합 패턴 - 정답
 */

console.log("=== Promise+Timer 복합 패턴 정답 ===\n");

console.log("--- TODO 1 정답 ---\n");

console.log("A");

setTimeout(() => {
	console.log("B");
	Promise.resolve()
		.then(() => {
			console.log("C");
			setTimeout(() => console.log("D"), 0);
		})
		.then(() => console.log("E"));
}, 0);

Promise.resolve()
	.then(() => {
		console.log("F");
		setTimeout(() => {
			console.log("G");
			Promise.resolve().then(() => console.log("H"));
		}, 0);
	})
	.then(() => console.log("I"));

setTimeout(() => {
	console.log("J");
}, 0);

Promise.resolve()
	.then(() => console.log("K"))
	.then(() => {
		console.log("L");
		setTimeout(() => console.log("M"), 0);
	});

console.log("N");

/**
 * 출력 순서: A → N → F → K → I → L → B → C → E → J → G → H → D → M
 */

setTimeout(() => {
	console.log("\n--- TODO 2 정답 ---\n");

	Promise.resolve()
		.then(() => {
			console.log("P1");
			setTimeout(() => {
				console.log("T1");
				Promise.resolve().then(() => console.log("P2"));
			}, 0);
			return Promise.resolve();
		})
		.then(() => {
			console.log("P3");
			setTimeout(() => console.log("T2"), 0);
		});

	setTimeout(() => {
		console.log("T3");
		Promise.resolve()
			.then(() => {
				console.log("P4");
				setTimeout(() => console.log("T4"), 0);
			})
			.then(() => console.log("P5"));
	}, 0);

	Promise.resolve()
		.then(() => console.log("P6"))
		.then(() => console.log("P7"));

	/**
	 * 출력: P1 → P6 → P3 → P7 → T3 → P4 → P5 → T1 → P2 → T2 → T4
	 */
}, 3000);

setTimeout(() => {
	console.log("\n=== 06. 정답 완료 ===\n");
}, 7000);
