// Animal: 모든 동물의 기본 클래스
// - name 속성: 동물의 이름
// - eat 메서드: 모든 동물이 먹는 행위
function Animal(name) {
  this.name = name;
}

// Animal eat 프로퍼티에 함수 연결
Animal.prototype.eat = function () {
  console.log(`${this.name} is eating`);
};

// Mammal: 포유류 클래스
// - name: 포유류의 이름
// - furColor: 포유류의 색상
function Mammal(name, furColor) {
  // Mammal이 Animal 클래스를 상속받음을 명시, name 인자 전달
  Animal.call(this, name);
  this.furColor = furColor;
}

// Animal 상속 설정 (Mammal은 Animal의 프로토타입 상속)
Mammal.prototype = Object.create(Animal.prototype);

// Mammal의 nurse 프로퍼티에 메서드 연결
Mammal.prototype.nurse = function () {
  console.log(`${this.name} is nursing babies`);
};

function Dog(name, furColor, breed) {
  // Dog가 Mammal 클래스를 상속받음을 명시, name, furColor 인자 전달
  Mammal.call(this, name, furColor);
  this.breed = breed;
}

// Mammal 상속 설정 (Dog는 Mammal의 프로토타입 상속)
Dog.prototype = Object.create(Mammal.prototype);

// Dog의 bark 프로퍼티에 메서드 연결
Dog.prototype.bark = function () {
  console.log(`${this.name} says: Woof!`);
};

// Dog 생성자 실행 및 필요한 인자 전달
const dog = new Dog('Max', 'brown', 'Golden Retriever');

dog.bark(); // "Max says: Woof!"
dog.nurse(); // "Max is nursing babies"
dog.eat(); // "Max is eating"

console.log(dog.name); // "Max"
console.log(dog.furColor); // "brown"
console.log(dog.breed); // "Golden Retriever"
