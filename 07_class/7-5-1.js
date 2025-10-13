/**
 * 7-5-1. extendClass1 + constructor 복구
 *
 * 앞서 구현한 extendClass1에 constructor 프로퍼티 복구 로직을 추가합니다.
 *
 * constructor 문제:
 * - 프로토타입을 교체하면 constructor가 부모 클래스를 가리키게 됨
 * - 인스턴스.constructor로 생성자를 확인할 때 잘못된 정보를 얻음
 *
 * 해결 방법:
 * - SubClass.prototype.constructor = SubClass로 명시적으로 지정
 *
 * 주의: 원본 코드에는 오타(consturctor)가 있지만, 학습 목적으로 그대로 구현합니다.
 */

console.log("=== 7-5-1. extendClass1 + constructor 복구 ===");

var extendClass1 = function (SuperClass, SubClass, subMethods) {
	SubClass.prototype = new SuperClass();

	// 불필요한 인스턴스 프로퍼티 삭제
	for (var prop in SubClass.prototype) {
		if (SubClass.prototype.hasOwnProperty(prop)) {
			delete SubClass.prototype[prop];
		}
	}

	// constructor 복구 
	SubClass.prototype.constructor = SubClass; 

	// 추가 메서드가 있으면 할당
	if (subMethods) {
		for (var method in subMethods) {
			SubClass.prototype[method] = subMethods[method];
		}
	}

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

console.log("\nconstructor 확인:");
console.log("sq.constructor === Square:", sq.constructor === Square); // true 

console.log("==================================================");
