/**
 * 7-5-3. extendClass3 - Object.create + constructor 복구 (완성)
 *
 * Object.create를 사용한 상속 구현에 constructor 복구를 추가합니다.
 * 이것이 ES5에서 클래스 상속을 구현하는 가장 권장되는 방법입니다.
 *
 * 완성된 클래스 상속 헬퍼 함수의 특징:
 * 1. Object.create로 깔끔한 프로토타입 체인 연결
 * 2. constructor 올바르게 복구
 * 3. 추가 메서드 간편하게 정의
 * 4. Object.freeze로 프로토타입 보호
 *
 * 이 방식은 ES6 class 문법이 내부적으로 하는 일과 유사합니다.
 */

console.log("=== 7-5-3. extendClass3 완성 버전 ===");

var extendClass3 = function (SuperClass, SubClass, subMethods) {
	// Object.create로 프로토타입 체인 연결
	SubClass.prototype = Object.create(SuperClass.prototype);

	// constructor 올바르게 복구
	SubClass.prototype.constructor = SubClass;

	// 추가 메서드가 있으면 할당
	if (subMethods) {
		for (var method in subMethods) {
			SubClass.prototype[method] = subMethods[method];
		}
	}

	// 프로토타입 변경 방지
	Object.freeze(SubClass.prototype);
	return SubClass;
};

var Rectangle = function (width, height) {
	this.width = width;
	this.height = height;
};
Rectangle.prototype.getArea = function () {
	return this.width * this.height;
};

var Square = extendClass3(Rectangle, function (width) {
	Rectangle.call(this, width, width);
});

var sq = new Square(5);
console.log("Square 넓이:", sq.getArea()); // 25

console.log("\nconstructor 확인:");
console.log("sq.constructor === Square:", sq.constructor === Square); // true
console.log("sq.constructor.name:", sq.constructor.name); // "Square"

console.log("\n상속 관계 확인:");
console.log("sq instanceof Square:", sq instanceof Square); // true
console.log("sq instanceof Rectangle:", sq instanceof Rectangle); // true

console.log("\n완성! 이것이 ES5 클래스 상속의 표준 패턴입니다.");

console.log("==================================================");
