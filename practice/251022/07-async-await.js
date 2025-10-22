/**
 * 07. async/await - Promise를 동기처럼
 *
 * 학습 목표:
 * - async/await 기본 문법
 * - .then() ↔ async/await 상호 변환 10회
 * - try-catch 에러 처리
 */

console.log("=== async/await 학습 ===\n");

/**
 * async 함수
 *
 * - 항상 Promise를 반환
 * - return 값은 자동으로 Promise.resolve()로 래핑
 * - await 키워드 사용 가능
 */

console.log("--- 예제 1: async 기본 ---\n");

async function simpleAsync() {
	return "완료!"; // Promise.resolve("완료!")와 동일
}

simpleAsync().then((result) => {
	console.log("결과:", result);
	console.log("→ async 함수는 항상 Promise 반환\n");
});

console.log("==================================================\n");

/**
 * await 키워드
 *
 * - Promise가 완료될 때까지 기다림
 * - async 함수 내부에서만 사용 가능
 * - Promise의 결과값을 직접 반환
 */

setTimeout(async () => {
	console.log("--- 예제 2: await 기본 ---\n");

	function delay(ms, value) {
		return new Promise((resolve) => setTimeout(() => resolve(value), ms));
	}

	console.log("시작");
	const result1 = await delay(500, "첫 번째");
	console.log(result1);

	const result2 = await delay(500, "두 번째");
	console.log(result2);

	console.log("→ await로 비동기를 동기처럼 작성\n");
	console.log("==================================================\n");
}, 1000);

/**
 * TODO 1-5: then() → async/await 변환 (5회)
 *
 * 아래 then() 체이닝을 async/await로 변환하세요!
 */

console.log("--- TODO 1: 변환 1 ---\n");
console.log("원본 (then):");
/*
Promise.resolve(10)
  .then(n => n + 5)
  .then(n => n * 2)
  .then(result => console.log(result));
*/

console.log("\n변환 (async/await):");
// 여기에 async 함수로 작성하세요
async function todo1(){
  const a = await Promise.resolve(10);
  const b = a + 5;
  return b * 2;
}

console.log(await todo1);


console.log("\n==================================================\n");

console.log("--- TODO 2: 변환 2 (에러 처리) ---\n");
console.log("원본 (then):");
/*
Promise.reject('에러')
  .catch(e => console.error(e));
*/

console.log("\n변환 (try-catch):");
// 여기에 try-catch로 작성하세요
async function todo2() {
  try {
    await Promise.reject("error")
  } catch (e) {
    console.error(e)
  }
}
await todo2();

console.log("\n==================================================\n");

console.log("--- TODO 3: 변환 3 (순차 호출) ---\n");
console.log("원본:");
/*
getUser()
  .then(user => getPosts(user.id))
  .then(posts => console.log(posts));
*/

console.log("\n변환:");
// async 함수로 작성
async function getUser() {
  return {id: 1, user: "albert"};
}
async function getPosts(id) {
  return [{no:id, post: "abcdefghijklmn"}];
}

function printPosts(posts) {
  posts.forEach(post => {
    console.log(post);
  });
}

const users = await getUser();
const posts = await getPosts(users.id);
printPosts(posts);

console.log("\n==================================================\n");

console.log("--- TODO 4: 변환 4 (병렬 실행) ---\n");
console.log("원본:");
/*
Promise.all([task1(), task2(), task3()])
  .then(results => console.log(results));
*/

console.log("\n변환:");
// Promise.all과 await 조합
function task1(ms) {
  return new Promise(resolve => setTimeout(() => {
    resolve("success1")
  }, ms));
};

function task2(ms) {
  return new Promise(resolve => setTimeout(() => {
    resolve("success2")
  }, ms));
};

function task3(ms) {
  return new Promise(resolve => setTimeout(() => {
    resolve("success3")
  }, ms));
};

const result = await Promise.all([task1(500), task2(1000), task3(2000)]);
console.log("🔥 / 07-async-await.js:164 / result:", result);



console.log("\n==================================================\n");

console.log("--- TODO 5: 변환 5 (finally) ---\n");
console.log("원본:");
/*
fetchData()
  .then(data => console.log(data))
  .catch(e => console.error(e))
  .finally(() => console.log('끝'));
*/
async function fetchData() {
  return new Promise(resolve => setTimeout(() => {
    resolve("Done");
  }, 500))
};

async function fetchWithError(params) {
  try {
    console.log( await fetchData());
  } catch (error) {
    console.error(error);
  } finally {
    console.log("End")
  }
};

console.log("\n변환:");
// try-catch-finally

console.log("\n==================================================\n");

