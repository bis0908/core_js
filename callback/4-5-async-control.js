/**
 * 4-5. 콜백 지옥과 비동기 제어
 *
 * 콜백 함수를 중첩해서 사용하다 보면 코드의 들여쓰기 수준이 깊어지는 현상이 발생합니다.
 * 이를 '콜백 지옥(callback hell)'이라고 하며, 이를 해결하는 방법들을 살펴봅니다.
 */

/**
 * 예제 1: 콜백 지옥 - 순차적 파일 처리
 *
 * 여러 파일을 순차적으로 처리해야 하는 상황에서 발생하는 콜백 지옥입니다.
 */

function processUserRegistration(userData, callback) {
  console.log("1. 사용자 등록 처리 시작...");

  // 1단계: 이메일 중복 검사
  checkEmailDuplicate(userData.email, function (emailResult) {
    if (!emailResult.available) {
      callback({ success: false, error: "이미 존재하는 이메일입니다." });
      return;
    }

    // 2단계: 비밀번호 암호화
    encryptPassword(userData.password, function (encryptResult) {
      if (!encryptResult.success) {
        callback({ success: false, error: "비밀번호 암호화 실패" });
        return;
      }

      // 3단계: 사용자 정보 데이터베이스 저장
      saveUserToDatabase(
        {
          email: userData.email,
          password: encryptResult.encryptedPassword,
          name: userData.name,
        },
        function (saveResult) {
          if (!saveResult.success) {
            callback({ success: false, error: "데이터베이스 저장 실패" });
            return;
          }

          // 4단계: 환영 이메일 발송
          sendWelcomeEmail(userData.email, function (emailResult) {
            if (!emailResult.success) {
              callback({ success: false, error: "환영 이메일 발송 실패" });
              return;
            }

            // 모든 단계 완료
            callback({
              success: true,
              userId: saveResult.userId,
              message: "회원가입이 완료되었습니다.",
            });
          });
        },
      );
    });
  });
}

// 각 단계별 비동기 함수들
function checkEmailDuplicate(email, callback) {
  setTimeout(function () {
    var isDuplicate = email === "taken@example.com";
    callback({ available: !isDuplicate });
  }, 500);
}

function encryptPassword(password, callback) {
  setTimeout(function () {
    callback({
      success: true,
      encryptedPassword: "encrypted_" + password,
    });
  }, 300);
}

function saveUserToDatabase(userData, callback) {
  setTimeout(function () {
    callback({
      success: true,
      userId: Math.floor(Math.random() * 10000),
    });
  }, 800);
}

function sendWelcomeEmail(email, callback) {
  setTimeout(function () {
    console.log("환영 이메일을 " + email + "로 발송했습니다.");
    callback({ success: true });
  }, 400);
}

/**
 * 콜백 지옥 사용 예시
 */
var newUser = {
  email: "newuser@example.com",
  password: "password123",
  name: "홍길동",
};

// processUserRegistration(newUser, function(result) {
//   if (result.success) {
//     console.log("✅ " + result.message);
//     console.log("사용자 ID: " + result.userId);
//   } else {
//     console.log("❌ 회원가입 실패: " + result.error);
//   }
// });

/**
 * 예제 2: 콜백 지옥 해결 방법 1 - 함수 분리
 *
 * 중첩된 콜백을 별도 함수로 분리하여 가독성을 개선합니다.
 */

function processUserRegistrationImproved(userData, callback) {
  console.log("\n=== 개선된 회원가입 처리 ===");

  checkEmailDuplicate(userData.email, function (emailResult) {
    if (!emailResult.available) {
      return callback({ success: false, error: "이미 존재하는 이메일입니다." });
    }
    handlePasswordEncryption(userData, callback);
  });
}

function handlePasswordEncryption(userData, callback) {
  encryptPassword(userData.password, function (encryptResult) {
    if (!encryptResult.success) {
      return callback({ success: false, error: "비밀번호 암호화 실패" });
    }

    var userDataWithEncryption = {
      email: userData.email,
      password: encryptResult.encryptedPassword,
      name: userData.name,
    };

    handleDatabaseSave(userDataWithEncryption, callback);
  });
}

