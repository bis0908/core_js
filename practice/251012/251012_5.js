// 목표: 5단계 상속 체인 만들고 추적하기

function Level1(name) {
  this.name = name;
  this.level = 1;
}
Level1.prototype.method1 = function() {
  console.log(`Level1.method1 called by ${this.name}`);
};

function Level2(name, age) {
  Level1.call(this, name);
  this.age = age;
  this.level = 2;
}
// TODO: Level1 상속 설정
// Level2.prototype = ???

Level2.prototype.method2 = function() {
  console.log(`Level2.method2 called by ${this.name}`);
};

function Level3(name, age, job) {
  Level2.call(this, name, age);
  this.job = job;
  this.level = 3;
}
// TODO: Level2 상속 설정

Level3.prototype.method3 = function() {
  console.log(`Level3.method3 called by ${this.name}`);
};

// TODO: Level4, Level5도 같은 패턴으로 만들기

// ===== 체인 추적 실습 =====
const obj = new Level3('Alice', 30, 'Developer');

console.log('\n=== 프로토타입 체인 추적 ===');
// TODO: 다음을 직접 콘솔에 찍어보고 결과 예측하기
// 1. obj.__proto__는 무엇?
// 2. obj.__proto__.__proto__는?
// 3. obj.__proto__.__proto__.__proto__는?
// 4. method1을 호출하면 어디서 찾아지나?
// 5. Object.getPrototypeOf(obj)와 obj.__proto__의 차이는?

// 실습: obj.method1() 호출 시 프로토타입 체인 경로 그려보기