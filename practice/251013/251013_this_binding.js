/*
 * Day 2 - 주제 2: this 바인딩과 프로토타입
 * 
 * 학습 목표:
 * 1. 프로토타입 메서드에서 this가 어떻게 결정되는지 이해
 * 2. call, apply, bind의 차이점 명확히 구분
 * 3. 화살표 함수와 일반 함수의 this 차이 체득
 * 
 * 예상 소요 시간: 2시간
 */

// ============================================
// Part 1: 4가지 this 바인딩 시나리오 (45분)
// ============================================

console.log('=== Part 1: this 바인딩 4가지 시나리오 ===\n');

function Animal(name, species) {
  this.name = name;
  this.species = species;
}

Animal.prototype.introduce = function() {
  console.log(`I'm ${this.name}, a ${this.species}`);
};

const dog = new Animal('Max', 'Dog');

// 시나리오 1: 정상적인 메서드 호출
console.log('--- 시나리오 1: 메서드 호출 ---');
dog.introduce();

/*
 * 질문 1: 여기서 this는 무엇을 가리킬까?
 */


// 시나리오 2: 메서드를 변수에 할당
console.log('\n--- 시나리오 2: 변수에 할당 ---');
const introduce = dog.introduce;
introduce();

/*
 * 질문 2: 결과를 예측하고 실행해보세요. 왜 그렇게 동작할까?
 */


// 시나리오 3: 다른 객체에 메서드 빌려주기
console.log('\n--- 시나리오 3: 메서드 빌리기 ---');
const cat = {
  name: 'Whiskers',
  species: 'Cat',
  introduce: dog.introduce
};

cat.introduce();

/*
 * 질문 3: this는 dog일까, cat일까? 왜?
 */


// 시나리오 4: 콜백 함수로 전달
console.log('\n--- 시나리오 4: 콜백으로 전달 ---');

function executeCallback(callback) {
  console.log('Executing callback...');
  callback();
}

executeCallback(dog.introduce);

/*
 * 질문 4: 결과를 예측하고 실행해보세요.
 * 
 * 추가 실험: setTimeout(dog.introduce, 100); 도 시도해보세요.
 */


// ============================================
// Part 2: this 문제 해결하기 (45분)
// ============================================

console.log('\n=== Part 2: this 고정하는 3가지 방법 ===\n');

// 방법 1: bind() 사용
console.log('--- 방법 1: bind() ---');
const boundIntroduce = dog.introduce.bind(dog);
executeCallback(boundIntroduce);

/*
 * TODO 1: myBind 함수를 직접 구현하세요
 * 
 * 요구사항:
 * - 첫 번째 인자: 실행할 함수
 * - 두 번째 인자: this로 사용할 객체
 * - 반환값: 새로운 함수 (호출 시 원본 함수를 지정된 this로 실행)
 * 
 * 테스트:
 * const myBoundIntroduce = myBind(dog.introduce, dog);
 * executeCallback(myBoundIntroduce);  // "I'm Max, a Dog" 출력되어야 함
 */
function myBind(fn, context) {
  // 여기에 구현
}


// 방법 2: 화살표 함수로 래핑
console.log('\n--- 방법 2: 화살표 함수 ---');
executeCallback(() => dog.introduce());

/*
 * 질문 5: 왜 이 방법은 동작할까?
 */


// 방법 3: call 또는 apply 사용
console.log('\n--- 방법 3: call/apply ---');
dog.introduce.call(dog);
dog.introduce.apply(dog);


// ============================================
// Part 3: call, apply, bind 완벽 이해 (30분)
// ============================================

console.log('\n=== Part 3: call vs apply vs bind ===\n');

function greet(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

/*
 * TODO 2: call, apply, bind를 각각 사용하여 greet 함수를 실행하세요
 * 
 * 테스트 케이스:
 * 1. person1으로 "Hello!" 인사
 * 2. person2로 "Hi." 인사
 * 3. person1에 바인딩된 함수를 만들어서 나중에 실행
 * 
 * 예상 출력:
 * "Hello, I'm Alice!"
 * "Hi, I'm Bob."
 */


// 실전 문제
console.log('\n--- 실전 문제 ---');
const numbers = [1, 2, 3, 4, 5];
const max1 = Math.max(numbers);
const max2 = Math.max.apply(null, numbers);

console.log('max1:', max1);  // NaN
console.log('max2:', max2);  // 5

/*
 * 질문 6: 왜 max1은 NaN이고 max2는 5일까?
 */


// ============================================
// Part 4: 화살표 함수의 this (30분)
// ============================================

console.log('\n=== Part 4: 화살표 함수 vs 일반 함수 ===\n');

function Person(name) {
  this.name = name;
  
  this.greet1 = function() {
    console.log(`[일반] Hi, I'm ${this.name}`);
  };
  
  this.greet2 = () => {
    console.log(`[화살표] Hi, I'm ${this.name}`);
  };
}

Person.prototype.greet3 = function() {
  console.log(`[프로토타입-일반] Hi, I'm ${this.name}`);
};

Person.prototype.greet4 = () => {
  console.log(`[프로토타입-화살표] Hi, I'm ${this.name}`);
};

const alice = new Person('Alice');

// 직접 호출
console.log('--- 직접 호출 ---');
alice.greet1();
alice.greet2();
alice.greet3();
alice.greet4();

/*
 * 질문 7: 각 결과를 예측하고 실행해보세요.
 * 특히 greet4의 결과에 주목하세요.
 */


// 콜백으로 전달
console.log('\n--- 콜백으로 전달 ---');
setTimeout(alice.greet1, 100);
setTimeout(alice.greet2, 100);

/*
 * 질문 8: 왜 greet1과 greet2의 결과가 다를까?
 * 프로토타입에 화살표 함수를 쓰면 안 되는 이유는?
 */


// ============================================
// 최종 과제: 종합 문제 (30분)
// ============================================

console.log('\n=== 최종 과제: this 예측 챌린지 ===\n');

const counter = {
  count: 0,
  
  increment: function() {
    this.count++;
    console.log(this.count);
  },
  
  delayedIncrement: function() {
    setTimeout(function() {
      this.count++;
      console.log(this.count);
    }, 100);
  },
  
  fixedDelayedIncrement: function() {
    setTimeout(() => {
      this.count++;
      console.log(this.count);
    }, 100);
  }
};

/*
 * TODO 3: 각 메서드의 결과를 예측한 후 실행해보세요
 * 
 * counter.increment();              // 예상: ?
 * counter.delayedIncrement();       // 예상: ?
 * counter.fixedDelayedIncrement();  // 예상: ?
 * 
 * 왜 그런 결과가 나왔는지 설명할 수 있어야 합니다.
 */


/*
 * TODO 4: delayedIncrement를 고치세요
 * 
 * 목표: bind를 사용해서 delayedIncrement가 정상 동작하도록 수정
 * 예상 결과: counter.count가 제대로 증가
 */