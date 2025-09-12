// 호이스팅 예제 - 실무에서 자주 마주치는 상황들

console.log("=== 1. 변수 호이스팅 예제 ===");

// 실무 상황: 설정값 검증 함수
function validateConfig(config) {
  console.log("현재 환경:", environment); // undefined 출력

  if (config.mode === "production") {
    var environment = "prod";
    var debugMode = false;
  } else {
    var environment = "dev";
    var debugMode = true;
  }

  console.log("설정된 환경:", environment);
  console.log("디버그 모드:", debugMode);

  return { environment: environment, debugMode: debugMode };
}

validateConfig({ mode: "development" });

console.log("\n=== 2. 함수 호이스팅 예제 ===");

// 실무 상황: 초기화 순서가 중요한 모듈
try {
  // 함수 호이스팅으로 인해 정상 작동
  initializeApp();

  function initializeApp() {
    console.log("앱 초기화 시작");
    setupDatabase();
    setupRoutes();
    console.log("앱 초기화 완료");
  }

  function setupDatabase() {
    console.log("데이터베이스 연결 설정");
  }

  function setupRoutes() {
    console.log("라우팅 설정");
  }
} catch (error) {
  console.error("초기화 실패:", error);
}

console.log("\n=== 3. 실무에서 흔한 호이스팅 버그 ===");

// 버그 상황: 조건부 함수 선언 (권장하지 않음)
function processUserData(user) {
  console.log("사용자 처리 시작");

  if (user.isAdmin) {
    function handleAdminUser() {
      return "관리자 권한으로 처리됨";
    }
  } else {
    function handleAdminUser() {
      return "일반 사용자로 처리됨";
    }
  }

  // 브라우저마다 다른 결과가 나올 수 있음
  return handleAdminUser();
}

var adminUser = { isAdmin: true };
var normalUser = { isAdmin: false };

console.log(processUserData(adminUser));
console.log(processUserData(normalUser));

console.log("\n=== 4. TDZ(Temporal Dead Zone) 이전 var의 특징 ===");

// 실무 상황: 반복문에서의 var 사용 문제
function setupEventHandlers() {
  var buttons = ["버튼1", "버튼2", "버튼3"];
  var handlers = [];

  for (var i = 0; i < buttons.length; i++) {
    handlers.push(() => {
      console.log(`${buttons[i]} 클릭됨`); // 모두 undefined가 될 위험
    });
  }

  console.log("이벤트 핸들러 테스트:");
  handlers.forEach((handler, index) => {
    console.log(`핸들러 ${index}:`);
    handler();
  });
}

setupEventHandlers();

console.log("\n=== 5. 호이스팅을 활용한 올바른 패턴 ===");

// 실무에서 권장하는 패턴: 함수 먼저 선언
function createApiClient() {
  // 메인 함수가 먼저 나와 가독성 좋음
  return {
    get: getData,
    post: postData,
    put: updateData,
    delete: deleteData,
  };

  // 구현 함수들은 아래에 배치
  function getData(url) {
    console.log("GET 요청:", url);
    return fetch(url);
  }

  function postData(url, data) {
    console.log("POST 요청:", url);
    return fetch(url, { method: "POST", body: JSON.stringify(data) });
  }

  function updateData(url, data) {
    console.log("PUT 요청:", url);
    return fetch(url, { method: "PUT", body: JSON.stringify(data) });
  }

  function deleteData(url) {
    console.log("DELETE 요청:", url);
    return fetch(url, { method: "DELETE" });
  }
}

var apiClient = createApiClient();
console.log("API 클라이언트 생성됨:", Object.keys(apiClient));

console.log("\n=== 6. 실제 면접에서 나오는 호이스팅 문제 ===");

function hoistingQuiz() {
  console.log("quiz1:", typeof a); // "undefined"
  console.log("quiz2:", typeof b); // "function"

  var a = 1;

  function b() {
    return "function b";
  }

  console.log("quiz3:", a); // 1
  console.log("quiz4:", b()); // "function b"
}

hoistingQuiz();
