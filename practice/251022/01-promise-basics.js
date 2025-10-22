/**
 * 01. Promise 기본 개념과 생성
 *
 * 학습 목표:
 * - Promise가 무엇인지 이해하기
 * - Promise 생성자 사용법 익히기
 * - resolve, reject의 역할 이해하기
 */

console.log("=== Promise 기본 개념 학습 ===\n");

/**
 * Promise란?
 *
 * Promise는 비동기 작업의 최종 완료 또는 실패를 나타내는 객체입니다.
 * 콜백 지옥(Callback Hell)을 해결하고, 비동기 코드를 더 깔끔하게 작성할 수 있게 해줍니다.
 *
 * 기본 구조:
 * new Promise((resolve, reject) => {
 *   비동기 작업 수행
 *   성공 시: resolve(값)
 *   실패 시: reject(에러)
 * })
 */

console.log("--- 예제 1: 간단한 Promise 생성 ---\n");

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
	console.log("\n→ Promise 생성자는 동기적으로 실행되지만");
	console.log("  then() 콜백은 비동기로 실행됩니다.\n");
});

console.log("==================================================\n");

/**
 * TODO 1: 첫 번째 Promise 만들기
 *
 * 요구사항:
 * - 2초 후에 "Hello, Promise!"를 resolve하는 Promise를 만드세요
 * - then()을 사용하여 결과를 콘솔에 출력하세요
 */

console.log("--- TODO 1: 첫 번째 Promise 만들기 ---\n");

// 여기에 코드를 작성하세요
const myFirstPromise = new Promise((resolve, reject) => {
  // 2초 후 "Hello, Promise!" resolve
	setTimeout(() => {
		resolve("Hello, Promise!")
	}, 2000);
});

myFirstPromise.then(result => {
  // 결과 출력
	console.log(result);
});

console.log("(TODO 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 2: 성공/실패를 분기하는 Promise
 *
 * 요구사항:
 * - 숫자를 받아서 짝수면 resolve, 홀수면 reject하는 함수를 만드세요
 * - 함수 이름: checkEvenNumber
 * - 매개변수: num (숫자)
 * - 반환값: Promise
 *   - 짝수: resolve("짝수입니다")
 *   - 홀수: reject(new Error("홀수입니다"))
 */

console.log("--- TODO 2: 성공/실패 분기 Promise ---\n");

// 여기에 checkEvenNumber 함수를 작성하세요
function checkEvenNumber(num) {
  return new Promise((resolve, reject) => {
    // 짝수/홀수 판별 로직
		if (num % 2 === 0) {
			resolve("짝수입니다")
		}
		reject(new Error("홀수입니다"))
  });
}

// 테스트 코드 (함수 작성 후 주석 해제)
checkEvenNumber(4)
  .then(result => console.log("✅", result))
  .catch(error => console.error("❌", error.message));

checkEvenNumber(7)
  .then(result => console.log("✅", result))
  .catch(error => console.error("❌", error.message));

console.log("(TODO 2를 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 3: 가상 데이터 로딩 함수
 *
 * 요구사항:
 * - 사용자 데이터를 로딩하는 함수를 만드세요
 * - 함수 이름: fetchUser
 * - 매개변수: userId (숫자)
 * - 동작:
 *   - 1초 후에 사용자 객체 { id: userId, name: "사용자${userId}" } 를 resolve
 *   - userId가 0 이하면 reject(new Error("유효하지 않은 ID"))
 */

console.log("--- TODO 3: 가상 데이터 로딩 ---\n");

// 여기에 fetchUser 함수를 작성하세요
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    // 1초 후 사용자 데이터 반환 또는 에러
		setTimeout(() => {
			const id = Number.parseInt(userId);
			if (id > 0) {
				resolve({id:userId, name: `사용자${userId}`});
			}
			reject(new Error("유효하지 않은 ID"))
		}, 1000);
  });
}

// 테스트 코드 (함수 작성 후 주석 해제)
console.log("사용자 1 로딩 중...");
fetchUser(1)
  .then(user => {
    console.log("✅ 로딩 완료:", user);
  })
  .catch(error => {
    console.error("❌ 에러:", error.message);
  });

console.log("\n유효하지 않은 ID로 시도...");
fetchUser(-1)
  .then(user => {
    console.log("✅ 로딩 완료:", user);
  })
  .catch(error => {
    console.error("❌ 에러:", error.message);
  });

console.log("(TODO 3을 완성하세요)\n");
console.log("==================================================\n");

/**
 * 학습 정리
 *
 * ✅ Promise는 new Promise((resolve, reject) => {}) 로 생성
 * ✅ resolve(값): 성공 시 호출
 * ✅ reject(에러): 실패 시 호출
 * ✅ then(콜백): 성공 결과 처리
 * ✅ catch(콜백): 실패 처리
 *
 * 다음 학습: 02-promise-states.js (Promise의 3가지 상태)
 */

console.log("\n=== 01. Promise 기본 학습 완료! ===");
console.log("\n정답 확인: 01-promise-basics-answer.js");
console.log("다음 단계: node 02-promise-states.js\n");
