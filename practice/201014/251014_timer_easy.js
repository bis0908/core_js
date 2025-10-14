/*
 * Day 3 - 타이머 챌린지: 하급 (워밍업)
 * 
 * 목표: 기본 개념 빠르게 복습하며 자신감 회복
 * 총 2문제 / 제한시간 각 5분
 * 
 * 결과 기록:
 * ┌─────┬──────────┬────────┬──────┐
 * │ No. │ 제한시간 │ 소요시간│ 결과 │
 * ├─────┼──────────┼────────┼──────┤
 * │  1  │   5분    │   분   │ O/X  │
 * │  2  │   5분    │   분   │ O/X  │
 * └─────┴──────────┴────────┴──────┘
 * 
 * 총점: ____ / 2
 */

// ============================================
// 문제 1: 기본 변환 (5분)
// ============================================

console.log('=== 문제 1: 기본 class → prototype 변환 ===\n');

/*
 * 타이머 시작! ⏰
 * 
 * 아래 Book 클래스를 prototype 방식으로 변환하세요.
 */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  
  getInfo() {
    return `${this.title} by ${this.author}`;
  }
  
  static compareAuthors(book1, book2) {
    return book1.author === book2.author;
  }
}

/*
 * TODO: BookProto 구현
 * 
 * 체크리스트:
 * □ 생성자 함수
 * □ getInfo 메서드 (prototype에)
 * □ compareAuthors static 메서드
 */

// 여기에 구현
function BookProto(title, author) {
  this.title = title;
  this.author = author;
}

BookProto.prototype.getInfo = function(){
  return `${this.title} by ${this.author}`;
}

BookProto.compareAuthors = function(book1, book2){
  return book1.author === book2.author;
}

// 테스트 코드 (이 부분은 수정하지 마세요)
const book1 = new Book('1984', 'Orwell');
const book2 = new BookProto('1984', 'Orwell');

console.log('Class 결과:', book1.getInfo());
console.log('Proto 결과:', book2.getInfo());
console.log('Static 비교:', Book.compareAuthors(book1, book1));
console.log('Static 비교:', BookProto.compareAuthors(book2, book2));

// 예상 출력:
// Class 결과: 1984 by Orwell
// Proto 결과: 1984 by Orwell
// Static 비교: true
// Static 비교: true


// ============================================
// 문제 2: 1단계 상속 (5분)
// ============================================

console.log('\n=== 문제 2: 상속 구현 ===\n');

/*
 * 타이머 시작! ⏰
 * 
 * 아래 상속 구조를 prototype으로 변환하세요.
 */

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  
  getDescription() {
    return `${this.name}: $${this.price}`;
  }
}

class Electronics extends Product {
  constructor(name, price, warranty) {
    super(name, price);
    this.warranty = warranty;
  }
  
  getDescription() {
    return `${super.getDescription()} (${this.warranty} year warranty)`;
  }
}

/*
 * TODO: ProductProto와 ElectronicsProto 구현
 * 
 * 핵심 포인트:
 * - 부모 생성자 호출: .call()
 * - 프로토타입 연결: Object.create()
 * - constructor 재설정
 * - 부모 메서드 호출
 */

// 여기에 구현
function ProductProto(name, price) {
  this.name = name;
  this.price = price;
}

ProductProto.prototype.getDescription = function(){
  return `${this.name}: $${this.price}`;
}

function ElectronicsProto(name, price, warranty) {
  ProductProto.call(this, name, price);
  this.warranty = warranty;
}

// prototype connection
ElectronicsProto.prototype = Object.create(ProductProto.prototype);
ElectronicsProto.prototype.constructor = ElectronicsProto;

ElectronicsProto.prototype.getDescription = function(){
  const description = ProductProto.prototype.getDescription.call(this);
  return `${description} (${this.warranty} year warranty)`;
}

// 테스트 코드
const laptop1 = new Electronics('Laptop', 1200, 2);
const laptop2 = new ElectronicsProto('Laptop', 1200, 2);

console.log('Class 결과:', laptop1.getDescription());
console.log('Proto 결과:', laptop2.getDescription());
console.log('instanceof 체크:', laptop2 instanceof ElectronicsProto);
console.log('instanceof 체크:', laptop2 instanceof ProductProto);

// 예상 출력:
// Class 결과: Laptop: $1200 (2 year warranty)
// Proto 결과: Laptop: $1200 (2 year warranty)
// instanceof 체크: true
// instanceof 체크: true