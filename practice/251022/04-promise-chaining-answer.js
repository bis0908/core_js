/**
 * 04. Promise 체이닝 - 정답 및 해설
 */

console.log("=== Promise 체이닝 예측 훈련 정답 ===\n");

console.log("--- 기본 복습 ---\n");

Promise.resolve(1)
	.then((num) => {
		console.log("1단계:", num);
		return num + 10;
	})
	.then((num) => {
		console.log("2단계:", num);
		return num * 2;
	})
	.then((num) => {
		console.log("3단계:", num);
		console.log("\n==================================================\n");
	});

/**
 * 예측 훈련 1 정답: 기본 체이닝
 */

setTimeout(() => {
	console.log("=== 예측 훈련 1 정답 ===\n");

	Promise.resolve(5)
		.then((n) => {
			console.log("A:", n); // A: 5
			return n * 2;
		})
		.then((n) => {
			console.log("B:", n); // B: 10
			return n + 3;
		})
		.then((n) => {
			console.log("C:", n); // C: 13
		});

	setTimeout(() => {
		console.log("\n해설: 5 → ×2 → 10 → +3 → 13");
		console.log("==================================================\n");
	}, 500);
}, 500);

/**
 * 예측 훈련 2 정답: return 누락
 */

setTimeout(() => {
	console.log("=== 예측 훈련 2 정답 ===\n");

	Promise.resolve(10)
		.then((n) => {
			n + 5; // return 없음!
		})
		.then((n) => {
			console.log("결과:", n); // 결과: undefined
		});

	setTimeout(() => {
		console.log("\n해설:");
		console.log("- return을 빼먹으면 undefined가 반환됨");
		console.log("- 항상 return을 명시해야 함!");
		console.log("==================================================\n");
	}, 500);
}, 1500);

/**
 * 예측 훈련 3 정답: 에러 발생
 */

setTimeout(() => {
	console.log("=== 예측 훈련 3 정답 ===\n");

	Promise.resolve(1)
		.then((n) => {
			console.log("A:", n); // A: 1
			return n + 1;
		})
		.then((n) => {
			console.log("B:", n); // B: 2
			throw new Error("에러!");
		})
		.then((n) => {
			console.log("C:", n); // 실행 안 됨!
		})
		.catch((e) => {
			console.log("에러:", e.message); // 에러: 에러!
		});

	setTimeout(() => {
		console.log("\n해설:");
		console.log("- A와 B까지 실행");
		console.log("- throw 발생 시 다음 then은 건너뛰고 catch로");
		console.log("- C는 실행되지 않음");
		console.log("==================================================\n");
	}, 500);
}, 3000);

/**
 * 예측 훈련 4 정답: Promise 반환
 */

setTimeout(() => {
	console.log("=== 예측 훈련 4 정답 ===\n");

	Promise.resolve(3)
		.then((n) => {
			console.log("1:", n); // 1: 3 (즉시)
			return new Promise((resolve) => {
				setTimeout(() => resolve(n * 10), 500);
			});
		})
		.then((n) => {
			console.log("2:", n); // 2: 30 (0.5초 후)
		});

	setTimeout(() => {
		console.log("\n해설:");
		console.log("- 1은 즉시 출력");
		console.log("- Promise를 반환하면 그 Promise가 완료될 때까지 대기");
		console.log("- 0.5초 후에 2 출력");
		console.log("==================================================\n");
	}, 1500);
}, 4500);

/**
 * 예측 훈련 5 정답: 에러 복구
 */

setTimeout(() => {
	console.log("=== 예측 훈련 5 정답 ===\n");

	Promise.reject("초기 에러")
		.catch((e) => {
			console.log("에러1:", e); // 에러1: 초기 에러
			return "복구";
		})
		.then((v) => {
			console.log("값:", v); // 값: 복구
			throw new Error("에러2");
		})
		.catch((e) => {
			console.log("에러2:", e.message); // 에러2: 에러2
		});

	setTimeout(() => {
		console.log("\n해설:");
		console.log("- catch에서 값을 반환하면 에러 상태 복구");
		console.log("- 복구 후 정상 then 실행");
		console.log("- 다시 에러 발생 시 다음 catch로");
		console.log("==================================================\n");
	}, 500);
}, 7000);

/**
 * 예측 훈련 6 정답: finally 위치
 */

setTimeout(() => {
	console.log("=== 예측 훈련 6 정답 ===\n");

	Promise.resolve(100)
		.then((n) => {
			console.log("A:", n); // A: 100
			return n / 2;
		})
		.finally(() => {
			console.log("정리1"); // 정리1
		})
		.then((n) => {
			console.log("B:", n); // B: 50
		})
		.finally(() => {
			console.log("정리2"); // 정리2
		});

	setTimeout(() => {
		console.log("\n해설:");
		console.log("- 출력 순서: A → 정리1 → B → 정리2");
		console.log("- finally는 값을 전달하지 않지만 흐름은 유지");
		console.log("==================================================\n");
	}, 500);
}, 8500);

