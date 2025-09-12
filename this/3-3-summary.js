/**
 * @fileoverview 3-3 this 바인딩 규칙 정리
 * 
 * @description
 * 03장에서 학습한 모든 this 바인딩 규칙들을 체계적으로 정리합니다.
 * 우선순위와 실무 활용 가이드라인을 종합적으로 제시합니다.
 * 
 * @objectives
 * - this 바인딩 4가지 규칙 마스터
 * - 바인딩 우선순위 이해
 * - 환경별 this 차이점 인지
 * - 실무 가이드라인 습득
 * 
 * @summary
 * JavaScript this 바인딩의 완전한 이해를 위한 종합 정리
 */

/**
 * @congratulations 03장 this 학습 완료!
 * JavaScript에서 가장 헷갈리는 this를 마스터하셨습니다!
 */

/**
 * @section this 바인딩 4가지 규칙
 * JavaScript에서 this가 결정되는 모든 경우를 포괄하는 4가지 규칙
 */

console.log("1️⃣ 기본 바인딩 (Default Binding)");
console.log("   - 일반 함수 호출");
console.log("   - this → 전역 객체 (Node.js: global, 브라우저: window)");
console.log("   - 예: func() → this는 전역객체");

console.log("\n2️⃣ 암시적 바인딩 (Implicit Binding)");
console.log("   - 메서드로서 호출");
console.log("   - this → 점(.) 앞의 객체");
console.log("   - 예: obj.method() → this는 obj");

console.log("\n3️⃣ 명시적 바인딩 (Explicit Binding)");
console.log("   - call, apply, bind 사용");
console.log("   - this → 명시적으로 지정한 객체");
console.log("   - 예: func.call(obj) → this는 obj");

console.log("\n4️⃣ new 바인딩 (New Binding)");
console.log("   - 생성자 함수로 호출");
console.log("   - this → 새로 생성되는 인스턴스");
console.log("   - 예: new Func() → this는 새 객체\n");

// ====================================================================
// 바인딩 우선순위
// ====================================================================

console.log("🏆 this 바인딩 우선순위\n");
console.log("높은 순위부터:");
console.log("1순위: new 바인딩 (new 연산자로 생성자 함수 호출)");
console.log("2순위: 명시적 바인딩 (call, apply, bind)"); 
console.log("3순위: 암시적 바인딩 (메서드 호출)");
console.log("4순위: 기본 바인딩 (일반 함수 호출, 전역객체)\n");

// 우선순위 실증 예제
console.log("🧪 우선순위 실증 예제:");

var priorityObj1 = {
  name: "객체1",
  foo: function() {
    console.log("this.name:", this.name);
    return this.name;
  },
};

var priorityObj2 = { name: "객체2" };

// 3순위: 암시적 바인딩
console.log("\n3순위 - 암시적 바인딩:");
priorityObj1.foo(); // "객체1"

// 2순위: 명시적 바인딩이 암시적 바인딩보다 우선
console.log("\n2순위 > 3순위 - 명시적이 암시적보다 우선:");
priorityObj1.foo.call(priorityObj2); // "객체2"

// 1순위: new 바인딩이 가장 우선순위가 높음
function priorityFoo(something) {
  this.a = something;
  this.name = "new로생성";
}

var bindObj = { name: "바인드객체" };
var bar = priorityFoo.bind(bindObj);
bar(2);
console.log("\nbind 실행 후 bindObj:", bindObj); // a: 2 추가됨

console.log("\n1순위 > 2순위 - new가 bind보다 우선:");
var baz = new bar(3);
console.log("new 실행 후 bindObj.a:", bindObj.a); // 2 (변화 없음)
console.log("new로 생성된 객체 baz:", baz); // { a: 3, name: "new로생성" }

// ====================================================================
// 환경별 this 차이점
// ====================================================================

console.log("\n🌍 환경별 this 차이점\n");
console.log("📱 Node.js 환경:");
console.log("   - 전역 this: module.exports (빈 객체 {})");
console.log("   - 진짜 전역객체: global");
console.log("   - var 선언: 모듈 스코프에 머무름");
console.log("   - 전역 this ≠ global 객체");

console.log("\n🌐 브라우저 환경:");
console.log("   - 전역 this: window 객체");
console.log("   - var 선언: window 프로퍼티로 추가");
console.log("   - 전역 this === window 객체");

