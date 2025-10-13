/**
 * 7-5-2. extendClass2 + constructor 복구
 *
 * Bridge 패턴을 사용한 extendClass2에 constructor 복구 로직을 추가합니다.
 *
 * 추가 개선:
 * - SubClass.prototype.constructor = SubClass 설정
 * - Bridge.prototype.constructor = SuperClass 설정
 *   (Bridge의 프로토타입이 SuperClass.prototype이므로 원래대로 복구)
 *
 * 개선 사항: constructor 오타를 수정하여 올바르게 동작하도록 구현합니다.
 */

console.log("=== 7-5-2. extendClass2 + constructor 복구 ===");

var extendClass2 = (function () {
	var Bridge = function () {};

	return function (SuperClass, SubClass, subMethods) {
		Bridge.prototype = SuperClass.prototype;
		SubClass.prototype = new Bridge();

		// constructor 복구
		SubClass.prototype.constructor = SubClass;
		Bridge.prototype.constructor = SuperClass;

		// 추가 메서드가 있으면 할당
		if (subMethods) {
			for (var method in subMethods) {
				SubClass.prototype[method] = subMethods[method];
			}
		}

		Object.freeze(SubClass.prototype);
		return SubClass;
	};
})();

var Rectangle = function (width, height) {
	this.width = width;
	this.height = height;
};
Rectangle.prototype.getArea = function () {
	return this.width * this.height;
};

var Square = extendClass2(Rectangle, function (width) {
	Rectangle.call(this, width, width);
});

var sq = new Square(5);
console.log("Square 넓이:", sq.getArea()); // 25

console.log("\nconstructor 확인:");
console.log("sq.constructor === Square:", sq.constructor === Square); // true
console.log("Square.prototype.constructor === Square:", Square.prototype.constructor === Square); // true

console.log("\n상속 관계 확인:");
console.log("sq instanceof Square:", sq instanceof Square); // true
console.log("sq instanceof Rectangle:", sq instanceof Rectangle); // true

console.log("\n✅ constructor가 올바르게 복구되었습니다.");

console.log("==================================================");
