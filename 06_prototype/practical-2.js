/**
 * practical-2.js: 프로토타입 메서드 활용
 *
 * 프로토타입 메서드는 모든 인스턴스가 공유하므로 메모리 효율적입니다.
 * 인스턴스별로 다른 값을 가져야 하는 프로퍼티는 생성자에서 정의하고,
 * 모든 인스턴스가 공유할 메서드는 프로토타입에 정의하는 것이 좋습니다.
 *
 * 이 파일에서는:
 * - 인스턴스 메서드 vs 프로토타입 메서드 비교
 * - 프로토타입 메서드의 메모리 효율성
 * - 프로토타입 메서드 설계 패턴
 */

console.log("=== practical-2: 프로토타입 메서드 활용 ===");

// 잘못된 패턴: 생성자 함수 내부에 메서드 정의
console.log("\n=== 잘못된 패턴: 생성자 내부 메서드 ===");

var User1 = function (name, age) {
	this.name = name;
	this.age = age;

	// 모든 인스턴스가 각각 메서드를 가짐 (비효율적)
	this.greet = function () {
		console.log("안녕하세요, " + this.name + "입니다.");
	};

	this.getAge = function () {
		return this.age;
	};
};

var user1a = new User1("철수", 20);
var user1b = new User1("영희", 22);

console.log("user1a.greet === user1b.greet:", user1a.greet === user1b.greet); // false
console.log("메서드가 인스턴스마다 생성되어 메모리 낭비!");

console.log("==================================================");

// 올바른 패턴: 프로토타입에 메서드 정의
console.log("\n=== 올바른 패턴: 프로토타입 메서드 ===");

var User2 = function (name, age) {
	this.name = name;
	this.age = age;
};

// 모든 인스턴스가 메서드를 공유 (효율적)
User2.prototype.greet = function () {
	console.log("안녕하세요, " + this.name + "입니다.");
};

User2.prototype.getAge = function () {
	return this.age;
};

User2.prototype.setAge = function (age) {
	if (age < 0) {
		console.log("나이는 0 이상이어야 합니다.");
		return;
	}
	this.age = age;
};

var user2a = new User2("철수", 20);
var user2b = new User2("영희", 22);

console.log("user2a.greet === user2b.greet:", user2a.greet === user2b.greet); // true
console.log("메서드가 프로토타입에서 공유되어 메모리 효율적!");

user2a.greet(); // 안녕하세요, 철수입니다.
user2b.greet(); // 안녕하세요, 영희입니다.

console.log("==================================================");

// 프로토타입 메서드 체이닝 패턴
console.log("\n=== 메서드 체이닝 패턴 ===");

var Calculator = function (value) {
	this.value = value || 0;
};

// 메서드에서 this를 반환하여 체이닝 가능하게 함
Calculator.prototype.add = function (num) {
	this.value += num;
	return this; // 체이닝을 위해 this 반환
};

Calculator.prototype.subtract = function (num) {
	this.value -= num;
	return this;
};

Calculator.prototype.multiply = function (num) {
	this.value *= num;
	return this;
};

Calculator.prototype.divide = function (num) {
	if (num === 0) {
		console.log("0으로 나눌 수 없습니다.");
		return this;
	}
	this.value /= num;
	return this;
};

Calculator.prototype.getResult = function () {
	return this.value;
};

// 메서드 체이닝 사용
var calc = new Calculator(10);
var result = calc.add(5).multiply(2).subtract(10).divide(2).getResult();

console.log("계산 결과:", result); // 10

console.log("==================================================");

// 실무 활용: 배열 메서드 확장
console.log("\n=== 실무: 배열 메서드 확장 예시 ===");

// 주의: 실제로는 Array.prototype을 직접 수정하면 안 됩니다!
// 여기서는 학습 목적으로만 사용

var MyArray = function () {
	// arguments를 배열로 변환하여 인덱스에 할당
	for (var i = 0; i < arguments.length; i++) {
		this[i] = arguments[i];
	}
	this.length = arguments.length;
};

// Array.prototype을 상속
MyArray.prototype = Object.create(Array.prototype);
MyArray.prototype.constructor = MyArray;

// 커스텀 메서드 추가
MyArray.prototype.sum = function () {
	var total = 0;
	for (var i = 0; i < this.length; i++) {
		total += this[i];
	}
	return total;
};

MyArray.prototype.average = function () {
	return this.length > 0 ? this.sum() / this.length : 0;
};

MyArray.prototype.max = function () {
	if (this.length === 0) return undefined;
	var max = this[0];
	for (var i = 1; i < this.length; i++) {
		if (this[i] > max) max = this[i];
	}
	return max;
};

var numbers = new MyArray(10, 20, 30, 40, 50);

console.log("numbers:", numbers);
console.log("sum():", numbers.sum()); // 150
console.log("average():", numbers.average()); // 30
console.log("max():", numbers.max()); // 50

// Array 메서드도 사용 가능
numbers.push(60);
console.log("push(60) 후 sum():", numbers.sum()); // 210

console.log("==================================================");

// 프로토타입 메서드의 성능 비교
console.log("\n=== 성능 비교: 인스턴스 vs 프로토타입 메서드 ===");

var count = 10000;

// 인스턴스 메서드 방식
var start1 = Date.now();
for (var i = 0; i < count; i++) {
	var obj1 = new User1("테스트", 20);
}
var end1 = Date.now();
console.log("인스턴스 메서드 방식:", end1 - start1 + "ms");

// 프로토타입 메서드 방식
var start2 = Date.now();
for (var i = 0; i < count; i++) {
	var obj2 = new User2("테스트", 20);
}
var end2 = Date.now();
console.log("프로토타입 메서드 방식:", end2 - start2 + "ms");

console.log("\n프로토타입 메서드가 인스턴스 메서드보다 빠르고 메모리 효율적입니다!");

console.log("==================================================");

// 결론
console.log("\n=== 결론: 프로토타입 메서드 설계 원칙 ===");
console.log("1. 인스턴스마다 다른 값: 생성자에 정의 (this.name, this.age)");
console.log("2. 모든 인스턴스가 공유할 메서드: 프로토타입에 정의");
console.log("3. 메서드 체이닝: return this 활용");
console.log("4. 성능과 메모리 효율을 위해 프로토타입 메서드 우선 사용");

console.log("==================================================");
