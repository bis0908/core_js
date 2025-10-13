/**
 * practical-1.js: 상속 패턴 구현
 *
 * ES5에서 클래스 상속을 구현하는 다양한 방법을 비교합니다.
 * 각 방법의 장단점을 이해하고, 실무에서 어떤 패턴을 사용할지 결정할 수 있습니다.
 *
 * 상속 패턴:
 * 1. 프로토타입 체인 방식
 * 2. 생성자 빌려쓰기 방식 (Constructor Stealing)
 * 3. 조합 방식 (Combination)
 * 4. Object.create() 방식 (ES5)
 */

console.log("=== practical-1: 상속 패턴 구현 ===");

// 부모 클래스 정의
var Animal = function (name) {
	this.name = name;
	this.legs = 4;
};

Animal.prototype.walk = function () {
	console.log(this.name + "이(가) 걷습니다.");
};

Animal.prototype.eat = function () {
	console.log(this.name + "이(가) 먹습니다.");
};

console.log("==================================================");

// 방법 1: 프로토타입 체인 방식
console.log("\n=== 방법 1: 프로토타입 체인 방식 ===");

var Dog1 = function (name, breed) {
	this.name = name;
	this.breed = breed;
};

// Animal의 인스턴스를 프로토타입으로 설정
Dog1.prototype = new Animal();
Dog1.prototype.constructor = Dog1;

Dog1.prototype.bark = function () {
	console.log(this.name + ": 멍멍!");
};

var dog1 = new Dog1("바둑이", "진돗개");
console.log("dog1:", dog1);
console.log("dog1.legs:", dog1.legs); // undefined (생성자에서 초기화 안 됨)
dog1.walk(); // 바둑이이(가) 걷습니다.
dog1.bark(); // 바둑이: 멍멍!

console.log("\n단점: 부모 생성자의 인자를 전달할 수 없음");
console.log("단점: 프로토타입의 참조형 프로퍼티가 공유됨");

console.log("==================================================");

// 방법 2: 생성자 빌려쓰기 (Constructor Stealing)
console.log("\n=== 방법 2: 생성자 빌려쓰기 ===");

var Dog2 = function (name, breed) {
	Animal.call(this, name); // 부모 생성자 호출
	this.breed = breed;
};

Dog2.prototype.bark = function () {
	console.log(this.name + ": 멍멍!");
};

var dog2 = new Dog2("초코", "푸들");
console.log("dog2:", dog2);
console.log("dog2.legs:", dog2.legs); // 4 (부모 생성자에서 초기화됨)

// 하지만 프로토타입 메서드는 상속되지 않음
try {
	dog2.walk(); // 에러 발생
} catch (e) {
	console.log("에러:", e.message); // dog2.walk is not a function
}

console.log("\n장점: 부모 생성자의 프로퍼티를 상속받을 수 있음");
console.log("단점: 프로토타입 메서드는 상속되지 않음");

console.log("==================================================");

// 방법 3: 조합 방식 (Combination - 가장 일반적)
console.log("\n=== 방법 3: 조합 방식 (권장) ===");

var Dog3 = function (name, breed) {
	Animal.call(this, name); // 부모 생성자 호출 (프로퍼티 상속)
	this.breed = breed;
};

// 프로토타입 체인 설정 (메서드 상속)
Dog3.prototype = new Animal();
Dog3.prototype.constructor = Dog3;

Dog3.prototype.bark = function () {
	console.log(this.name + ": 멍멍!");
};

var dog3 = new Dog3("멍멍이", "시바견");
console.log("dog3:", dog3);
console.log("dog3.legs:", dog3.legs); // 4
dog3.walk(); // 멍멍이이(가) 걷습니다.
dog3.eat(); // 멍멍이이(가) 먹습니다.
dog3.bark(); // 멍멍이: 멍멍!

console.log("\n장점: 프로퍼티와 메서드 모두 상속됨");
console.log("단점: 부모 생성자가 두 번 호출됨 (비효율적)");

console.log("==================================================");

// 방법 4: Object.create() 방식 (ES5, 가장 권장)
console.log("\n=== 방법 4: Object.create() 방식 (ES5, 최선) ===");

var Dog4 = function (name, breed) {
	Animal.call(this, name); // 부모 생성자 호출
	this.breed = breed;
};

// Object.create()로 프로토타입 체인 설정
Dog4.prototype = Object.create(Animal.prototype);
Dog4.prototype.constructor = Dog4;

Dog4.prototype.bark = function () {
	console.log(this.name + ": 멍멍!");
};

var dog4 = new Dog4("해피", "웰시코기");
console.log("dog4:", dog4);
console.log("dog4.legs:", dog4.legs); // 4
dog4.walk(); // 해피이(가) 걷습니다.
dog4.eat(); // 해피이(가) 먹습니다.
dog4.bark(); // 해피: 멍멍!

console.log("\n장점: 부모 생성자가 한 번만 호출됨 (효율적)");
console.log("장점: 프로토타입 체인이 깔끔하게 설정됨");
console.log("장점: instanceof와 constructor가 정확하게 동작함");

// instanceof 검증
console.log("\ndog4 instanceof Dog4:", dog4 instanceof Dog4); // true
console.log("dog4 instanceof Animal:", dog4 instanceof Animal); // true

console.log("==================================================");

// 실무 활용: 상속 헬퍼 함수
console.log("\n=== 실무: 상속 헬퍼 함수 ===");

function inherit(Child, Parent) {
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Child;
}

// 새로운 자식 클래스 정의
var Cat = function (name, color) {
	Animal.call(this, name);
	this.color = color;
};

// 헬퍼 함수로 상속
inherit(Cat, Animal);

Cat.prototype.meow = function () {
	console.log(this.name + ": 야옹~");
};

var cat = new Cat("나비", "흰색");
console.log("cat:", cat);
cat.walk(); // 나비이(가) 걷습니다.
cat.meow(); // 나비: 야옹~

console.log("\n헬퍼 함수를 사용하면 코드가 간결하고 재사용 가능합니다.");

console.log("==================================================");

// 결론
console.log("\n=== 결론 ===");
console.log("ES5 환경에서는 방법 4 (Object.create)가 가장 권장됩니다.");
console.log("- 효율적 (생성자 한 번만 호출)");
console.log("- 명확한 프로토타입 체인");
console.log("- 정확한 instanceof 동작");
console.log("\nES6+에서는 class 문법을 사용하는 것이 더욱 간편합니다.");

console.log("==================================================");
