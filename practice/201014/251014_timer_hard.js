/*
 * Day 3 - 타이머 챌린지: 상급 (멘토님 스타일)
 * 
 * 목표: 복잡한 시나리오에서 문제 해결 능력 입증
 * 총 3문제 / 제한시간 15~20분
 * 
 * 결과 기록:
 * ┌─────┬──────────┬────────┬──────┐
 * │ No. │ 제한시간 │ 소요시간│ 결과 │
 * ├─────┼──────────┼────────┼──────┤
 * │  1  │  15분    │   분   │ O/X  │
 * │  2  │  20분    │   분   │ O/X  │
 * │  3  │  20분    │   분   │ O/X  │
 * └─────┴──────────┴────────┴──────┘
 * 
 * 총점: ____ / 3
 */

// ============================================
// 문제 1: 3단계 상속 + 각 레벨 super 호출 (15분)
// ============================================

console.log('=== 문제 1: 깊은 상속 체인 ===\n');

/*
 * 타이머 시작! ⏰
 * 
 * 아래 복잡한 상속 구조를 prototype으로 완벽히 변환하세요.
 */

class Organism {
  constructor(name) {
    this.name = name;
    this.lifeStage = 'alive';
  }
  
  describe() {
    return `${this.name}`;
  }
  
  static kingdom = 'Unknown';
  
  static getKingdom() {
    return this.kingdom;
  }
}

class Animal extends Organism {
  constructor(name, species) {
    super(name);
    this.species = species;
  }
  
  describe() {
    return `${super.describe()}, a ${this.species}`;
  }
  
  static kingdom = 'Animalia';
}

class Mammal extends Animal {
  constructor(name, species, furColor) {
    super(name, species);
    this.furColor = furColor;
  }
  
  describe() {
    return `${super.describe()} with ${this.furColor} fur`;
  }
  
  nurse() {
    console.log(`${this.name} is nursing its young`);
  }
}

class Dog extends Mammal {
  constructor(name, breed, furColor) {
    super(name, 'Dog', furColor);
    this.breed = breed;
  }
  
  describe() {
    return `${super.describe()}, breed: ${this.breed}`;
  }
  
  bark() {
    console.log(`${this.name} says: Woof!`);
  }
}

/*
 * TODO: OrganismProto, AnimalProto, MammalProto, DogProto 구현
 * 
 * 핵심 포인트:
 * - 4단계 프로토타입 체인
 * - 각 레벨에서 부모의 describe() 호출
 * - static 속성 kingdom 추적
 * - 모든 메서드 정상 동작
 * 
 * 난관:
 * - super.describe() 3단계 호출
 * - static 메서드에서 this.kingdom 참조
 */

// 여기에 구현
function OrganismProto(name) {
  this.name = name;
  this.lifeStage = 'alive';
}

OrganismProto.prototype.describe = function () {
  return `${this.name}`;
}

OrganismProto.kingdom = 'Unknown';

OrganismProto.getKingdom = function() {
  return this.kingdom;
}

/******************************************************************************/

function AnimalProto(name, species) {
  OrganismProto.call(this, name);
  this.species = species;
}

// as-is
// AnimalProto.prototype = Object.create(OrganismProto.prototype);
// AnimalProto.prototype.constructor = AnimalProto;
// to-be
Object.setPrototypeOf(AnimalProto.prototype, OrganismProto.prototype);
Object.setPrototypeOf(AnimalProto, OrganismProto);

AnimalProto.kingdom = 'Animalia';
AnimalProto.getKingdom = OrganismProto.getKingdom;

AnimalProto.prototype.describe = function () {
  const parentDescribe = OrganismProto.prototype.describe.call(this);
  return `${parentDescribe}, a ${this.species}`;
}


/******************************************************************************/

function MammalProto(name, species, furColor) {
  AnimalProto.call(this, name, species);
  this.furColor = furColor;
}

