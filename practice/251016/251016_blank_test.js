/*
 * 백지 테스트 #1: class를 prototype으로 변환
 * 
 * 목표: 아래 class 코드를 prototype 방식으로 재구현
 * 제한시간: 10분
 * 참고자료: 없음
 */

// 변환 대상
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
  
  static create(name) {
    return new Animal(name);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
}

// ===== 여기서부터 작성 시작 =====
// TODO: 위 코드를 prototype으로 구현

function AnimalProto(name){
  this.name = name;
}

AnimalProto.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
}

AnimalProto.create = function(name){
  const newObj = Object.create(AnimalProto.prototype);
  newObj.name = name;
  return newObj;
}

function DogProto(name, breed) {
  AnimalProto.call(this,name);
  this.breed = breed;
}

DogProto.prototype.speak = function(){
  console.log(`${this.name} barks`);
}

const animal = new Animal('Generic');
animal.speak();

const dog = new Dog('Buddy', 'Golden Retriever');
dog.speak();
console.log(dog instanceof Animal);  // true여야 함
console.log(dog instanceof Dog);     // true여야 함

const created = Animal.create('Created');
console.log(created instanceof Animal);  // true여야 함

// ===== 체크리스트 =====
/*
 * □ Animal 생성자 작동하는가? o
 * □ Animal.prototype.speak 정의되었는가? o
 * □ Animal.create (static) 작동하는가? o
 * □ Dog 생성자 작동하는가? o
 * □ Dog.prototype.__proto__ === Animal.prototype 인가? o
 * □ super() 역할 (Animal.call) 구현했는가? o
 * □ Dog.prototype.constructor === Dog 인가? o
 * □ dog instanceof Animal === true 인가? o
 * □ 모든 테스트 통과하는가? o
 * 
 * 성공률: __/9 (목표: 7개 이상)
 * 소요시간: __분
 */