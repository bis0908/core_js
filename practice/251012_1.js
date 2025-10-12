/* 
ConstructorA의 constructor
ConstructorA의 method
ConstructorA의 staticMethod
ConstructorB의 constructor
ConstructorB의 super
*/

// ===== ConstructorA 구현 =====

// 이 주석부터 시작하세요
// WITHOUT CLASS - prototype으로 같은 동작 구현

function ConstructorA(name) {
  // 여기서부터 시작!
  this.name = name;
}

// 인스턴스 메서드는?
ConstructorA.prototype.method = function (){
  console.log(`Method called by ${this.name}`);
}


// Static 메서드는?
ConstructorA.staticMethod = function (){
  console.log("static method called");
}


// ===== ConstructorB 구현 =====

function ConstructorB(name, age) {
  // 상속은 어떻게?
  ConstructorA.call(this, name);
  this.age = age;
}

// 프로토타입 연결은?
// ConstructorB.prototype.__proto__ = ConstructorA.prototype;
ConstructorB.prototype = Object.create(ConstructorA.prototype);

// ===== 테스트 코드 =====
const a = new ConstructorA('Alice');
a.method();
ConstructorA.staticMethod();

const b = new ConstructorB('Bob', 30);
b.method();
console.log(b.age);
console.log(b.name);

console.log('\n=== 프로토타입 체인 확인 ===');
console.log('b.__proto__ === ConstructorB.prototype:', 
  b.__proto__ === ConstructorB.prototype);

console.log('ConstructorB.prototype.__proto__ === ConstructorA.prototype:', 
  ConstructorB.prototype.__proto__ === ConstructorA.prototype);

console.log('b.method === a.method:', 
  b.method === a.method);

// 1. 인스턴스 메서드 위치 확인
console.log(typeof ConstructorA.prototype.method); // "function"
console.log(typeof a.method);                      // "function"

// 2. Static 메서드 위치 확인  
console.log(typeof ConstructorA.staticMethod);     // "function"
console.log(typeof a.staticMethod);                // "undefined" ← 중요!

// 3. 상속 확인
console.log(b instanceof ConstructorB);            // true
console.log(b instanceof ConstructorA);            // true ← 중요!