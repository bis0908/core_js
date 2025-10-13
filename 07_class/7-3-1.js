/**
 * 7-3-1. 상속 없이 독립적으로 구현하기
 *
 * Rectangle과 Square를 각각 독립적인 생성자 함수로 구현합니다.
 * 두 클래스는 서로 상속 관계가 없으며, 각자의 getArea 메서드를 가지고 있습니다.
 *
 * 문제점:
 * - 코드 중복이 발생합니다
 * - Square는 본질적으로 Rectangle의 특수한 형태인데 이를 표현하지 못합니다
 * - 유지보수가 어렵습니다 (Rectangle 수정 시 Square도 수정 필요)
 */

console.log("=== 7-3-1. 상속 없는 독립적 구현 ===");

// Rectangle 클래스
var Rectangle = function (width, height) {
	this.width = width;
	this.height = height;
};
Rectangle.prototype.getArea = function () {
	return this.width * this.height;
};

var rect = new Rectangle(3, 4);
console.log("Rectangle 넓이:", rect.getArea()); // 12

// Square 클래스 (독립적 구현)
var Square = function (width) {
	this.width = width;
};
Square.prototype.getArea = function () {
	return this.width * this.width;
};

var sq = new Square(5);
console.log("Square 넓이:", sq.getArea()); // 25

console.log("\n문제점: getArea 메서드가 중복되고, 상속 관계가 표현되지 않음");

console.log("==================================================");