// MammalProto.prototype = Object.create(AnimalProto.prototype);
// MammalProto.prototype.constructor = MammalProto
// MammalProto.getKingdom = AnimalProto.getKingdom;
Object.setPrototypeOf(MammalProto.prototype, AnimalProto.prototype);
Object.setPrototypeOf(MammalProto, AnimalProto);

MammalProto.prototype.describe = function(){
  const parentDescribe = AnimalProto.prototype.describe.call(this);
  return `${parentDescribe} with ${this.furColor} fur`;
}

MammalProto.prototype.nurse = function(){
  console.log(`${this.name} is nursing its young`);
}

/******************************************************************************/

function DogProto(name, breed, furColor) {
  MammalProto.call(this, name, 'Dog', furColor);
  this.breed = breed;
}

// DogProto.prototype = Object.create(MammalProto.prototype);
// DogProto.prototype.constructor = DogProto;
// DogProto.getKingdom = MammalProto.getKingdom;
Object.setPrototypeOf(DogProto.prototype, MammalProto.prototype);
Object.setPrototypeOf(DogProto, MammalProto);

DogProto.prototype.describe = function(){
  const parentDescribe = MammalProto.prototype.describe.call(this);
  return `${parentDescribe}, breed: ${this.breed}`;
}

DogProto.prototype.bark = function(){
  console.log(`${this.name} says: Woof!`);
}

/******************************************************************************/
// 테스트 코드
const dog1 = new Dog('Max', 'Golden Retriever', 'golden');
const dog2 = new DogProto('Max', 'Golden Retriever', 'golden');

console.log('Class:', dog1.describe());
console.log('Proto:', dog2.describe());
dog1.bark();
dog2.bark();
dog1.nurse();
dog2.nurse();

console.log('Kingdom:', Dog.getKingdom());
console.log('Kingdom:', DogProto.getKingdom()); // undefined

// 예상 출력:
// Class: Max, a Dog with golden fur, breed: Golden Retriever
// Proto: Max, a Dog with golden fur, breed: Golden Retriever
// Max says: Woof!
// Max says: Woof!
// Max is nursing its young
// Max is nursing its young
// Kingdom: Animalia
// Kingdom: Animalia


// ============================================
// 문제 2: 복잡한 Mixin + Method Conflict 해결 (20분)
// ============================================

console.log('\n=== 문제 2: 고급 Mixin 패턴 ===\n');

/*
 * 타이머 시작! ⏰
 * 
 * 여러 Mixin을 적용하되, 메서드 충돌을 해결하는 시스템을 만드세요.
 */

/*
 * 시나리오:
 * - Robot은 여러 기능 모듈(Mixin)을 장착할 수 있음
 * - 일부 모듈은 같은 이름의 메서드를 가짐 (충돌!)
 * - 충돌 시 마지막에 추가된 모듈의 메서드 우선
 * - 하지만 이전 메서드도 호출 가능해야 함 (체이닝)
 */

const canFly = {
  move() {
    console.log('  > Flying through the air');
  },
  
  status() {
    console.log('  > Flight system: OK');
  }
};

const canDrive = {
  move() {
    console.log('  > Driving on the ground');
  },
  
  status() {
    console.log('  > Drive system: OK');
  }
};

const canShoot = {
  attack() {
    console.log('  > Shooting laser');
  },
  
  status() {
    console.log('  > Weapon system: OK');
  }
};

/*
 * TODO: Robot 클래스와 advancedMixin 함수 구현
 * 
 * 요구사항:
 * 1. Robot 생성자 함수 (name 매개변수)
 * 2. advancedMixin(target, ...mixins) 함수:
 *    - 각 mixin의 메서드를 target.prototype에 추가
 *    - 동일 이름 메서드가 있으면:
 *      a) 이전 메서드를 _previous에 저장
 *      b) 새 메서드로 덮어쓰기
 *    - 특별 메서드 callAll(methodName) 추가:
 *      → 모든 버전의 메서드를 순서대로 호출
 * 
 * 힌트:
 * - prototype[methodName]이 이미 있는지 체크
 * - 이전 메서드를 어딘가에 저장 (배열?)
 */

