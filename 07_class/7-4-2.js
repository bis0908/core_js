/**
 * 7-4-2. extendClass2 - Bridge 패턴
 *
 * 더 깔끔한 상속 구현을 위해 Bridge 패턴을 사용합니다.
 * 빈 생성자 함수(Bridge)를 중간 다리로 사용하여 불필요한 프로퍼티 생성을 방지합니다.
 *
 * 동작 과정:
 * 1. Bridge 생성자 함수 생성 (빈 함수)
 * 2. Bridge.prototype = SuperClass.prototype - 프로토타입만 연결
 * 3. SubClass.prototype = new Bridge() - Bridge 인스턴스 생성
 * 4. 이렇게 하면 SubClass.prototype에 불필요한 프로퍼티가 생기지 않음
 *
 * 장점:
 * - SuperClass의 생성자를 실행하지 않음
 * - 불필요한 프로퍼티 삭제 작업이 필요 없음
 * - 메모리 효율적
 *
 * 즉시실행함수로 감싸서 Bridge를 한 번만 생성하고 재사용합니다.
 */

console.log("=== 7-4-2. extendClass2 - Bridge 패턴 ===");

var extendClass2 = (function () {
	var Bridge = function () {}; // 빈 생성자 함수

	return function (SuperClass, SubClass, subMethods) {
		// Bridge의 프로토타입을 SuperClass의 프로토타입으로 연결
		Bridge.prototype = SuperClass.prototype;

		// SubClass의 프로토타입을 Bridge 인스턴스로 설정
		SubClass.prototype = new Bridge();

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

console.log("\n상속 관계 확인:");
console.log("sq instanceof Square:", sq instanceof Square); // true
console.log("sq instanceof Rectangle:", sq instanceof Rectangle); // true

console.log("\nBridge 패턴의 장점:");
console.log("- SuperClass 생성자를 실행하지 않음");
console.log("- 불필요한 프로퍼티가 생기지 않음");

console.log("==================================================");
