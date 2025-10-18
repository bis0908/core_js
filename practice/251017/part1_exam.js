// ============================================
// Part 1 연습문제: 프로미스 상태 관리
// 목표: 프로미스의 상태 전이를 완벽히 이해하기
// ============================================

/* 
📌 학습 방법:
1. 각 문제의 TODO 부분을 직접 타이핑하여 구현하세요
2. 실행 전에 결과를 예측해보세요
3. 실행 후 예측과 다른 부분을 분석하세요
4. 주석으로 자신의 이해를 설명하세요
*/

// ============================================
// 연습 1: 기본 Promise 생성하기
// ============================================

console.log("=== 연습 1: 기본 Promise 생성 ===");

/*
TODO: 
1초 후에 "Hello, Promise!"를 resolve하는 Promise를 만드세요.
then으로 결과를 받아 출력하세요.
*/

// 여기에 코드를 작성하세요
// TODO: Promise 생성
const exercise1 = new Promise((resolve, reject)=>{
  setTimeout(() => {
    resolve("Hello, Promise!");
  }, 1000);
})

exercise1.then(result => console.log(result));


// 예상 결과:
// (1초 후) "결과: Hello, Promise!"

// ============================================
// 연습 2: reject 처리하기
// ============================================

console.log("\n=== 연습 2: reject 처리 ===");

/*
TODO:
500ms 후에 "Something went wrong"이라는 에러를 reject하는 
Promise를 만들고 catch로 처리하세요.
*/

// 여기에 코드를 작성하세요
setTimeout(() => {
  Promise.reject("Something went wrong").catch(err => console.log(err));
}, 500);

// 예상 결과:
// (0.5초 후) "에러 발생: Something went wrong"

// ============================================
// 연습 3: 조건부 resolve/reject
// ============================================

console.log("\n=== 연습 3: 조건부 처리 ===");

/*
TODO:
숫자를 받아서:
- 짝수면 "짝수입니다: {숫자}"를 resolve
- 홀수면 "홀수는 처리할 수 없습니다"를 reject
하는 함수 checkEvenNumber를 작성하세요.
*/

function checkEvenNumber(num) {
  // TODO: 여기에 Promise를 반환하는 코드 작성
  return new Promise((resolve, reject)=>{
    if (num%2 === 0) {
      resolve(`짝수입니다: ${num}`);
    }
    reject("홀수는 처리할 수 없습니다.");
  })
}

// 테스트 코드 (수정하지 마세요)
checkEvenNumber(4)
  .then(msg => console.log("성공:", msg))
  .catch(err => console.log("실패:", err));

checkEvenNumber(7)
  .then(msg => console.log("성공:", msg))
  .catch(err => console.log("실패:", err));

// 예상 결과:
// "성공: 짝수입니다: 4"
// "실패: 홀수는 처리할 수 없습니다"

// ============================================
// 연습 4: Promise 상태 관찰하기
// ============================================

console.log("\n=== 연습 4: 상태 관찰 ===");

/*
TODO:
아래 코드의 각 지점에서 promise의 상태를 예측하고
주석으로 작성하세요. 그 후 console.log로 확인하세요.
*/

const promise = new Promise((resolve) => {
  console.log("A 지점"); // 상태: pending
  
  setTimeout(() => {
    console.log("B 지점"); // 상태: pending
    resolve(100);
    console.log("C 지점"); // 상태: fulfilled
  }, 1000);
});

console.log("D 지점"); // 상태: ? pending

promise.then(value => {
  console.log("E 지점, 값:", value); // 상태: fulfilled, 100
});

// TODO: 각 지점에서 promise의 상태를 주석으로 작성하세요

// ============================================
// 연습 5: 여러 then 등록하기
// ============================================

console.log("\n=== 연습 5: 여러 then 등록 ===");

/*
TODO:
1. 2초 후에 "데이터"를 resolve하는 Promise 생성
2. 그 Promise에 3개의 then을 등록
3. 각 then은 다른 메시지를 출력
*/

// 여기에 코드를 작성하세요
const dataPromise = new Promise((resolve, reject)=>{
  setTimeout(() => {
    resolve("데이터");
  }, 2000);
})

dataPromise.then(res => console.log(`1st: ${res}`));
dataPromise.then(res => console.log(`2nd: ${res}`));
dataPromise.then(res => console.log(`3rd: ${res}`));

// 예상 결과: 3개 모두 실행될까요? 순서는?
//  모두 실행됨. 1st부터 순서대로 실행됨. 결과는 처음 받아온 것을 그대로 사용함.
// ============================================
// 연습 6: Promise.resolve와 Promise.reject
// ============================================

console.log("\n=== 연습 6: 정적 메서드 ===");

/*
TODO:
1. Promise.resolve를 사용해 즉시 완료되는 Promise 생성
2. Promise.reject를 사용해 즉시 실패하는 Promise 생성
3. 각각 then/catch로 처리
*/

// 여기에 코드를 작성하세요
Promise.resolve("즉시 실행 성공").then(res => console.log(res))
Promise.reject("즉시 실행 실패").catch(res => console.log(res))

// ============================================
// 연습 7: 간단한 MyPromise 구현
// ============================================

console.log("\n=== 연습 7: MyPromise 구현 ===");