function Robot(name) {
  // 여기에 구현
  this.name = name;
}

function advancedMixin(target, ...mixins) {
  // 여기에 구현
  if (!target.prototype._previous) {
    target.prototype._previous = {};
  }
  // 1. 각 mixin 순회
  // 2. 각 메서드 복사
  // 3. 충돌 처리
  mixins.forEach((mixin) => {
    for (const methodName in mixin) {
      if (typeof mixin[methodName] === 'function') {
        // 기존 메서드가 있으면 이전 버전 배열에 저장
        if (target.prototype.hasOwnProperty(methodName)) {
          if (!target.prototype._previous[methodName]) {
            target.prototype._previous[methodName] = [];
          }
          target.prototype._previous[methodName].push(target.prototype[methodName]);
        }
        // 새 메서드로 교체
        target.prototype[methodName] = mixin[methodName];
      }
    }
  })

  // 4. callAll 메서드 추가
  target.prototype.callAll = function(methodName){
    // _previousVersions[methodName] 배열을 순회
    // 각 함수를 현재 인스턴스(this) 컨텍스트로 호출
    // 마지막으로 현재 버전도 호출
    if (this._previous[methodName]) {
      this._previous[methodName].forEach(func =>{
        func.call(this);
      });
    }

    if (this[methodName]) {
      this[methodName].call(this);
    }
  }
}

// 사용 예시
advancedMixin(Robot, canFly, canDrive, canShoot);

const robot = new Robot('Optimus');

console.log('\n--- 최신 메서드만 호출 ---');
robot.move();    // Driving on the ground (마지막 것만)
robot.attack();  // Shooting laser

console.log('\n--- 모든 버전 호출 (status는 3개 모듈에 모두 있음) ---');
robot.callAll('status');
// 예상 출력:
//   > Flight system: OK
//   > Drive system: OK
//   > Weapon system: OK


// ============================================
// 문제 3: this + prototype + 비동기 복합 (20분)
// ============================================

console.log('\n=== 문제 3: 비동기 + this 지옥 ===\n');

/*
 * 타이머 시작! ⏰
 * 
 * 아래 코드는 여러 this 관련 버그가 있습니다.
 * 정확히 5곳을 찾아서 수정하세요.
 */

function DataFetcher(apiUrl) {
  this.apiUrl = apiUrl;
  this.cache = {};
  this.requestCount = 0;
}

// 버그가 있는 코드 (5곳 수정 필요)
DataFetcher.prototype.fetch = function(endpoint) {
  // this.requestCount++; // 버그1: 위치 변경
  const cacheKey = endpoint;
  
  // 버그 1: 캐시 체크에서 this 문제
  if (this.cache[cacheKey]) {
    console.log('Returning from cache');
    return Promise.resolve(this.cache[cacheKey]);
  }
  this.requestCount++; // 버그1: 캐시 증가 로직의 위치를 변경
  
  console.log(`Fetching from API: ${this.apiUrl}${endpoint}`);
  
  // 버그 2: Promise 내부에서 this 접근
  // return new Promise(function(resolve) { // 버그2: 익명 함수로 변경 수정
  return new Promise((resolve) => {
    setTimeout(function() {
      const data = { endpoint: endpoint, timestamp: Date.now() };
      
      // 버그 3: 콜백 내부에서 this.cache 접근
      this.cache[cacheKey] = data;
      
      resolve(data);
    // }, 1000);
    }.bind(this), 1000); // 버그3: 일반 함수 실행에 this를 바인딩 수정
  });

};

