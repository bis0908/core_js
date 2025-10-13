/**
 * 7-6-1. super 메서드 구현
 *
 * 상위 클래스의 메서드나 생성자에 접근할 수 있는 super 메서드를 추가합니다.
 *
 * super 메서드의 동작:
 * 1. super() - 인자 없이 호출: 상위 클래스의 생성자 함수를 반환
 * 2. super('methodName') - 메서드명 전달: 상위 클래스의 해당 메서드를 반환
 *
 * 사용 예시:
 * - this.super()(width, width) → Rectangle 생성자 호출
 * - this.super('getArea')() → Rectangle의 getArea 메서드 호출
 *
 * 주의사항:
 * - super는 함수를 반환하므로, 실행하려면 ()를 한 번 더 붙여야 함
 * - this 바인딩을 위해 클로저를 사용
 */

console.log("=== 7-6-1. super 메서드 구현 ===");

var extendClass = function (SuperClass, SubClass, subMethods) {
	SubClass.prototype = Object.create(SuperClass.prototype);
	SubClass.prototype.constructor = SubClass;

	// super 메서드 추가
	SubClass.prototype.super = function (propName) {
		var self = this; // this 바인딩 보존

		// 인자가 없으면 부모 생성자 반환
		if (!propName) {
			return function () {
				SuperClass.apply(self, arguments);
			};
		}

		// 부모 프로토타입에서 프로퍼티 가져오기
		var prop = SuperClass.prototype[propName];

		// 함수가 아니면 값 그대로 반환
		if (typeof prop !== "function") return prop;

		// 함수면 this가 바인딩된 함수 반환
		return function () {
			return prop.apply(self, arguments);
		};
	};

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

var Square = extendClass(
	Rectangle,
	function (width) {
		// super 사용 (1): 부모 생성자 호출
		this.super()(width, width);
	},
	{
		getArea: function () {
			// super 사용 (2): 부모 메서드 호출
			console.log("size is :", this.super("getArea")());
		},
	},
);

var sq = new Square(10);
sq.getArea(); // size is : 100
console.log(sq.super("getArea")()); // 100

console.log("\nsuper 메서드의 장점:");
console.log("- 부모 클래스의 메서드를 명시적으로 호출 가능");
console.log("- 메서드 오버라이딩 시 부모 메서드 재사용 가능");

console.log("==================================================");
