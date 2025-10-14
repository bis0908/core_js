/*
 * Day 3 - 타이머 챌린지: 중급 (실전 감각)
 * 
 * 목표: 여러 개념을 조합하여 문제 해결
 * 총 5문제 / 제한시간 각 10분
 * 
 * 결과 기록:
 * ┌─────┬──────────┬────────┬──────┐
 * │ No. │ 제한시간 │ 소요시간│ 결과 │
 * ├─────┼──────────┼────────┼──────┤
 * │  1  │  10분    │   분   │ O/X  │
 * │  2  │  10분    │   분   │ O/X  │
 * │  3  │  10분    │   분   │ O/X  │
 * │  4  │  10분    │   분   │ O/X  │
 * │  5  │  10분    │   분   │ O/X  │
 * └─────┴──────────┴────────┴──────┘
 * 
 * 총점: ____ / 5
 */

// ============================================
// 문제 1: 2단계 상속 + static 체인 (10분)
// ============================================

console.log('=== 문제 1: 2단계 상속 ===\n');

/*
 * 타이머 시작! ⏰
 * 
 * 다음 3단계 클래스 구조를 prototype으로 변환하세요:
 * Media → Video → StreamingVideo
 */

class Media {
  static totalCount = 0;
  
  constructor(title) {
    this.title = title;
    Media.totalCount++;
  }
  
  play() {
    console.log(`Playing: ${this.title}`);
  }
  
  static getCount() {
    return Media.totalCount;
  }
}

class Video extends Media {
  constructor(title, duration) {
    super(title);
    this.duration = duration;
  }
  
  play() {
    console.log(`Playing video: ${this.title} (${this.duration}min)`);
  }
}

class StreamingVideo extends Video {
  constructor(title, duration, quality) {
    super(title, duration);
    this.quality = quality;
  }
  
  play() {
    console.log(`Streaming in ${this.quality}: ${this.title} (${this.duration}min)`);
  }
}

/*
 * TODO: MediaProto, VideoProto, StreamingVideoProto 구현
 * 
 * 주의사항:
 * - static 속성 totalCount 추적
 * - 각 단계에서 play() 오버라이딩
 */

// 여기에 구현
function MediaProto(title) {
  this.title = title;
  MediaProto.totalCount++;
}

MediaProto.totalCount = 0;

MediaProto.prototype.play = function(){
  console.log(`Playing: ${this.title}`);
}

MediaProto.getCount = function(){
  return MediaProto.totalCount;
}

function VideoProto(title,duration) {
  MediaProto.call(this, title);
  this.duration = duration;
}

VideoProto.prototype = Object.create(MediaProto.prototype);
VideoProto.prototype.constructor = VideoProto;
// additional improvement
VideoProto.getCount = MediaProto.getCount;

VideoProto.prototype.play = function () {
  console.log(`Playing video: ${this.title} (${this.duration}min)`);
}

function StreamingVideoProto(title, duration, quality){
  VideoProto.call(this, title, duration);
  this.quality = quality;
}

StreamingVideoProto.prototype = Object.create(VideoProto.prototype);
StreamingVideoProto.prototype.constructor = StreamingVideoProto;
// additional improvement
StreamingVideoProto.getCount = MediaProto.getCount;

StreamingVideoProto.prototype.play = function () {
  console.log(`Streaming in ${this.quality}: ${this.title} (${this.duration}min)`);
}



// 테스트 코드
const stream1 = new StreamingVideo('Movie', 120, '4K');
const stream2 = new StreamingVideoProto('Movie', 120, '4K');

stream1.play();
stream2.play();
console.log('Class count:', Media.getCount());
console.log('Proto count:', MediaProto.getCount());

// 예상 출력:
// Streaming in 4K: Movie (120min)
// Streaming in 4K: Movie (120min)
// Class count: 1
// Proto count: 1


// ============================================
// 문제 2: new 없이도 안전한 생성자 (10분)
// ============================================

console.log('\n=== 문제 2: 안전한 생성자 ===\n');

/*
 * 타이머 시작! ⏰
 * 
 * User 생성자를 new 없이 호출해도 정상 동작하도록 만드세요.
 */

function User(username, email) {
  // TODO: new 없이 호출되었는지 체크하고 처리
  if (!(this instanceof User)) {
    return new User(username, email);
  }
  
  this.username = username;
  this.email = email;
}

User.prototype.getInfo = function() {
  return `${this.username} (${this.email})`;
};

/*
 * 요구사항:
 * - instanceof 체크 사용
 * - new 없이 호출 시 자동으로 new 붙여서 재호출
 */

// 테스트 코드
const user1 = new User('alice', 'alice@test.com');  // new 사용
const user2 = User('bob', 'bob@test.com');          // new 없이 사용

console.log(user1.getInfo());  // alice (alice@test.com)
console.log(user2.getInfo());  // bob (bob@test.com)
console.log(user1 instanceof User);  // true
console.log(user2 instanceof User);  // true


// ============================================
// 문제 3: this 바인딩 버그 수정 (10분)
// ============================================

