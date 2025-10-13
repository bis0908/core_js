/**
 * 7-4-3. Object.create를 이용한 상속 (가장 깔끔한 방법)
 *
 * ES5에서 제공하는 Object.create를 사용하면 가장 간단하게 상속을 구현할 수 있습니다.
 * Object.create(prototype)은 주어진 객체를 프로토타입으로 하는 새 객체를 생성합니다.
 *
 * 동작 과정:
 * 1. Square.prototype = Object.create(Rectangle.prototype)
 *    - Rectangle.prototype을 프로토타입으로 하는 새 객체 생성
 * 2. Object.freeze(Square.prototype) - 프로토타입 동결
 *
 * 장점:
 * - 코드가 간결함
 * - Bridge 패턴과 동일한 효과
 * - ES5 표준 메서드 사용
 * - 가장 권장되는 방식
 */

console.log("=== 7-4-3. Object.create를 이용한 상속 ===");

var Rectangle = function (width, height) {
	this.width = width;
	this.height = height;
};
Rectangle.prototype.getArea = function () {
	return this.width * this.height;
};

var Square = function (width) {
	Rectangle.call(this, width, width);
};

// Object.create를 사용한 프로토타입 체인 연결
Square.prototype = Object.create(Rectangle.prototype);
Object.freeze(Square.prototype);

var sq = new Square(5);
console.log("Square 넓이:", sq.getArea()); // 25

console.log("\n상속 관계 확인:");
console.log("sq instanceof Square:", sq instanceof Square); // true
console.log("sq instanceof Rectangle:", sq instanceof Rectangle); // true

console.log("\nObject.create의 장점:");
console.log("- 코드가 간결하고 명확함");
console.log("- 불필요한 프로퍼티 생성 없음");
console.log("- ES5 표준 방식");

console.log("==================================================");
