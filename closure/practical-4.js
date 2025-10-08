/**
 * 실무 예제 4: 함수 조합 (Function Composition)
 *
 * 클로저를 활용하여 여러 함수를 조합하는 고차 함수를 만듭니다.
 * 함수형 프로그래밍의 핵심 개념 중 하나입니다.
 *
 * compose: 오른쪽에서 왼쪽으로 함수를 실행
 * pipe: 왼쪽에서 오른쪽으로 함수를 실행
 */

console.log("=== 실무 예제 4: 함수 조합 ===");

// compose 함수: f(g(h(x)))를 compose(f, g, h)(x)로 표현
var compose = function() {
  var funcs = Array.prototype.slice.call(arguments);

  return function(initialValue) {
    return funcs.reduceRight(function(acc, func) {
      return func(acc);
    }, initialValue);
  };
};

// pipe 함수: h(g(f(x)))를 pipe(f, g, h)(x)로 표현
var pipe = function() {
  var funcs = Array.prototype.slice.call(arguments);

  return function(initialValue) {
    return funcs.reduce(function(acc, func) {
      return func(acc);
    }, initialValue);
  };
};

// 실무에서 사용할 유틸리티 함수들
var trim = function(str) {
  return str.trim();
};

var toLowerCase = function(str) {
  return str.toLowerCase();
};

var removeSpaces = function(str) {
  return str.replace(/\s+/g, "-");
};

var addPrefix = function(prefix) {
  return function(str) {
    return prefix + str;
  };
};

// 사용 예시: URL 슬러그 생성
var createSlug = pipe(
  trim,
  toLowerCase,
  removeSpaces,
  addPrefix("blog-post-")
);

var input = "  Hello World Example  ";
var slug = createSlug(input);
console.log("입력:", input);
console.log("슬러그:", slug); // blog-post-hello-world-example

// 사용 예시: 가격 포맷팅
var formatPrice = compose(
  function(str) {
    return "$" + str;
  },
  function(str) {
    return str.toLocaleString();
  },
  function(num) {
    return num.toFixed(2);
  }
);

console.log("가격:", formatPrice(1234.5)); // $1,234.50

console.log("=========================");