console.log('\n=== 문제 3: this 버그 찾기 ===\n');

/*
 * 타이머 시작! ⏰
 * 
 * 아래 코드에는 this 관련 버그가 있습니다.
 * 3곳을 찾아서 수정하세요.
 */

function Timer(seconds) {
  this.seconds = seconds;
  this.elapsed = 0;
  this.intervalId = null;
}

Timer.prototype.start = function() {
  console.log('Timer started!');
  
  // 버그 1: 1초마다 실행되는 콜백에서 this 문제
  this.intervalId = setInterval(function() {
    this.elapsed++;
    console.log(`Elapsed: ${this.elapsed}s`);
    
    if (this.elapsed >= this.seconds) {
      this.stop();
    }
  }.bind(this), 1000);
};

Timer.prototype.stop = function() {
  console.log('Timer stopped!');
  clearInterval(this.intervalId);
};

Timer.prototype.onClick = function() {
  // 버그 2: 버튼 클릭 핸들러 (실제로는 동작 안 하지만 시뮬레이션)
  const button = {
    addEventListener: function (event, handler) {
      // 시뮬레이션: 즉시 실행
      handler();
    }
  };
  
  button.addEventListener('click', this.stop.bind(this));
};

Timer.prototype.getStatus = function() {
  // 버그 3: 객체 반환 시 메서드의 this
  return {
    seconds: this.seconds,
    elapsed: this.elapsed,
    getRemaining: () => { // 원래 function이 붙어있었는데 익명으로 바꿈
      return this.seconds - this.elapsed;
    }
  };
};

/*
 * TODO: 3가지 버그 수정
 * 
 * 힌트:
 * 1. 화살표 함수 또는 bind() 사용
 * 2. 콜백 전달 시 this 고정
 * 3. 메서드 내부의 this와 객체 내부의 this 구분
 */

// 테스트 코드 (수정 후 주석 해제)
const timer = new Timer(5);
timer.start();  // 1초마다 Elapsed 출력되어야 함
timer.onClick();  // 'Timer stopped!' 출력되어야 함; 바로 정
const timerStatus = timer.getStatus();
console.log(timerStatus.getRemaining());  // 남은 시간 출력되어야 함

/* 
result
Timer started!
Elapsed: 1s
Elapsed: 2s
Elapsed: 3s
Elapsed: 4s
Elapsed: 5s
Timer stopped!
*/

// ============================================
// 문제 4: Factory 패턴으로 조건부 생성 (10분)
// ============================================

console.log('\n=== 문제 4: Smart Factory ===\n');

/*
 * 타이머 시작! ⏰
 * 
 * type에 따라 다른 종류의 객체를 생성하는 Factory 함수를 만드세요.
 */

/*
 * TODO: createShape 함수 구현
 * 
 * 요구사항:
 * - type이 'circle'이면: { type: 'circle', radius, getArea: () => ... }
 * - type이 'rectangle'이면: { type: 'rectangle', width, height, getArea: () => ... }
 * - type이 'triangle'이면: { type: 'triangle', base, height, getArea: () => ... }
 * - 잘못된 type이면: null 반환
 * 
 * 공식:
 * - 원: π * r²
 * - 직사각형: width * height
 * - 삼각형: (base * height) / 2
 */
// 개선이 필요한 코드 -> edge case test 통과 실패
// const shapeMethods = {
//   getArea(){
//     if (this.type === 'circle') {
//       return  Number(Math.PI * (this.dimensions**2)).toFixed(2);
//     } else if (this.type === 'rectangle') {
//       return this.width * this.height;
//     } else {
//       return (this.base * this.height) / 2;
//     }
//   }
// }

// function createShape(type, ...dimensions) {
//   const [elem1, elem2] = dimensions;
//   // 여기에 구현
//   let shape = Object.create(shapeMethods);
//   switch (type) {
//     case 'circle':
//       shape.type = type;
//       shape.dimensions = elem1;
//       break;
//     case 'rectangle':
//       shape.type = type;
//       shape.width = elem1;
//       shape.height = elem2;
//       break;
//     case 'triangle':
//       shape.type = type;
//       shape.base = elem1;
//       shape.height = elem2;
//       break;
//     default:
//       shape = null;
//       break;
//   }

//   return shape;
// }

function Circle(radius) {
  this.type = 'circle'
  this.radius = radius;
};

Circle.prototype.getArea = function(){
  return Math.PI * this.radius * this.radius;
}

function Rectangle(width, height) {
  this.type = 'rectangle';
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
}

function Triangle(base, height) {
  this.type = 'triangle';
  this.base = base;
  this.height = height;
}

Triangle.prototype.getArea = function () {
  return (this.base * this.height) / 2;
}

function createShape(type, ...dimensions) {
  const constructors = {
    circle: Circle,
    rectangle: Rectangle,
    triangle: Triangle
  }

  const Constructor = constructors[type];
  return Constructor ? new Constructor(...dimensions) : null;
};

// 테스트 코드
const circle = createShape('circle', 5);
const rectangle = createShape('rectangle', 4, 6);
const triangle = createShape('triangle', 3, 4);
const invalid = createShape('hexagon');

