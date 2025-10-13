/**
 * 6-1-1. constructor, prototype, instance 관계
 *
 * 자바스크립트는 프로토타입 기반 언어입니다.
 * 생성자 함수(Constructor)를 통해 인스턴스(Instance)를 만들 수 있으며,
 * 이때 생성자 함수의 prototype 프로퍼티와 인스턴스의 __proto__ 프로퍼티가 연결됩니다.
 *
 * Constructor.prototype === instance.__proto__
 *
 * 이를 통해 인스턴스는 생성자 함수의 프로토타입에 정의된 메서드와 프로퍼티에 접근할 수 있습니다.
 */

console.log("=== 6-1-1. constructor, prototype, instance 관계 ===");

// Person 생성자 함수 정의
var Person = function (name) {
  this._name = name;
};

// 프로토타입 메서드 정의
Person.prototype.getName = function () {
  return this._name;
};

// 인스턴스 생성
var iu = new Person("아이유");

console.log("인스턴스의 이름:", iu.getName()); // 아이유
console.log("프로토타입 체인 확인:", iu.__proto__ === Person.prototype); // true
console.log("constructor 확인:", iu.constructor === Person); // true

console.log("==================================================");

// Constructor와 instance 관계 확인
var Constructor = function (name) {
  this.name = name;
};
Constructor.prototype.method1 = () => {
  console.log("method1 실행");
};
Constructor.prototype.property1 = "Constructor Prototype Property";

var instance = new Constructor("Instance");

console.log("\n=== Constructor와 instance 구조 ===");
console.dir(Constructor);
console.dir(instance);

console.log("\n=== 프로토타입 체인 관계 확인 ===");
console.log(
  "instance.__proto__ === Constructor.prototype:",
  instance.__proto__ === Constructor.prototype,
);
console.log(
  "instance.constructor === Constructor:",
  instance.constructor === Constructor,
);
console.log("인스턴스에서 프로토타입 프로퍼티 접근:", instance.property1);
instance.method1(); // method1 실행

console.log("==================================================");
