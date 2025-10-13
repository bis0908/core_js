/**
 * 6-2-4. 다중 프로토타입 체인
 *
 * 프로토타입 체인은 기본적으로 1단계(생성자 함수의 prototype)로 구성되지만,
 * __proto__를 연결하는 방법으로 다중 프로토타입 체인을 만들 수 있습니다.
 *
 * 이를 활용하면 Array-like 객체처럼 특정 데이터 타입의 메서드를
 * 사용자 정의 생성자 함수에서도 사용할 수 있게 만들 수 있습니다.
 *
 * 대표적 예시:
 * - arguments 객체 (Array-like)
 * - NodeList 객체 (Array-like)
 *
 * 주의: __proto__는 비표준이므로 실무에서는 Object.create() 또는
 * Object.setPrototypeOf()를 사용하는 것이 권장됩니다.
 */

console.log("=== 6-2-4. 다중 프로토타입 체인 ===");

// Array-like 객체 생성
var Grade = function () {
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < args.length; i++) {
		this[i] = args[i];
	}
	this.length = args.length;
};

var g = new Grade(100, 80);

console.log("Grade 인스턴스:", g); // { 0: 100, 1: 80, length: 2 }
console.log("g.length:", g.length); // 2

// Array 메서드를 사용할 수 없음
console.log("typeof g.push:", typeof g.push); // undefined

console.log("==================================================");

// Grade의 프로토타입을 Array의 인스턴스로 교체
console.log("\n=== 프로토타입 체인 연결 ===");

Grade.prototype = []; // 빈 배열을 프로토타입으로 설정

var g2 = new Grade(100, 80, 90);

console.log("Grade 인스턴스 (프로토타입 연결 후):", g2);
console.log("g2.length:", g2.length); // 3

// Array 메서드 사용 가능
g2.push(95);
console.log("push 후:", g2); // { 0: 100, 1: 80, 2: 90, 3: 95, length: 4 }
console.log("g2.length:", g2.length); // 4

// pop 메서드도 사용 가능
var popped = g2.pop();
console.log("pop 결과:", popped); // 95
console.log("pop 후:", g2); // { 0: 100, 1: 80, 2: 90, length: 3 }

console.log("==================================================");

// 프로토타입 체인 구조 확인
console.log("\n=== 프로토타입 체인 구조 ===");

console.log("g2.__proto__ === Grade.prototype:", g2.__proto__ === Grade.prototype); // true
console.log("Grade.prototype은 배열:", Array.isArray(Grade.prototype)); // true
console.log("Grade.prototype.__proto__ === Array.prototype:", Grade.prototype.__proto__ === Array.prototype); // true

console.log("\n프로토타입 체인:");
console.log("g2 → Grade.prototype (빈 배열) → Array.prototype → Object.prototype → null");

console.log("==================================================");

// Object.create()를 사용한 더 안전한 방법 (ES5)
console.log("\n=== Object.create()를 활용한 프로토타입 체인 ===");

var Score = function () {
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < args.length; i++) {
		this[i] = args[i];
	}
	this.length = args.length;
};

// Object.create()로 Array.prototype을 상속받는 객체 생성
Score.prototype = Object.create(Array.prototype);
Score.prototype.constructor = Score; // constructor 복구

var s = new Score(85, 90, 95);

console.log("Score 인스턴스:", s);
console.log("s.length:", s.length); // 3

s.push(100);
console.log("push 후 s:", s);
console.log("s.length:", s.length); // 4

// 프로토타입 체인 확인
console.log("\ns.__proto__ === Score.prototype:", s.__proto__ === Score.prototype); // true
console.log("Score.prototype.__proto__ === Array.prototype:", Score.prototype.__proto__ === Array.prototype); // true
console.log("s.constructor === Score:", s.constructor === Score); // true

console.log("==================================================");

// 실무 활용: NodeList와 유사한 커스텀 컬렉션
console.log("\n=== 실무 활용: 커스텀 컬렉션 ===");

var Collection = function () {
	Array.prototype.push.apply(this, arguments);
};

Collection.prototype = Object.create(Array.prototype);
Collection.prototype.constructor = Collection;

// 커스텀 메서드 추가
Collection.prototype.sum = function () {
	return this.reduce(function (acc, val) {
		return acc + val;
	}, 0);
};

var numbers = new Collection(10, 20, 30, 40);

console.log("Collection 인스턴스:", numbers);
console.log("numbers.length:", numbers.length); // 4
console.log("numbers.sum():", numbers.sum()); // 100

numbers.push(50);
console.log("push 후 sum():", numbers.sum()); // 150

// Array 메서드와 커스텀 메서드 모두 사용 가능
var doubled = numbers.map(function (n) {
	return n * 2;
});
console.log("map 결과:", doubled); // [20, 40, 60, 80, 100]

console.log("==================================================");
