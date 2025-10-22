/**
 * 03. then, catch, finally 메서드 - 정답
 */

console.log("=== then, catch, finally 메서드 정답 ===\n");

console.log("--- 예제 복습 ---\n");

Promise.resolve("성공 데이터").then((result) => {
	console.log("✅ then() 실행:", result);
	console.log();
});

setTimeout(() => {
	Promise.reject(new Error("실패 원인")).catch((error) => {
		console.error("❌ catch() 실행:", error.message);
		console.log("\n==================================================\n");
	});
}, 500);

/**
 * TODO 1 정답: then과 catch 함께 사용하기
 */

	console.log("--- TODO 1 정답 ---\n");

	function divideNumbers(a, b) {
		return new Promise((resolve, reject) => {
			if (b === 0) {
				reject(new Error("0으로 나눌 수 없습니다"));
			} else {
				resolve(a / b);
			}
		});
	}

	console.log("테스트 1: 10 / 2");
	divideNumbers(10, 2)
		.then((result) => console.log("✅ 결과:", result))
		.catch((error) => console.error("❌ 에러:", error.message));

	console.log("\n테스트 2: 10 / 0");
	divideNumbers(10, 0)
		.then((result) => console.log("✅ 결과:", result))
		.catch((error) => console.error("❌ 에러:", error.message));

	setTimeout(() => {
		console.log("\n==================================================\n");
	}, 500);

/**
 * TODO 2 정답: 로딩 인디케이터
 */

	console.log("--- TODO 2 정답 ---\n");

	function fetchData(url, delay, willSucceed) {
		console.log(`🔄 로딩 중: ${url}`);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (willSucceed) {
					resolve({ url, data: "응답 데이터" });
				} else {
					reject(new Error("요청 실패"));
				}
			}, delay);
		});
	}

	// 성공 케이스
	fetchData("/api/users", 1000, true)
		.then((data) => console.log("  데이터:", data))
		.catch((error) => console.error("  에러:", error.message))
		.finally(() => console.log("✅ 로딩 완료: /api/users\n"));

	// 실패 케이스
	setTimeout(() => {
		fetchData("/api/posts", 1000, false)
			.then((data) => console.log("  데이터:", data))
			.catch((error) => console.error("  에러:", error.message))
			.finally(() => {
				console.log("✅ 로딩 완료: /api/posts");
				console.log("→ finally는 성공/실패 무관하게 항상 실행\n");
			});
	}, 500);

	setTimeout(() => {
		console.log("==================================================\n");
	}, 3000);

/**
 * TODO 3 정답: then의 두 번째 인자
 */

	console.log("--- TODO 3 정답 ---\n");

	Promise.reject("에러 발생").then(
		(result) => {
			console.log("✅ 성공:", result);
		},
		(error) => {
			console.error("❌ 실패:", error);
			console.log("→ then의 두 번째 인자로 에러 처리 가능");
			console.log("→ 하지만 일반적으로 catch()를 더 많이 사용\n");
		},
	);

	setTimeout(() => {
		console.log("==================================================\n");
	}, 500);

/**
 * TODO 4 정답: 메서드 체이닝 기초
 */

	console.log("--- TODO 4 정답 ---\n");

	console.log("시작값: 5\n");

	Promise.resolve(5)
		.then((num) => {
			console.log(`1. ${num} + 10 = ${num + 10}`);
			return num + 10;
		})
		.then((num) => {
			console.log(`2. ${num} * 2 = ${num * 2}`);
			return num * 2;
		})
		.then((result) => {
			console.log(`\n최종 결과: ${result}`);
			console.log("→ 각 then의 반환값이 다음 then으로 전달됨\n");
		});

	setTimeout(() => {
		console.log("==================================================\n");
	}, 500);

/**
 * TODO 5 정답: 에러 복구
 */

	console.log("--- TODO 5 정답 ---\n");

	Promise.reject("초기 에러")
		.catch((error) => {
			console.log("❌ 에러 발생:", error);
			console.log("🔄 에러를 복구합니다...");
			return "복구된 값"; // 새로운 값 반환으로 에러 복구
		})
		.then((value) => {
			console.log("✅ 복구 성공:", value);
			console.log("→ catch에서 값을 반환하면 정상 흐름으로 복귀\n");
		});

	setTimeout(() => {
		console.log("==================================================\n");
	}, 500);

/**
 * 보너스: finally의 특별한 특징
 */

setTimeout(() => {
	console.log("--- 보너스: finally의 특징 ---\n");

	Promise.resolve("원본 값")
		.finally(() => {
			console.log("1. finally() 실행");
			return "finally의 반환값"; // 이 값은 무시됨!
		})
		.then((value) => {
			console.log("2. then()에서 받는 값:", value);
			console.log("\n특징:");
			console.log("• finally()는 인자를 받지 않음");
			console.log("• finally()의 반환값은 무시됨");
			console.log("• 원래 Promise의 값이 그대로 전달됨");
			console.log("• 정리(cleanup) 작업에 적합\n");
		});

	setTimeout(() => {
		console.log("==================================================\n");
	}, 500);
}, 11000);

/**
 * 보너스: 에러 전파 예제
 */

setTimeout(() => {
	console.log("--- 보너스: 에러 전파 ---\n");

	Promise.resolve(1)
		.then((num) => {
			console.log("1단계:", num);
			return num + 10;
		})
		.then((num) => {
			console.log("2단계:", num);
			throw new Error("의도적 에러!");
		})
		.then((num) => {
			console.log("3단계: 실행 안 됨", num);
		})
		.catch((error) => {
			console.error("\n❌ 에러 포착:", error.message);
			console.log("→ 에러 발생 시 이후 then은 건너뛰고 catch로 이동");
			return "복구";
		})
		.then((value) => {
			console.log("\n✅ 복구 후 계속:", value);
			console.log("→ catch 이후 다시 정상 흐름");
		})
		.finally(() => {
			console.log("\n🏁 finally는 마지막에 항상 실행\n");
		});

	setTimeout(() => {
		console.log("==================================================\n");
		console.log("\n다음 학습: node 04-promise-chaining.js\n");
	}, 500);
}, 12500);
