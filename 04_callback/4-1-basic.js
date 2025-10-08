/**
 * 4-1. 콜백함수 기본 개념
 *
 * 콜백함수(callback function)란 다른 코드의 인자로 넘겨주는 함수입니다.
 * 콜백함수를 넘겨받은 코드는 이 콜백함수를 필요에 따라 적절한 시점에 실행합니다.
 */

/**
 * 예제 1: 버튼 클릭 이벤트 처리
 *
 * 사용자가 버튼을 클릭했을 때 실행할 함수를 콜백으로 전달합니다.
 * addEventListener의 두 번째 인자가 콜백함수입니다.
 */
function handleButtonClick() {
  alert("버튼이 클릭되었습니다!");
}

// DOM 요소가 있다고 가정 (실제 브라우저 환경에서 실행)
// document.getElementById("myButton").addEventListener("click", handleButtonClick);

/**
 * 예제 2: API 응답 처리
 *
 * 서버에서 사용자 데이터를 받아올 때 성공/실패에 따른 콜백을 전달합니다.
 */
function fetchUserData(userId, onSuccess, onError) {
  // 실제로는 XMLHttpRequest나 fetch API를 사용
  setTimeout(function () {
    var userData = {
      id: userId,
      name: "홍길동",
      email: "hong@example.com",
    };

    if (userId > 0) {
      onSuccess(userData);
    } else {
      onError("유효하지 않은 사용자 ID입니다.");
    }
  }, 1000);
}

function onSuccessCallback(userData) {
  console.log("사용자 정보 로드 성공:", userData.name);
}

function onErrorCallback(errorMessage) {
  console.log("에러 발생:", errorMessage);
}

// 사용 예시
console.log("=== API 응답 처리 예제 ===");
fetchUserData(123, onSuccessCallback, onErrorCallback);
fetchUserData(-1, onSuccessCallback, onErrorCallback);

/**
 * 예제 3: 폼 유효성 검사
 *
 * 사용자 입력을 검증한 후 결과에 따라 다른 콜백을 실행합니다.
 */
function validateForm(formData, onValid, onInvalid) {
  var isValid = true;
  var errors = [];

  if (!formData.email || formData.email.indexOf("@") === -1) {
    isValid = false;
    errors.push("올바른 이메일 주소를 입력해주세요.");
  }

  if (!formData.password || formData.password.length < 6) {
    isValid = false;
    errors.push("비밀번호는 6자리 이상이어야 합니다.");
  }

  if (isValid) {
    onValid(formData);
  } else {
    onInvalid(errors);
  }
}

function handleValidForm(formData) {
  console.log("폼 검증 성공! 회원가입을 진행합니다.");
  console.log("이메일:", formData.email);
}

function handleInvalidForm(errors) {
  console.log("폼 검증 실패:");
  for (var i = 0; i < errors.length; i++) {
    console.log("- " + errors[i]);
  }
}

// 사용 예시
console.log("\n=== 폼 유효성 검사 예제 ===");
var formData1 = { email: "user@test.com", password: "123456" };
var formData2 = { email: "invalid-email", password: "123" };

validateForm(formData1, handleValidForm, handleInvalidForm);
validateForm(formData2, handleValidForm, handleInvalidForm);

/**
 * 예제 4: 메뉴 시스템
 *
 * 사용자가 선택한 메뉴에 따라 다른 콜백함수를 실행합니다.
 */
function executeMenuAction(menuId, callback) {
  console.log("메뉴 " + menuId + " 선택됨");
  setTimeout(callback, 500); // 0.5초 후 콜백 실행
}

function showDashboard() {
  console.log("대시보드를 표시합니다.");
}

function showUserProfile() {
  console.log("사용자 프로필을 표시합니다.");
}

function showSettings() {
  console.log("설정 페이지를 표시합니다.");
}

// 사용 예시
console.log("\n=== 메뉴 시스템 예제 ===");
executeMenuAction("dashboard", showDashboard);
executeMenuAction("profile", showUserProfile);
executeMenuAction("settings", showSettings);
