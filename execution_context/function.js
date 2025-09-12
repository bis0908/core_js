// 함수 선언문과 함수 표현식 - 실행 컨텍스트와 호이스팅 관점

console.log("=== 1. 기본 개념 비교 ===");

// 1-1. 호이스팅 차이 확인
console.log("호이스팅 테스트:");
try {
  console.log("함수 선언문 호출:", declaration()); // 정상 작동
  console.log("함수 표현식 호출:", expression()); // ReferenceError
} catch (e) {
  console.log("에러 발생:", e.message);
}

// 함수 선언문 - 호이스팅됨
function declaration() {
  return "함수 선언문입니다";
}

// 함수 표현식 - 호이스팅되지 않음
var expression = () => "함수 표현식입니다";

console.log("선언 후 호출:");
console.log("함수 선언문:", declaration());
console.log("함수 표현식:", expression());

console.log("\n=== 2. 실무 시나리오별 예제 ===");

// 2-1. 모듈 초기화에서의 함수 선언문 활용
console.log("모듈 초기화 패턴:");

function setupConfig() {
  console.log("- 설정 초기화");
}

function validateEnvironment() {
  console.log("- 환경 검증");
}

function connectDatabase() {
  console.log("- 데이터베이스 연결");
}

// 메인 초기화 함수 - 호이스팅으로 인해 선언 전에도 호출 가능
function initializeModule() {
  console.log("모듈 초기화 시작");

  // 함수 선언문들이 호이스팅되어 정상 작동
  setupConfig();
  validateEnvironment();
  connectDatabase();

  console.log("모듈 초기화 완료");
}

initializeModule();

// 2-2. 조건부 함수 생성에서의 함수 표현식 사용
console.log("\n조건부 함수 생성:");

function createLogger(isDevelopment) {
  var logger;

  if (isDevelopment) {
    logger = (message) => {
      console.log(`[DEV] ${new Date().toISOString()}: ${message}`);
    };
  } else {
    logger = (message) => {
      console.log(`[PROD] ${message}`);
    };
  }

  return logger;
}

var devLogger = createLogger(true);
var prodLogger = createLogger(false);

// 표현식 이후 사용했기 때문에 오류 X
devLogger("개발 모드 로그");
prodLogger("프로덕션 모드 로그");

// 2-3. 콜백 함수로서의 함수 표현식
console.log("\n콜백 함수 패턴:");

function processUserData(users, callback) {
  console.log("사용자 데이터 처리 중...");

  for (var i = 0; i < users.length; i++) {
    callback(users[i], i);
  }
}

var users = [
  { name: "김철수", age: 30 },
  { name: "이영희", age: 25 },
  { name: "박민수", age: 35 },
];

// 익명 함수 표현식을 콜백으로 사용
processUserData(users, (user, index) => {
  console.log(`${index + 1}. ${user.name} (${user.age}세)`);
});

// 2-4. 즉시 실행 함수(IIFE) 패턴
console.log("\n즉시 실행 함수 패턴:");

// 사용자 검증 함수 - 독립적인 유틸리티
function validateUser(user) {
  return user?.name && user.age > 0;
}

// IIFE 패턴 - 모듈 캡슐화
var userModule = (() => {
  var users = []; // 프라이빗 상태

  return {
    addUser: (user) => {
      if (validateUser(user)) {
        users.push(user);
        console.log("사용자 추가됨:", user.name);
      } else {
        console.log("잘못된 사용자 정보");
      }
    },

    getUserCount: () => users.length,

    listUsers: () => users.slice(), // 복사본 반환
  };
})();

userModule.addUser({ name: "홍길동", age: 28 });
userModule.addUser({ name: "김영수", age: 32 });
console.log("총 사용자 수:", userModule.getUserCount());

console.log("\n=== 3. 고급 패턴 ===");

// 3-1. 함수 팩토리 패턴
console.log("함수 팩토리 패턴:");

function createValidator(rules) {
  return (data) => {
    for (var rule in rules) {
      if (Object.hasOwn(rules, rule)) {
        if (!rules[rule](data[rule])) {
          return false;
        }
      }
    }
    return true;
  };
}

var userValidator = createValidator({
  name: (value) => typeof value === "string" && value.length > 0,
  age: (value) => typeof value === "number" && value > 0,
  email: (value) => typeof value === "string" && value.includes("@"),
});

