/**
 * 09. 실전 유틸리티 패턴
 *
 * 학습 목표 (학습 플랜 5~6시간차):
 * - withTimeout: Promise에 타임아웃 추가
 * - retry: 실패 시 재시도 로직
 * - sequence: Promise 순차 실행
 */

console.log("=== 실전 유틸리티 구현 ===\n");

/**
 * TODO 1: withTimeout 구현
 *
 * 요구사항:
 * - Promise와 타임아웃(ms)을 받아서
 * - 시간 내에 완료되면 성공
 * - 시간 초과하면 reject
 *
 * 힌트: Promise.race() 사용
 */

console.log("--- TODO 1: withTimeout 구현 ---\n");

function withTimeout(promise, ms) {
  // Promise.race()를 사용하여 타임아웃 구현
}

// 테스트
// const slowTask = new Promise(resolve =>
//   setTimeout(() => resolve("완료"), 2000)
// );

// withTimeout(slowTask, 1000)
//   .then(result => console.log("✅ 성공:", result)) // slowTask가 "완료"를 resolve
//   .catch(error => console.error("❌ 에러:", error.message));

console.log("(TODO 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 2: retry 구현
 *
 * 요구사항:
 * - 함수와 재시도 횟수를 받아서
 * - 실패하면 최대 횟수만큼 재시도
 * - 모두 실패하면 마지막 에러 throw
 *
 * 힌트: async/await + for 루프
 */

console.log("--- TODO 2: retry 구현 ---\n");

async function retry(fn, maxAttempts = 3) {
  // for 루프와 try-catch를 사용하여 재시도 구현
}

// 테스트 (70% 실패율)
// function unstableTask() {
//   return new Promise((resolve, reject) => {
//     if (Math.random() > 0.7) {
//       resolve("성공!"); // "성공!"을 resolve
//     } else {
//       reject(new Error("실패"));
//     }
//   });
// }

// retry(unstableTask, 5)
//   .then(result => console.log("✅ 최종 성공:", result))
//   .catch(error => console.error("❌ 최종 실패:", error.message));

console.log("(TODO 2를 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 3: sequence 구현
 *
 * 요구사항:
 * - Promise를 반환하는 함수들의 배열을 받아서
 * - 순차적으로 실행 (하나씩)
 * - 모든 결과를 배열로 반환
 *
 * 힌트: reduce 또는 for...of 사용
 */

console.log("--- TODO 3: sequence 구현 ---\n");

async function sequence(tasks) {
  // for...of 루프를 사용하여 순차 실행 구현
}

// 테스트
// function createTask(id, delay) {
//   return () => new Promise(resolve => {
//     setTimeout(() => {
//       console.log(`  작업${id} 완료`);
//       resolve(`결과${id}`); // `결과${id}`를 resolve
//     }, delay);
//   });
// }

// const tasks = [
//   createTask(1, 500),
//   createTask(2, 300),
//   createTask(3, 400)
// ];

// sequence(tasks)
//   .then(results => {
//     console.log("✅ 모든 결과:", results);
//   });

console.log("(TODO 3을 완성하세요)\n");
console.log("==================================================\n");

/**
 * 보너스: 실전 조합 예제
 */

console.log("--- 보너스: 유틸리티 조합 ---\n");

console.log("타임아웃 + 재시도 조합:");
/*
async function fetchWithRetry(url) {
  return retry(
    () => withTimeout(fetch(url), 3000),
    { maxRetries: 3 }
  );
}
*/

console.log("\n순차 실행 + 타임아웃:");
/*
const tasks = urls.map(url => 
  () => withTimeout(fetch(url), 5000)
);
const results = await sequence(tasks);
*/

console.log("\n==================================================\n");

/**
 * 학습 정리
 *
 * ✅ withTimeout: Promise.race()로 타임아웃
 * ✅ retry: for 루프로 재시도
 * ✅ sequence: 순차 실행으로 제어
 * ✅ 실전에서는 이런 유틸리티 조합 사용
 *
 * 다음 학습: 10-exercises.js (종합 연습)
 */

console.log("\n=== 09. 실전 패턴 학습 완료! ===");
console.log("\n정답 확인: 09-practical-patterns-answer.js");
console.log("다음 단계: node 10-exercises.js\n");