console.log('Circle area:', circle.getArea());      // ~78.54
console.log('Rectangle area:', rectangle.getArea()); // 24
console.log('Triangle area:', triangle.getArea());   // 6
console.log('Invalid:', invalid);                    // null

// ============================================
// Edge Case 테스트 - 현재 구현의 문제점 확인 -- 리팩토링 전
// ============================================

console.log('\n=== Edge Case 테스트 ===\n');

// Test 1: 속성 공유 문제 확인
console.log('--- Test 1: 프로토타입 체인 오염 ---');
const circle1 = createShape('circle', 5);
const circle2 = createShape('circle', 10);

console.log('Circle1 radius:', circle1.radius);  // 5
console.log('Circle2 radius:', circle2.radius);  // 10

// 여기까지는 OK. 하지만 프로토타입을 직접 수정하면?
Object.getPrototypeOf(circle1).testProp = 'SHARED';

console.log('Circle1 testProp:', circle1.testProp);  // SHARED
console.log('Circle2 testProp:', circle2.testProp);  // SHARED ← 의도치 않은 공유!

// Test 2: getArea() 반환 타입 불일치
console.log('\n--- Test 2: 반환 타입 불일치 check ---');
const shapes = [
  createShape('circle', 5),
  createShape('rectangle', 4, 6),
  createShape('triangle', 3, 4)
];

shapes.forEach((shape, i) => {
  const area = shape.getArea();
  console.log(`Shape ${i}: ${area} (type: ${typeof area})`);
  // 예상: 모두 number여야 함
  // 실제: circle만 string ("78.54")
});

// Test 3: 산술 연산 시 문제
console.log('\n--- Test 3: 산술 연산 오류 ---');
const c = createShape('circle', 5);
const r = createShape('rectangle', 4, 6);

const totalArea = c.getArea() + r.getArea();
console.log('Total area:', totalArea);
// 예상: 78.54 + 24 = 102.54
// 실제: "78.54" + 24 = "78.5424" (문자열 결합!)

// Test 4: 정밀도 비교 문제
console.log('\n--- Test 4: 정밀도 손실 ---');
const _circle = createShape('circle', 5);
const area = _circle.getArea();

console.log('Area:', area);  // "78.54" (문자열)
console.log('Area * 2:', area * 2);  // 157.08 (암묵적 변환)
console.log('Area + 1:', area + 1);  // "78.541" (문자열 결합!)

// Test 5: 조건부 로직의 취약성
console.log('\n--- Test 5: type 속성 조작 ---');
const shape = createShape('circle', 5);
console.log('Original area:', shape.getArea());  // 78.54...

shape.type = 'rectangle';  // type을 바꿔버림
shape.width = 10;
shape.height = 5;

try {
  console.log('Modified area:', shape.getArea());  // 50
  // 문제: circle로 만들었는데 rectangle처럼 동작!
  // dimensions 속성은 남아있지만 사용 안 됨
} catch(e) {
  console.log('Error:', e.message);
}

// Test 6: 메서드 독립성 결여
console.log('\n--- Test 6: 메서드 공유 문제 ---');
const s1 = createShape('circle', 5);
const s2 = createShape('rectangle', 4, 6);

console.log('Same getArea?', s1.getArea === s2.getArea);
// 문제: 같은 메서드를 공유하므로 개별 커스터마이징 불가

// getArea를 개별 수정하려면?
s1.getArea = function() {
  return 999;  // 원의 넓이를 999로 강제
};

console.log('S1 area:', s1.getArea());  // 999
console.log('S2 area:', s2.getArea());  // 24 (영향 없음)
// 이건 의도한 동작? 아니면 버그?


// ============================================
// 문제 5: 다중 상속 흉내내기 (10분)
// ============================================

console.log('\n=== 문제 5: Mixin 패턴 ===\n');

/*
 * 타이머 시작! ⏰
 * 
 * 여러 객체의 메서드를 하나로 합치는 mixin 함수를 구현하세요.
 */

const canEat = {
  eat(food) {
    console.log(`${this.name} is eating ${food}`);
  }
};

const canWalk = {
  walk() {
    console.log(`${this.name} is walking`);
  }
};

const canSwim = {
  swim() {
    console.log(`${this.name} is swimming`);
  }
};

/*
 * TODO: mixin 함수 구현
 * 
 * 목표:
 * - target 객체에 여러 source 객체의 메서드를 복사
 * - Object.assign() 사용 가능
 */

function mixin(target, ...sources) {
  // 여기에 구현
  // const [el1,el2,el3] = sources;
  Object.assign(target, ...sources);
  
}

// 테스트 코드
function Animal(name) {
  this.name = name;
}

// Duck은 걷고, 먹고, 헤엄칠 수 있음
mixin(Animal.prototype, canEat, canWalk, canSwim);

const duck = new Animal('Donald');
duck.eat('bread');   // Donald is eating bread
duck.walk();         // Donald is walking
duck.swim();         // Donald is swimming