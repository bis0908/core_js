/*
 * Day 2 - 주제 3: class vs prototype 완벽 비교
 * 
 * 학습 목표:
 * 1. class 문법을 prototype으로 변환하는 능력 습득
 * 2. 두 방식의 내부 동작 차이점 이해
 * 3. 상속, static, super를 prototype으로 구현
 * 
 * 예상 소요 시간: 2시간
 */

// ============================================
// Part 1: 기본 클래스 변환 (30분)
// ============================================

console.log('=== Part 1: 기본 클래스 → prototype ===\n');

// ===== Class 방식 =====
class Vehicle {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  
  getInfo() {
    return `${this.brand} ${this.model}`;
  }
  
  static compare(v1, v2) {
    return v1.brand === v2.brand;
  }
}

/*
 * TODO 1: 위 Vehicle 클래스를 prototype 방식으로 변환하세요
 * 
 * 요구사항:
 * - VehicleProto 생성자 함수 작성
 * - getInfo 인스턴스 메서드 구현
 * - compare static 메서드 구현
 * 
 * 테스트 케이스:
 * const car1 = new Vehicle('Tesla', 'Model 3');
 * const car2 = new VehicleProto('Tesla', 'Model 3');
 * 
 * 예상 동작:
 * - car1.getInfo() === car2.getInfo()
 * - Vehicle.compare(car1, car1) === VehicleProto.compare(car2, car2)
 */

function VehicleProto(brand, model) {
  // 여기에 구현
}

// 인스턴스 메서드

// Static 메서드


// 테스트
// const car1 = new Vehicle('Tesla', 'Model 3');
// const car2 = new VehicleProto('Tesla', 'Model 3');
// console.log(car1.getInfo());
// console.log(car2.getInfo());
// console.log(Vehicle.compare(car1, car1));
// console.log(VehicleProto.compare(car2, car2));


// ============================================
// Part 2: 상속 구현 (45분)
// ============================================

console.log('\n=== Part 2: 상속 ===\n');

// ===== Class 방식 =====
class ElectricVehicle extends Vehicle {
  constructor(brand, model, batterySize) {
    super(brand, model);
    this.batterySize = batterySize;
  }
  
  getInfo() {
    return `${super.getInfo()} with ${this.batterySize}kWh battery`;
  }
  
  charge() {
    console.log(`Charging ${this.brand} ${this.model}...`);
  }
}

/*
 * TODO 2: ElectricVehicle 클래스를 prototype 방식으로 변환하세요
 * 
 * 요구사항:
 * - ElectricVehicleProto 생성자 함수 작성
 * - VehicleProto를 상속
 * - getInfo 메서드 오버라이딩 (부모의 getInfo 호출 포함)
 * - charge 메서드 구현
 * 
 * 테스트 케이스:
 * const tesla1 = new ElectricVehicle('Tesla', 'Model S', 100);
 * const tesla2 = new ElectricVehicleProto('Tesla', 'Model S', 100);
 * 
 * 예상 동작:
 * - tesla1.getInfo() === tesla2.getInfo()
 * - tesla1.charge()와 tesla2.charge() 동일한 출력
 * - tesla2 instanceof ElectricVehicleProto === true
 * - tesla2 instanceof VehicleProto === true
 */

function ElectricVehicleProto(brand, model, batterySize) {
  // 여기에 구현
}

// 프로토타입 체인 연결

// getInfo 오버라이딩

// charge 메서드


// 테스트
// const tesla1 = new ElectricVehicle('Tesla', 'Model S', 100);
// const tesla2 = new ElectricVehicleProto('Tesla', 'Model S', 100);
// console.log(tesla1.getInfo());
// console.log(tesla2.getInfo());


/*
 * 실험 과제:
 * 1. super()를 빼면 어떻게 될까?
 * 2. 프로토타입 체인 연결을 안 하면?
 * 3. getInfo에서 부모 메서드 호출을 안 하면?
 * 
 * 각각 시도해보고 결과를 관찰하세요.
 */


// ============================================
// Part 3: 복잡한 상속 체인 (45분)
// ============================================

console.log('\n=== Part 3: 3단계 상속 ===\n');

