/*
 * Day 2 - 주제 1: new 키워드의 비밀
 * 
 * 학습 목표:
 * 1. new가 내부적으로 어떻게 동작하는지 이해
 * 2. new 없이도 인스턴스를 생성하는 3가지 방법 습득
 * 3. 각 방법의 장단점 비교
 * 
 * 예상 소요 시간: 2시간
 */

// ============================================
// Part 1: new가 하는 일 이해하기 (30분)
// ============================================

console.log('=== Part 1: new의 동작 원리 ===\n');

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.introduce = function() {
  console.log(`Hi, I'm ${this.name}, ${this.age} years old`);
};

// TODO: new를 사용한 일반적인 방식
const person1 = new Person('Alice', 30);
person1.introduce();

/*
 * 질문 1: new Person('Alice', 30)을 실행하면 내부적으로 무슨 일이 일어날까?
 * 
 * 힌트: 다음 4단계를 생각해보세요
 * 1. 빈 객체 생성: {}
 * 2. ??? 연결
 * 3. 생성자 함수 실행 (this 바인딩)
 * 4. 객체 반환
 * 
 * 종이에 그림을 그려보면서 각 단계를 시각화해보세요
 */

// TODO: 위 4단계를 코드로 직접 구현해보기
function manualNew(Constructor, ...args) {
  // 1단계: 빈 객체 생성
  const newObj = {};
  // 2단계: 프로토타입 연결
  newObj.__proto__ = Object.create(Person.prototype);
  // 3단계: 생성자 실행
  Person.call(newObj, ...args);
  // 4단계: 객체 반환
  return newObj;
}

// 테스트
const person2 = manualNew(Person, 'Bob', 25);
person2.introduce();
console.log(person1.constructor === person2.constructor); // true여야 함


// ============================================
// Part 2: new 없이 호출해도 안전하게 만들기 (30분)
// ============================================

console.log('\n=== Part 2: new 없이 호출했을 때의 문제점과 해결법 ===\n');

function UnsafeConstructor(name) {
  this.name = name;
}

// TODO: new 없이 호출하면 어떻게 될까?
const bad = UnsafeConstructor('Charlie');
console.log(bad);        // undefined - 왜? 함수가 아무것도 return하지 않음
console.log(this.name);  // Node.js: 'Charlie' (전역 오염!)

/*
 * 질문 2: new 없이 호출했을 때 this는 무엇을 가리킬까?
 * 
 * 실험 결과를 메모하세요:
 * - 브라우저 환경: this === window (전역 객체)
 * - Node.js 환경: this === global (전역 객체)
 * - strict mode: this === undefined (TypeError 발생!)
 * 
 * 문제점: 전역 변수를 오염시킬 수 있음!
 */

// TODO: 안전한 생성자 만들기
// 목표: new를 빼먹어도 자동으로 new를 붙여서 실행되게 만들기
function SafeConstructor(name) {
  // Step 1: new 없이 호출되었는지 체크
  if (!(this instanceof SafeConstructor)) {
    // Step 2: new 없이 호출되었다면, new를 붙여서 다시 호출
    return new SafeConstructor(name);
    
    /* 다른 방법 (수동으로 객체 생성):
    const newObj = Object.create(SafeConstructor.prototype);
    SafeConstructor.call(newObj, name);
    return newObj;
    */
  }
  
  // Step 3: new와 함께 호출되었다면 정상 실행
  this.name = name;
}

SafeConstructor.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

// 테스트 - 두 가지 모두 동작해야 함!
const safe1 = new SafeConstructor('Alice');     // new 사용
const safe2 = SafeConstructor('Bob');           // new 없이 사용
safe1.greet();  // "Hello, I'm Alice"
safe2.greet();  // "Hello, I'm Bob"

console.log(safe1 instanceof SafeConstructor);  // true
console.log(safe2 instanceof SafeConstructor);  // true


// ============================================
// Part 3: Factory 패턴 (30분)
// ============================================

console.log('\n=== Part 3: Factory 패턴 ===\n');

