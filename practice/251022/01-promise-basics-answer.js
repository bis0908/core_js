/**
 * 01. Promise 기본 개념과 생성 - 정답
 */

console.log("=== Promise 기본 개념 정답 ===\n");

console.log("--- 예제: Promise 기본 구조 복습 ---\n");

const simplePromise = new Promise((resolve, reject) => {
	console.log("1. Promise 생성자 내부 실행 (동기적)");

	setTimeout(() => {
		console.log("2. 1초 후 비동기 작업 완료");
		resolve("성공 결과!");
	}, 1000);
});

console.log("3. Promise 생성 완료 (pending 상태)");

simplePromise.then((result) => {
	console.log("4. then() 실행:", result);
	console.log("\n==================================================\n");
});

/**
 * TODO 1 정답: 첫 번째 Promise 만들기
 */

	console.log("--- TODO 1 정답 ---\n");

	const myFirstPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Hello, Promise!");
		}, 2000);
	});

	myFirstPromise.then((result) => {
		console.log("✅ 결과:", result);
		console.log("\n==================================================\n");
	});

/**
 * TODO 2 정답: 성공/실패를 분기하는 Promise
 */

	console.log("--- TODO 2 정답 ---\n");

	function checkEvenNumber(num) {
		return new Promise((resolve, reject) => {
			if (num % 2 === 0) {
				resolve("짝수입니다");
			} else {
				reject(new Error("홀수입니다"));
			}
		});
	}

	// 짝수 테스트
	checkEvenNumber(4)
		.then((result) => console.log("✅ 4:", result))
		.catch((error) => console.error("❌ 4:", error.message));

	// 홀수 테스트
	checkEvenNumber(7)
		.then((result) => console.log("✅ 7:", result))
		.catch((error) => console.error("❌ 7:", error.message));

	console.log("\n==================================================\n");

/**
 * TODO 3 정답: 가상 데이터 로딩 함수
 */

	console.log("--- TODO 3 정답 ---\n");

	function fetchUser(userId) {
		return new Promise((resolve, reject) => {
			// userId 유효성 검사
			if (userId <= 0) {
				reject(new Error("유효하지 않은 ID"));
				return;
			}

			// 1초 후 사용자 데이터 반환
			setTimeout(() => {
				const user = {
					id: userId,
					name: `사용자${userId}`,
				};
				resolve(user);
			}, 1000);
		});
	}

	// 정상 케이스 테스트
	console.log("사용자 1 로딩 중...");
	fetchUser(1)
		.then((user) => {
			console.log("✅ 로딩 완료:", user);
		})
		.catch((error) => {
			console.error("❌ 에러:", error.message);
		});

	// 에러 케이스 테스트
	setTimeout(() => {
		console.log("\n유효하지 않은 ID로 시도...");
		fetchUser(-1)
			.then((user) => {
				console.log("✅ 로딩 완료:", user);
			})
			.catch((error) => {
				console.error("❌ 에러:", error.message);
				console.log("\n==================================================\n");
			});
	}, 1500);

/**
 * 핵심 포인트 정리
 */

setTimeout(() => {
	console.log("\n=== 핵심 포인트 ===\n");
	console.log("1. Promise 생성자는 (resolve, reject) => {} 함수를 받습니다");
	console.log("2. 성공 시 resolve(값) 호출");
	console.log("3. 실패 시 reject(에러) 호출");
	console.log("4. reject 호출 시 new Error()로 에러 객체 전달 권장");
	console.log("5. 조건문으로 성공/실패를 분기할 수 있습니다");
	console.log("6. setTimeout과 함께 사용하여 비동기 작업 시뮬레이션");
	console.log("\n다음 학습: node 02-promise-states.js\n");
}, 10000);
