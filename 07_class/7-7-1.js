/**
 * 7-7-1. ES5 vs ES6 클래스 문법 비교
 *
 * ES6(ES2015)에서 도입된 class 키워드를 사용하면
 * 훨씬 직관적이고 깔끔하게 클래스를 정의할 수 있습니다.
 *
 * ES5 vs ES6 비교:
 * 1. 생성자 함수 → class 키워드
 * 2. 함수 표현식 → constructor 메서드
 * 3. prototype 명시 → 클래스 본문에 메서드 정의
 * 4. 함수 프로퍼티 → static 키워드
 *
 * 주의: ES6 class는 문법적 설탕(Syntactic Sugar)입니다.
 * 내부적으로는 프로토타입 기반 상속을 사용합니다.
 */

console.log("=== 7-7-1. ES5 vs ES6 클래스 문법 비교 ===");

// ========== ES5 방식 ==========
console.log("\n[ ES5 방식 ]");

var ES5 = function (name) {
	this.name = name;
};

// 스태틱 메서드
ES5.staticMethod = function () {
	return this.name + " staticMethod";
};

// 프로토타입 메서드
ES5.prototype.method = function () {
	return this.name + " method";
};

var es5Instance = new ES5("es5");
console.log(ES5.staticMethod()); // es5 staticMethod
console.log(es5Instance.method()); // es5 method

// ========== ES6 방식 ==========
console.log("\n[ ES6 방식 ]");

var ES6 = class {
	constructor(name) {
		this.name = name;
	}

	// static 키워드로 스태틱 메서드 정의
	static staticMethod() {
		return this.name + " staticMethod";
	}

	// 프로토타입 메서드
	method() {
		return this.name + " method";
	}
};

var es6Instance = new ES6("es6");
console.log(ES6.staticMethod()); // es6 staticMethod
console.log(es6Instance.method()); // es6 method

console.log("\nES6 class의 장점:");
console.log("- 더 직관적이고 읽기 쉬운 문법");
console.log("- constructor가 명확히 구분됨");
console.log("- static 키워드로 스태틱 메서드 정의");
console.log("- 하지만 내부적으로는 프로토타입 기반!");

console.log("==================================================");