/*
 * Factory 패턴이란?
 * - new 키워드 없이 객체를 생성하는 일반 함수
 * - 함수 내부에서 객체를 만들어서 반환
 * - 생성 과정을 캡슐화할 수 있음
 */

// ===== TODO 1: 기본 Factory 함수 만들기 =====
/*
 * 목표: createPerson 함수를 작성하세요
 * 
 * 요구사항:
 * - 매개변수: name, age
 * - 반환값: { name, age, introduce() } 형태의 객체
 * 
 * Step 1: 빈 객체 생성 (const person = {})
 * Step 2: name, age 속성 추가
 * Step 3: introduce 메서드 추가 (화살표 함수 또는 일반 함수)
 * Step 4: 객체 반환
 * 
 * 성공 기준:
 * - factory1.introduce() 호출 시 "Hi, I'm Alice, 30 years old" 출력
 * - factory2.introduce() 호출 시 "Hi, I'm Bob, 25 years old" 출력
 */

function createPerson(name, age) {
  // 여기에 코드 작성
  const person = {
    name: name,
    age: age,
    introduce: () => {
      console.log(`Hi, I'm ${name}, ${age} years old`);
    }
  }
  return person;
  
}

// 테스트
const factory1 = createPerson('Alice', 30);
const factory2 = createPerson('Bob', 25);

factory1.introduce();  // 예상: "Hi, I'm Alice, 30 years old"
factory2.introduce();  // 예상: "Hi, I'm Bob, 25 years old"


// ===== 문제점 분석 =====
console.log('\n--- Factory 패턴의 메모리 문제 ---');

/*
 * 질문 3: Factory 패턴의 문제점은?
 * 
 * 실험: 아래 코드의 결과를 예측해보세요
 */
console.log('factory1.introduce === factory2.introduce:',
  factory1.introduce === factory2.introduce
);
// 예상 결과: false

/*
 * 왜 false일까?
 * 
 * 이유: createPerson을 호출할 때마다 introduce 함수가 새로 생성됨
 * 
 * 메모리 계산:
 * - 100개의 인스턴스를 만들면?
 *   → introduce 함수도 100개 생성! (메모리 낭비)
 * 
 * - new + prototype 방식이라면?
 *   → introduce 함수는 prototype에 1개만 존재
 *   → 100개 인스턴스가 1개 함수를 공유
 * 
 * 아래에 메모리 다이어그램을 그려보세요:
 * 
 * Factory 방식:
 * factory1 → {name: 'Alice', age: 30, introduce: [Function 1]}
 * factory2 → {name: 'Bob',   age: 25, introduce: [Function 2]}  ← 함수가 따로!
 * 
 * Prototype 방식:
 * person1 → {name: 'Alice', age: 30}  ┐
 *           __proto__ → Person.prototype.introduce [Function]  ← 함수 공유!
 * person2 → {name: 'Bob',   age: 25}  ┘
 */


// ===== TODO 2: Factory 패턴 개선 - 프로토타입 활용 =====
/*
 * 목표: 메서드를 공유하는 개선된 Factory 함수 작성
 * 
 * 전략:
 * 1. 메서드들을 별도 객체(personMethods)로 분리
 * 2. Object.create(personMethods)로 프로토타입 체인 연결
 * 3. 생성된 객체에 속성만 추가
 * 
 * Step 1: Object.create(personMethods)로 객체 생성
 * Step 2: 생성된 객체에 name, age 속성 추가
 * Step 3: 객체 반환
 * 
 * 성공 기준:
 * - better1.introduce === better2.introduce가 true
 * - better1.introduce() 정상 동작
 */

const personMethods = {
  introduce() {
    console.log(`Hi, I'm ${this.name}, ${this.age} years old`);
  }
};

function createPersonWithPrototype(name, age) {
  // Step 1: personMethods를 프로토타입으로 하는 객체 생성
  const person = Object.create(personMethods);
  // Step 2: 속성 추가
  person.name = name;
  person.age = age;
  // Step 3: 반환
  return person;
  
}

// 테스트
const better1 = createPersonWithPrototype('Alice', 30);
const better2 = createPersonWithPrototype('Bob', 25);

