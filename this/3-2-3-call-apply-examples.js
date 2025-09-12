/**
 * @fileoverview 3-2-3 call / apply 메서드의 활용
 * 
 * @description
 * call과 apply 메서드의 실무 활용 사례들을 종합적으로 학습합니다.
 * 유사배열객체, 생성자 호출, 내장 메서드 활용 등 다양한 패턴을 익힙니다.
 * 
 * @objectives
 * - 유사배열객체에 배열 메서드 적용하기
 * - 생성자 함수 간 상속 구현하기
 * - 여러 인수를 묶어 하나의 배열로 전달하기
 * - 실무에서 자주 사용되는 패턴들 마스터하기
 * 
 * @concept
 * call과 apply를 활용하면 내장 메서드를 다른 객체에 적용하여 강력한 기능 구현 가능
 */

console.log("=== 3-2-3 call / apply 메서드의 활용 ===\n");

// 학습 목표
console.log("🎯 학습 목표:");
console.log("1. 유사배열객체에 배열 메서드 적용하기");
console.log("2. 생성자 함수 간 상속 구현하기");
console.log("3. 여러 인수를 묶어 하나의 배열로 전달하기");
console.log("4. 실무에서 자주 사용되는 패턴들 마스터하기\n");

// ====================================================================
// 활용 사례 1: 유사배열객체에 배열 메서드 적용
// ====================================================================

console.log("🔧 활용 사례 1: 유사배열객체에 배열 메서드 적용\n");

// 유사배열객체 생성
var arrayLikeObj = {
  0: "a",
  1: "b", 
  2: "c",
  length: 3,
};

console.log("1️⃣ 원본 유사배열객체:", arrayLikeObj);

// push 메서드 적용
Array.prototype.push.call(arrayLikeObj, "d");
console.log("push 적용 후:", arrayLikeObj); // {0: "a", 1: "b", 2: "c", 3: "d", length: 4}

// slice로 진짜 배열 변환
var arr = Array.prototype.slice.call(arrayLikeObj);
console.log("slice로 배열 변환:", arr); // ["a", "b", "c", "d"]

// pop, shift 등 다른 메서드들
console.log("\n다른 배열 메서드들 적용:");
var popped = Array.prototype.pop.call(arrayLikeObj);
console.log("pop된 요소:", popped); // "d"
console.log("pop 후 객체:", arrayLikeObj);

var shifted = Array.prototype.shift.call(arrayLikeObj);
console.log("shift된 요소:", shifted); // "a"
console.log("shift 후 객체:", arrayLikeObj);

// arguments 객체를 배열로 변환
console.log("\n2️⃣ arguments 객체 배열 변환:");
function testArguments() {
  console.log("arguments 타입:", typeof arguments);
  console.log("arguments.length:", arguments.length);
  console.log("Array.isArray(arguments):", Array.isArray(arguments));
  
  // 배열로 변환
  var argv = Array.prototype.slice.call(arguments);
  console.log("변환된 배열:", argv);
  console.log("Array.isArray(argv):", Array.isArray(argv));
  
  // 배열 메서드 사용 가능
  argv.forEach(function(arg, index) {
    console.log("  인수 " + index + ":", arg);
  });
}
testArguments("첫번째", "두번째", "세번째", 4, 5);

// NodeList를 배열로 변환 (브라우저 환경 시뮬레이션)
console.log("\n3️⃣ NodeList 변환 (브라우저 환경 시뮬레이션):");
// var nodeList = document.querySelectorAll('div');
// var nodeArray = Array.prototype.slice.call(nodeList);
console.log("브라우저에서 NodeList를 배열로 변환:");
console.log("var nodeArray = Array.prototype.slice.call(nodeList);");

// ====================================================================
// 활용 사례 2: 생성자 내부에서 다른 생성자 호출
// ====================================================================

console.log("\n🏗️  활용 사례 2: 생성자 내부에서 다른 생성자 호출\n");

// 기본 생성자
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
  this.introduce = function() {
    return "안녕하세요, " + this.name + "입니다.";
  };
}

// Person을 상속하는 Student
function Student(name, gender, school) {
  Person.call(this, name, gender); // Person 생성자 호출
  this.school = school;
  this.study = function(subject) {
    return this.name + "이(가) " + subject + "을(를) 공부합니다.";
  };
}