var userData = { name: "테스트", age: 25, email: "test@example.com" };
console.log("유효성 검사 결과:", userValidator(userData));

// 3-2. 클로저와 함수 표현식 조합
console.log("\n클로저와 함수 표현식:");

function createCounter(initialValue) {
  var count = initialValue || 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    current: () => count,
    reset: () => {
      count = initialValue || 0;
      return count;
    },
  };
}

var counter = createCounter(10);
console.log("초기값:", counter.current());
console.log("증가:", counter.increment());
console.log("증가:", counter.increment());
console.log("감소:", counter.decrement());
console.log("현재값:", counter.current());

// 3-3. 재귀 함수에서의 차이점
console.log("\n재귀 함수 패턴:");

// 함수 선언문을 이용한 재귀
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log("팩토리얼(5):", factorial(5));

// 네이밍된 함수 표현식을 이용한 재귀
var fibonacci = function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
};

console.log("피보나치(7):", fibonacci(7));

console.log("\n=== 4. 실무에서 흔한 실수들 ===");

// 4-1. 조건부 함수 선언의 문제점
console.log("조건부 함수 선언 문제:");

function problematicPattern(condition) {
  console.log("조건:", condition);

  if (condition) {
    // 이런 패턴은 피해야 함 - 브라우저마다 다른 동작
    function helper() {
      return "조건이 참일 때";
    }
  } else {
    function helper() {
      return "조건이 거짓일 때";
    }
  }

  return helper();
}

// 올바른 패턴: 함수 표현식 사용
function correctPattern(condition) {
  var helper;

  if (condition) {
    helper = () => "조건이 참일 때";
  } else {
    helper = () => "조건이 거짓일 때";
  }

  return helper();
}

console.log("문제가 있는 패턴:", problematicPattern(true));
console.log("올바른 패턴:", correctPattern(true));

console.log("\n=== 5. 면접에서 자주 나오는 문제 ===");

// 5-1. 호이스팅 퀴즈
console.log("호이스팅 퀴즈:");

function hoistingQuiz() {
  console.log("1. typeof func1:", typeof func1); // "function"
  console.log("2. typeof func2:", typeof func2); // "undefined"

  function func1() {
    return "선언문";
  }

  var func2 = () => "표현식";

  console.log("3. func1():", func1()); // "선언문"
  console.log("4. func2():", func2()); // "표현식"
}

hoistingQuiz();

// 5-2. 스코프 체인 테스트
console.log("\n스코프 체인 테스트:");

var globalVar = "전역";

// 독립적인 헬퍼 함수들
function logWithDeclaration(globalVar, localVar) {
  console.log("선언문에서 - 전역:", globalVar, "지역:", localVar);
}

var logWithExpression = (globalVar, localVar) => {
  console.log("표현식에서 - 전역:", globalVar, "지역:", localVar);
};

function scopeTest() {
  var localVar = "지역";

  // 함수들을 호출하여 스코프 체인 확인
  logWithDeclaration(globalVar, localVar);
  logWithExpression(globalVar, localVar);
}

scopeTest();

console.log("\n=== 성능 및 메모리 고려사항 ===");

// 함수 생성 성능 비교 시뮬레이션
function performanceTest() {
  var iterations = 100000;
  var start, end;

  // 함수 선언문은 한 번만 생성됨
  function declaredFunction() {
    return "declared";
  }

  console.log("함수 선언문은 이미 생성되어 있음");

  // 함수 표현식을 반복 생성
  start = Date.now();
  for (var i = 0; i < iterations; i++) {
    var expressionFunction = () => "expression";
  }
  end = Date.now();

  console.log(
    "함수 표현식 " + iterations + "번 생성 시간:",
    end - start + "ms",
  );
}

performanceTest();

console.log("\n=== 요약 및 베스트 프랙티스 ===");
console.log("1. 함수 선언문: 호이스팅되어 어디서든 호출 가능");
console.log("2. 함수 표현식: 선언 후에만 호출 가능, 조건부 생성에 적합");
console.log("3. 즉시 실행 함수: 모듈 패턴과 네임스페이스 보호에 사용");
console.log("4. 네이밍된 함수 표현식: 재귀와 디버깅에 유리");
console.log("5. 조건부 함수는 표현식으로, 모듈 구조는 선언문으로 권장");
