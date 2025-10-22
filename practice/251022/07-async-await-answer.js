/**
 * 07. async/await - 정답 (10회 변환)
 */

console.log("=== async/await 변환 정답 ===\n");

/**
 * TODO 1-5: then → async/await 변환
 */

// TODO 1 정답
async function todo1() {
	const n1 = await Promise.resolve(10);
	const n2 = n1 + 5;
	const n3 = n2 * 2;
	console.log("TODO 1:", n3); // 30
}
todo1();

// TODO 2 정답
async function todo2() {
	try {
		await Promise.reject("에러");
	} catch (e) {
		console.error("TODO 2:", e);
	}
}
setTimeout(() => todo2(), 500);

// TODO 3 정답
async function todo3() {
	function getUser() {
		return Promise.resolve({ id: 1 });
	}
	function getPosts(id) {
		return Promise.resolve([{ title: "글" }]);
	}

	const user = await getUser();
	const posts = await getPosts(user.id);
	console.log("TODO 3:", posts);
}
setTimeout(() => todo3(), 1000);

// TODO 4 정답
async function todo4() {
	function task(n) {
		return Promise.resolve(n);
	}
	const results = await Promise.all([task(1), task(2), task(3)]);
	console.log("TODO 4:", results);
}
setTimeout(() => todo4(), 1500);

// TODO 5 정답
async function todo5() {
	function fetchData() {
		return Promise.resolve("데이터");
	}
	try {
		const data = await fetchData();
		console.log("TODO 5:", data);
	} catch (e) {
		console.error(e);
	} finally {
		console.log("TODO 5: 끝");
	}
}
setTimeout(() => todo5(), 2000);

/**
 * TODO 6-10: async/await → then 변환
 */

// TODO 6 정답
function todo6() {
	function step1() {
		return Promise.resolve(10);
	}
	function step2(a) {
		return Promise.resolve(a * 2);
	}
	return step1()
		.then((a) => step2(a))
		.then((b) => {
			console.log("TODO 6:", b);
			return b;
		});
}
setTimeout(() => todo6(), 3000);

// TODO 7 정답
function todo7() {
	function fetch() {
		return Promise.reject("에러");
	}
	return fetch()
		.then((data) => {
			console.log("TODO 7:", data);
			return data;
		})
		.catch((e) => {
			console.error("TODO 7:", e);
		});
}
setTimeout(() => todo7(), 3500);

// TODO 8 정답
function todo8() {
	function task(n) {
		return Promise.resolve(n);
	}
	return Promise.all([task(1), task(2), task(3)]).then((results) => {
		const sum = results.reduce((a, b) => a + b, 0);
		console.log("TODO 8:", sum);
		return sum;
	});
}
setTimeout(() => todo8(), 4000);

setTimeout(() => {
	console.log("\n==================================================");
	console.log("\n✅ 10회 변환 완료!");
	console.log("\n핵심 포인트:");
	console.log("• async 함수는 항상 Promise 반환");
	console.log("• await는 then 대신 사용");
	console.log("• try-catch는 catch() 대신");
	console.log("• finally는 try-catch-finally로");
	console.log("• Promise.all은 그대로 await와 조합");
	console.log("\n다음 학습: node 08-error-handling.js\n");
}, 5000);
