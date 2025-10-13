/**
 * 4-4. 콜백함수 내부의 this에 다른 값 바인딩하기
 *
 * 콜백함수 내부에서 this가 원하는 객체를 가리키도록 하는 방법들을 살펴봅니다.
 * - 전통적인 방법: 변수에 this 저장, call/apply/bind 사용
 * - ES6 방법: 화살표 함수 (참고용)
 */

/**
 * 예제 1: 사용자 프로필 관리 시스템
 *
 * 사용자 프로필 업데이트 시 콜백에서 this 문제와 해결 방법들을 보여줍니다.
 */
var UserProfile = {
  username: "hong123",
  email: "hong@example.com",
  preferences: {
    theme: "dark",
    language: "ko",
  },

  /**
   * 방법 1: 변수에 this 저장 (전통적인 방법)
   */
  updatePreferencesOldWay: function (newPrefs, callback) {
    var self = this; // this를 변수에 저장

    setTimeout(function () {
      // 클로저를 통해 외부 함수의 self 변수에 접근
      for (var key in newPrefs) {
        if (self.preferences.hasOwnProperty(key)) {
          self.preferences[key] = newPrefs[key];
        }
      }

      console.log(self.username + "의 설정이 업데이트되었습니다.");
      callback.call(self, self.preferences); // 명시적으로 this 바인딩
    }, 1000);
  },

  /**
   * 방법 2: bind 메서드 사용
   */
  updatePreferencesWithBind: function (newPrefs, callback) {
    var updateTask = function () {
      for (var key in newPrefs) {
        if (Object.hasOwn(this.preferences, key)) {
          this.preferences[key] = newPrefs[key];
        }
      }

      console.log(`${this.username}의 설정이 업데이트되었습니다.`);
      callback.call(this, this.preferences);
    }.bind(this); // bind로 this 고정

    setTimeout(updateTask, 1000);
  },

  onPreferencesUpdated: function (preferences) {
    console.log("업데이트된 설정:");
    console.log(`- 테마: ${preferences.theme}`);
    console.log(`- 언어: ${preferences.language}`);
    console.log(`사용자: ${this.username}`); // this가 UserProfile을 가리킴
  },
};

// 사용 예시
var newSettings = { theme: "light", language: "en" };

// UserProfile.updatePreferencesOldWay(
//   newSettings,
//   UserProfile.onPreferencesUpdated,
// );
// UserProfile.updatePreferencesWithBind(
//   newSettings,
//   UserProfile.onPreferencesUpdated,
// );

/**
 * 예제 2: 쇼핑카트 시스템
 *
 * 장바구니의 아이템들에 대해 할인을 적용하는 시나리오입니다.
 */
var ShoppingCart = {
  customerName: "김고객",
  items: [
    { id: 1, name: "노트북", price: 1000000, quantity: 1 },
    { id: 2, name: "마우스", price: 50000, quantity: 2 },
    { id: 3, name: "키보드", price: 100000, quantity: 1 },
  ],
  discountRate: 0,

  /**
   * 할인율을 적용하고 결과를 콜백으로 전달
   */
  applyDiscount: function (discountRate, onComplete) {
    this.discountRate = discountRate;
    var self = this; // this 저장

    console.log(
      this.customerName +
        "의 장바구니에 " +
        discountRate * 100 +
        "% 할인 적용 중...",
    );

    // 각 아이템에 할인 적용 (비동기 처리 시뮬레이션)
    var processedItems = [];
    var itemsToProcess = this.items.length;
    var processedCount = 0;

    this.items.forEach(function (item, index) {
      setTimeout(
        function () {
          var discountedPrice = item.price * (1 - self.discountRate);
          var processedItem = {
            id: item.id,
            name: item.name,
            originalPrice: item.price,
            discountedPrice: discountedPrice,
            quantity: item.quantity,
            totalSaved: (item.price - discountedPrice) * item.quantity,
          };

          processedItems[index] = processedItem;
          processedCount++;

          if (processedCount === itemsToProcess) {
            // 모든 아이템 처리 완료
            onComplete.call(self, processedItems);
          }
        },
        (index + 1) * 200,
      ); // 각각 다른 시간에 처리
    });
  },

  onDiscountComplete: function (discountedItems) {
    console.log("\n=== " + this.customerName + "의 할인 적용 결과 ===");
    var totalOriginal = 0;
    var totalDiscounted = 0;
    var totalSaved = 0;

    for (var i = 0; i < discountedItems.length; i++) {
      var item = discountedItems[i];
      totalOriginal += item.originalPrice * item.quantity;
      totalDiscounted += item.discountedPrice * item.quantity;
      totalSaved += item.totalSaved;

      console.log(
        item.name +
          ": " +
          item.originalPrice.toLocaleString() +
          "원 → " +
          Math.floor(item.discountedPrice).toLocaleString() +
          "원 " +
          "(수량: " +
          item.quantity +
          ", 절약: " +
          Math.floor(item.totalSaved).toLocaleString() +
          "원)",
      );
    }

    console.log("총 원가: " + totalOriginal.toLocaleString() + "원");
    console.log(
      "할인 후: " + Math.floor(totalDiscounted).toLocaleString() + "원",
    );
    console.log("총 절약: " + Math.floor(totalSaved).toLocaleString() + "원");
  },
};

