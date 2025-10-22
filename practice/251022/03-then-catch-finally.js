/**
 * 03. then, catch, finally 메서드
 *
 * 학습 목표:
 * - then() 메서드로 성공 처리하기
 * - catch() 메서드로 에러 처리하기
 * - finally() 메서드로 정리 작업하기
 * - 메서드 체이닝 이해하기
 */

console.log("=== then, catch, finally 메서드 학습 ===\n");

/**
 * then() 메서드
 *
 * - Promise가 fulfilled될 때 실행
 * - resolve()로 전달된 값을 인자로 받음
 * - 새로운 Promise를 반환 (체이닝 가능)
 */

console.log("--- 예제 1: then() 기본 사용 ---\n");

Promise.resolve("성공 데이터").then((result) => {
	console.log("✅ then() 실행:", result);
	console.log("→ Promise.resolve()로 즉시 fulfilled 상태\n");
});

console.log("==================================================\n");

/**
 * catch() 메서드
 *
 * - Promise가 rejected될 때 실행
 * - reject()로 전달된 에러를 인자로 받음
 * - then(null, onRejected)와 동일
 */

console.log("--- 예제 2: catch() 기본 사용 ---\n");

Promise.reject(new Error("실패 원인")).catch((error) => {
	console.error("❌ catch() 실행:", error.message);
	console.log("→ Promise.reject()로 즉시 rejected 상태\n");
});

console.log("==================================================\n");

/**
 * TODO 1: then과 catch 함께 사용하기
 *
 * 요구사항:
 * - divideNumbers 함수를 만드세요
 * - 매개변수: a, b (숫자)
 * - 동작:
 *   - b가 0이면 reject(new Error("0으로 나눌 수 없습니다"))
 *   - 그 외에는 resolve(a / b)
 * - then과 catch로 결과/에러를 처리하세요
 */

console.log("--- TODO 1: then과 catch 함께 사용 ---\n");

// 여기에 divideNumbers 함수를 작성하세요
function divideNumbers(a, b) {
  return new Promise((resolve, reject) => {
    // b가 0인지 검사
		// 0이면 reject, 아니면 resolve(a / b)
		if (b === 0) {
			return reject(new Error("0으로 나눌 수 없습니다"))
		}
		resolve(a/b);
  });
}

// 테스트 코드 (함수 작성 후 주석 해제)
console.log("테스트 1: 10 / 2");
divideNumbers(10, 2)
  .then(result => console.log("✅ 결과:", result))
  .catch(error => console.error("❌ 에러:", error.message));

console.log("\n테스트 2: 10 / 0");
divideNumbers(10, 0)
  .then(result => console.log("✅ 결과:", result))
  .catch(error => console.error("❌ 에러:", error.message));

console.log("(TODO 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * finally() 메서드
 *
 * - 성공/실패 무관하게 항상 실행
 * - 인자를 받지 않음
 * - 원래 Promise의 값/에러를 그대로 전파
 * - 주로 정리(cleanup) 작업에 사용
 */

console.log("--- 예제 3: finally() 사용 ---\n");

function fetchWithLoading(willSucceed) {
	console.log("⏳ 로딩 시작...");

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (willSucceed) {
				resolve("데이터");
			} else {
				reject(new Error("로딩 실패"));
			}
		}, 1000);
	});
}

console.log("[성공 케이스]");
fetchWithLoading(true)
	.then((data) => {
		console.log("✅ 성공:", data);
	})
	.catch((error) => {
		console.error("❌ 실패:", error.message);
	})
	.finally(() => {
		console.log("🏁 로딩 종료 (finally)\n");
	});

setTimeout(() => {
	console.log("[실패 케이스]");
	fetchWithLoading(false)
		.then((data) => {
			console.log("✅ 성공:", data);
		})
		.catch((error) => {
			console.error("❌ 실패:", error.message);
		})
		.finally(() => {
			console.log("🏁 로딩 종료 (finally)");
			console.log("→ 성공/실패 무관하게 finally는 항상 실행\n");
		});
}, 1500);

console.log("==================================================\n");


/**
 * TODO 2: 로딩 인디케이터 구현
 *
 * 요구사항:
 * - fetchData 함수를 만드세요
 * - 매개변수: url (문자열), delay (숫자), willSucceed (불린)
 * - 동작:
 *   1. 시작 시 "🔄 로딩 중: ${url}" 출력
 *   2. delay 밀리초 대기
 *   3. willSucceed에 따라 성공/실패
 *   4. finally에서 "✅ 로딩 완료: ${url}" 출력
 */