// ====================================================================
// 실무 가이드라인
// ====================================================================

console.log("\n💼 실무 가이드라인\n");

console.log("✅ 권장사항:");
console.log("1. 함수 내에서 this 사용 시 항상 어떤 객체를 가리킬지 명확히 하기");
console.log("2. 콜백 함수에서 상위 this 접근이 필요하면:");
console.log("   - bind() 사용");
console.log("   - thisArg 매개변수 활용");
console.log("   - self = this 패턴 사용");
console.log("3. 생성자 함수는 항상 new와 함께 사용");
console.log("4. 메서드를 변수에 할당할 때 this 바인딩 주의");

console.log("\n⚠️  주의사항:");
console.log("1. new 없이 생성자 함수 호출하면 전역 오염");
console.log("2. 이벤트 핸들러에서 this는 이벤트 대상 엘리먼트");
console.log("3. strict mode에서 기본 바인딩 시 this는 undefined");
console.log("4. 화살표 함수(ES6)는 렉시컬 this 사용 (상위 스코프 this)");

console.log("\n❌ 피해야 할 패턴:");
console.log("1. 내부함수에서 this 직접 사용 (우회 방법 사용)");
console.log("2. 콜백에서 this 직접 사용 (바인딩 없이)");
console.log("3. 메서드를 다른 변수에 할당 후 호출 (this 손실)");

// ====================================================================
// 문제 해결 체크리스트
// ====================================================================

console.log("\n🔧 this 문제 해결 체크리스트\n");

console.log("this 값이 예상과 다를 때 확인사항:");
console.log("□ 함수가 어떤 방식으로 호출되었는가?");
console.log("   - 일반 함수: func()");
console.log("   - 메서드: obj.func()");
console.log("   - 생성자: new func()");
console.log("   - 명시적: func.call/apply/bind()");

console.log("\n□ 내부함수나 콜백 함수인가?");
console.log("   → bind, thisArg, self 패턴 사용 고려");

console.log("\n□ 메서드를 변수에 할당했는가?");
console.log("   → 할당된 변수로 호출하면 this가 전역객체");

console.log("\n□ 화살표 함수를 사용했는가? (ES6)");
console.log("   → 상위 스코프의 this 사용");

// ====================================================================
// 학습 완료 및 다음 단계
// ====================================================================

console.log("\n🎓 학습 완료 현황\n");

console.log("✅ 마스터한 개념들:");
console.log("   ✓ 전역 공간에서의 this");
console.log("   ✓ 메서드 vs 함수 호출에서의 this");
console.log("   ✓ 내부함수 this 문제와 해결방법");
console.log("   ✓ 콜백 함수에서의 this");
console.log("   ✓ 생성자 함수에서의 this");
console.log("   ✓ call, apply, bind 메서드");
console.log("   ✓ thisArg 매개변수 활용");
console.log("   ✓ 화살표 함수의 특성 (ES6)");
console.log("   ✓ this 바인딩 우선순위");

console.log("\n🚀 다음 학습 단계:");
console.log("   → 04장: 콜백 함수");
console.log("   → 05장: 클로저");
console.log("   → 06장: 프로토타입");
console.log("   → 07장: 클래스");

// ====================================================================
// 마무리 메시지
// ====================================================================

console.log("\n" + "=".repeat(60));
console.log("🎉 축하합니다! this 완전 정복! 🎉");
console.log("=".repeat(60));

console.log("\n💪 이제 여러분은:");
console.log("   • JavaScript에서 가장 헷갈리는 this를 정복했습니다");
console.log("   • 어떤 상황에서도 this 값을 정확히 예측할 수 있습니다");
console.log("   • 실무에서 this 관련 버그를 해결할 수 있습니다");
console.log("   • this 바인딩을 자유자재로 활용할 수 있습니다");

console.log("\n🌟 다음 학습을 위한 준비:");
console.log("   this와 함께 자주 사용되는 콜백 함수에 대해 배워봅시다!");
console.log("   콜백 함수에서 this를 더 깊이 있게 다룰 예정입니다.");

console.log("\n✨ 계속해서 좋은 학습되세요! ✨\n");

console.log("✅ 3-3 this 바인딩 규칙 정리 완료!\n");