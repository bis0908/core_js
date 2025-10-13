/**
 * 7-3-3. Rectangle.call과 프로토타입 연결을 이용한 상속
 *
 * Square 생성자에서 Rectangle.call을 사용하여 부모 생성자를 호출하고,
 * Square.prototype을 new Rectangle()으로 설정하여 프로토타입 체이닝을 구현합니다.
 *
 * 동작 원리:
 * 1. Rectangle.call(this, width, width): Square 인스턴스에 width, height 프로퍼티 생성
 * 2. Square.prototype = new Rectangle(): Rectangle의 프로토타입 메서드 상속
 *
 * 개선점:
 * - 프로토타입 체이닝을 통한 상속 구현
 * - Rectangle의 getArea 메서드를 재사용
 *
 * 여전한 문제점:
 * - Square.prototype이 Rectangle의 인스턴스이므로 불필요한 프로퍼티가 생김
 * - constructor가 Rectangle을 가리킴 (다음 예제에서 해결)
 */

console.log("=== 7-3-3. call과 프로토타입 연결을 이용한 상속 ===");

var Rectangle = function (width, height) {
	this.width = width;
	this.height = height;
};
Rectangle.prototype.getArea = function () {
	return this.width * this.height;
};

var rect = new Rectangle(3, 4);
console.log("Rectangle 넓이:", rect.getArea()); // 12

var Square = function (width) {
	// 부모 생성자 호출
	Rectangle.call(this, width, width);
};

// 프로토타입 체인 연결
Square.prototype = new Rectangle();

var sq = new Square(5);
console.log("Square 넓이:", sq.getArea()); // 25
console.log("sq 객체:", sq); // Square { width: 5, height: 5 }

console.log("\n프로토타입 체이닝 확인:");
console.log("sq instanceof Square:", sq instanceof Square); // true
console.log("sq instanceof Rectangle:", sq instanceof Rectangle); // true

console.log("\n문제점: constructor가 잘못 연결됨");
console.log("sq.constructor:", sq.constructor === Rectangle); // true (잘못됨!)

console.log("==================================================");
