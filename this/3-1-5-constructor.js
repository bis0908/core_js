/**
 * @fileoverview 3-1-5 생성자 함수 내부에서의 this
 *
 * @description
 * 생성자 함수에서 this가 새로 생성되는 인스턴스를 가리키는 원리를 이해합니다.
 * new 연산자의 동작 방식과 생성자 함수 패턴을 학습합니다.
 *
 * @objectives
 * - 생성자 함수에서 this가 가리키는 대상 이해
 * - new 연산자의 동작 원리 파악
 * - 생성자 함수 패턴과 일반 함수 호출의 차이점 분석
 *
 * @concept
 * new 연산자를 사용하여 함수를 호출하면, 그 함수 내부의 this는 새로 생성되는 인스턴스 객체를 가리킴
 */

/**
 * @example 기본 생성자 함수에서의 this
 * new 연산자로 호출하면 this가 새로 생성되는 인스턴스를 가리킴
 */
var Cat = function (name, age) {
  console.log("생성자 내부 this:", this); // 새로 생성되는 인스턴스

  this.sound = "야옹"; // 고양이 울음소리
  this.name = name;
  this.age = age;

  // 메서드 추가
  this.introduce = function () {
    console.log(
      this.sound + "! 제 이름은 " + this.name + "이고, " + this.age + "살입니다."
    );
  };
};

/**
 * @section 인스턴스 생성과 this 바인딩
 * new 연산자를 통해 생성되는 각 인스턴스는 독립적인 객체
 */
var choco = new Cat("초코", 7);
var nabi = new Cat("나비", 5);

console.log("choco:", choco); // Cat { sound: "야옹", name: "초코", age: 7, introduce: [Function] }
console.log("nabi:", nabi); // Cat { sound: "야옹", name: "나비", age: 5, introduce: [Function] }

choco.introduce();
nabi.introduce();

/**
 * @note new 연산자의 동작 과정
 * 1. 빈 객체를 생성
 * 2. 생성된 객체를 this에 바인딩
 * 3. 생성자 함수 실행 (this에 프로퍼티 추가)
 * 4. 생성된 객체 반환 (명시적 return이 없으면)
 */

/**
 * @warning new 없이 생성자 함수 호출
 * new 없이 호출하면 일반 함수처럼 동작하여 this가 전역객체를 가리킴
 * 이때 의도하지 않은 전역 변수 오염이 발생할 수 있음
 */
var notInstance = Cat("오류", 1); // new 없이 호출
console.log("notInstance:", notInstance); // undefined
console.log("전역에 추가된 프로퍼티들:");
console.log("global.sound:", global.sound); // "야옹" (전역에 추가됨!)
console.log("global.name:", global.name); // "오류"
console.log("global.age:", global.age); // 1

// 전역 오염 정리
delete global.sound;
delete global.name;
delete global.age;
delete global.introduce;

/**
 * @section 생성자 함수에서 명시적 return
 * 객체를 반환하면 this는 무시되고 해당 객체가 반환됨
 * 원시값을 반환하면 무시되고 this가 반환됨
 */

/**
 * @example 객체를 명시적으로 반환하는 생성자
 * return으로 객체를 반환하면 this는 무시됨
 */
var Dog = function (name) {
  this.name = name;
  this.sound = "멍멍";

  // 객체를 명시적으로 반환 - this 무시됨!
  return {
    name: "강제반환",
    sound: "왈왈",
  };
};

/**
 * @example 원시값을 명시적으로 반환하는 생성자
 * return으로 원시값을 반환해도 무시되고 this가 반환됨
 */
var Bird = function (name) {
  this.name = name;
  this.sound = "짹짹";

  // 원시값을 반환 - 무시되고 this가 반환됨
  return "이건 무시됨";
};

var dog = new Dog("바둑이");
var bird = new Bird("참새");

console.log("dog (객체 반환):", dog); // { name: "강제반환", sound: "왈왈" }
console.log("bird (원시값 반환):", bird); // Bird { name: "참새", sound: "짹짹" }

/**
 * @section 실전 생성자 함수 패턴
 * 매개변수 검증, 비공개 변수, 공개 메서드를 활용한 완전한 생성자 함수 구현
 */
var Person = function (name, age) {
  // 매개변수 검증
  if (!name || !age) {
    throw new Error("이름과 나이는 필수입니다!");
  }

  // 인스턴스 프로퍼티
  this.name = name;
  this.age = age;
  this.species = "인간";

  // 비공개 변수 (클로저 활용)
  var birthYear = new Date().getFullYear() - age;

  // 공개 메서드
  this.introduce = function () {
    return "안녕하세요! " + this.name + "입니다. " + this.age + "살이에요.";
  };

  // 비공개 정보에 접근하는 메서드 (클로저 활용)
  this.getBirthYear = function() {
    return birthYear;
  };
};

var person1 = new Person("김철수", 25);
var person2 = new Person("이영희", 30);

console.log("person1:", person1.introduce());
console.log("person1 출생년도:", person1.getBirthYear());
console.log("person2:", person2.introduce());

/**
 * @method instanceof 연산자로 인스턴스 확인
 * 객체가 특정 생성자 함수의 인스턴스인지 확인
 */
console.log("choco instanceof Cat:", choco instanceof Cat); // true
console.log("person1 instanceof Person:", person1 instanceof Person); // true
console.log("person1 instanceof Cat:", person1 instanceof Cat); // false

/**
 * @summary 핵심 포인트
 *
 * 1. new 연산자: this는 새로 생성되는 인스턴스 객체
 * 2. new 없이 호출: this는 전역객체 (위험!)
 * 3. 명시적 객체 반환: this 무시됨
 * 4. 명시적 원시값 반환: 무시되고 this 반환
 * 5. 생성자 함수는 대문자로 시작하는 관례
 *
 * @warning 주의사항
 * - new 없이 생성자 함수를 호출하면 전역 오염 발생
 * - 항상 new 연산자와 함께 사용하거나 방어 코드 작성 필요
 *
 * @pattern 권장 패턴
 * - 생성자 함수명은 대문자로 시작
 * - 매개변수 검증 로직 포함
 * - instanceof로 인스턴스 확인
 */