function handleDatabaseSave(userData, callback) {
  saveUserToDatabase(userData, function (saveResult) {
    if (!saveResult.success) {
      return callback({ success: false, error: "데이터베이스 저장 실패" });
    }
    handleWelcomeEmail(userData.email, saveResult.userId, callback);
  });
}

function handleWelcomeEmail(email, userId, callback) {
  sendWelcomeEmail(email, function (emailResult) {
    if (!emailResult.success) {
      return callback({ success: false, error: "환영 이메일 발송 실패" });
    }

    callback({
      success: true,
      userId: userId,
      message: "회원가입이 완료되었습니다.",
    });
  });
}

/**
 * 예제 3: Promise를 사용한 해결 방법
 *
 * Promise 체인을 사용하여 콜백 지옥을 해결합니다.
 */

function checkEmailDuplicatePromise(email) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var isDuplicate = email === "taken@example.com";
      if (isDuplicate) {
        reject(new Error("이미 존재하는 이메일입니다."));
      } else {
        resolve({ email: email });
      }
    }, 500);
  });
}

function encryptPasswordPromise(password) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("encrypted_" + password);
    }, 300);
  });
}

function saveUserToDatabasePromise(userData) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (Math.random() > 0.1) {
        // 90% 성공률
        resolve({
          userId: Math.floor(Math.random() * 10000),
          userData: userData,
        });
      } else {
        reject(new Error("데이터베이스 저장 실패"));
      }
    }, 800);
  });
}

function sendWelcomeEmailPromise(email) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("환영 이메일을 " + email + "로 발송했습니다.");
      resolve({ emailSent: true });
    }, 400);
  });
}

function processUserRegistrationWithPromise(userData) {
  console.log("\n=== Promise를 사용한 회원가입 처리 ===");

  return checkEmailDuplicatePromise(userData.email)
    .then(function (result) {
      console.log("✅ 이메일 중복 검사 통과");
      return encryptPasswordPromise(userData.password);
    })
    .then(function (encryptedPassword) {
      console.log("✅ 비밀번호 암호화 완료");
      return saveUserToDatabasePromise({
        email: userData.email,
        password: encryptedPassword,
        name: userData.name,
      });
    })
    .then(function (saveResult) {
      console.log(
        "✅ 데이터베이스 저장 완료 (사용자 ID: " + saveResult.userId + ")",
      );
      return sendWelcomeEmailPromise(userData.email).then(function () {
        return saveResult; // 이전 결과를 다음으로 전달
      });
    })
    .then(function (saveResult) {
      console.log("✅ 환영 이메일 발송 완료");
      return {
        success: true,
        userId: saveResult.userId,
        message: "회원가입이 완료되었습니다.",
      };
    })
    .catch(function (error) {
      console.log("❌ 회원가입 실패: " + error.message);
      return {
        success: false,
        error: error.message,
      };
    });
}

/**
 * 예제 4: async/await 사용 (ES2017, 참고용)
 *
 * async/await를 사용하면 동기 코드처럼 작성할 수 있습니다.
 * (ES5 환경에서는 사용할 수 없으므로 참고용으로만 제공)
 */

// async function processUserRegistrationWithAsyncAwait(userData) {
//   console.log("\n=== async/await를 사용한 회원가입 처리 ===");
//
//   try {
//     console.log("이메일 중복 검사 중...");
//     await checkEmailDuplicatePromise(userData.email);
//     console.log("✅ 이메일 중복 검사 통과");
//
//     console.log("비밀번호 암호화 중...");
//     var encryptedPassword = await encryptPasswordPromise(userData.password);
//     console.log("✅ 비밀번호 암호화 완료");
//
//     console.log("데이터베이스 저장 중...");
//     var saveResult = await saveUserToDatabasePromise({
//       email: userData.email,
//       password: encryptedPassword,
//       name: userData.name
//     });
//     console.log("✅ 데이터베이스 저장 완료 (사용자 ID: " + saveResult.userId + ")");
//
//     console.log("환영 이메일 발송 중...");
//     await sendWelcomeEmailPromise(userData.email);
//     console.log("✅ 환영 이메일 발송 완료");
//
//     return {
//       success: true,
//       userId: saveResult.userId,
//       message: "회원가입이 완료되었습니다."
//     };
//   } catch (error) {
//     console.log("❌ 회원가입 실패: " + error.message);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// }

