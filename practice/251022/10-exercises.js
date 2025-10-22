/**
 * 10. 종합 연습 문제
 *
 * Day 1 (10/22) 최종 점검!
 * 오늘 배운 모든 내용을 종합하는 문제들입니다.
 */

console.log("=== Promise 종합 연습 ===\n");

/**
 * 난이도: ⭐ 기초
 *
 * 문제 1: 사용자 프로필 로딩
 * - fetchUserProfile(userId) 함수 구현
 * - 1초 후 { id: userId, name: "사용자", email: "user@email.com" } 반환
 * - userId가 0 이하면 에러
 */

console.log("--- 문제 1: 사용자 프로필 (기초) ---\n");
function fetchUserProfile(userId) {
  // 1초 후 { id: userId, name: "사용자", email: "user@email.com" } 반환
  // userId가 0 이하면 에러
}

// fetchUserProfile(1)... 

console.log("\n==================================================\n");

/**
 * 난이도: ⭐⭐ 중급
 *
 * 문제 2: 여러 데이터 병렬 로딩
 * - loadDashboard() 함수 구현
 * - user, posts, notifications를 Promise.all로 병렬 로딩
 * - 구조 분해로 받아서 대시보드 객체 반환
 * - 시작과 완료 시간 출력
 */

console.log("--- 문제 2: 대시보드 로딩 (중급) ---\n");
async function loadDashboard() {
  // user: 500ms 후 { name: "홍길동" } resolve
  // posts: 700ms 후 [{ title: "글1" }, { title: "글2" }] resolve
  // notifications: 400ms 후 [{ msg: "알림1" }] resolve
  // 3개 API를 Promise.all로 병렬 로딩하고, 총 소요 시간을 출력하세요.
}

// loadDashboard()...

console.log("\n==================================================\n");

/**
 * 난이도: ⭐⭐ 중급
 *
 * 문제 3: 실행 순서 예측
 * 아래 코드의 출력 순서를 예측하세요!
 */

console.log("--- 문제 3: 실행 순서 예측 (중급) ---\n");
/*
console.log("A");

Promise.resolve()
  .then(() => console.log("B"))
  .then(() => console.log("C"));

setTimeout(() => console.log("D"), 0);

console.log("E");
*/

console.log("\n예측: 출력 순서는? (종이에 적어보세요)");
console.log("정답 확인은 answer 파일에서!\n");
console.log("==================================================\n");

/**
 * 난이도: ⭐⭐⭐ 고급
 *
 * 문제 4: 순차 데이터 파이프라인
 * - fetchRawData() → 원시 데이터
 * - validateData(data) → 검증
 * - transformData(data) → 변환
 * - saveData(data) → 저장
 * 모든 단계를 체이닝으로 연결하세요!
 */

console.log("--- 문제 4: 데이터 파이프라인 (고급) ---\n");
function fetchRawData() { 
  // '{"value": 100}' 문자열을 resolve
}
function validateData(data) { 
  // JSON.parse 후 value 속성이 없으면 reject
}
function transformData(data) { 
  // { ...data, transformed: true, doubleValue: data.value * 2 } 객체를 resolve
}
function saveData(data) { 
  // 500ms 후 resolve
}

// 4단계 파이프라인을 구현하세요:
// fetch → validate → transform → save

console.log("\n==================================================\n");

/**
 * 난이도: ⭐⭐⭐ 고급
 *
 * 문제 5: 재시도 + 타임아웃 조합
 * - fetchWithRetryAndTimeout(url, timeout, maxRetries) 구현
 * - 각 시도마다 타임아웃 적용
 * - 실패 시 재시도
 */

console.log("--- 문제 5: 재시도 + 타임아웃 (고급) ---\n");
function fetchWithRetryAndTimeout(url, timeout, maxRetries) {
  // withTimeout + retry
}

console.log("\n==================================================\n");

/**
 * 난이도: ⭐⭐⭐⭐ 최고급
 *
 * 문제 6: Promise 풀(Pool) 구현
 * - PromisePool 클래스 구현
 * - 동시 실행 개수 제한 (concurrency)
 * - 큐에서 하나씩 꺼내서 실행
 */

console.log("--- 문제 6: Promise Pool (최고급) ---\n");
class PromisePool {
  constructor(concurrency) {
    // ...
  }
  add(promiseFn) {
    // ...
  }
  run() {
    // ...
  }
}

console.log("\n==================================================\n");

/**
 * 자가 진단 체크리스트
 */

console.log("=== 자가 진단 체크리스트 ===\n");
console.log("✅ Promise 생성과 사용");
console.log("✅ 3가지 상태 이해");
console.log("✅ then/catch/finally 사용");
console.log("✅ 체이닝 10개 예측 90% 이상");
console.log("✅ Promise.all/race/allSettled/any 차이");
console.log("✅ async/await ↔ then 변환 10회");
console.log("✅ 에러 처리 패턴");
console.log("✅ 실전 유틸리티 3개 구현\n");

console.log("모두 체크했다면 Day 1 완료!");
console.log("내일은 이벤트 루프를 정복합니다!\n");

console.log("==================================================\n");

console.log("\n💪 수고하셨습니다!");
console.log("\n정답 확인: 10-exercises-answer.js");
console.log("\n내일 학습: 이벤트 루프 & 실행 순서");
console.log("(학습 플랜 Day 2 참조)\n");
