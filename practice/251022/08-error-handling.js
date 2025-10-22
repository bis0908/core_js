/**
 * 08. Promise 에러 처리 패턴
 *
 * 학습 목표:
 * - 에러 처리 베스트 프랙티스
 * - 에러 복구 패턴
 * - 흔한 실수와 안티 패턴
 */

console.log("=== Promise 에러 처리 ===\n");

/**
 * 핵심 원칙: 모든 Promise에 에러 처리 추가!
 */

console.log("--- 예제 1: 기본 에러 처리 ---\n");

Promise.reject(new Error("문제 발생"))
	.then((data) => {
		console.log("성공:", data);
	})
	.catch((error) => {
		console.error("❌ 에러 포착:", error.message);
		console.log("→ catch로 에러 처리\n");
	});

console.log("==================================================\n");

/**
 * TODO 1: 에러 전파와 catch 위치
 *
 * 요구사항:
 * - step1(), step2(), step3() 함수 만들기
 * - step2에서 에러 발생
 * - 하나의 catch로 모든 에러 처리
 */

console.log("--- TODO 1: 에러 전파 ---\n");

function step1() { return Promise.resolve(); }
function step2() { return Promise.reject(new Error("Error")); }
function step3() { return Promise.resolve(); }

// step1, 2, 3을 체이닝하고 하나의 catch로 처리
step1()
	.then(()=>step2())
	.then(()=>step3())
	.catch(e => console.log(e.message));

console.log("(TODO 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 2: 에러 복구 패턴
 *
 * catch에서 값을 반환하면 에러 상태에서 벗어남
 *
 * 요구사항:
 * - Promise.reject("네트워크 에러")
 * - catch에서 "캐시 데이터" 반환 (복구)
 * - 다음 then에서 복구된 값 사용
 */

console.log("--- TODO 2: 에러 복구 ---\n");

// Promise.reject()로 시작하여
// catch에서 "캐시 데이터"를 반환하여 복구하고
// then에서 복구된 데이터를 출력
Promise.reject(new Error("Error!"))
	.catch(e => "Cached Data")
	.then(msg => console.log(msg));

console.log("(TODO 2를 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 3: async/await 에러 처리
 *
 * 요구사항:
 * - async 함수에서 3단계 작업
 * - 2단계에서 throw new Error()
 * - try-catch로 에러 처리
 */

console.log("--- TODO 3: async/await 에러 ---\n");

async function process() {
  // try-catch를 사용하여 2단계에서 에러 발생 및 처리
	try {
		await Promise.resolve();
		throw new Error("Error!!");
		await Promise.resolve();
		console.log("is outputs something?")
	} catch (error) {
		console.error(error);
	}
}

process();

console.log("(TODO 3을 완성하세요)\n");
console.log("==================================================\n");

/**
 * 안티 패턴 학습
 *
 * Promise를 사용할 때 흔히 저지르는 실수들을
 * 실제 코드로 비교하며 학습
 */

	console.log("--- 안티 패턴 1: catch 누락 ---\n");

	// 헬퍼 함수
function fetchData(shouldFail = false) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldFail) reject(new Error("데이터 로드 실패"));
			else resolve("데이터");
		}, 100);
	});
}

// ❌ 나쁜 예: catch 없음 (UnhandledPromiseRejection 발생)
console.log("❌ 나쁜 예: catch 누락");
fetchData(true)
	.then((data) => console.log(data))
	.catch(() => {}); // 실습용으로는 catch 추가 (실제론 없어야 함)

// ✅ 좋은 예: catch로 에러 처리
console.log("\n✅ 좋은 예: catch 추가");
fetchData(true)
	.then((data) => console.log(data))
	.catch((error) => console.error(`에러 처리됨: ${error.message}`));

console.log("→ 모든 Promise에는 catch를 추가해야 함\n");
console.log("==================================================\n");

// 안티패턴 2 시작

function antiPattern2() {
	console.log("--- 안티 패턴 2: Promise 중첩 ---\n");

	function fetchUser() {
		return Promise.resolve({ id: 1, name: "홍길동" });
	}
	
	function fetchPosts(userId) {
		return Promise.resolve([
			{ id: 1, title: "게시글1" },
			{ id: 2, title: "게시글2" },
		]);
	}

	// ❌ 나쁜 예: 콜백 지옥처럼 중첩
	console.log("❌ 나쁜 예: Promise 중첩 (콜백 지옥)");
	fetchUser().then((user) => {
		console.log(`사용자: ${user.name}`);
		fetchPosts(user.id).then((posts) => {
			console.log(`게시글 수: ${posts.length}`);
		});
	});

	// ✅ 좋은 예: 체이닝으로 평탄화
	console.log("\n✅ 좋은 예: 체이닝으로 평탄화");
	fetchUser()
		.then((user) => {
			console.log(`사용자: ${user.name}`);
			return fetchPosts(user.id);
		})
		.then((posts) => {
			console.log(`게시글 수: ${posts.length}`);
		});

	console.log("→ return으로 Promise를 체이닝\n");
}

function antiPattern3() {
	console.log("--- 안티 패턴 3: return 누락 ---\n");

	// ❌ 나쁜 예: return 빼먹음
	console.log("❌ 나쁜 예: return 누락");
	Promise.resolve(10)
	.then((n) => {
		n + 5; // return 없음!
	})
	.then((n) => console.log(`결과: ${n}`)); // undefined

	// ✅ 좋은 예: return 명시
	console.log("\n✅ 좋은 예: return 명시");
	Promise.resolve(10)
		.then((n) => {
			return n + 5;
		})
		.then((n) => console.log(`결과: ${n}`)); // 15

	console.log("→ then에서 값을 전달하려면 return 필수\n");
	console.log("==================================================\n");
}

/**
 * 학습 정리
 *
 * ✅ 모든 Promise에 catch 추가
 * ✅ catch는 체이닝 끝에 배치
 * ✅ catch에서 값 반환 → 에러 복구
 * ✅ async/await는 try-catch 사용
 * ✅ return 빼먹지 않기
 * ✅ Promise 중첩 피하기
 *
 * 다음 학습: 09-practical-patterns.js
 */

console.log("\n=== 08. 에러 처리 학습 완료! ===");
console.log("\n정답 확인: 08-error-handling-answer.js");
console.log("다음 단계: node 09-practical-patterns.js\n");