DataFetcher.prototype.fetchMultiple = function(endpoints) {
  // 버그 4: map 콜백에서 this.fetch 호출
  const promises = endpoints.map(function(endpoint) {
    return this.fetch(endpoint);
  // });
  }.bind(this)); // 일반 함수 실행에 this를 바인딩 수정
  
  return Promise.all(promises);
};

DataFetcher.prototype.getStats = function() {
  // 버그 5: 로컬 변수 변환(클로저)
  const requestCount = this.requestCount;
  const cacheSize = Object.keys(this.cache).length;
  
  return {
    requestCount: requestCount,
    cacheSize: cacheSize,
    // 버그 5: 객체 내부의 this
    showDetails: () => { // 버그 5: 익명 함수 변경 
      console.log(`Requests: ${requestCount}, Cache: ${cacheSize}`);
    }
  };
};

/*
 * TODO: 5가지 버그 수정
 * 
 * 힌트:
 * 1. Promise 생성자의 executor는 일반 함수
 * 2. setTimeout 콜백도 일반 함수
 * 3. Array.map 콜백도 일반 함수
 * 4. 객체 리터럴 내부의 this
 * 5. 화살표 함수 vs bind vs 변수에 저장
 * 
 * 각 상황에 가장 적합한 해결책을 선택하세요!
 */

// 테스트 코드 (수정 후 주석 해제)

const fetcher = new DataFetcher('https://api.example.com');

console.log('\n--- 단일 요청 ---');
fetcher.fetch('/users')
  .then(data => {
    console.log('Data:', data);
    
    // 캐시 동작 확인
    return fetcher.fetch('/users');
  })
  .then(() => {
    console.log('\n--- 다중 요청 ---');
    return fetcher.fetchMultiple(['/posts', '/comments']);
  })
  .then(results => {
    console.log('Results:', results);
    
    console.log('\n--- 통계 ---');
    const stats = fetcher.getStats();
    console.log('Request count:', stats.requestCount);
    console.log('Cache size:', stats.cacheSize);
    stats.showDetails();
  });


// 예상 출력:
// Fetching from API: https://api.example.com/users
// Data: { endpoint: '/users', timestamp: ... }
// Returning from cache
//
// Fetching from API: https://api.example.com/posts
// Fetching from API: https://api.example.com/comments
// Results: [ {...}, {...} ]
//
// Request count: 3
// Cache size: 3
// Requests: 3, Cache: 3


// ============================================
// 보너스 챌린지 (시간 남으면)
// ============================================

console.log('\n=== 보너스: 당신은 진정한 프로토타입 마스터! ===\n');

/*
 * 프로토타입 없는 순수 객체 vs 프로토타입 체인
 * 
 * 질문: 아래 두 객체의 차이점을 설명하고,
 *      각각 언제 사용하는 게 좋을지 정리하세요.
 */

const obj1 = Object.create(null);  // 프로토타입 없음
const obj2 = {};                    // Object.prototype 상속

obj1.name = 'Pure';
obj2.name = 'Normal';

console.log('obj1.toString:', obj1.toString);  // undefined
console.log('obj2.toString:', obj2.toString);  // [Function]

console.log('obj1.__proto__:', obj1.__proto__);  // undefined
console.log('obj2.__proto__:', obj2.__proto__);  // [Object: null prototype] {}

/*
 * 종이에 정리하세요:
 * 
 * 1. Object.create(null)을 사용하는 경우
 *    - Map 대신 순수 딕셔너리로 사용
 *    - __proto__ 속성도 일반 속성으로 사용하고 싶을 때
 *    - 프로토타입 오염(Prototype Pollution) 공격 방어
 * 
 * 2. 일반 객체 {}를 사용하는 경우
 *    - 일반적인 객체 사용
 *    - toString, hasOwnProperty 등 기본 메서드 필요
 *    - 대부분의 상황
 * 
 * 3. 실무 사례
 *    - 설정 객체: Object.create(null) 추천
 *    - 일반 데이터: {} 사용
 *    - 프로토타입 체인 활용: {} 사용
 */