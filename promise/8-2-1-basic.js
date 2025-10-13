/**
 * 8-2-1. Promise 기본 개념과 생성
 *
 * Promise는 비동기 작업의 완료 또는 실패를 나타내는 객체입니다.
 * 콜백 헬을 해결하고 비동기 코드를 더 깔끔하게 작성할 수 있습니다.
 */

console.log("=== 8-2-1. Promise란 무엇인가 ===");

/**
 * Promise의 기본 구조
 *
 * new Promise(executor)
 * - executor: 실행 함수 (resolve, reject를 매개변수로 받음)
 * - resolve(value): 작업 성공 시 호출
 * - reject(reason): 작업 실패 시 호출
 */

console.log("--- Promise 생성 기본 구조 ---\n");

const basicPromise = new Promise((resolve, reject) => {
	console.log("1. Promise 생성자 내부 코드 실행 (동기적)");

	// 비동기 작업 시뮬레이션
	setTimeout(() => {
		console.log("2. 비동기 작업 완료");
		resolve("성공적으로 완료되었습니다!");
	}, 1000);
});

console.log("3. Promise 생성 완료 (pending 상태)\n");

console.log("==================================================\n");

/**
 * Promise의 특징
 */
setTimeout(() => {
	console.log("=== Promise의 주요 특징 ===");
	console.log("1. 비동기 작업의 최종 결과를 담는 그릇");
	console.log("2. 성공(resolve) 또는 실패(reject)를 명확히 구분");
	console.log("3. 체이닝을 통한 순차적 비동기 처리 지원");
	console.log("4. 한 번 결정된 상태(settled)는 변경되지 않음");
	console.log("\n==================================================\n");
}, 1500);

/**
 * 간단한 Promise 예제 - 성공 케이스
 */
setTimeout(() => {
	console.log("=== 간단한 Promise 예제 - 성공 ===\n");

	const successPromise = new Promise((resolve, reject) => {
		console.log("데이터 로딩 중...");

		setTimeout(() => {
			const data = { id: 1, name: "홍길동", age: 30 };
			resolve(data); // 성공 시 데이터 전달
		}, 500);
	});

	console.log("Promise 생성 완료 (아직 pending)\n");

	// then() 메서드로 성공 결과 처리
	successPromise.then((result) => {
		console.log("✅ 데이터 로드 성공!");
		console.log("받은 데이터:", result);
		console.log("\n==================================================\n");
	});
}, 2000);

/**
 * 간단한 Promise 예제 - 실패 케이스
 */
setTimeout(() => {
	console.log("=== 간단한 Promise 예제 - 실패 ===\n");

	const failPromise = new Promise((resolve, reject) => {
		console.log("서버 요청 중...");

		setTimeout(() => {
			const error = new Error("네트워크 연결 실패");
			reject(error); // 실패 시 에러 전달
		}, 500);
	});

	console.log("Promise 생성 완료\n");

	// catch() 메서드로 실패 처리
	failPromise.catch((error) => {
		console.error("❌ 요청 실패!");
		console.error("에러 내용:", error.message);
		console.log("\n==================================================\n");
	});
}, 3500);

/**
 * 조건부 Promise - 성공/실패 분기
 */
setTimeout(() => {
	console.log("=== 조건부 Promise 예제 ===\n");

	function checkNumber(num) {
		return new Promise((resolve, reject) => {
			console.log(`숫자 검증 중: ${num}`);

			setTimeout(() => {
				if (num > 0) {
					resolve(`${num}은(는) 양수입니다`);
				} else {
					reject(`${num}은(는) 양수가 아닙니다`);
				}
			}, 500);
		});
	}

	// 성공 케이스
	checkNumber(10)
		.then((message) => {
			console.log("✅", message);
		})
		.catch((error) => {
			console.error("❌", error);
		});

	// 실패 케이스
	setTimeout(() => {
		checkNumber(-5)
			.then((message) => {
				console.log("✅", message);
			})
			.catch((error) => {
				console.error("❌", error);
				console.log("\n==================================================\n");
			});
	}, 1000);
}, 5000);

/**
 * Promise의 불변성 (한 번 결정되면 변경 불가)
 */
setTimeout(() => {
	console.log("=== Promise 상태의 불변성 ===\n");

	const immutablePromise = new Promise((resolve, reject) => {
		resolve("첫 번째 resolve 호출");

		// 이미 resolved 상태이므로 무시됨
		resolve("두 번째 resolve 호출");
		reject("reject 호출도 무시됨");
	});

	immutablePromise.then((result) => {
		console.log("결과:", result);
		console.log("→ 첫 번째 resolve만 유효, 이후 호출은 무시됨");
		console.log("\n==================================================\n");
	});
}, 7500);

/**
 * 동기 코드와 비동기 코드 혼합
 */
setTimeout(() => {
	console.log("=== Promise 실행 순서 이해 ===\n");

	console.log("1. 동기 코드 시작");

	const orderPromise = new Promise((resolve) => {
		console.log("2. Promise 생성자 내부 (동기)");
		resolve("3. resolve 호출 (동기)");
	});

	console.log("4. Promise 생성 완료");

	orderPromise.then((result) => {
		console.log("6. then 콜백 실행 (비동기, 마이크로태스크 큐)");
	});

	console.log("5. 동기 코드 끝");

	console.log("\n→ then 콜백은 마이크로태스크 큐에 들어가므로");
	console.log("   동기 코드가 모두 실행된 후에 실행됨");
	console.log("\n==================================================");
}, 8500);
