/**
 * 6-1-2. constructor 프로퍼티
 *
 * constructor 프로퍼티는 생성자 함수를 가리키는 프로퍼티입니다.
 * 인스턴스의 __proto__.constructor 또는 인스턴스.constructor를 통해 접근할 수 있습니다.
 *
 * constructor 프로퍼티를 통해 인스턴스로부터 생성자 함수에 접근할 수 있으며,
 * 이를 이용해 새로운 인스턴스를 동적으로 생성할 수 있습니다.
 *
 * 주의: constructor 프로퍼티는 변경 가능하지만, 실제 인스턴스의 타입은 변경되지 않습니다.
 */

console.log("=== 6-1-2. constructor 프로퍼티 ===");

// 배열의 constructor 확인
var arr = [1, 2];
console.log("Array.prototype.constructor === Array:", Array.prototype.constructor === Array); // true
console.log("arr.__proto__.constructor === Array:", arr.__proto__.constructor === Array); // true
console.log("arr.constructor === Array:", arr.constructor === Array); // true

// constructor를 통한 새로운 인스턴스 생성
var arr2 = new arr.constructor(3, 4);
console.log("arr2:", arr2); // [3, 4]

console.log("==================================================");

// constructor 변경 시 주의사항
console.log("\n=== constructor 변경 시 동작 ===");

var NewConstructor = function () {
	console.log("this is new constructor!");
};

var dataTypes = [
	1, // Number
	"test", // String
	true, // Boolean
	{}, // Object
	[], // Array
	function () {}, // Function
	/test/, // RegExp
	new Number(), // Number 객체
	new String(), // String 객체
	new Boolean(), // Boolean 객체
	new Object(), // Object
	new Array(), // Array
	new Function(), // Function
	new RegExp(), // RegExp
	new Date(), // Date
	new Error(), // Error
];

dataTypes.forEach(function (d) {
	var originalConstructor = d.constructor.name;
	d.constructor = NewConstructor;
	var isInstance = d instanceof NewConstructor;
	console.log("원래 타입:", originalConstructor, "| instanceof NewConstructor:", isInstance);
	// constructor를 변경해도 instanceof는 false를 반환
	// 이는 실제 프로토타입 체인이 변경되지 않았기 때문
});

console.log("==================================================");

// constructor를 활용한 다양한 인스턴스 생성 방법
console.log("\n=== constructor를 통한 인스턴스 생성 방법들 ===");

var Person = function (name) {
	this.name = name;
};

var p1 = new Person("사람1");
var p1Proto = Object.getPrototypeOf(p1);
var p2 = new Person.prototype.constructor("사람2");
var p3 = new p1Proto.constructor("사람3");
var p4 = new p1.__proto__.constructor("사람4");
var p5 = new p1.constructor("사람5");

[p1, p2, p3, p4, p5].forEach(function (p) {
	console.log(p, "| instanceof Person:", p instanceof Person);
});

console.log("==================================================");
