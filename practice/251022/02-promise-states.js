/**
 * 02. Promise의 3가지 상태
 *
 * 학습 목표:
 * - Pending (대기) 상태 이해하기
 * - Fulfilled (이행) 상태 이해하기
 * - Rejected (거부) 상태 이해하기
 * - 상태 전환의 불변성 이해하기
 */

console.log("=== Promise의 3가지 상태 학습 ===\n");

/**
 * Promise의 3가지 상태
 *
 * 1. Pending (대기): 초기 상태, 아직 완료되지 않음
 * 2. Fulfilled (이행): 작업이 성공적으로 완료됨
 * 3. Rejected (거부): 작업이 실패함
 *
 * 중요: 한 번 Fulfilled 또는 Rejected 상태가 되면, 다시 변경할 수 없습니다!
 */

console.log("--- 예제 1: 상태 전환 시각화 ---\n");

function createPromiseWithState(willSucceed, delay) {
	return new Promise((resolve, reject) => {
		console.log("📍 상태: Pending (대기 중)");

		setTimeout(() => {
			if (willSucceed) {
				console.log("📍 상태: Pending → Fulfilled (성공)");
				resolve("성공 데이터");
			} else {
				console.log("📍 상태: Pending → Rejected (실패)");
				reject(new Error("실패 원인"));
			}
		}, delay);
	});
}

// 성공 케이스
console.log("[성공 케이스]");
createPromiseWithState(true, 1000)
	.then((result) => {
		console.log("✅ then() 실행:", result);
	})
	.catch((error) => {
		console.error("❌ catch() 실행:", error.message);
	})
	.finally(() => {
		console.log("🏁 finally() 실행 (항상)\n");
	});

console.log("==================================================\n");

/**
 * TODO 1: 상태 전환 추적하기
 *
 * 요구사항:
 * - fetchDataWithTracking 함수를 만드세요
 * - 매개변수: url (문자열), shouldSucceed (불린), delay (숫자)
 * - 동작:
 *   1. "데이터 로딩 시작: ${url}" 출력
 *   2. delay 밀리초 대기
 *   3. shouldSucceed가 true면:
 *      - "데이터 로딩 성공: ${url}" 출력
 *      - { url, data: "응답 데이터" } 객체 resolve
 *   4. shouldSucceed가 false면:
 *      - "데이터 로딩 실패: ${url}" 출력
 *      - new Error("네트워크 오류") reject
 */

console.log("--- TODO 1: 상태 전환 추적 함수 ---\n");

// 여기에 fetchDataWithTracking 함수를 작성하세요
function fetchDataWithTracking(url, shouldSucceed, delay) {
  return new Promise((resolve, reject) => {
    // 로딩 시작 메시지
		console.log(`데이터 로딩 시작: ${url}`);
    // delay 후 성공/실패 처리
		setTimeout(() => {
			if (shouldSucceed) {
				resolve({url, data: "응답 데이터"})
			} else {
				console.log(`데이터 로딩 실패 ${url}`)
				reject(new Error("Network Error"));
			}
		}, delay);
  });
}

// 테스트 코드 (함수 작성 후 주석 해제)
console.log("테스트 1: 성공 케이스");
fetchDataWithTracking("/api/users", true, 1000)
  .then(result => {
    console.log("✅ 응답:", result);
  })
  .catch(error => {
    console.error("❌ 에러:", error.message);
  })
  .finally(() => {
    console.log("🏁 요청 종료\n");
  });

console.log("(TODO 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 2: 상태 불변성 실험
 *
 * 요구사항:
 * - immutableStatePromise를 만드세요
 * - 이 Promise는:
 *   1. 첫 번째로 resolve("첫 번째 성공")을 호출
 *   2. 두 번째로 resolve("두 번째 성공")을 호출
 *   3. 세 번째로 reject(new Error("거부 시도"))를 호출
 * - then과 catch를 사용하여 어떤 값이 출력되는지 확인하세요
 */

console.log("--- TODO 2: 상태 불변성 실험 ---\n");

// 여기에 immutableStatePromise를 작성하세요
const immutableStatePromise = new Promise((resolve, reject) => {
  resolve("첫 번째 성공");
  resolve("두 번째 성공");
  reject(new Error("거부 시도"));
});

immutableStatePromise
  .then(result => {
    console.log("✅ 결과:", result);
    console.log("→ 어떤 값이 출력되나요? 왜 그럴까요?");
  })
  .catch(error => {
    console.error("❌ 에러:", error.message);
  });

console.log("(TODO 2를 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 3: 조건부 상태 전환
 *
 * 요구사항:
 * - processNumber 함수를 만드세요
 * - 매개변수: num (숫자)
 * - 동작:
 *   - num > 10: resolve("큰 수: ${num}")
 *   - num > 0: resolve("작은 수: ${num}")
 *   - num === 0: reject(new Error("0은 처리할 수 없습니다"))
 *   - num < 0: reject(new Error("음수는 처리할 수 없습니다"))
 * - 500ms 후에 결과 반환
 */

console.log("--- TODO 3: 조건부 상태 전환 ---\n");

// 여기에 processNumber 함수를 작성하세요
function processNumber(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 조건에 따라 resolve 또는 reject
			switch (true) {
				case num > 10:
					resolve(`큰 수: ${num}`)
					break;
				case num > 0:
					resolve(`작은 수: ${num}`)
					break;
				case num === 0:
					reject(new Error("0은 처이할 수 없습니다"));
				default:
					reject(new Error("음수는 처리할 수 없습니다"))
					break;
			}
    }, 500);
  });
}

// 테스트 코드 (함수 작성 후 주석 해제)
const testNumbers = [15, 5, 0, -3];

testNumbers.forEach(num => {
  processNumber(num)
    .then(result => console.log(`✅ ${num}:`, result))
    .catch(error => console.error(`❌ ${num}:`, error.message));
});

console.log("(TODO 3을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 4: 실행 순서 예측 문제
 *
 * 아래 코드의 출력 순서를 예측해보세요.
 * 코드를 실행하기 전에 종이에 예상 순서를 적어보세요!
 */

console.log("--- TODO 4: 실행 순서 예측 ---\n");

// 주석을 해제하여 실행해보세요
console.log("1. 시작");

const promise = new Promise((resolve) => {
  console.log("2. Promise 생성자");
  resolve("3. resolve 호출");
});

console.log("4. Promise 생성 완료");

promise.then((result) => {
  console.log("5. then 콜백:", result);
});

console.log("6. 코드 끝");

console.log("==================================================\n");

/**
 * 학습 정리
 *
 * ✅ Promise는 3가지 상태를 가집니다: Pending, Fulfilled, Rejected
 * ✅ Pending → Fulfilled 또는 Pending → Rejected 전환만 가능
 * ✅ 한 번 settled(완료) 상태가 되면 변경 불가 (불변성)
 * ✅ finally()는 성공/실패 무관하게 항상 실행됩니다
 *
 * 다음 학습: 03-then-catch-finally.js (메서드 사용법)
 */

console.log("\n=== 02. Promise 상태 학습 완료! ===");
console.log("\n정답 확인: 02-promise-states-answer.js");
console.log("다음 단계: node 03-then-catch-finally.js\n");
