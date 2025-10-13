/**
 * 6-2-2. 프로토타입 체인
 *
 * 프로토타입 체인이란 __proto__ 프로퍼티를 따라 연결된 프로토타입들의 연결 고리입니다.
 * 자바스크립트 엔진은 객체의 프로퍼티나 메서드에 접근하려 할 때,
 * 해당 객체에 없으면 __proto__를 따라 프로토타입 체인을 타고 올라가며 검색합니다.
 *
 * 프로토타입 체인:
 * instance → Constructor.prototype → Object.prototype → null
 *
 * 배열의 경우:
 * arr → Array.prototype → Object.prototype → null
 *
 * 모든 객체의 최상위 프로토타입은 Object.prototype이며, 그 위는 null입니다.
 */

console.log("=== 6-2-2. 프로토타입 체인 ===");

// 배열의 프로토타입 체인 확인
var arr = [1, 2];

console.log("arr.__proto__ === Array.prototype:", arr.__proto__ === Array.prototype);
console.log("Array.prototype.__proto__ === Object.prototype:", Array.prototype.__proto__ === Object.prototype);
console.log("Object.prototype.__proto__ === null:", Object.prototype.__proto__ === null);

console.log("==================================================");

// 프로토타입 체인을 통한 메서드 접근
console.log("\n=== 프로토타입 체인을 통한 메서드 접근 ===");

arr.push(3); // Array.prototype.push
console.log("push 후 배열:", arr); // [1, 2, 3]

var hasOwn = arr.hasOwnProperty(2); // Object.prototype.hasOwnProperty
console.log("hasOwnProperty(2):", hasOwn); // true (인덱스 2가 존재)

console.log("==================================================");

// toString 메서드의 프로토타입 체인
console.log("\n=== toString 메서드와 프로토타입 체인 ===");

var arr2 = [1, 2];

// Array.prototype.toString을 먼저 찾음
console.log("arr2.toString():", arr2.toString()); // 1,2

// Array.prototype.toString 명시적 호출
console.log("Array.prototype.toString:", Array.prototype.toString.call(arr2)); // 1,2

// Object.prototype.toString 명시적 호출
console.log("Object.prototype.toString:", Object.prototype.toString.call(arr2)); // [object Array]

// 인스턴스에 toString 메서드 추가 (가장 우선순위 높음)
arr2.toString = function () {
	return this.join("_");
};
console.log("오버라이드된 toString:", arr2.toString()); // 1_2

console.log("==================================================");

// 커스텀 생성자의 프로토타입 체인
console.log("\n=== 커스텀 생성자의 프로토타입 체인 ===");

var Person = function (name) {
	this.name = name;
};

Person.prototype.getName = function () {
	return this.name;
};

var student = new Person("학생");

// 프로토타입 체인 확인
console.log("student.__proto__ === Person.prototype:", student.__proto__ === Person.prototype);
console.log("Person.prototype.__proto__ === Object.prototype:", Person.prototype.__proto__ === Object.prototype);

// 각 레벨의 메서드 호출
console.log("student.getName():", student.getName()); // Person.prototype.getName
console.log("student.hasOwnProperty('name'):", student.hasOwnProperty("name")); // Object.prototype.hasOwnProperty
console.log("student.toString():", student.toString()); // Object.prototype.toString

console.log("==================================================");

// 프로토타입 체인의 탐색 순서
console.log("\n=== 프로토타입 체인 탐색 순서 ===");

var obj = {
	a: 1,
};

// 1. 인스턴스 자체의 프로퍼티
console.log("obj.a:", obj.a); // 1 (obj 자체에 있음)

// 2. 프로토타입의 메서드
console.log("obj.hasOwnProperty('a'):", obj.hasOwnProperty("a")); // true (Object.prototype)

// 3. 없는 프로퍼티 접근 시 undefined 반환
console.log("obj.b:", obj.b); // undefined (체인 끝까지 탐색했지만 없음)

console.log("==================================================");