/**
 * 예제 5: 실무 상황 - 주문 처리 시스템
 *
 * 전자상거래에서 주문을 처리하는 복잡한 비동기 흐름을 다룹니다.
 */

var OrderProcessor = {
  processOrder: function (orderData, callback) {
    var self = this;
    console.log("\n=== 주문 처리 시작 ===");
    console.log("주문 ID: " + orderData.orderId);

    // 1단계: 재고 확인
    this.checkInventory(orderData.items, function (inventoryResult) {
      if (!inventoryResult.available) {
        return callback({
          success: false,
          error: "재고 부족: " + inventoryResult.unavailableItems.join(", "),
        });
      }

      // 2단계: 결제 처리
      self.processPayment(orderData.payment, function (paymentResult) {
        if (!paymentResult.success) {
          return callback({
            success: false,
            error: "결제 실패: " + paymentResult.error,
          });
        }

        // 3단계: 재고 차감
        self.deductInventory(orderData.items, function (deductResult) {
          if (!deductResult.success) {
            // 결제 취소 필요
            self.refundPayment(paymentResult.transactionId, function () {
              callback({
                success: false,
                error: "재고 차감 실패, 결제가 취소되었습니다.",
              });
            });
            return;
          }

          // 4단계: 배송 정보 생성
          self.createShippingInfo(orderData, function (shippingResult) {
            if (!shippingResult.success) {
              callback({
                success: false,
                error: "배송 정보 생성 실패",
              });
              return;
            }

            // 5단계: 주문 완료 알림
            self.sendOrderConfirmation(
              orderData.customerEmail,
              {
                orderId: orderData.orderId,
                transactionId: paymentResult.transactionId,
                trackingNumber: shippingResult.trackingNumber,
              },
              function (notificationResult) {
                callback({
                  success: true,
                  orderId: orderData.orderId,
                  transactionId: paymentResult.transactionId,
                  trackingNumber: shippingResult.trackingNumber,
                  message: "주문이 성공적으로 처리되었습니다.",
                });
              },
            );
          });
        });
      });
    });
  },

  checkInventory: function (items, callback) {
    setTimeout(function () {
      var unavailable = [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].quantity > 10) {
          // 재고 부족 시뮬레이션
          unavailable.push(items[i].name);
        }
      }

      callback({
        available: unavailable.length === 0,
        unavailableItems: unavailable,
      });
    }, 600);
  },

  processPayment: function (paymentInfo, callback) {
    setTimeout(function () {
      var success = Math.random() > 0.1; // 90% 성공률
      if (success) {
        callback({
          success: true,
          transactionId: "TXN_" + Date.now(),
        });
      } else {
        callback({
          success: false,
          error: "카드 결제 승인 실패",
        });
      }
    }, 1200);
  },

  deductInventory: function (items, callback) {
    setTimeout(function () {
      console.log("재고 차감 완료:");
      for (var i = 0; i < items.length; i++) {
        console.log("- " + items[i].name + ": " + items[i].quantity + "개");
      }
      callback({ success: true });
    }, 400);
  },

  refundPayment: function (transactionId, callback) {
    setTimeout(function () {
      console.log("결제 취소 완료: " + transactionId);
      callback({ success: true });
    }, 800);
  },

  createShippingInfo: function (orderData, callback) {
    setTimeout(function () {
      callback({
        success: true,
        trackingNumber: "TRACK_" + Date.now(),
      });
    }, 500);
  },

  sendOrderConfirmation: function (email, orderInfo, callback) {
    setTimeout(function () {
      console.log("주문 확인 이메일 발송됨: " + email);
      console.log("주문번호: " + orderInfo.orderId);
      console.log("결제ID: " + orderInfo.transactionId);
      console.log("송장번호: " + orderInfo.trackingNumber);
      callback({ success: true });
    }, 300);
  },
};