/*
 * 클래스 체계:
 * 
 * Shape (도형)
 *   - constructor(color)
 *   - getColor()
 *   - static count (생성된 도형 수)
 *   - static getShapeCount()
 * 
 * Rectangle extends Shape
 *   - constructor(color, width, height)
 *   - getArea()
 * 
 * Square extends Rectangle
 *   - constructor(color, side)
 *   - getPerimeter()
 */

// ===== Class 버전 =====
class Shape {
  static count = 0;
  
  constructor(color) {
    this.color = color;
    Shape.count++;
  }
  
  getColor() {
    return this.color;
  }
  
  static getShapeCount() {
    return Shape.count;
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }
  
  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(color, side) {
    super(color, side, side);
  }
  
  getPerimeter() {
    return this.width * 4;
  }
}

/*
 * TODO 3: 위 3단계 상속을 prototype으로 구현하세요
 * 
 * 요구사항:
 * - ShapeProto, RectangleProto, SquareProto 구현
 * - 모든 메서드와 static 속성 구현
 * - 올바른 프로토타입 체인 연결
 * 
 * 테스트 케이스:
 * const square1 = new Square('red', 5);
 * const square2 = new SquareProto('red', 5);
 * 
 * 예상 동작:
 * - square1.getArea() === square2.getArea() === 25
 * - square1.getPerimeter() === square2.getPerimeter() === 20
 * - square1.getColor() === square2.getColor() === 'red'
 * - Shape.count === ShapeProto.count (도형 생성 수 추적)
 */

// Prototype 버전 구현
function ShapeProto(color) {
  // 여기에 구현
}

function RectangleProto(color, width, height) {
  // 여기에 구현
}

function SquareProto(color, side) {
  // 여기에 구현
}

// 테스트
// const square1 = new Square('red', 5);
// const square2 = new SquareProto('red', 5);
// console.log(square1.getArea());
// console.log(square1.getPerimeter());
// console.log(square1.getColor());


// ============================================
// Part 4: 비교표 완성 (30분)
// ============================================

console.log('\n=== Part 4: 비교표 작성 ===\n');

/*
 * TODO 4: 종이에 비교표를 작성하세요
 * 
 * +---------------------+-----------------------+------------------------------------+
 * | 기능                | class 문법            | prototype 문법                     |
 * +---------------------+-----------------------+------------------------------------+
 * | 생성자              |                       |                                    |
 * +---------------------+-----------------------+------------------------------------+
 * | 인스턴스 메서드     |                       |                                    |
 * +---------------------+-----------------------+------------------------------------+
 * | Static 메서드       |                       |                                    |
 * +---------------------+-----------------------+------------------------------------+
 * | 상속                |                       |                                    |
 * +---------------------+-----------------------+------------------------------------+
 * | 부모 메서드 호출    |                       |                                    |
 * +---------------------+-----------------------+------------------------------------+
 * | 가독성              |                       |                                    |
 * +---------------------+-----------------------+------------------------------------+
 * | 내부 동작 이해      |                       |                                    |
 * +---------------------+-----------------------+------------------------------------+
 * 
 * 각 항목에 대해 코드 예제와 설명을 함께 적으세요.
 */


// ============================================
// 최종 도전: 타이머 챌린지 (30분)
// ============================================

console.log('\n=== 최종 도전: 5분 챌린지 ===\n');

/*
 * 타이머를 5분으로 설정하고 아래 class 코드를 prototype으로 변환하세요!
 */

class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
  
  static create(name) {
    return new Animal(name);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
  
  fetch() {
    console.log(`${this.name} fetches the ball`);
  }
}

/*
 * TODO 5: 5분 안에 prototype으로 변환하기!
 * 
 * 체크리스트:
 * □ 인스턴스 생성 가능
 * □ 메서드 호출 가능
 * □ 상속 동작 확인
 * □ instanceof 체크
 * □ speak() 오버라이딩 동작
 * □ static 메서드 동작
 * 
 * 결과 기록:
 * - 1회차: _____분 (성공/실패)
 * - 2회차: _____분 (성공/실패)
 * - 3회차: _____분 (성공/실패)
 */

// 여기에 구현


// 테스트
// const dog1 = new Dog('Max', 'Golden Retriever');
// const dogProto = new DogProto('Max', 'Golden Retriever');
// dog1.speak();
// dogProto.speak();
// dog1.fetch();
// dogProto.fetch();