/*
TODO:
아래 MyPromise 클래스의 빈 부분을 채우세요.
- constructor에서 executor 실행
- resolve/reject 함수 구현
- then 메서드 구현 (간단 버전)
*/

class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.callbacks = [];
    
    const resolve = (value) => {
      // TODO: resolve 로직 구현
      if (this.state !== 'pending') return;
      // 1. state를 'fulfilled'로 변경
      this.state = 'fulfilled';
      // 2. value 저장
      this.value = value;
      // 3. 등록된 콜백 실행
      this.callbacks.forEach(callback =>{
        if (callback.onFulfilled) {
          callback.onFulfilled(this.value);
        }
      });
    };

    
    
    const reject = (reason) => {
      // TODO: reject 로직 구현
      if(this.state !== 'pending') return;

      this.state = 'rejected';
      this.value = reason;

      this.callbacks.forEach(callback => {
        if (callback.onRejected) {
          callback.onRejected(this.value);
        }
      });
    };
    
    // TODO: executor 실행
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onFulfilled, onRejected) {
    // TODO: then 로직 구현
    // 1. 이미 fulfilled면 즉시 실행
    if (this.state === 'fulfilled') {
      if(onFulfilled) onFulfilled(this.value);
    }
    // 2. 이미 rejected면 onRejected 실행
    else if (this.state === 'rejected') {
      if(onRejected) onRejected(this.value);
    }
    // 3. pending이면 콜백 등록
    else{
      this.callbacks.push({onFulfilled, onRejected});
    }
    return this;
  }
}

// 테스트 코드
const myPromise = new MyPromise((resolve) => {
  setTimeout(() => resolve("완료!"), 500);
});

myPromise.then(result => {
  console.log("MyPromise 결과:", result);
});

// ============================================
// 연습 8: 타이머 래퍼 함수
// ============================================

console.log("\n=== 연습 8: 타이머 래퍼 ===");

/*
TODO:
delay(ms) 함수를 작성하세요.
- ms 밀리초 후에 resolve되는 Promise를 반환
- 사용 예: await delay(1000) 또는 delay(1000).then(...)
*/

function delay(ms) {
  // TODO: 여기에 코드 작성
  return new Promise(resolve => setTimeout(() => {
    resolve();
  }, ms))
}

// 테스트 코드
console.log("시작");
delay(1000).then(() => {
  console.log("1초 후");
  return delay(1000);
}).then(() => {
  console.log("2초 후");
});

// ============================================
// 연습 9: 상태 전이 규칙
// ============================================

console.log("\n=== 연습 9: 상태 전이 규칙 ===");

/*
TODO:
아래 코드의 결과를 예측하세요. 
두 번째 resolve/reject는 무시될까요?
*/

const test1 = new Promise((resolve, reject) => {
  resolve("첫 번째");
  resolve("두 번째"); // 이것은?: 첫번째 결과 사용
  reject("에러"); // 이것은? : 무시 
});

test1.then(
  value => console.log("test1 성공:", value),
  error => console.log("test1 실패:", error)
);

// TODO: 결과를 주석으로 예측하세요
// 예측:

// ============================================
// 연습 10: 실전 응용 - 타임아웃 구현
// ============================================

console.log("\n=== 연습 10: 타임아웃 구현 ===");

/*
TODO:
fetchWithTimeout(url, timeout) 함수를 작성하세요.
- url을 fetch하되, timeout ms 안에 완료되지 않으면 reject
- 힌트: Promise.race 또는 두 개의 Promise를 경쟁시키기
*/

function fetchWithTimeout(url, timeout) {
  // TODO: 여기에 코드 작성
  // 실제 fetch 대신 시뮬레이션 사용 가능
  
  const fetchSimulation = new Promise((resolve) => {
    setTimeout(() => resolve({ data: "성공" }), 2000); // 2초 걸림
  });
  
  const timeoutPromise = new Promise((_, reject) => {
    // TODO: timeout Promise 구현
    // 어떻게 짜야할까?
    // 타임아웃의 개념은 일정 시간이 지나면 종료되는 로직을 의미한다.
    // timeout 변수를 가지고 로직을 구현하면 될 것 같다.
    setTimeout(() => {
      reject(new Error(`요청시간 초과 (${timeout}ms)`));
    }, timeout);
  });
  
  // TODO: 두 Promise를 경쟁시키기
  return Promise.race(fetchSimulation, timeoutPromise);
}

// 테스트
fetchWithTimeout("https://api.example.com", 1000)
  .then(data => console.log("데이터:", data))
  .catch(err => console.log("타임아웃:", err));

// ============================================
// ✅ 체크리스트
// ============================================

/*
모든 연습을 완료한 후 체크하세요:

□ 연습 1: 기본 Promise 생성
□ 연습 2: reject 처리
□ 연습 3: 조건부 resolve/reject
□ 연습 4: 상태 관찰 및 예측
□ 연습 5: 여러 then 등록
□ 연습 6: Promise.resolve/reject
□ 연습 7: MyPromise 구현
□ 연습 8: delay 함수
□ 연습 9: 상태 전이 규칙 이해
□ 연습 10: 타임아웃 구현

🎯 목표 달성도:
- 모든 코드가 에러 없이 실행되나요?
- 각 Promise의 상태를 정확히 예측할 수 있나요?
- MyPromise의 동작 원리를 설명할 수 있나요?

💡 다음 단계: Part 2 연습문제로 이동!
*/