/**
 * Promise 기반 주문 처리 시스템
 */
var OrderProcessorPromise = {
  processOrder: function (orderData) {
    console.log("\n=== Promise 기반 주문 처리 시작 ===");
    console.log("주문 ID: " + orderData.orderId);

    var self = this;

    return this.checkInventoryPromise(orderData.items)
      .then(function (inventoryResult) {
        console.log("✅ 재고 확인 완료");
        return self.processPaymentPromise(orderData.payment);
      })
      .then(function (paymentResult) {
        console.log("✅ 결제 처리 완료: " + paymentResult.transactionId);
        return self.deductInventoryPromise(orderData.items).then(function () {
          return paymentResult; // 결제 정보를 다음 단계로 전달
        });
      })
      .then(function (paymentResult) {
        console.log("✅ 재고 차감 완료");
        return self
          .createShippingInfoPromise(orderData)
          .then(function (shippingResult) {
            return { payment: paymentResult, shipping: shippingResult };
          });
      })
      .then(function (results) {
        console.log(
          "✅ 배송 정보 생성 완료: " + results.shipping.trackingNumber,
        );
        return self
          .sendOrderConfirmationPromise(orderData.customerEmail, {
            orderId: orderData.orderId,
            transactionId: results.payment.transactionId,
            trackingNumber: results.shipping.trackingNumber,
          })
          .then(function () {
            return results;
          });
      })
      .then(function (results) {
        console.log("✅ 주문 확인 이메일 발송 완료");
        return {
          success: true,
          orderId: orderData.orderId,
          transactionId: results.payment.transactionId,
          trackingNumber: results.shipping.trackingNumber,
          message: "주문이 성공적으로 처리되었습니다.",
        };
      })
      .catch(function (error) {
        console.log("❌ 주문 처리 실패: " + error.message);
        return {
          success: false,
          error: error.message,
        };
      });
  },

  checkInventoryPromise: function (items) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        var unavailable = [];
        for (var i = 0; i < items.length; i++) {
          if (items[i].quantity > 10) {
            unavailable.push(items[i].name);
          }
        }

        if (unavailable.length > 0) {
          reject(new Error("재고 부족: " + unavailable.join(", ")));
        } else {
          resolve({ available: true });
        }
      }, 600);
    });
  },

  processPaymentPromise: function (paymentInfo) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        var success = Math.random() > 0.1;
        if (success) {
          resolve({ transactionId: "TXN_" + Date.now() });
        } else {
          reject(new Error("카드 결제 승인 실패"));
        }
      }, 1200);
    });
  },

  deductInventoryPromise: function (items) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        console.log("재고 차감 처리중...");
        resolve({ success: true });
      }, 400);
    });
  },

  createShippingInfoPromise: function (orderData) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({ trackingNumber: "TRACK_" + Date.now() });
      }, 500);
    });
  },

  sendOrderConfirmationPromise: function (email, orderInfo) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        console.log("주문 확인 이메일 발송 완료: " + email);
        resolve({ sent: true });
      }, 300);
    });
  },
};

// 테스트 데이터
var sampleOrder = {
  orderId: "ORD_" + Date.now(),
  customerEmail: "customer@example.com",
  items: [
    { name: "노트북", quantity: 1, price: 1000000 },
    { name: "마우스", quantity: 2, price: 30000 },
  ],
  payment: {
    method: "card",
    cardNumber: "1234-5678-9012-3456",
    amount: 1060000,
  },
};

// 실행 예시
console.log("=== 콜백 기반 처리 ===");
processUserRegistrationImproved(newUser, function (result) {
  if (result.success) {
    console.log("✅ " + result.message);
  } else {
    console.log("❌ " + result.error);
  }

  // Promise 기반 처리 실행
  setTimeout(function () {
    processUserRegistrationWithPromise(newUser).then(function (result) {
      console.log("Promise 처리 완료:", result);

      // 주문 처리 예시 실행
      setTimeout(function () {
        OrderProcessorPromise.processOrder(sampleOrder).then(function (result) {
          console.log("주문 처리 결과:", result);
        });
      }, 1000);
    });
  }, 3000);
});
