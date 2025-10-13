/**
 * 7-2-3. 프로토타입 체이닝 문제 - 값이 있는 배열
 *
 * 프로토타입 배열에 값이 있는 경우,
 * length 삭제 후 push를 사용하면 프로토타입 배열의 length를 참조하게 됩니다.
 *
 * 이 경우 프로토타입 배열의 length(4)를 기준으로 요소가 추가되어,
 * 4번 인덱스에 새로운 값이 추가되고 length가 5가 됩니다.
 * 결과적으로 3번 인덱스는 비어있는 상태가 됩니다.
 */

console.log("=== 7-2-3. 값이 있는 프로토타입 배열의 문제 ===");

var Grade = function () {
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < args.length; i++) {
		this[i] = args[i];
	}
	this.length = args.length;
};

// 프로토타입을 값이 있는 배열로 설정
Grade.prototype = ["a", "b", "c", "d"];
var g = new Grade(100, 80);

console.log("초기 상태:", g); // Grade { 0: 100, 1: 80, length: 2 }
console.log("프로토타입:", Grade.prototype); // ['a', 'b', 'c', 'd']

g.push(90);
console.log("push(90) 후:", g); // Grade { 0: 100, 1: 80, 2: 90, length: 3 }

console.log("\n--- length 프로퍼티 삭제 ---");
delete g.length;
console.log("length 삭제 후 g.length:", g.length); // 4 (프로토타입 배열의 length)

g.push(70);
console.log("push(70) 후:", g); // Grade { 0: 100, 1: 80, 2: 90, 4: 70, length: 5 }
console.log("문제: 3번 인덱스가 비어있고, 4번 인덱스에 추가되었습니다!");
console.log("g[3]:", g[3]); // undefined (인스턴스에는 없고 프로토타입에는 'd')

console.log("==================================================");
