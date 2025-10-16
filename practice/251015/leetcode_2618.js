/* 
 * 주어진 값이 특정 클래스 또는 상위 클래스의 인스턴스인지 확인하는 함수를 작성하세요. 
 * 이 문제에서 객체가 특정 클래스의 인스턴스로 간주되려면 해당 객체가 그 클래스의 메서드에 접근할 수 있어야 합니다.
 * 함수에 전달될 수 있는 데이터 유형에 대한 제약은 없습니다. 예를 들어, 값이나 클래스가 정의되지 않았을 수도 있습니다.

예제 1:

입력: func = () => checkIfInstanceOf(new Date(), Date)
출력: true
설명: Date 생성자가 반환하는 객체는 정의상 Date의 인스턴스입니다.
예제 2:

입력: func = () => { 
    class Animal {}; 
    class Dog extends Animal {}; 
    return checkIfInstanceOf(new Dog(), Animal);
  }
출력: true
설명:
class Animal {};
class Dog extends Animal {};
checkIfInstanceOf(new Dog(), Animal); // true

Dog는 Animal의 하위 클래스입니다. 따라서 Dog 객체는 Dog와 Animal 모두의 인스턴스입니다.
예제 3:

입력: func = () => checkIfInstanceOf(Date, Date)
출력: false
설명: 날짜 생성자는 논리적으로 자신의 인스턴스가 될 수 없습니다.
예제 4:

입력: func = () => checkIfInstanceOf(5, Number)
출력: true
설명: 5는 Number입니다. “instanceof” 키워드는 false를 반환하지만, Number 메서드(예: “toFixed()”)에 접근할 수 있으므로 여전히 Number의 인스턴스로 간주됩니다.

*/

/**
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function(obj, classFunction) {
  if(obj === null || obj === undefined || typeof classFunction !== 'function'){
    return false;
  }
  
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    if (proto === classFunction.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};


console.log(checkIfInstanceOf(5, String));
console.log(checkIfInstanceOf(5, Number));           // true
console.log(checkIfInstanceOf("hello", String));     // true
console.log(checkIfInstanceOf(null, Object));        // ??
console.log(checkIfInstanceOf(undefined, Object));   // ??
console.log(checkIfInstanceOf([], Array));           // true
console.log(checkIfInstanceOf(null, null));
console.log(checkIfInstanceOf(undefined, undefined));
console.log(checkIfInstanceOf(Date, Date));