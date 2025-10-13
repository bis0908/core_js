/**
 * 7-7-2. ES6 extends와 super 키워드
 *
 * ES6에서는 extends 키워드로 간단하게 클래스 상속을 구현할 수 있습니다.
 * super 키워드를 사용하여 부모 클래스의 생성자와 메서드에 접근합니다.
 *
 * ES6 상속의 특징:
 * 1. extends 키워드로 상속 관계 명시
 * 2. super() - 부모 클래스의 생성자 호출 (필수!)
 * 3. super.method() - 부모 클래스의 메서드 호출
 * 4. constructor 자동으로 올바르게 설정됨
 *
 * 주의사항:
 * - 자식 클래스의 constructor에서 this를 사용하기 전에 반드시 super()를 호출해야 함
 * - super()를 호출하지 않으면 ReferenceError 발생
 */

console.log("=== 7-7-2. ES6 extends와 super 키워드 ===");

// 부모 클래스
var Rectangle = class {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	getArea() {
		return this.width * this.height;
	}
};

// 자식 클래스 (extends로 상속)
var Square = class extends Rectangle {
	constructor(width) {
		// super()로 부모 생성자 호출 (필수!)
		super(width, width);
	}

	getArea() {
		// super.method()로 부모 메서드 호출
		console.log("size is :", super.getArea());
	}
};

var rect = new Rectangle(3, 4);
console.log("Rectangle 넓이:", rect.getArea()); // 12

var sq = new Square(5);
sq.getArea(); // size is : 25

console.log("\n상속 관계 확인:");
console.log("sq instanceof Square:", sq instanceof Square); // true
console.log("sq instanceof Rectangle:", sq instanceof Rectangle); // true
console.log("sq.constructor === Square:", sq.constructor === Square); // true

console.log("\nES6 상속의 장점:");
console.log("- extends 키워드로 상속 관계 명확");
console.log("- super 키워드로 부모 접근 간편");
console.log("- constructor 자동 설정");
console.log("- 코드가 훨씬 간결하고 읽기 쉬움");

console.log("\nES5와 비교:");
console.log("- ES5: extendClass 헬퍼, call, Object.create 등 복잡");
console.log("- ES6: extends와 super만으로 깔끔하게 해결!");

console.log("==================================================");
