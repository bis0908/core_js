/**
 * @fileoverview 03장 this - 메인 인덱스 파일
 * 
 * @description
 * 모든 this 관련 학습 파일들을 순서대로 실행합니다.
 * 전체 학습 과정을 체계적으로 안내하고 진행 상황을 표시합니다.
 * 
 * @overview
 * JavaScript에서 가장 헷갈리는 개념인 this를 완전 정복하기 위한 전체 학습 가이드
 * 
 * @structure
 * - 3-1: 상황에 따라 달라지는 this
 * - 3-2: 명시적으로 this를 바인딩하는 방법
 * - 3-3: 전체 정리 및 실습
 */

/**
 * @title 코어 자바스크립트 - 03장: this 학습 가이드
 * JavaScript에서 가장 헷갈리는 개념인 this를 완전 정복하기 위한 학습 가이드
 */

/**
 * @summary 03장 학습 개요
 * • this는 실행 컨텍스트가 생성될 때 함께 결정됩니다
 * • 함수를 호출하는 방법에 따라 this가 달라집니다
 * • 명시적으로 this를 바인딩하는 방법들을 배웁니다
 * • 실무에서 자주 마주치는 this 문제들을 해결합니다
 */

/**
 * @contents 학습 목차
 */
console.log("3-1. 상황에 따라 달라지는 this");
console.log("  3-1-1. 전역 공간에서의 this");
console.log("  3-1-2. 메서드로서 호출할 때의 this");
console.log("  3-1-3. 함수로서 호출할 때의 this");
console.log("  3-1-4. 콜백 함수 호출 시의 this");
console.log("  3-1-5. 생성자 함수 내부에서의 this");
console.log("3-2. 명시적으로 this를 바인딩하는 방법");
console.log("  3-2-1. call 메서드");
console.log("  3-2-2. apply 메서드");
console.log("  3-2-3. call / apply 메서드의 활용");
console.log("  3-2-4. bind 메서드");
console.log("  3-2-5. 화살표 함수의 예외사항");
console.log("  3-2-6. 별도의 인자로 this를 받는 경우");
console.log("3-3. 정리");
console.log("실습. 종합 실습 문제\n");

// 학습 방법 안내
console.log("📋 학습 방법:");
console.log("1. 각 파일을 순서대로 실행하여 개념을 학습합니다");
console.log("2. 예제 코드를 직접 실행해보며 결과를 확인합니다");
console.log("3. 실습 문제를 통해 학습한 내용을 점검합니다");
console.log("4. 궁금한 부분은 개별 파일을 다시 실행해볼 수 있습니다\n");

// 개별 실행 가이드
console.log("🔍 개별 파일 실행 가이드:");
console.log("node 3-1-1-global.js      # 전역 공간에서의 this");
console.log("node 3-1-2-method.js      # 메서드 호출시 this");
console.log("node 3-1-3-function.js    # 함수 호출시 this");
console.log("node 3-1-4-callback.js    # 콜백 함수 this");
console.log("node 3-1-5-constructor.js # 생성자 함수 this");
console.log("node 3-2-1-call.js        # call 메서드");
console.log("node 3-2-2-apply.js       # apply 메서드");
console.log("node 3-2-3-call-apply-examples.js  # call/apply 활용");
console.log("node 3-2-4-bind.js        # bind 메서드");
console.log("node 3-2-5-arrow-function.js  # 화살표 함수");
console.log("node 3-2-6-thisarg.js     # thisArg 매개변수");
console.log("node 3-3-summary.js       # 전체 정리");
console.log("node practice.js          # 실습 문제\n");

// 전체 실행 옵션
console.log("⚡ 전체 학습 과정:");
console.log("전체 파일을 순서대로 실행하려면 아래 명령어들을 사용하세요:\n");

// 실행 시간 예상
console.log("⏰ 예상 학습 시간:");
console.log("• 기본 개념 파일들 (3-1): 약 20분");
console.log("• 명시적 바인딩 파일들 (3-2): 약 30분");
console.log("• 정리 및 실습: 약 15분");
console.log("• 전체: 약 60-70분\n");

// 중요 포인트 미리보기
console.log("💡 핵심 포인트 미리보기:");
console.log("1. this는 호출 방법에 따라 결정됩니다");
console.log("2. 메서드 호출: this = 점(.) 앞의 객체");
console.log("3. 함수 호출: this = 전역 객체");
console.log("4. new 호출: this = 새로 생성되는 인스턴스");
console.log("5. call/apply/bind: this = 명시적으로 지정한 객체");
console.log("6. 우선순위: new > 명시적 > 암시적 > 기본\n");

// 학습 시작 안내
console.log("🚀 학습 시작:");
console.log("준비가 되셨으면 다음 중 하나를 선택하세요:");
console.log("A) 전체 순차 학습: 아래 코드 주석을 제거하세요");
console.log("B) 개별 파일 학습: 위의 가이드를 참고하여 개별 실행하세요");
console.log("C) 실습 위주 학습: practice.js부터 시작하세요\n");

// 전체 실행 코드 (주석 제거하여 사용)
console.log("전체 순차 실행을 원하시면 아래 주석을 제거하세요:\n");
console.log("/*");
console.log("console.log('🎬 전체 학습 과정을 시작합니다!\\n');");
console.log("");
console.log("// 3-1. 상황에 따라 달라지는 this");
console.log("require('./3-1-1-global.js');");
console.log("require('./3-1-2-method.js');");
console.log("require('./3-1-3-function.js');");
console.log("require('./3-1-4-callback.js');");
console.log("require('./3-1-5-constructor.js');");
console.log("");
console.log("// 3-2. 명시적으로 this를 바인딩하는 방법");
console.log("require('./3-2-1-call.js');");
console.log("require('./3-2-2-apply.js');");
console.log("require('./3-2-3-call-apply-examples.js');");
console.log("require('./3-2-4-bind.js');");
console.log("require('./3-2-5-arrow-function.js');");
console.log("require('./3-2-6-thisarg.js');");
console.log("");
console.log("// 3-3. 정리");
console.log("require('./3-3-summary.js');");
console.log("");
console.log("// 실습 문제");
console.log("require('./practice.js');");
console.log("");
console.log("console.log('🎉 03장 this 전체 학습이 완료되었습니다!');");
console.log("*/\n");

// 마무리 메시지
console.log("📝 학습 팁:");
console.log("• 각 예제를 직접 실행해보며 결과를 예측해보세요");
console.log("• 이해되지 않는 부분은 반복 학습하세요");
console.log("• 실습 문제로 학습 내용을 점검하세요");
console.log("• 실무에서 this 문제가 발생하면 이 파일들을 참고하세요\n");

console.log("✨ 즐거운 this 학습 되세요! ✨");
console.log("=".repeat(50) + "\n");

// 실제 전체 실행을 원한다면 아래 주석을 제거하세요
/*
console.log("🎬 전체 학습 과정을 시작합니다!\n");

// 3-1. 상황에 따라 달라지는 this
require('./3-1-1-global.js');
require('./3-1-2-method.js');
require('./3-1-3-function.js');
require('./3-1-4-callback.js');
require('./3-1-5-constructor.js');

// 3-2. 명시적으로 this를 바인딩하는 방법
require('./3-2-1-call.js');
require('./3-2-2-apply.js');
require('./3-2-3-call-apply-examples.js');
require('./3-2-4-bind.js');
require('./3-2-5-arrow-function.js');
require('./3-2-6-thisarg.js');

// 3-3. 정리
require('./3-3-summary.js');

// 실습 문제
require('./practice.js');

console.log("🎉 03장 this 전체 학습이 완료되었습니다!");
*/