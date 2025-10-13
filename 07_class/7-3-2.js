/**
 * 7-3-2. 상속 시도 - 중복 프로퍼티 방식
 *
 * Square를 Rectangle을 상속받는 것처럼 구현해봅니다.
 * Square 생성자에서 width와 height를 모두 같은 값으로 설정하고,
 * Rectangle의 getArea 메서드를 재사용합니다.
 *
 * 개선점:
 * - getArea 메서드를 재사용할 수 있습니다
 *
 * 여전한 문제점:
 * - Square에 height 프로퍼티가 불필요하게 존재합니다
 * - 상속 관계가 명확하지 않습니다
 */

console.log("=== 7-3-2. 중복 프로퍼티를 가진 상속 시도 ===");

var Rectangle = function (width, height) {
	this.width = width;
	this.height = height;
};
Rectangle.prototype.getArea = function () {
	return this.width * this.height;
};

var rect = new Rectangle(3, 4);
console.log("Rectangle 넓이:", rect.getArea()); // 12

// Square는 width와 height를 같은 값으로 설정
var Square = function (width) {
	this.width = width;
	this.height = width; // width와 동일한 값
};
Square.prototype.getArea = function () {
	return this.width * this.height;
};

var sq = new Square(5);
console.log("Square 넓이:", sq.getArea()); // 25
console.log("sq 객체:", sq); // Square { width: 5, height: 5 }

console.log("\n개선점: getArea 메서드를 재사용");
console.log("문제점: height 프로퍼티가 불필요하게 존재함");

console.log("==================================================");
