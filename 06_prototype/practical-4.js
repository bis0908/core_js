/**
 * practical-4.js: Array-like 객체 구현
 *
 * Array-like 객체란 배열처럼 보이지만 배열이 아닌 객체입니다.
 * - 숫자 인덱스를 가짐 (0, 1, 2, ...)
 * - length 프로퍼티를 가짐
 * - 하지만 Array의 메서드는 사용할 수 없음
 *
 * 대표적 예시: arguments, NodeList, HTMLCollection
 *
 * 이 파일에서는:
 * - Array-like 객체의 특징 이해
 * - Array 메서드를 사용할 수 있게 만드는 방법
 * - 커스텀 Array-like 객체 구현
 * - Array-like를 실제 배열로 변환하는 방법
 */

console.log("=== practical-4: Array-like 객체 구현 ===");

// arguments 객체 확인
console.log("\n=== arguments 객체 (대표적 Array-like) ===");

function showArgs() {
	console.log("arguments:", arguments);
	console.log("arguments.length:", arguments.length);
	console.log("Array.isArray(arguments):", Array.isArray(arguments)); // false

	// 배열처럼 접근은 가능
	console.log("arguments[0]:", arguments[0]);
	console.log("arguments[1]:", arguments[1]);

	// 하지만 배열 메서드는 사용 불가
	try {
		arguments.push("새 요소");
	} catch (e) {
		console.log("에러:", e.message); // arguments.push is not a function
	}
}

showArgs("첫번째", "두번째", "세번째");

console.log("==================================================");

// 기본 Array-like 객체 구현
console.log("\n=== 기본 Array-like 객체 구현 ===");

var ArrayLike = function () {
	// arguments를 인덱스로 할당
	for (var i = 0; i < arguments.length; i++) {
		this[i] = arguments[i];
	}
	this.length = arguments.length;
};

var arrayLike = new ArrayLike("a", "b", "c");

console.log("arrayLike:", arrayLike); // { 0: 'a', 1: 'b', 2: 'c', length: 3 }
console.log("arrayLike[0]:", arrayLike[0]); // a
console.log("arrayLike.length:", arrayLike.length); // 3
console.log("Array.isArray(arrayLike):", Array.isArray(arrayLike)); // false

console.log("==================================================");

// Array 메서드를 빌려 사용하는 방법
console.log("\n=== Array 메서드 빌려 사용하기 ===");

// call/apply를 사용하여 Array 메서드 호출
var arrayLike2 = {
	0: "첫번째",
	1: "두번째",
	2: "세번째",
	length: 3,
};

// Array.prototype 메서드를 빌려 사용
var result1 = Array.prototype.slice.call(arrayLike2, 0, 2);
console.log("slice(0, 2):", result1); // ['첫번째', '두번째']

var result2 = Array.prototype.map.call(arrayLike2, function (item) {
	return item + "!";
});
console.log("map:", result2); // ['첫번째!', '두번째!', '세번째!']

console.log("==================================================");

// Array 메서드를 상속받는 Array-like 객체
console.log("\n=== Array 메서드를 상속받는 Array-like 객체 ===");

var MyArray = function () {
	Array.prototype.push.apply(this, arguments);
};

// Array.prototype을 상속
MyArray.prototype = Object.create(Array.prototype);
MyArray.prototype.constructor = MyArray;

// 커스텀 메서드 추가
MyArray.prototype.first = function () {
	return this[0];
};

MyArray.prototype.last = function () {
	return this[this.length - 1];
};

var myArr = new MyArray(10, 20, 30);

console.log("myArr:", myArr); // MyArray { 0: 10, 1: 20, 2: 30, length: 3 }
console.log("Array.isArray(myArr):", Array.isArray(myArr)); // false (완전한 배열은 아님)

// 하지만 Array 메서드 사용 가능
myArr.push(40);
console.log("push(40) 후:", myArr);
console.log("myArr.length:", myArr.length); // 4

// 커스텀 메서드도 사용 가능
console.log("first():", myArr.first()); // 10
console.log("last():", myArr.last()); // 40

console.log("==================================================");

// Array-like를 실제 배열로 변환하는 방법들
console.log("\n=== Array-like를 실제 배열로 변환 ===");