/**
 * TODO 6-10: async/await → then() 변환 (5회)
 */

console.log("--- TODO 6: 역변환 1 ---\n");
console.log("원본 (async/await):");

/**
 * step1, step2 헬퍼 함수
 */
function step1() {
  return Promise.resolve(10);
}
function step2(a) {
  return Promise.resolve(a * 2);
}

async function process() {
  const a = await step1();
  const b = await step2(a);
  return b;
}

console.log("\n변환 (then):");
// 위의 async/await process() 함수를 then 체이닝으로 작성하세요
Promise.resolve()
.then((result) => step1())
.then((result) =>  step2(result))
.then(result => console.log(result));

console.log("\n==================================================\n");

console.log("--- TODO 7: 역변환 2 (에러) ---\n");
console.log("원본:");

/**
 * fetch 헬퍼 함수
 */
function fetch() {
  return Promise.reject("에러 발생");
}

async function fetchWithErrorHandling() {
  try {
    const data = await fetch();
    return data;
  } catch (e) {
    console.error(e);
  }
}

console.log("\n변환 (then/catch):");
// 위의 async/await fetchWithErrorHandling() 함수를 then/catch로 작성하세요
fetch().then(data).catch(e => console.log(e.message));

console.log("\n==================================================\n");

console.log("--- TODO 8: 역변환 3 (병렬) ---\n");
console.log("원본:");

/**
 * task 헬퍼 함수 (숫자를 반환하는 Promise)
 */
function taskNum(n) {
  return Promise.resolve(n);
}

async function parallel() {
  const [a, b, c] = await Promise.all([
    taskNum(1), taskNum(2), taskNum(3)
  ]);
  return a + b + c;
}

console.log("\n변환:");
// 위의 async/await parallel() 함수를 then으로 작성하세요
Promise.all([taskNum(1), taskNum(2), taskNum(3)])
.then(([a,b,c]) => 
  console.log(a+b+c)
);

console.log("\n==================================================\n");

/**
 * 실전 패턴: 순차 vs 병렬
 *
 * 독립적인 비동기 작업들을 처리할 때
 * 순차 실행과 병렬 실행의 성능 차이를 비교
 */

console.log("--- 실전: 순차 vs 병렬 ---\n");

// 시뮬레이션용 비동기 작업 (각각 1초 소요)
function apiCall1() {
  return new Promise(resolve => setTimeout(() => resolve("데이터A"), 1000));
}
function apiCall2() {
  return new Promise(resolve => setTimeout(() => resolve("데이터B"), 1000));
}
function apiCall3() {
  return new Promise(resolve => setTimeout(() => resolve("데이터C"), 1000));
}

// ❌ 나쁜 예: 순차 실행 (느림)
async function slowPattern() {
  console.log("❌ 순차 실행 시작...");
  const start = Date.now();

  const a = await apiCall1();  // 1초 대기
  const b = await apiCall2();  // 1초 대기
  const c = await apiCall3();  // 1초 대기

  const elapsed = Date.now() - start;
  console.log(`결과: [${a}, ${b}, ${c}]`);
  console.log(`소요 시간: ${elapsed}ms (약 3초)\n`);
}

// ✅ 좋은 예: 병렬 실행 (빠름)
async function fastPattern() {
  console.log("✅ 병렬 실행 시작...");
  const start = Date.now();

  // 모든 작업을 동시에 시작
  const [a, b, c] = await Promise.all([
    apiCall1(),
    apiCall2(),
    apiCall3()
  ]);

  const elapsed = Date.now() - start;
  console.log(`결과: [${a}, ${b}, ${c}]`);
  console.log(`소요 시간: ${elapsed}ms (약 1초)\n`);
}

// 비교 실행
setTimeout(async () => {
  await slowPattern();
  await fastPattern();
  console.log("→ 병렬 실행이 3배 빠름! (1초 vs 3초)\n");
  console.log("==================================================\n");
}, 3000);

/**
 * 학습 정리
 *
 * ✅ async 함수는 항상 Promise 반환
 * ✅ await는 async 내부에서만 사용
 * ✅ try-catch로 에러 처리
 * ✅ 순차: await await await (느림)
 * ✅ 병렬: Promise.all + await (빠름)
 * ✅ then ↔ async/await 자유롭게 변환
 *
 * 다음 학습: 08-error-handling.js
 */

console.log("\n=== 07. async/await 학습 완료! ===");
console.log("\n⭐ 10회 변환 연습 완료했나요?");
console.log("   - 정답 파일에서 확인하세요");
console.log("\n정답 확인: 07-async-await-answer.js");
console.log("다음 단계: node 08-error-handling.js\n");
