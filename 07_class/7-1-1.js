/**
 * 7-1-1. 스태틱 메서드와 프로토타입 메서드
 *
 * 클래스는 두 가지 종류의 메서드를 가질 수 있습니다:
 * 1. 프로토타입 메서드: 인스턴스가 사용할 수 있는 메서드 (instance.method())
 * 2. 스태틱 메서드: 생성자 함수 자체에 정의된 메서드 (Constructor.method())
 *
 * 프로토타입 메서드는 인스턴스에서만 호출 가능하고,
 * 스태틱 메서드는 생성자 함수에서만 호출 가능합니다.
 */

console.log("=== 7-1-1. 스태틱 메서드와 프로토타입 메서드 ===");

var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

// 프로토타입 메서드: 인스턴스가 사용
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

// 스태틱 메서드: 생성자 함수가 사용
Rectangle.isRectangle = (instance) =>
  instance instanceof Rectangle && instance.width > 0 && instance.height > 0;

var rect1 = new Rectangle(3, 4);

console.log(rect1.getArea()); // 12 (O) - 프로토타입 메서드 호출

try {
  console.log(rect1.isRectangle(rect1)); // Error (X) - 인스턴스에서는 스태틱 메서드를 사용할 수 없음
} catch (error) {
  console.log("Error:", error.message); // rect1.isRectangle is not a function
}

console.log(Rectangle.isRectangle(rect1)); // true - 생성자 함수에서 스태틱 메서드 호출

console.log("==================================================");
