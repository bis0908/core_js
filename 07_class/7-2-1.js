/**
 * 7-2-1. 클래스에 있는 값이 인스턴스의 동작에 영향을 주지 않는 경우
 *
 * Grade 생성자 함수를 만들고, 프로토타입을 빈 배열로 설정합니다.
 * 이렇게 하면 Grade 인스턴스가 배열처럼 동작할 수 있습니다.
 *
 * 이 예제에서는 프로토타입이 빈 배열이므로,
 * 아직 프로토타입 체이닝 문제가 드러나지 않습니다.
 */

console.log("=== 7-2-1. 배열을 프로토타입으로 사용하는 경우 ===");

var Grade = function () {
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < args.length; i++) {
		this[i] = args[i];
	}
	this.length = args.length;
};

// 프로토타입을 빈 배열로 설정
Grade.prototype = [];

var g = new Grade(100, 80);

console.log(g); // Grade { 0: 100, 1: 80, length: 2 }
console.log("g의 length:", g.length); // 2
console.log("g는 배열의 메서드를 사용할 수 있나요?");
console.log("g.push는 함수인가요?", typeof g.push === "function"); // true

console.log("==================================================");
