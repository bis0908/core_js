/**
 * 4-3. 콜백함수는 함수다
 *
 * 콜백함수로 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 함수로서 호출됩니다.
 * 이는 자바스크립트에서 함수와 메서드의 차이를 이해하는 중요한 개념입니다.
 */

/**
 * 예제 1: 메서드를 콜백으로 전달할 때의 차이점
 *
 * 객체의 메서드를 콜백으로 전달하면 해당 객체와의 연결이 끊어집니다.
 */
var logger = {
  prefix: "[시스템]",

  log: function (message) {
    console.log(this.prefix + " " + message);
  },

  error: function (message) {
    console.log(this.prefix + " 에러: " + message);
  },
};

// 메서드로서 직접 호출
logger.log("직접 호출 테스트"); // "[시스템] 직접 호출 테스트"

// 함수로서 콜백 전달
function processMessage(message, callback) {
  console.log("메시지 처리 중...");
  callback(message); // 함수로서 호출됨 (this는 전역 객체)
}

// 이때 logger.log는 함수로서 호출되므로 this가 전역 객체를 가리킴
processMessage("콜백 테스트", logger.log); // "undefined 콜백 테스트" 또는 에러
console.log(
  "❌ 위 예제에서 this.prefix가 undefined가 되어 'undefined 콜백 테스트'가 출력됨",
);

/**
 * 예제 2: 사용자 인증 시스템
 *
 * 로그인 처리에서 성공/실패 콜백을 전달하는 실무 예시입니다.
 */
var authService = {
  serviceName: "회원 인증 서비스",

  authenticate: function (username, password) {
    console.log(this.serviceName + "에서 인증 처리 중...");
    return username === "admin" && password === "1234";
  },

  onLoginSuccess: function (user) {
    console.log(this.serviceName + ": " + user.name + "님 로그인 성공");
  },

  onLoginFailure: function (error) {
    console.log(this.serviceName + ": 로그인 실패 - " + error);
  },
};

function handleLogin(username, password, successCallback, failureCallback) {
  setTimeout(function () {
    var isValid = username === "admin" && password === "1234";

    if (isValid) {
      var user = { name: "관리자", role: "admin" };
      successCallback(user); // 함수로서 호출
    } else {
      failureCallback("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  }, 1000);
}

// 메서드를 콜백으로 전달하면 this 컨텍스트가 사라짐
// handleLogin("admin", "1234", authService.onLoginSuccess, authService.onLoginFailure);

/**
 * 예제 3: 해결 방법 1 - 익명 함수로 감싸기
 *
 * 원본 객체의 메서드를 올바르게 호출하기 위해 익명 함수로 감쌉니다.
 */
function safeHandleLogin(username, password, service) {
  setTimeout(function () {
    var isValid = username === "admin" && password === "1234";

    if (isValid) {
      var user = { name: "관리자", role: "admin" };
      // 익명 함수 내에서 메서드로서 호출
      service.onLoginSuccess(user);
    } else {
      service.onLoginFailure("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  }, 1000);
}

// safeHandleLogin("admin", "1234", authService);

/**
 * 예제 4: 파일 처리 시스템
 *
 * 파일 업로드/다운로드 시 다양한 콜백을 사용하는 예시입니다.
 */
var fileManager = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ["jpg", "png", "pdf", "doc"],

  validateFile: function (file) {
    if (file.size > this.maxSize) {
      return { valid: false, error: "파일 크기가 너무 큽니다." };
    }

    var extension = file.name.split(".").pop().toLowerCase();
    if (this.allowedTypes.indexOf(extension) === -1) {
      return { valid: false, error: "허용되지 않는 파일 형식입니다." };
    }

    return { valid: true };
  },

  onValidationSuccess: function (file) {
    console.log("파일 검증 성공: " + file.name);
  },

  onValidationError: function (error) {
    console.log("파일 검증 실패: " + error);
  },
};

function processFileUpload(file, validator, successCallback, errorCallback) {
  console.log("파일 업로드 처리 시작: " + file.name);

  var result = validator(file); // 함수로서 호출

  if (result.valid) {
    successCallback(file);
  } else {
    errorCallback(result.error);
  }
}

var testFile = { name: "document.pdf", size: 5000000 };

// 문제가 있는 호출 - this 컨텍스트 상실
// processFileUpload(testFile, fileManager.validateFile, fileManager.onValidationSuccess, fileManager.onValidationError);

/**
 * 예제 5: 올바른 해결 방법들
 *
 * 메서드를 콜백으로 사용할 때 this를 유지하는 여러 방법을 보여줍니다.
 */

// 방법 1: bind 사용
function processFileWithBind(file) {
  processFileUpload(
    file,
    fileManager.validateFile.bind(fileManager),
    fileManager.onValidationSuccess.bind(fileManager),
    fileManager.onValidationError.bind(fileManager),
  );
}

// 방법 2: 화살표 함수 (ES6, 참고용)
// processFileUpload(
//   testFile,
//   (file) => fileManager.validateFile(file),
//   (file) => fileManager.onValidationSuccess(file),
//   (error) => fileManager.onValidationError(error)
// );

// 방법 3: 전용 wrapper 함수 생성
function createFileProcessor(manager) {
  return {
    validate: function (file) {
      return manager.validateFile(file);
    },
    onSuccess: function (file) {
      manager.onValidationSuccess(file);
    },
    onError: function (error) {
      manager.onValidationError(error);
    },
  };
}

var processor = createFileProcessor(fileManager);
// processFileUpload(testFile, processor.validate, processor.onSuccess, processor.onError);

/**
 * 예제 6: 이벤트 시스템
 *
 * 커스텀 이벤트 시스템에서 콜백 함수 등록과 실행을 다루는 예시입니다.
 */
function EventEmitter() {
  this.events = {};
}

EventEmitter.prototype.on = function (eventName, callback) {
  if (!this.events[eventName]) {
    this.events[eventName] = [];
  }
  this.events[eventName].push(callback);
};

EventEmitter.prototype.emit = function (eventName, data) {
  if (this.events[eventName]) {
    for (var i = 0; i < this.events[eventName].length; i++) {
      // 콜백들은 모두 함수로서 호출됨
      this.events[eventName][i](data);
    }
  }
};

var notificationSystem = {
  appName: "알림 시스템",

  showAlert: function (message) {
    console.log("[" + this.appName + " 알림] " + message);
  },

  logEvent: function (message) {
    console.log(
      "[" +
        this.appName +
        " 로그] " +
        new Date().toTimeString() +
        " - " +
        message,
    );
  },
};

var emitter = new EventEmitter();

// 잘못된 등록 - this 컨텍스트 상실
emitter.on("notification", notificationSystem.showAlert);

// 올바른 등록 - bind 사용
emitter.on(
  "notification",
  notificationSystem.showAlert.bind(notificationSystem),
);
emitter.on("log", notificationSystem.logEvent.bind(notificationSystem));

// 이벤트 시스템 테스트 실행
console.log("\n=== 이벤트 시스템 테스트 ===");
emitter.emit("notification", "새 메시지가 도착했습니다.");
emitter.emit("log", "사용자 로그인 시도");

console.log("\n=== 파일 처리 시스템 테스트 ===");
processFileWithBind(testFile);
