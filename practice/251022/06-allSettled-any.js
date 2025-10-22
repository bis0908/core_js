/**
 * 06. Promise.allSettled() & any() (ES2020/2021)
 *
 * 학습 목표:
 * - allSettled(): 모든 결과 수집 (성공/실패 무관)
 * - any(): 첫 번째 성공만 선택
 * - 4가지 메서드 차이점 완벽 이해
 */

console.log("=== allSettled & any 학습 ===\n");

/**
 * Promise.allSettled()
 *
 * - 모든 Promise가 완료될 때까지 대기
 * - 성공/실패 무관하게 모든 결과 반환
 * - 각 결과: { status: 'fulfilled'|'rejected', value|reason }
 */

console.log("--- 예제 1: allSettled() 기본 ---\n");

Promise.allSettled([
	Promise.resolve("성공1"),
	Promise.reject(new Error("실패2")),
	Promise.resolve("성공3"),
]).then((results) => {
	console.log("✅ 모든 결과:\n");
	results.forEach((result, i) => {
		if (result.status === "fulfilled") {
			console.log(`  [${i}] 성공:`, result.value);
		} else {
			console.log(`  [${i}] 실패:`, result.reason.message);
		}
	});
	console.log("\n→ 실패도 결과에 포함\n");
});

console.log("==================================================\n");

/**
 * TODO 1: 부분 성공 허용
 *
 * 요구사항:
 * - 3개 API 호출: users(성공), posts(실패), comments(성공)
 * - allSettled()로 모든 결과 수집
 * - 성공한 것과 실패한 것 분리하여 출력
 */

console.log("--- TODO 1: 부분 성공 허용 ---\n");

function fetchUsers() {
  // Promise.resolve({ data: "사용자 목록" })을 반환
}

function fetchPosts() {
  // Promise.reject(new Error("서버 오류"))를 반환
}

function fetchComments() {
  // Promise.resolve({ data: "댓글 목록" })을 반환
}

// Promise.allSettled()로 모든 결과 수집


console.log("(TODO 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * Promise.any() (ES2021)
 *
 * - 가장 먼저 성공하는 Promise 반환
 * - 실패는 무시
 * - 모두 실패하면 AggregateError
 */

console.log("--- 예제 2: any() 기본 ---\n");

Promise.any([
	Promise.reject(new Error("실패1")),
	Promise.resolve("성공!"),
	Promise.reject(new Error("실패2")),
]).then((result) => {
	console.log("✅ 첫 성공:", result);
	console.log("→ 실패는 무시하고 첫 성공만\n");
});

setTimeout(() => {
	console.log("==================================================\n");
}, 500);

/**
 * TODO 2: 백업 서버 패턴
 *
 * 요구사항:
 * - 주 서버(실패), 백업1(실패), 백업2(성공) 시뮬레이션
 * - any()로 첫 번째 성공 서버 선택
 */

console.log("--- TODO 2: 백업 서버 ---\n");

function tryServer(name, willSucceed, delay) {
  // willSucceed에 따라 resolve({ server: name, data: "데이터" }) 또는 reject(new Error(`${name} 실패`))
}

// Promise.any()로 첫 번째 성공 서버 선택


console.log("(TODO 2를 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 3: 4가지 메서드 비교
 *
 * 아래 표를 완성하세요:
 */

console.log("--- TODO 3: 4가지 메서드 비교 ---\n");

console.log("Promise.all():");
console.log("  - 조건: ?");
console.log("  - 결과: ?");
console.log("  - 용도: ?\n");

console.log("Promise.race():");
console.log("  - 조건: ?");
console.log("  - 결과: ?");
console.log("  - 용도: ?\n");

console.log("Promise.allSettled():");
console.log("  - 조건: ?");
console.log("  - 결과: ?");
console.log("  - 용도: ?\n");

console.log("Promise.any():");
console.log("  - 조건: ?");
console.log("  - 결과: ?");
console.log("  - 용도: ?\n");

console.log("(정답은 answer 파일 참조)\n");
console.log("==================================================\n");

/**
 * 학습 정리
 *
 * ✅ all: 모두 성공 → 성공 / 하나라도 실패 → 실패
 * ✅ race: 가장 빠른 하나 (성공/실패 무관)
 * ✅ allSettled: 모든 결과 수집 (성공/실패 모두)
 * ✅ any: 첫 번째 성공 (실패 무시)
 *
 * 다음 학습: 07-async-await.js
 */

console.log("\n=== 06. allSettled & any 학습 완료! ===");
console.log("\n정답 확인: 06-allSettled-any-answer.js");
console.log("다음 단계: node 07-async-await.js\n");
