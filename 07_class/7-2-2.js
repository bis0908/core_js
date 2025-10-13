/**
 * 7-2-2. 프로토타입 체이닝 문제 - length 삭제
 *
 * Grade 인스턴스에서 push를 사용하면 정상 동작하지만,
 * length 프로퍼티를 삭제한 후 push를 사용하면 예상과 다른 결과가 나옵니다.
 *
 * push 메서드는 length 프로퍼티를 기준으로 요소를 추가합니다.
 * length가 없으면 프로토타입 체이닝을 통해 빈 배열의 length(0)을 참조하게 되어,
 * 기존 요소가 덮어씌워지는 문제가 발생합니다.
 */

console.log("=== 7-2-2. length 삭제 시 프로토타입 체이닝 문제 ===");

var Grade = function () {
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < args.length; i++) {
		this[i] = args[i];
	}
	this.length = args.length;
};
Grade.prototype = [];
var g = new Grade(100, 80);

console.log("초기 상태:", g); // Grade { 0: 100, 1: 80, length: 2 }

g.push(90);
console.log("push(90) 후:", g); // Grade { 0: 100, 1: 80, 2: 90, length: 3 }

console.log("\n--- length 프로퍼티 삭제 ---");
delete g.length;
console.log("length 삭제 후 g.length:", g.length); // 0 (프로토타입 배열의 length)

g.push(70);
console.log("push(70) 후:", g); // Grade { 0: 70, 1: 80, 2: 90, length: 1 }
console.log("문제: 0번 인덱스가 70으로 덮어씌워졌습니다!");

console.log("==================================================");
