// ============================================
// Part 1: 프로미스 내부 구조 이해 (1-2시간)
// 목표: 프로미스가 상태 머신임을 이해하고 설명할 수 있다
// ============================================

// 📚 학습 과제:
// 1. new Promise() 실행 시 내부 상태와 값의 변화 과정 학습
// 2. MyPromise 클래스를 만들어 pending → fulfilled/rejected 상태 전이 흐름 구현

// ============================================
// 예제 1: 기본 프로미스 상태 관찰
// ============================================

console.log("=== 예제 1: 프로미스 상태 관찰 ===");

const promise1 = new Promise((resolve, reject) => {
  console.log("Promise 생성자 내부 실행 (동기)");
  // 이 시점의 상태는? pending
  
  setTimeout(() => {
    resolve("성공!");
    // 이 시점의 상태는? fulfilled
  }, 1000);
});

console.log("Promise 객체:", promise1); // 이 시점의 상태는? pending

promise1.then(result => {
  console.log("결과:", result);
});

// ============================================
// 예제 2: 즉시 resolve/reject되는 프로미스
// ============================================

console.log("\n=== 예제 2: 즉시 완료되는 프로미스 ===");

const immediateSuccess = new Promise((resolve) => {
  resolve("즉시 성공");
});

const immediateFailure = new Promise((resolve, reject) => {
  reject(new Error("즉시 실패"));
});

console.log("즉시 성공 프로미스:", immediateSuccess);
console.log("즉시 실패 프로미스:", immediateFailure);

// ============================================
// 예제 3: 간단한 MyPromise 구현 (상태 전이 흐름)
// ============================================

console.log("\n=== 예제 3: MyPromise 구현 ===");

class MyPromise {
  constructor(executor) {
    // 초기 상태
    this.state = 'pending';  // pending, fulfilled, rejected
    this.value = undefined;  // resolve된 값 또는 reject된 이유
    this.callbacks = [];     // then으로 등록된 콜백들
    
    console.log(`[MyPromise] 초기 상태: ${this.state}`);
    
    // resolve 함수
    const resolve = (value) => {
      // 한 번만 상태 변경 가능 (pending이 아니라는건 상태가 이미 바뀌었다는 의미로 바로 종료시키는 로직)
      if (this.state !== 'pending') return; 
      
      this.state = 'fulfilled';
      this.value = value;
      console.log(`[MyPromise] 상태 전이: pending → fulfilled, 값: ${value}`);
      
      // 등록된 콜백 실행
      this.callbacks.forEach(callback => {
        if (callback.onFulfilled) {
          callback.onFulfilled(this.value);
        }
      });
    };
    
    // reject 함수
    const reject = (reason) => {
      if (this.state !== 'pending') return;
      
      this.state = 'rejected';
      this.value = reason;
      console.log(`[MyPromise] 상태 전이: pending → rejected, 이유: ${reason}`);
      
      // 등록된 콜백 실행
      this.callbacks.forEach(callback => {
        if (callback.onRejected) {
          callback.onRejected(this.value);
        }
      });
    };
    
    // executor 즉시 실행
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  // then 메서드 (간단 버전)
  then(onFulfilled, onRejected) { // callback 함수를 인자로
    if (this.state === 'fulfilled') {
      // 이미 완료된 경우
      if (onFulfilled) onFulfilled(this.value); // 받아온 함수 실행 -> resolve
    } else if (this.state === 'rejected') {
      // 이미 실패한 경우
      if (onRejected) onRejected(this.value); // 받아온 함수 실행 -> reject
    } else {
      // pending인 경우, 콜백 등록
      this.callbacks.push({ onFulfilled, onRejected });
    }
    
    return this; // 체이닝을 위해 (실제로는 새로운 Promise 반환)
  }
}

// MyPromise 테스트
const myPromise = new MyPromise((resolve, reject) => {
  console.log("[테스트] executor 실행 중...");
  setTimeout(() => {
    resolve("완료!");
  }, 500);
});

myPromise.then(result => {
  console.log(`[테스트] 결과 받음: ${result}`);
});

// ============================================
// 연습 문제 1: 상태 예측하기
// ============================================

console.log("\n=== 연습 문제 1: 각 시점의 상태는? ===");

const practice1 = new Promise((resolve) => {
  console.log("1. 이 시점의 상태는?"); // pending
  resolve(42);
  console.log("2. 이 시점의 상태는?"); // fulfilled
  resolve(100); // 이미 settled 상태라 무시됨
});

practice1.then(value => {
  console.log("3. 받은 값:", value); // 42
});

// ============================================
// 연습 문제 2: 여러 then 호출
// ============================================

console.log("\n=== 연습 문제 2: 여러 then 호출 시 동작 ===");

const practice2 = new Promise(resolve => {
  setTimeout(() => resolve("데이터"), 500);
});

practice2.then(data => console.log("첫 번째 then:", data));
practice2.then(data => console.log("두 번째 then:", data));
practice2.then(data => console.log("세 번째 then:", data));

// 질문: 세 개의 then이 모두 실행될까요? 답: Yes!
// 이유: Promise는 한 번 resolve되면 그 값을 "기억"하고 
// 이후에 등록되는 모든 then에 같은 값을 전달합니다.

// ============================================
// 🎯 체크포인트
// ============================================

/*
✅ 확인할 것들:
1. Promise의 3가지 상태를 설명할 수 있나요?
   - pending: 초기 상태, 아직 완료되지 않음
   - fulfilled: 작업이 성공적으로 완료됨
   - rejected: 작업이 실패함

2. 상태 전이는 어떻게 일어나나요?
   - pending → fulfilled: resolve() 호출
   - pending → rejected: reject() 호출
   - 한 번 settled(fulfilled or rejected)되면 다시 변경 불가!

3. executor 함수는 언제 실행되나요?
   - new Promise() 호출 시 즉시 동기적으로 실행됨

4. 왜 MyPromise를 만들어봤나요?
   - 프로미스가 "상태 머신"임을 직접 구현하며 이해하기 위해
   - 내부 동작 원리를 깊이 있게 파악하기 위해

📝 다음 단계:
- 더 복잡한 MyPromise 구현해보기 (체이닝 지원)
- 프로미스 상태 변화를 시각적으로 그려보기
- 실제 코드에서 각 상태에 도달하는 시나리오 만들어보기
*/