console.log("--- TODO 2: 로딩 인디케이터 ---\n");

// 여기에 fetchData 함수를 작성하세요
function fetchData(url, delay, willSucceed) {
  console.log(`🔄 로딩 중: ${url}`);
  return new Promise((resolve, reject) => {
    // delay 후 성공/실패 처리
		setTimeout(() => {
			if (willSucceed) {
				return resolve("성공");
			}
			reject("실패");
		}, delay);
  });
}

// 테스트 코드 (함수 작성 후 주석 해제)
fetchData("/api/users", 1000, true)
  .then(data => console.log("  데이터:", data))
  .catch(error => console.error("  에러:", error.message))
  .finally(() => console.log("✅ 로딩 완료: /api/users\n"));

setTimeout(() => {
	fetchData("/api/posts", 1000, false)
		.then((data) => console.log("  데이터:", data))
		.catch((error) => console.error("  에러:", error.message))
		.finally(() => {
			console.log("✅ 로딩 완료: /api/posts");
			console.log("→ finally는 성공/실패 무관하게 항상 실행\n");
		});
}, 500);

console.log("(TODO 2를 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 3: then의 두 번째 인자
 *
 * then()은 두 개의 인자를 받을 수 있습니다:
 * - 첫 번째: 성공 콜백
 * - 두 번째: 실패 콜백 (catch와 유사)
 *
 * 요구사항:
 * - Promise.reject("에러 발생")을 만드세요
 * - then(onSuccess, onFailure) 형태로 처리하세요
 *   (catch를 사용하지 마세요)
 */

console.log("--- TODO 3: then의 두 번째 인자 ---\n");

// 여기에 코드를 작성하세요
Promise.reject("에러 발생").then(
  (result) => {
    // 성공 시 실행 (실행 안 됨)
		console.log(result)
  },
  (error) => {
    // 실패 시 실행
		console.error(error)
  }
);

console.log("(TODO 3을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 4: 메서드 체이닝 기초
 *
 * 요구사항:
 * - Promise.resolve(5)로 시작하세요
 * - 첫 번째 then: 값에 10을 더해서 반환
 * - 두 번째 then: 값에 2를 곱해서 반환
 * - 세 번째 then: 최종 결과 출력
 * - 예상 결과: (5 + 10) * 2 = 30
 */

console.log("--- TODO 4: 메서드 체이닝 기초 ---\n");

// 여기에 체이닝 코드를 작성하세요
Promise.resolve(5)
  .then(num => {
    // 10 더하기
		return num+=10;
  })
  .then(num => {
    // 2 곱하기
		return num *2;
  })
  .then(result => {
    // 결과 출력
		console.log(`결과: ${result}`)
  });

console.log("(TODO 4를 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 5: 에러 복구 패턴
 *
 * catch()에서 값을 반환하면 에러 상태에서 벗어날 수 있습니다.
 *
 * 요구사항:
 * - Promise.reject("초기 에러")로 시작
 * - catch에서 "복구된 값"을 반환
 * - 다음 then에서 복구된 값 출력
 */

console.log("--- TODO 5: 에러 복구 ---\n");

// 여기에 코드를 작성하세요
Promise.reject("초기 에러")
  .catch(error => {
    console.log("❌ 에러 발생:", error);
    // "복구된 값" 반환
		return "복구된 값";
  })
  .then(value => {
    // 복구된 값 출력
		console.log(`복구 값: ${value}`);
  });

console.log("(TODO 5를 완성하세요)\n");
console.log("==================================================\n");

/**
 * 학습 정리
 *
 * ✅ then(onSuccess): 성공 처리
 * ✅ catch(onError): 실패 처리
 * ✅ finally(onFinally): 항상 실행 (정리 작업)
 * ✅ then(onSuccess, onError): 한 번에 성공/실패 처리
 * ✅ catch에서 값 반환 시 에러 복구 가능
 * ✅ 모든 메서드는 새로운 Promise 반환 (체이닝)
 *
 * 다음 학습: 04-promise-chaining.js (체이닝 마스터)
 */

console.log("\n=== 03. then/catch/finally 학습 완료! ===");
console.log("\n정답 확인: 03-then-catch-finally-answer.js");
console.log("다음 단계: node 04-promise-chaining.js\n");