console.log('\n--- 개선된 Factory 패턴 ---');
better1.introduce();  // 예상: "Hi, I'm Alice, 30 years old"
better2.introduce();  // 예상: "Hi, I'm Bob, 25 years old"

console.log('better1.introduce === better2.introduce:',
  better1.introduce === better2.introduce
);
// 예상 결과: true ← 이제 메서드를 공유!

/*
 * 프로토타입 체인 확인:
 */
console.log('better1.__proto__ === personMethods:',
  Object.getPrototypeOf(better1) === personMethods
);
// 예상: true


// ===== 비교 정리 =====
/*
 * 종이에 다음을 정리하세요:
 * 
 * 1. 기본 Factory vs 개선된 Factory
 *    - 메모리 사용량 차이: 기본 > 개선
 *    - 성능 차이: 기본 < 개선
 * 
 * 2. Factory vs new + Constructor
 *    - 언제 Factory를 쓸까?: 동일한 인스턴스가 여러개 필요한 상황
 *    - 언제 Constructor를 쓸까?: 특정 인스턴스만 필요할때
 * 
 * 3. 실무 활용 예시
 *    - jQuery의 $() 함수
 *    - React의 createElement()
 *    - 모두 new 없이 호출하는 Factory 패턴!
 */


// ============================================
// Part 4: Object.create() 마스터하기 (30분)
// ============================================

console.log('\n=== Part 4: Object.create() ===\n');

/*
 * Object.create()란?
 * - 지정된 프로토타입을 가진 새 객체를 생성하는 메서드
 * - new + Constructor 없이 프로토타입 체인을 만들 수 있음
 * 
 * 문법: Object.create(proto, [propertiesObject])
 * - proto: 새 객체의 프로토타입이 될 객체
 * - propertiesObject: (선택) 속성 정의
 */

const animalPrototype = {
  eat() {
    console.log(`${this.name} is eating`);
  },
  
  sleep() {
    console.log(`${this.name} is sleeping`);
  }
};


// ===== TODO 1: 기본 사용법 =====
/*
 * 목표: animalPrototype을 프로토타입으로 하는 dog 객체 생성
 * 
 * Step 1: Object.create(animalPrototype)로 dog 생성
 * Step 2: dog.name = 'Max' (속성 추가)
 * Step 3: dog.breed = 'Golden Retriever' (속성 추가)
 * Step 4: dog.eat() 호출해보기
 * 
 * 예상 결과: "Max is eating"
 */

const dog = Object.create(animalPrototype);
dog.name = 'Max';
dog.breed = 'Golden Retriever';

dog.eat();  // 예상: "Max is eating"

// 프로토타입 체인 확인
console.log('dog.__proto__ === animalPrototype:',
  Object.getPrototypeOf(dog) === animalPrototype
);
// 예상: true


// ===== TODO 2: 프로퍼티 디스크립터와 함께 사용 =====
/*
 * 목표: Object.create()의 두 번째 인자를 활용한 객체 생성
 * 
 * 프로퍼티 디스크립터란?
 * - 속성의 동작 방식을 세밀하게 제어하는 설정
 * - writable: 값 변경 가능 여부
 * - enumerable: for...in 반복 시 노출 여부
 * - configurable: 속성 삭제 및 디스크립터 변경 가능 여부
 * 
 * 이미 작성된 예제를 분석해보세요:
 */

const cat = Object.create(animalPrototype, {
  name: {
    value: 'jerry',
    writable: true,      // cat.name = 'Fluffy' 가능
    enumerable: true,    // for...in에 노출
    configurable: true   // delete cat.name 가능
  },
  age: {
    value: 10,
    writable: true,
    enumerable: true
    // configurable 생략 시 기본값: false
  }
});

cat.eat();  // 예상: "jerry is eating"
console.log(cat.name, cat.age);  // 예상: "jerry 10"


// ===== TODO 3: 프로퍼티 디스크립터 실험 =====
/*
 * 질문 4: writable, enumerable, configurable의 효과를 실험해보세요
 * 
 * 실험 1: writable: false로 설정하면?
 */
