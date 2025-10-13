/**
 * 7-4-1. extendClass1 - 프로퍼티 삭제 방식
 *
 * 클래스 상속을 도와주는 헬퍼 함수를 만듭니다.
 * SubClass.prototype을 SuperClass의 인스턴스로 설정한 후,
 * 불필요한 인스턴스 프로퍼티를 삭제하는 방식입니다.
 *
 * 동작 과정:
 * 1. SubClass.prototype = new SuperClass() - 프로토타입 체인 연결
 * 2. 불필요한 프로퍼티 삭제 (hasOwnProperty로 확인)
 * 3. subMethods가 있으면 추가
 * 4. Object.freeze로 프로토타입 동결
 *
 * 문제점:
 * - 한 번은 SuperClass의 생성자를 실행해야 함
 * - hasOwnProperty로 프로퍼티를 일일이 삭제해야 함
 */

console.log("=== 7-4-1. extendClass1 - 프로퍼티 삭제 방식 ===");

var extendClass1 = function (SuperClass, SubClass, subMethods) {
	SubClass.prototype = new SuperClass();

	// 불필요한 인스턴스 프로퍼티 삭제
	for (var prop in SubClass.prototype) {
		if (SubClass.prototype.hasOwnProperty(prop)) {
			delete SubClass.prototype[prop];
		}
	}

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

var Square = extendClass1(Rectangle, function (width) {
	Rectangle.call(this, width, width);
});

var sq = new Square(5);
console.log("Square 넓이:", sq.getArea()); // 25

console.log("\n상속 관계 확인:");
console.log("sq instanceof Square:", sq instanceof Square); // true
console.log("sq instanceof Rectangle:", sq instanceof Rectangle); // true

console.log("==================================================");
