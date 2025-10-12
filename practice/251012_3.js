/* 
Calculator (기본 계산기)
  - static add, subtract
  
ScientificCalculator (공학용 계산기)
  - instance method: power, sqrt
  - Calculator의 static 메서드도 사용 가능
 */
 
 // Calculator: 기본 계산기
function Calculator() {
  // 인스턴스 속성 필요 없음
}

// Static 메서드들
Calculator.add = function(a, b) {
  return a + b;
};

Calculator.subtract = function(a, b) {
  return a - b;
};

// Calculator instance method
Calculator.prototype.clear = function() {
  console.log('Result cleared.');
};

// ScientificCalculator: Calculator 상속
function ScientificCalculator(name) {
  this.name = name; // 계산기 이름
}

// TODO: Calculator 상속 설정
ScientificCalculator.prototype = Object.create(Calculator.prototype);
console.log("🔥 / 251012_3.js:36 / ScientificCalculator:", ScientificCalculator); // [Function: ScientificCalculator]

// 이 줄이 없으면 ScientificCalculator의 인스턴스가 자기 자신을 Calculator의 인스턴스라고 착각하는 문제 발생! (생성자 재설정 과정)
// ScientificCalculator.prototype.constructor = ScientificCalculator;


// Instance 메서드들
ScientificCalculator.prototype.power = function(base, exponent) {
  return Math.pow(base, exponent);
};

ScientificCalculator.prototype.sqrt = function(num) {
  return Math.sqrt(num);
};

// Static 메서드 사용
console.log(Calculator.add(5, 3));           // 8
console.log(Calculator.subtract(10, 4));     // 6

// Instance 메서드 사용
const sciCalc = new ScientificCalculator('Casio');
// sciCalc.clear();
console.log(sciCalc.constructor); // [Function: Calculator] 출력!
console.log(sciCalc.constructor.name); // 'Calculator' 출력!
console.log(sciCalc instanceof ScientificCalculator); // true (이건 여전히 동작!)

console.log(sciCalc.power(2, 3));            // 8
console.log(sciCalc.sqrt(16));               // 4

// 혼합 사용
const result = Calculator.add(sciCalc.power(2, 2), 3);
console.log(result);                         // 7 (4 + 3)