// ShoppingCart.applyDiscount(0.15, ShoppingCart.onDiscountComplete);

/**
 * 예제 3: 이벤트 핸들러에서의 this 바인딩
 *
 * DOM 이벤트 처리에서 객체의 메서드를 이벤트 핸들러로 사용할 때의 this 바인딩
 */
var FormValidator = {
  formName: "회원가입 폼",
  rules: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{6,}$/,
    phone: /^\d{3}-\d{4}-\d{4}$/,
  },

  /**
   * 폼 필드 검증 메서드
   */
  validateField: function (fieldName, value) {
    console.log(this.formName + "에서 " + fieldName + " 필드 검증 중...");

    if (!this.rules[fieldName]) {
      return { valid: false, message: "알 수 없는 필드입니다." };
    }

    var isValid = this.rules[fieldName].test(value);
    return {
      valid: isValid,
      message: isValid
        ? "유효한 " + fieldName + "입니다."
        : "잘못된 " + fieldName + " 형식입니다.",
    };
  },

  /**
   * 검증 결과 처리 메서드
   */
  handleValidationResult: function (fieldName, result) {
    console.log(
      "[" + this.formName + "] " + fieldName + " 검증 결과: " + result.message,
    );

    if (!result.valid) {
      console.log("❌ 검증 실패");
    } else {
      console.log("✅ 검증 성공");
    }
  },

  /**
   * bind를 사용한 이벤트 핸들러 등록 (시뮬레이션)
   */
  attachEventHandlers: function () {
    var self = this;

    // 실제 DOM 환경에서는 이렇게 사용:
    // document.getElementById('email').addEventListener('blur',
    //   this.validateEmailField.bind(this));

    // 시뮬레이션을 위한 가상의 이벤트 처리
    this.simulateFieldValidation = function (fieldName, value) {
      var validator = function (event) {
        var result = self.validateField(fieldName, value);
        self.handleValidationResult(fieldName, result);
      };

      // 가상의 이벤트 객체
      var mockEvent = { target: { name: fieldName, value: value } };
      setTimeout(function () {
        validator(mockEvent);
      }, 100);
    };
  },
};

FormValidator.attachEventHandlers();

// 사용 예시
// FormValidator.simulateFieldValidation("email", "user@test.com");
// FormValidator.simulateFieldValidation("email", "invalid-email");
// FormValidator.simulateFieldValidation("password", "123456");
// FormValidator.simulateFieldValidation("password", "123");

/**
 * 예제 4: 콜백 함수에서 다양한 this 바인딩 방법 비교
 *
 * 같은 기능을 여러 방법으로 구현하여 차이점을 보여줍니다.
 */
