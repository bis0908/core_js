/**
 * 6-2-1. 메서드 오버라이드
 *
 * 인스턴스가 프로토타입과 동일한 이름의 프로퍼티나 메서드를 가지면,
 * 프로토타입의 것이 아닌 인스턴스의 것이 우선적으로 사용됩니다.
 * 이를 메서드 오버라이드(Method Override)라고 합니다.
 *
 * 자바스크립트 엔진은 먼저 인스턴스 자신의 프로퍼티를 검색하고,
 * 없으면 __proto__를 따라 프로토타입 체인을 검색합니다.
 *
 * 인스턴스 메서드에서 프로토타입 메서드를 호출하려면:
 * - Object.getPrototypeOf(instance).method.call(instance)
 * - instance.__proto__.method.call(instance)
 */

console.log("=== 6-2-1. 메서드 오버라이드 ===");

var Person = function (name) {
	this.name = name;
};

// 프로토타입 메서드 정의
Person.prototype.getName = function () {
	return this.name;
};

var iu = new Person("지금");

// 인스턴스 메서드로 오버라이드
iu.getName = function () {
	return "바로 " + this.name;
};

console.log("오버라이드된 메서드 호출:", iu.getName()); // 바로 지금

// 프로토타입의 원본 메서드는 여전히 존재
console.log("프로토타입 메서드 직접 호출:", Person.prototype.getName.call(iu)); // 지금

console.log("==================================================");

// 실용적인 오버라이드 예시: toString 메서드
console.log("\n=== toString 메서드 오버라이드 ===");

var arr = [1, 2, 3];

console.log("기본 toString:", arr.toString()); // 1,2,3
console.log("Array.prototype.toString:", Array.prototype.toString.call(arr)); // 1,2,3
console.log("Object.prototype.toString:", Object.prototype.toString.call(arr)); // [object Array]

// 커스텀 toString 메서드로 오버라이드
arr.toString = function () {
	return this.join("_");
};

console.log("오버라이드된 toString:", arr.toString()); // 1_2_3

// 프로토타입 메서드는 여전히 존재
console.log("Array.prototype.toString 직접 호출:", Array.prototype.toString.call(arr)); // 1,2,3

console.log("==================================================");

// 메서드 오버라이드의 실용적 활용
console.log("\n=== 실용적 활용: 로깅 강화 ===");

var Logger = function (name) {
	this.name = name;
};

Logger.prototype.log = function (message) {
	console.log("[LOG] " + message);
};

var errorLogger = new Logger("ErrorLogger");

// 에러 로거는 에러 전용 메서드로 오버라이드
errorLogger.log = function (message) {
	console.log("[ERROR] " + this.name + ": " + message);
	// 필요시 프로토타입 메서드도 호출 가능
	// Logger.prototype.log.call(this, message);
};

errorLogger.log("시스템 오류 발생"); // [ERROR] ErrorLogger: 시스템 오류 발생

console.log("==================================================");