const readonlyObj = Object.create(animalPrototype, {
  name: {
    value: 'Readonly Dog',
    writable: false,     // 읽기 전용!
    enumerable: true,
    configurable: true,
  }
});

console.log('\n--- 실험 1: writable: false ---');
console.log('변경 전:', readonlyObj.name);
readonlyObj.name = 'New Name';  // 변경 시도
console.log('변경 후:', readonlyObj.name);
// 예상: 여전히 'Readonly Dog' (strict mode에서는 에러!)

/*
 * 실험 2: enumerable: false로 설정하면?
 */
const hiddenPropObj = Object.create(animalPrototype, {
  name: {
    value: 'Visible',
    enumerable: true
  },
  secret: { // enumerable에 따라 이 값이 노출/미노출 된다
    value: 'Hidden',
    enumerable: false    // 숨겨진 속성!
  }
});

console.log('\n--- 실험 2: enumerable: false ---');
console.log('Object.keys():', Object.keys(hiddenPropObj));
// 예상: ['name'] (secret은 안 보임)

for (let key in hiddenPropObj) {
  console.log('for...in:', key);
}
// 예상: 'name'만 출력 (eat, sleep은 상속받아 연결됨)

console.log('직접 접근:', hiddenPropObj.secret);
// 예상: 'Hidden' (직접 접근은 가능!)

/*
 * 실험 3: configurable: false로 설정하면?
 */
const lockedObj = Object.create(animalPrototype, {
  name: {
    value: 'Locked',
    writable: true,
    enumerable: true,
    configurable: false  // 잠김!
  }
});

console.log('\n--- 실험 3: configurable: false ---');
delete lockedObj.name;
console.log('삭제 후:', lockedObj.name);
// 예상: 여전히 'Locked' (삭제 안 됨!)

// 디스크립터 변경 시도 (에러 발생!)
try {
  Object.defineProperty(lockedObj, 'name', {
    enumerable: false
  });
} catch (e) {
  console.log('에러:', e.message);
}
// 예상: TypeError: Cannot redefine property


// ===== 정리 =====
/*
 * 종이에 표를 만들어 정리하세요:
 * 
 * | 속성          | true일 때           | false일 때          |
 * |---------------|---------------------|---------------------|
 * | writable      | 값 변경 가능        | 읽기 전용           |
 * | enumerable    | 반복문에 노출       | 반복문에 숨김       |
 * | configurable  | 삭제/수정 가능      | 삭제/수정 불가      |
 * 
 * 실무 활용:
 * - 상수 만들기: writable: false
 * - 내부 속성 숨기기: enumerable: false
 * - 불변 객체: configurable: false
 */


// ============================================
// 최종 과제: 3가지 방법 비교 (30분)
// ============================================

console.log('\n=== 최종 과제: 비교표 작성 ===\n');

/*
 * 목표: 객체 생성 3가지 방법을 완전히 이해하고 비교하기
 * 
 * 과제: 종이에 아래 표를 그리고 각 칸을 채우세요
 * 
 * +------------------+-------------------+------------------+-------------------+
 * | 특징             | new + Constructor | Factory 패턴     | Object.create()   |
 * +------------------+-------------------+------------------+-------------------+
 * | 프로토타입 연결  |                   |                  |                   |
 * +------------------+-------------------+------------------+-------------------+
 * | 메모리 효율      |                   |                  |                   |
 * +------------------+-------------------+------------------+-------------------+
 * | instanceof 동작  |                   |                  |                   |
 * +------------------+-------------------+------------------+-------------------+
 * | 사용 편의성      |                   |                  |                   |
 * +------------------+-------------------+------------------+-------------------+
 * | 유연성           |                   |                  |                   |
 * +------------------+-------------------+------------------+-------------------+
 * | 실무 활용 예시   |                   |                  |                   |
 * +------------------+-------------------+------------------+-------------------+
 * 
 * 작성 가이드:
 */

/*
 * 1. 프로토타입 연결
 * - new + Constructor: 자동으로 Constructor.prototype에 연결
 * - Factory: 개선 전에는 연결 안 됨, 개선 후에는 수동 연결
 * - Object.create(): 명시적으로 프로토타입 지정
 */

