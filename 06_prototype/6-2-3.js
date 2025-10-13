/**
 * 6-2-3. 객체 전용 메서드의 예외사항
 *
 * Object.prototype에 메서드를 추가하면 모든 객체가 해당 메서드를 사용할 수 있습니다.
 * 하지만 이는 for...in 문에서 열거 가능한 프로퍼티로 나타나므로 주의가 필요합니다.
 *
 * 안전하게 객체 고유 프로퍼티만 처리하려면 hasOwnProperty()를 사용해야 합니다.
 *
 * ES5 이후에는 Object.keys(), Object.values(), Object.entries() 등의
 * 정적 메서드를 사용하는 것이 더 안전합니다.
 */

console.log("=== 6-2-3. 객체 전용 메서드의 예외사항 ===");

// Object.prototype에 메서드 추가 (예제 목적)
Object.prototype.getEntries = function () {
	var res = [];
	for (var prop in this) {
		// hasOwnProperty로 프로토타입 체인의 프로퍼티 제외
		if (this.hasOwnProperty(prop)) {
			res.push([prop, this[prop]]);
		}
	}
	return res;
};

var data = [
	["object", { a: 1, b: 2, c: 3 }],
	["number", 345],
	["string", "abc"],
	["boolean", false],
	["func", function () {}],
	["array", [1, 2, 3]],
];

console.log("\n=== getEntries 메서드 테스트 ===");
data.forEach(function (datum) {
	console.log(datum[0] + ":", JSON.stringify(datum[1].getEntries()));
});

console.log("==================================================");

// hasOwnProperty의 중요성
console.log("\n=== hasOwnProperty의 중요성 ===");

var obj = {
	name: "홍길동",
	age: 30,
};

console.log("--- hasOwnProperty 없이 for...in ---");
for (var key in obj) {
	console.log(key + ":", obj[key]);
	// getEntries 메서드도 출력됨 (Object.prototype에 추가했으므로)
}

console.log("\n--- hasOwnProperty 사용 ---");
for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
		console.log(key + ":", obj[key]);
		// 객체 자체의 프로퍼티만 출력
	}
}

console.log("==================================================");

// Object 정적 메서드 활용 (권장 방식)
console.log("\n=== Object 정적 메서드 활용 (ES5+) ===");

var person = {
	name: "김철수",
	age: 25,
	city: "서울",
};

// Object.keys() - 객체 자신의 열거 가능한 프로퍼티 이름만 배열로 반환
console.log("Object.keys():", Object.keys(person));

// Object.keys()를 활용한 안전한 순회
Object.keys(person).forEach(function (key) {
	console.log(key + ":", person[key]);
});

console.log("==================================================");

// 프로토타입 체인의 메서드 확인
console.log("\n=== 프로토타입 메서드 확인 ===");

var arr = [1, 2, 3];

console.log("arr.hasOwnProperty('length'):", arr.hasOwnProperty("length")); // true (인스턴스 프로퍼티)
console.log("arr.hasOwnProperty('push'):", arr.hasOwnProperty("push")); // false (프로토타입 메서드)
console.log("arr.hasOwnProperty('getEntries'):", arr.hasOwnProperty("getEntries")); // false (Object.prototype 메서드)

// 하지만 모두 접근 가능
console.log("arr.length:", arr.length);
console.log("typeof arr.push:", typeof arr.push);
console.log("typeof arr.getEntries:", typeof arr.getEntries);

console.log("==================================================");

// 정리: Object.prototype에 메서드를 추가하면 안 되는 이유
console.log("\n=== 결론: Object.prototype 수정의 위험성 ===");

console.log("1. for...in 순회 시 의도하지 않은 프로퍼티가 나타남");
console.log("2. 다른 라이브러리와의 충돌 가능성");
console.log("3. 예상치 못한 동작 발생 가능");
console.log("\n권장 사항:");
console.log("- Object.keys(), Object.values(), Object.entries() 사용");
console.log("- hasOwnProperty()로 안전하게 검사");
console.log("- 필요시 별도 유틸리티 함수 작성");

// Object.prototype에 추가한 메서드 제거 (예제 정리)
delete Object.prototype.getEntries;

console.log("==================================================");