// Person을 상속하는 Employee  
function Employee(name, gender, company) {
  Person.call(this, name, gender); // Person 생성자 호출
  this.company = company;
  this.work = function(task) {
    return this.name + "이(가) " + task + "을(를) 작업합니다.";
  };
}

console.log("4️⃣ 생성자 상속 예제:");
var student = new Student("김학생", "female", "한국대학교");
var employee = new Employee("박직장", "male", "테크회사");

console.log("학생:", student);
console.log("학생 소개:", student.introduce());
console.log("학생 공부:", student.study("자바스크립트"));

console.log("직장인:", employee);  
console.log("직장인 소개:", employee.introduce());
console.log("직장인 업무:", employee.work("프로젝트"));

// ====================================================================
// 활용 사례 3: 여러 인수를 묶어 하나의 배열로 전달
// ====================================================================

console.log("\n📊 활용 사례 3: 여러 인수를 묶어 하나의 배열로 전달\n");

// Math 메서드들에 배열 전달
console.log("5️⃣ Math 메서드와 배열:");
var numbers = [10, 20, 3, 16, 45];
var decimals = [3.7, 2.1, 8.9, 1.4];

console.log("숫자들:", numbers);
console.log("최대값:", Math.max.apply(null, numbers));
console.log("최소값:", Math.min.apply(null, numbers));

console.log("소수들:", decimals);  
console.log("Math.floor 적용:", decimals.map(function(num) {
  return Math.floor(num);
}));

// 배열 합치기에 apply 활용
console.log("\n6️⃣ 배열 합치기:");
var fruits = ["사과", "바나나"];
var vegetables = ["당근", "브로콜리"];
var grains = ["쌀", "보리"];

console.log("과일:", fruits);
console.log("채소:", vegetables);
console.log("곡물:", grains);

// push.apply로 배열들 합치기
Array.prototype.push.apply(fruits, vegetables);
Array.prototype.push.apply(fruits, grains);
console.log("모든 식품:", fruits);

// ====================================================================
// 고급 활용 사례들
// ====================================================================

console.log("\n🚀 고급 활용 사례들\n");

// 함수형 프로그래밍 패턴
console.log("7️⃣ 함수형 프로그래밍 패턴:");
var mapper = {
  transform: function(array, transformFn) {
    return Array.prototype.map.call(array, transformFn);
  },
  filter: function(array, predicateFn) {
    return Array.prototype.filter.call(array, predicateFn);
  },
  reduce: function(array, reducerFn, initial) {
    return Array.prototype.reduce.call(array, reducerFn, initial);
  }
};

var testArray = [1, 2, 3, 4, 5];
console.log("원본 배열:", testArray);
console.log("제곱:", mapper.transform(testArray, function(x) { return x * x; }));
console.log("짝수만:", mapper.filter(testArray, function(x) { return x % 2 === 0; }));
console.log("합계:", mapper.reduce(testArray, function(sum, x) { return sum + x; }, 0));

// 메서드 체이닝 구현
console.log("\n8️⃣ 메서드 체이닝 구현:");
var StringProcessor = function(str) {
  this.value = str;
};

StringProcessor.prototype.upper = function() {
  this.value = this.value.toUpperCase();
  return this;
};

StringProcessor.prototype.reverse = function() {
  this.value = this.value.split('').reverse().join('');
  return this;
};

StringProcessor.prototype.repeat = function(times) {
  this.value = Array(times + 1).join(this.value);
  return this;
};

StringProcessor.prototype.get = function() {
  return this.value;
};

var result = new StringProcessor("hello")
  .upper()
  .reverse()
  .repeat(2)
  .get();

console.log("체이닝 결과:", result);

// 핵심 포인트
console.log("\n💡 핵심 포인트:");
console.log("1. 유사배열객체: slice.call()로 진짜 배열로 변환");
console.log("2. 생성자 상속: call()로 부모 생성자 호출");
console.log("3. 배열 전달: apply()로 배열을 개별 인수로 전개");
console.log("4. Array.prototype 메서드들은 유사배열에도 적용 가능");
console.log("5. this 바인딩과 인수 전달을 동시에 제어 가능\n");

console.log("✅ 3-2-3 call/apply 메서드 활용 학습 완료!\n");