/*
 * 2. 메모리 효율
 * - new + Constructor: ⭐⭐⭐⭐⭐ (메서드 공유)
 * - Factory (기본): ⭐ (매번 메서드 생성)
 * - Factory (개선): ⭐⭐⭐⭐ (메서드 공유 가능)
 * - Object.create(): ⭐⭐⭐⭐⭐ (프로토타입 체인 활용)
 */

/*
 * 3. instanceof 동작
 * 테스트 코드를 작성해서 확인하세요:
 */
function TestConstructor() {}
const obj1 = new TestConstructor();
const obj2 = Object.create(TestConstructor.prototype);

console.log('obj1 instanceof TestConstructor:', obj1 instanceof TestConstructor);
console.log('obj2 instanceof TestConstructor:', obj2 instanceof TestConstructor);

/*
 * 4. 사용 편의성
 * 각 방법으로 같은 객체를 만들어보고 코드 길이를 비교하세요
 */

/*
 * 5. 유연성
 * - new: 생성자 함수 구조에 제한됨
 * - Factory: 조건부 객체 생성 가능 (if문 사용 가능)
 * - Object.create(): 프로토타입 없는 객체도 생성 가능 (Object.create(null))
 */

/*
 * 6. 언제 무엇을 선택할까?
 * 
 * new + Constructor를 선택하는 경우:
 * - 전통적인 OOP 패턴이 필요할 때
 * - instanceof 체크가 중요할 때
 * - 팀 컨벤션이 클래스 기반일 때
 * 
 * Factory를 선택하는 경우:
 * - 생성 로직이 복잡할 때 (조건부 생성)
 * - new를 숨기고 싶을 때 (jQuery처럼)
 * - 여러 타입의 객체를 동적으로 생성할 때
 * 
 * Object.create()를 선택하는 경우:
 * - 프로토타입 체인을 명시적으로 제어하고 싶을 때
 * - 프로토타입 없는 순수 객체가 필요할 때 (Object.create(null))
 * - 상속 구현 시 (Child.prototype = Object.create(Parent.prototype))
 */

// ============================================
// 심화 과제: Singleton 패턴 (선택, 30분)
// ============================================

/*
 * Singleton 패턴이란?
 * - 클래스의 인스턴스가 오직 하나만 존재하도록 보장
 * - 여러 번 new를 호출해도 항상 같은 인스턴스 반환
 * 
 * 활용 예시:
 * - 설정 객체 (Config)
 * - 로거 (Logger)
 * - 데이터베이스 연결 (DB Connection Pool)
 */

/*
 * 목표: Singleton 패턴을 구현하세요
 * 
 * 요구사항:
 * 1. new Singleton('first') → 인스턴스 생성
 * 2. new Singleton('second') → 기존 인스턴스 반환 (새로 만들지 않음!)
 * 3. 두 변수가 같은 객체를 가리켜야 함 (s1 === s2)
 * 
 * Step 1: Singleton.instance 정적 속성 추가
 * Step 2: 생성자에서 instance가 이미 있는지 체크
 * Step 3: 있으면 기존 인스턴스 반환, 없으면 새로 생성
 * 
 */

function Singleton(data) {
  // 여기에 코드 작성
  if (Singleton.instance) {
    return Singleton.instance;
  }

  this.data = data;
  Singleton.instance = this;
}

// 테스트
const s1 = new Singleton('first');
const s2 = new Singleton('second');

console.log('\n=== Singleton 패턴 테스트 ===');
console.log('s1 === s2:', s1 === s2);  // 예상: true
console.log('s1.data:', s1.data);      // 예상: 'first'
console.log('s2.data:', s2.data);      // 예상: 'first' (같은 객체!)

/*
 * 보너스: ES6 클래스로 구현해보기
 * 
 * class SingletonClass {
 *   static instance = null;
 *   
 *   constructor(data) {
 *     if (SingletonClass.instance) {
 *       return SingletonClass.instance;
 *     }
 *     
 *     this.data = data;
 *     SingletonClass.instance = this;
 *   }
 * }
 */