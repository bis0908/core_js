/**
 * 5-3-3. 부분 적용 함수 (Partial Application)
 *
 * 부분 적용 함수는 n개의 인자를 받는 함수에 미리 m개의 인자를 넘겨 기억시키고,
 * 나중에 (n-m)개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있게 하는 함수입니다.
 *
 * 클로저를 활용하여 미리 받은 인자들을 기억하고,
 * 나중에 받은 인자들과 합쳐서 원본 함수를 실행합니다.
 *
 * _ (언더스코어)를 사용하여 나중에 받을 인자의 위치를 지정할 수 있습니다.
 */

console.log("=== 5-3-3. 부분 적용 함수 ===");

Object.defineProperty(globalThis, "_", {
  value: "EMPTY_SPACE",
  writable: false,
  configurable: false,
  enumerable: false,
});

var partial2 = () => {
  var originalPartialArgs = arguments;
  var func = originalPartialArgs[0];
  if (typeof func !== "function") {
    throw new Error("첫 번째 인자가 함수가 아닙니다.");
  }
  return function () {
    var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    var restArgs = Array.prototype.slice.call(arguments);
    for (let i = 0; i < partialArgs.length; i++) {
      if (partialArgs[i] === _) {
        partialArgs[i] = restArgs.shift();
      }
    }
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

var add = () => {
  var result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};

// 1, 2, _, 4, 5, _, _, 8, 9 위치에 미리 값을 고정
// 나중에 3, 6, 7, 10을 넘기면 _ 위치에 순서대로 채워짐
var addPartial = partial2(add, 1, 2, _, 4, 5, _, _, 8, 9);
console.log(addPartial(3, 6, 7, 10)); // 55

var dog = {
  name: "강아지",
  greet: partial2(function (prefix, suffix) {
    return prefix + this.name + suffix;
  }, "왈왈, "),
};
console.log(dog.greet(" 배고파요!")); // 왈왈, 강아지 배고파요!

console.log("=========================");