var arrayLike3 = {
	0: "A",
	1: "B",
	2: "C",
	length: 3,
};

// 방법 1: Array.prototype.slice.call()
var arr1 = Array.prototype.slice.call(arrayLike3);
console.log("방법 1 (slice):", arr1, "| isArray:", Array.isArray(arr1)); // true

// 방법 2: Array.from() (ES6)
var arr2 = Array.from(arrayLike3);
console.log("방법 2 (Array.from):", arr2, "| isArray:", Array.isArray(arr2)); // true

// 방법 3: spread 연산자 (ES6) - length 프로퍼티와 인덱스가 있어야 함
// var arr3 = [...arrayLike3]; // ES5에서는 사용 불가

// 방법 4: 수동 변환
function toArray(arrayLike) {
	var arr = [];
	for (var i = 0; i < arrayLike.length; i++) {
		arr.push(arrayLike[i]);
	}
	return arr;
}

var arr4 = toArray(arrayLike3);
console.log("방법 4 (수동):", arr4, "| isArray:", Array.isArray(arr4)); // true

console.log("==================================================");

// 실무 활용: 커스텀 컬렉션 클래스
console.log("\n=== 실무 활용: 커스텀 컬렉션 클래스 ===");

var Collection = function () {
	// 내부적으로 배열 사용
	this._items = Array.prototype.slice.call(arguments);
};

// 프로토타입 메서드 정의
Collection.prototype.get = function (index) {
	return this._items[index];
};

Collection.prototype.add = function (item) {
	this._items.push(item);
	return this; // 체이닝을 위해
};

Collection.prototype.remove = function (item) {
	var index = this._items.indexOf(item);
	if (index !== -1) {
		this._items.splice(index, 1);
	}
	return this;
};

Collection.prototype.forEach = function (callback) {
	this._items.forEach(callback);
	return this;
};

Collection.prototype.map = function (callback) {
	return new Collection.apply(null, this._items.map(callback));
};

Collection.prototype.filter = function (callback) {
	return new Collection.apply(null, this._items.filter(callback));
};

Collection.prototype.toArray = function () {
	return this._items.slice();
};

Object.defineProperty(Collection.prototype, "length", {
	get: function () {
		return this._items.length;
	},
});

// 사용 예시
var collection = new Collection(1, 2, 3, 4, 5);

console.log("collection.length:", collection.length); // 5
console.log("collection.get(0):", collection.get(0)); // 1

collection.add(6).add(7);
console.log("add 후 length:", collection.length); // 7

var doubled = collection.map(function (n) {
	return n * 2;
});
console.log("map 결과:", doubled.toArray()); // [2, 4, 6, 8, 10, 12, 14]

var filtered = collection.filter(function (n) {
	return n % 2 === 0;
});
console.log("filter 결과:", filtered.toArray()); // [2, 4, 6]

collection.forEach(function (item, index) {
	console.log("forEach: index " + index + " = " + item);
});

console.log("==================================================");

// NodeList 스타일의 Array-like 객체
console.log("\n=== NodeList 스타일 Array-like 객체 ===");

var NodeList = function () {
	this.length = 0;
};

NodeList.prototype.item = function (index) {
	return this[index];
};

NodeList.prototype.add = function (node) {
	this[this.length] = node;
	this.length++;
};

var nodes = new NodeList();
nodes.add({ id: 1, name: "div" });
nodes.add({ id: 2, name: "span" });
nodes.add({ id: 3, name: "p" });

console.log("nodes:", nodes); // { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log("nodes.item(1):", nodes.item(1)); // { id: 2, name: 'span' }

// Array 메서드를 빌려서 순회
Array.prototype.forEach.call(nodes, function (node, index) {
	console.log("Node " + index + ":", node.name);
});

console.log("==================================================");

// 결론
console.log("\n=== 결론: Array-like 객체 ===");
console.log("1. Array-like 객체는 length와 인덱스를 가지지만 배열이 아님");
console.log("2. Array 메서드를 call/apply로 빌려 사용 가능");
console.log("3. 프로토타입 체인으로 Array 메서드를 상속받을 수 있음");
console.log("4. Array.from() 또는 slice.call()로 실제 배열로 변환 가능");
console.log("5. 커스텀 컬렉션 구현 시 유용한 패턴");

console.log("==================================================");
