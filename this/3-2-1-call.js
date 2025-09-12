/**
 * @fileoverview 3-2-1 call 메서드
 *
 * @description
 * Function.prototype.call을 사용하여 this를 명시적으로 바인딩하는 방법을 학습합니다.
 * call 메서드의 기본 사용법과 다양한 활용 사례를 이해합니다.
 *
 * @objectives
 * - call 메서드의 기본 문법과 동작 원리 학습
 * - this 바인딩과 인수 전달 방식 이해
 * - 메서드 호출과 call 호출의 차이점 파악
 *
 * @concept
 * call 메서드를 사용하면 함수를 즉시 실행하면서 this를 명시적으로 지정할 수 있음
 */

/**
 * @syntax call 메서드 기본 문법
 * 함수.call(thisArg, arg1, arg2, ...)
 * @param {Object} thisArg - this로 바인딩할 객체
 * @param {*} arg1, arg2, ... - 함수에 전달할 인수들
 */

/**
 * @example call 메서드 기본 사용
 * 동일한 함수를 일반 호출과 call 호출로 비교
 */
var funcForCall = function (a, b, c) {
  console.log("this:", this, "a:", a, "b:", b, "c:", c);
};

funcForCall(1, 2, 3); // this는 전역객체

funcForCall.call({ x: 1 }, 4, 5, 6); // this는 {x:1}, a=4, b=5, c=6

/**
 * @example 메서드에서 call 사용
 * 기존 메서드를 다른 객체의 컨텍스트에서 실행
 */
var objForCall = {
  a: 1,
  name: "원본객체",
  method: function (x, y) {
    console.log("this.name:", this.name, "this.a:", this.a, "x:", x, "y:", y);
  },
};

var anotherObj = {
  a: 4,
  name: "다른객체",
};

objForCall.method(2, 3); // this는 objForCall

objForCall.method.call(anotherObj, 5, 6); // this는 anotherObj

/**
 * @section call을 사용한 함수 재사용
 * 하나의 함수를 여러 객체에서 재사용할 수 있는 강력한 패턴
 */
var greet = function (greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
};

var person1 = { name: "김철수" };
var person2 = { name: "이영희" };
var person3 = { name: "박민수" };

greet.call(person1, "안녕하세요", "!");
greet.call(person2, "반갑습니다", "~");
greet.call(person3, "좋은 아침", ".");

/**
 * @section 다른 객체의 메서드 빌려쓰기
 * 객체의 메서드를 다른 객체에서 빌려서 사용하는 패턴
 */
var calculator = {
  add: function (a, b) {
    console.log(this.name + "에서 계산:", a + "+" + b + "=", a + b);
    return a + b;
  },
  multiply: function (a, b) {
    console.log(this.name + "에서 계산:", a + "×" + b + "=", a * b);
    return a * b;
  },
};

var mathProcessor = { name: "수학처리기" };
var simpleCalc = { name: "간단계산기" };

calculator.add.call(mathProcessor, 10, 20);
calculator.multiply.call(simpleCalc, 3, 7);

/**
 * @section 생성자 함수에서 call 사용
 * 상속과 비슷한 효과를 위해 다른 생성자의 초기화 로직을 재사용
 */
/**
 * @constructor Animal 생성자 함수
 * 기본 동물 속성과 메서드를 정의
 */
function Animal(name, sound) {
  this.name = name;
  this.sound = sound;
  this.speak = function () {
    console.log(this.name + ": " + this.sound);
  };
}

/**
 * @constructor Dog 생성자 함수
 * Animal 생성자를 call로 호출하여 상속과 비슷한 효과 구현
 */
function Dog(name, breed) {
  // Animal 생성자를 현재 인스턴스에서 호출
  Animal.call(this, name, "멍멍");
  this.breed = breed;
  this.getInfo = function () {
    console.log("이름: " + this.name + ", 품종: " + this.breed + ", 소리: " + this.sound);
  };
}

var myDog = new Dog("바둑이", "진돗개");
myDog.speak();
myDog.getInfo();

/**
 * @section call 체이닝 활용
 * 여러 메서드를 순차적으로 호출하면서 this를 유지하는 패턴
 */
var processor = {
  step1: function(data) {
    console.log("1단계 처리:", data);
    return data + "-step1";
  },
  step2: function(data) {
    console.log("2단계 처리:", data);
    return data + "-step2";
  },
  step3: function(data) {
    console.log("3단계 처리:", data);
    return data + "-step3";
  },
};

var context = { name: "처리기" };
var result1 = processor.step1.call(context, "초기데이터");
var result2 = processor.step2.call(context, result1);
var result3 = processor.step3.call(context, result2);
console.log("최종 결과:", result3);

/**
 * @summary 핵심 포인트
 *
 * 1. call은 함수를 즉시 실행하며 this를 명시적으로 지정
 * 2. 인수는 쉼표로 구분하여 개별적으로 전달
 * 3. 다른 객체의 메서드를 빌려쓸 때 유용
 * 4. 생성자 함수에서 다른 생성자를 호출할 때 활용
 * 5. 함수의 재사용성을 크게 향상시킴
 *
 * @advantages call 메서드의 장점
 * - 즉시 실행: 호출과 동시에 실행됨
 * - 인수 명확성: 각 인수가 별도 매개변수로 전달
 * - 유연성: 어떤 객체에도 함수를 적용 가능
 * - 상속 패턴: 생성자 함수 결합에 적합
 *
 * @pattern 활용 패턴
 * - 메서드 빌려쓰기: obj1.method.call(obj2)
 * - 생성자 체이닝: Parent.call(this, args)
 * - 함수 재사용: func.call(context, args)
 */
