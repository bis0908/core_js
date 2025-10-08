/**
 * 실무 예제 3: 모듈 패턴 (Module Pattern)
 *
 * 클로저를 활용하여 private 멤버와 public 멤버를 구분하는 모듈 패턴입니다.
 * ES6 모듈 시스템 이전에 자바스크립트에서 캡슐화를 구현하는 표준 방법이었습니다.
 *
 * 현재도 레거시 코드나 즉시실행함수(IIFE)가 필요한 경우 사용됩니다.
 */

console.log("=== 실무 예제 3: 모듈 패턴 ===");

var UserModule = (function() {
  // private 변수와 함수
  var users = [];
  var currentId = 0;

  var validateEmail = function(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  var generateId = function() {
    return ++currentId;
  };

  // public API
  return {
    addUser: function(name, email) {
      if (!name || !email) {
        throw new Error("이름과 이메일은 필수입니다.");
      }

      if (!validateEmail(email)) {
        throw new Error("유효하지 않은 이메일 형식입니다.");
      }

      var user = {
        id: generateId(),
        name: name,
        email: email,
        createdAt: new Date(),
      };

      users.push(user);
      console.log("사용자 추가됨:", user);
      return user;
    },

    removeUser: function(id) {
      var index = users.findIndex(function(user) {
        return user.id === id;
      });

      if (index !== -1) {
        var removed = users.splice(index, 1)[0];
        console.log("사용자 삭제됨:", removed);
        return removed;
      }

      throw new Error("사용자를 찾을 수 없습니다.");
    },

    getUser: function(id) {
      return users.find(function(user) {
        return user.id === id;
      });
    },

    getAllUsers: function() {
      // 원본 배열을 직접 노출하지 않고 복사본 반환
      return users.slice();
    },

    getUserCount: function() {
      return users.length;
    },
  };
})();

// 사용 예시
var user1 = UserModule.addUser("홍길동", "hong@example.com");
var user2 = UserModule.addUser("김철수", "kim@example.com");

console.log("전체 사용자:", UserModule.getAllUsers());
console.log("사용자 수:", UserModule.getUserCount());

// UserModule.users에 직접 접근 불가 (private)
// UserModule.validateEmail() 호출 불가 (private)

console.log("=========================");