var TaskManager = {
  managerName: "할일 관리자",
  tasks: ["코드 리뷰", "문서 작성", "테스트 작성"],
  completedTasks: [],

  /**
   * 방법 1: self 변수 사용
   */
  processTasksWithSelf: function (processor) {
    var self = this;
    console.log("\n=== " + self.managerName + " (self 방식) ===");

    this.tasks.forEach(function (task, index) {
      setTimeout(
        function () {
          var result = processor(task, index);
          self.completedTasks.push(result);
          console.log(self.managerName + ": " + result + " 완료");

          if (self.completedTasks.length === self.tasks.length) {
            console.log(
              "모든 작업 완료! 총 " + self.completedTasks.length + "개",
            );
          }
        },
        (index + 1) * 300,
      );
    });
  },

  /**
   * 방법 2: call 사용
   */
  processTasksWithCall: function (processor) {
    console.log("\n=== " + this.managerName + " (call 방식) ===");
    var taskManager = this;

    this.tasks.forEach(function (task, index) {
      var wrappedCallback = function (processedTask) {
        taskManager.completedTasks.push(processedTask);
        console.log(taskManager.managerName + ": " + processedTask + " 완료");
      };

      setTimeout(
        function () {
          var result = processor.call(taskManager, task, index);
          wrappedCallback.call(taskManager, result);
        },
        (index + 1) * 300,
      );
    });
  },

  /**
   * 방법 3: bind 사용
   */
  processTasksWithBind: function (processor) {
    console.log("\n=== " + this.managerName + " (bind 방식) ===");

    var boundProcessor = function (task, index) {
      var result = processor(task, index);
      this.completedTasks.push(result);
      console.log(this.managerName + ": " + result + " 완료");
      return result;
    }.bind(this);

    this.tasks.forEach((task, index) => {
      setTimeout(
        () => {
          boundProcessor(task, index);
        },
        (index + 1) * 300,
      );
    });
  },
};

// 작업 처리 함수
function taskProcessor(taskName, index) {
  return "[" + (index + 1) + "] " + taskName + " 처리됨";
}

// 각 방법 테스트
// TaskManager.processTasksWithSelf(taskProcessor);
// setTimeout(function() { TaskManager.processTasksWithCall(taskProcessor); }, 2000);
// setTimeout(function() { TaskManager.processTasksWithBind(taskProcessor); }, 4000);

/**
 * 예제 5: 실무 상황 - API 클라이언트
 *
 * API 호출 시 성공/실패 콜백에서 this 바인딩이 중요한 실제 상황입니다.
 */
var ApiClient = {
  baseUrl: "https://api.example.com",
  authToken: "abc123",
  requestCount: 0,

  makeRequest: function (endpoint, onSuccess, onError) {
    this.requestCount++;
    var requestId = this.requestCount;
    var self = this;

    console.log("API 요청 #" + requestId + ": " + this.baseUrl + endpoint);

    // 실제 API 호출 시뮬레이션
    setTimeout(
      function () {
        var success = Math.random() > 0.3; // 70% 성공률

        if (success) {
          var mockData = {
            data: "응답 데이터 #" + requestId,
            timestamp: new Date().toISOString(),
          };
          onSuccess.call(self, mockData, requestId);
        } else {
          var error = {
            code: 500,
            message: "서버 내부 오류 #" + requestId,
          };
          onError.call(self, error, requestId);
        }
      },
      1000 + Math.random() * 1000,
    );
  },

  onRequestSuccess: function (data, requestId) {
    console.log(`✅ [${this.baseUrl}] 요청 #${requestId} 성공`);
    console.log(`   데이터: ${data.data}`);
    console.log(`   총 요청 수: ${this.requestCount}`);
  },

  onRequestError: function (error, requestId) {
    console.log(`❌ [${this.baseUrl}] 요청 #${requestId} 실패`);
    console.log(`   오류: ${error.message}`);
    console.log(`   총 요청 수: ${this.requestCount}`);
  },
};

// 사용 예시 - bind로 this 바인딩 보장
// ApiClient.makeRequest("/users", ApiClient.onRequestSuccess, ApiClient.onRequestError);
// ApiClient.makeRequest("/posts", ApiClient.onRequestSuccess, ApiClient.onRequestError);

// 실행 예시 (주석 해제하여 테스트)
console.log("=== 쇼핑카트 할인 적용 ===");
ShoppingCart.applyDiscount(0.15, ShoppingCart.onDiscountComplete);
