/**
 * 실무 예제 5: useState Hook 패턴 모방
 *
 * React의 useState Hook이 내부적으로 사용하는 클로저 패턴을 ES5 스타일로 구현합니다.
 * 상태와 상태 변경 함수를 클로저로 캡슐화하여 컴포넌트 간 상태 독립성을 보장합니다.
 *
 * 실제 React는 더 복잡하지만, 기본 원리는 동일합니다.
 */

console.log("=== 실무 예제 5: useState Hook 패턴 ===");

var createUseState = function() {
  var states = []; // 여러 useState 호출을 위한 상태 배열
  var currentIndex = 0; // 현재 처리 중인 state의 인덱스

  return function(initialValue) {
    var frozenIndex = currentIndex; // 클로저로 현재 인덱스 고정

    // 초기값 설정 (첫 호출시에만)
    if (states[frozenIndex] === undefined) {
      states[frozenIndex] = initialValue;
    }

    var setState = function(newValue) {
      // 함수형 업데이트 지원
      if (typeof newValue === "function") {
        states[frozenIndex] = newValue(states[frozenIndex]);
      } else {
        states[frozenIndex] = newValue;
      }
      console.log("상태 업데이트 [" + frozenIndex + "]:", states[frozenIndex]);
    };

    currentIndex++; // 다음 useState 호출을 위해 인덱스 증가
    return [states[frozenIndex], setState];
  };
};

// 컴포넌트 시뮬레이션
var MyComponent = function() {
  var useState = createUseState();

  // 여러 개의 상태 관리
  var countState = useState(0);
  var count = countState[0];
  var setCount = countState[1];

  var nameState = useState("홍길동");
  var name = nameState[0];
  var setName = nameState[1];

  var isActiveState = useState(false);
  var isActive = isActiveState[0];
  var setIsActive = isActiveState[1];

  // 공개 API
  return {
    render: function() {
      console.log("렌더링:");
      console.log("  카운트:", count);
      console.log("  이름:", name);
      console.log("  활성 상태:", isActive);
    },
    increment: function() {
      setCount(function(prev) {
        return prev + 1;
      });
    },
    changeName: function(newName) {
      setName(newName);
    },
    toggleActive: function() {
      setIsActive(function(prev) {
        return !prev;
      });
    },
  };
};

// 사용 예시
var component = MyComponent();
component.render();

console.log("\n--- 상태 변경 ---");
component.increment();
component.changeName("김철수");
component.toggleActive();

console.log("\n--- 다시 렌더링 ---");
// 주의: 실제로는 상태가 변경되어도 새로 렌더링되지 않음
// 이는 단순화된 예제이며, 실제 React는 재렌더링 메커니즘이 있음

console.log("=========================");
