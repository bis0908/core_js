/**
 * 05. Promise.all() & Promise.race() - 병렬 처리
 *
 * 학습 목표:
 * - Promise.all()로 여러 작업 동시 실행
 * - Promise.race()로 가장 빠른 응답 선택
 * - 3개 API 병렬 호출 → 결과 합치기
 */

console.log("=== Promise.all() & race() 학습 ===\n");

/**
 * Promise.all() - 모두 성공해야 성공
 *
 * - '모든 Promise가 fulfilled'되면 성공
 * - '하나라도 rejected되면' 즉시 실패
 * - 결과는 '입력 순서대로' 배열로 반환
 */

console.log("--- 예제 1: Promise.all() 기본 ---\n");

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) => setTimeout(() => resolve(30), 500));
const promise3 = Promise.resolve(300);

console.log("3개 Promise 병렬 실행...\n");

Promise.all([promise1, promise2, promise3]).then((results) => {
	console.log("✅ 모두 완료!");
	console.log("결과:", results); // [3, 30, 300]
	console.log("→ 가장 느린 작업(500ms) 기준으로 완료\n");
});

console.log("==================================================\n");

/**
 * TODO 1: 3개 API 병렬 호출하기
 *
 * 요구사항:
 * - fetchUser, fetchPosts, fetchComments 함수 3개 만들기
 * - 각각 500ms, 700ms, 400ms 후에 데이터 반환
 * - Promise.all()로 동시 실행
 * - 구조 분해로 [user, posts, comments] 받기
 */

console.log("--- TODO 1: 3개 API 병렬 호출 ---\n");

// 여기에 함수 3개를 작성하세요
function fetchUser() {
  // 500ms 후에 { id: 1, name: "홍길동" } 객체를 resolve하는 Promise를 반환
	return new Promise((resolve)=>{
		setTimeout(() => {
			resolve({id: 1, name: "홍킬동"});
		}, 500);
	});
}

function fetchPosts() {
  // 700ms 후에 [{ id: 1, title: "글1" }, { id: 2, title: "글2" }] 배열을 resolve하는 Promise를 반환
	return new Promise((resolve)=>{
		setTimeout(() => {
			resolve([
				{ id: 1, title: "글1" },
				{ id: 2, title: "글2" }
			]);
		}, 700);
	})
}

function fetchComments() {
  // 400ms 후에 [{ id: 1, text: "댓글" }] 배열을 resolve하는 Promise를 반환
	return new Promise((resolve)=>{
		setTimeout(() => {
			resolve([
				{ id: 1, text: "comment1" },
				{ id: 2, text: "comment2"},
			])	;
		}, 400);
	})
}

// Promise.all()로 병렬 실행하고 결과 출력

Promise.all(
	[fetchUser(), fetchPosts(), fetchComments()]).then(([u,p,c])=>{
		console.log(u);
		console.log(p);
		console.log(c);
	})


console.log("(TODO 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 2: 하나라도 실패하면?
 *
 * Promise.all()은 하나라도 실패하면 즉시 실패합니다.
 *
 * 요구사항:
 * - 3개의 Promise 만들기
 *   - Promise.resolve("성공1")
 *   - Promise.reject(new Error("실패!"))
 *   - Promise.resolve("성공2")
 * - Promise.all()로 실행
 * - catch로 에러 처리
 */

console.log("--- TODO 2: 하나라도 실패 ---\n");

// 여기에 코드를 작성하세요
const p1 = Promise.resolve("success1");
const p2 = Promise.reject(new Error('fail!'));
const p3 = Promise.resolve("success2");

Promise.all([p1,p2,p3]).then(([r1,r2,r3])=>{
	console.log(r1)
	console.log(r2)
	console.log(r3)
}).catch((error) => {
	console.error(error.message);
});

console.log("(TODO 2를 완성하세요)\n");
console.log("==================================================\n");

/**
 * Promise.race() - 가장 빠른 것만 선택
 *
 * - 가장 먼저 settled되는 Promise의 결과 반환
 * - 성공이든 실패든 가장 빠른 것
 * - 타임아웃 구현에 유용
 */

console.log("--- 예제 2: Promise.race() 기본 ---\n");

const slow = new Promise((resolve) =>
	setTimeout(() => resolve("느림"), 1000),
);
const fast = new Promise((resolve) =>
	setTimeout(() => resolve("빠름"), 300),
);

console.log("2개 Promise 경쟁 시작...\n");

Promise.race([slow, fast]).then((result) => {
	console.log("✅ 승자:", result); // "빠름"
	console.log("→ 300ms에 완료된 Promise 선택\n");
});

setTimeout(() => {
	console.log("==================================================\n");
}, 1500);

/**
 * TODO 3: 타임아웃 구현하기
 *
 * 요구사항:
 * - timeout(ms) 함수: ms 후에 reject하는 Promise 반환
 * - fetchData() 함수: 2초 후에 데이터 반환
 * - Promise.race()로 타임아웃 1초 설정
 * - 타임아웃 발생 확인
 */

console.log("--- TODO 3: 타임아웃 구현 ---\n");

// timeout 함수를 작성하세요
function timeout(ms) {
	return new Promise((_, reject)=>{
		setTimeout(() => {
			reject(new Error("Error occurred!"))
		}, ms);
	})
}

// fetchData 함수를 작성하세요
function fetchData() {
	return new Promise((resolve)=>{
		setTimeout(() => {
			resolve("Data is here~")
		}, 2000);
	})
}

// Promise.race로 타임아웃 적용
Promise.race([timeout(), fetchData()])
	.then(res => console.log(res))
	.catch(err => console.error(err.message));

console.log("(TODO 3을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 4: 가장 빠른 서버 선택
 *
 * 요구사항:
 * - 3개 서버에 동시 요청
 *   - 서버A: 500ms 후 응답
 *   - 서버B: 300ms 후 응답
 *   - 서버C: 700ms 후 응답
 * - Promise.race()로 가장 빠른 서버 선택
 */

console.log("--- TODO 4: 가장 빠른 서버 ---\n");

function fetchFromServer(name, delay) {
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve({server: name, response: 200});
    }, delay);
  })
}

const servers = [
  fetchFromServer("Server A", 500),
  fetchFromServer("Server B", 300),
  fetchFromServer("Server C", 700),
];

Promise.race(servers)
  .then(result => {
    console.log(`\n✅ 선택: ${result.server}`);
  });

console.log("(TODO 4를 완성하세요)\n");
console.log("==================================================\n");

/**
 * 학습 정리
 *
 * ✅ Promise.all([p1, p2, p3])
 *    - 모두 성공해야 성공
 *    - 하나라도 실패하면 즉시 실패
 *    - 결과는 배열로 (입력 순서 유지)
 *    - 병렬 처리로 시간 단축
 *
 * ✅ Promise.race([p1, p2, p3])
 *    - 가장 빠른 하나만 선택
 *    - 성공/실패 무관
 *    - 타임아웃 구현에 유용
 *
 * 다음 학습: 06-allSettled-any.js (ES2020/2021)
 */

console.log("\n=== 05. all & race 학습 완료! ===");
console.log("\n정답 확인: 05-promise-all-race-answer.js");
console.log("다음 단계: node 06-allSettled-any.js\n");