/**
 * 예측 훈련 7 정답: 중첩 체이닝
 */

setTimeout(() => {
	console.log("=== 예측 훈련 7 정답 ===\n");

	Promise.resolve(1)
		.then((n) => {
			console.log("외부:", n); // 외부: 1
			return Promise.resolve(n + 1).then((n2) => {
				console.log("내부:", n2); // 내부: 2
				return n2 + 10;
			});
		})
		.then((n) => {
			console.log("최종:", n); // 최종: 12
		});

	setTimeout(() => {
		console.log("\n해설:");
		console.log("- 외부(1) → 내부(2) → 최종(12)");
		console.log("- 중첩된 Promise는 가능하지만 권장하지 않음");
		console.log("- 평탄한 체이닝이 더 좋음");
		console.log("==================================================\n");
	}, 500);
}, 10500);

/**
 * 예측 훈련 8 정답: 동기 vs 비동기
 */

setTimeout(() => {
	console.log("=== 예측 훈련 8 정답 ===\n");

	console.log("1");
	Promise.resolve()
		.then(() => console.log("2"))
		.then(() => console.log("3"));
	console.log("4");

	setTimeout(() => {
		console.log("\n해설:");
		console.log("- 출력 순서: 1 → 4 → 2 → 3");
		console.log("- 동기 코드(1, 4)가 먼저 실행");
		console.log("- then 콜백은 마이크로태스크 큐 (비동기)");
		console.log("- 동기 코드 완료 후 then 실행");
		console.log("==================================================\n");
	}, 500);
}, 12500);

/**
 * 예측 훈련 9 정답: 복잡한 에러 흐름
 */

setTimeout(() => {
	console.log("=== 예측 훈련 9 정답 ===\n");

	Promise.resolve(1)
		.then((n) => {
			throw new Error("E1");
		})
		.catch((e) => {
			console.log(e.message); // E1
			return 2;
		})
		.then((n) => {
			console.log("값:", n); // 값: 2
			throw new Error("E2");
		})
		.then((n) => {
			console.log("실행?", n); // 실행 안 됨
		})
		.catch((e) => {
			console.log(e.message); // E2
		});

	setTimeout(() => {
		console.log("\n해설:");
		console.log("- 출력: E1 → 값: 2 → E2");
		console.log("- 첫 에러는 catch에서 복구");
		console.log("- 다시 에러 발생 → 마지막 catch로");
		console.log("==================================================\n");
	}, 500);
}, 14500);

/**
 * 예측 훈련 10 정답: 종합
 */

setTimeout(() => {
	console.log("=== 예측 훈련 10 정답 ===\n");

	Promise.resolve(5)
		.then((n) => {
			console.log("A:", n); // A: 5 (즉시)
			return new Promise((resolve) => {
				setTimeout(() => {
					console.log("B:", n * 2); // B: 10 (0.5초 후)
					resolve(n * 2);
				}, 500);
			});
		})
		.then((n) => {
			console.log("C:", n); // C: 10 (B 직후)
			return n + 100;
		})
		.finally(() => console.log("끝")) // 끝 (C 직후)
		.then((n) => console.log("최종:", n)); // 최종: 110 (끝 직후)

	setTimeout(() => {
		console.log("\n해설:");
		console.log("- 출력 순서: A(즉시) → B(0.5초) → C → 끝 → 최종");
		console.log("- A: 5");
		console.log("- B: 10 (0.5초 대기)");
		console.log("- C: 10");
		console.log("- 끝 (finally)");
		console.log("- 최종: 110");
		console.log("==================================================\n");
	}, 1500);
}, 16500);

/**
 * 체이닝 패턴 총정리
 */

setTimeout(() => {
	console.log("=== 체이닝 패턴 총정리 ===\n");
	console.log("1. 일반 값 반환");
	console.log("   .then(n => n + 1)  // 자동으로 Promise.resolve(n+1)\n");

	console.log("2. Promise 반환");
	console.log("   .then(n => Promise.resolve(n))  // 해당 Promise 대기\n");

	console.log("3. 에러 발생");
	console.log("   .then(n => { throw new Error() })  // 다음 catch로\n");

	console.log("4. 에러 복구");
	console.log("   .catch(e => '복구값')  // 정상 흐름 복귀\n");

	console.log("5. return 누락");
	console.log("   .then(n => { n + 1 })  // undefined 전달!\n");

	console.log("6. finally");
	console.log("   .finally(() => {})  // 값 전달 안 함, 항상 실행\n");

	console.log("==================================================\n");
	console.log("\n다음 학습: node 05-promise-all-race.js\n");
}, 20000);
